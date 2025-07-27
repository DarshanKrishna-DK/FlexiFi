// Simple Fi Authentication API
// Gets the Fi login URL using MCP and returns it to the React app
// Run with: node fi-auth-api.js

const http = require('http');
const https = require('https');

const PORT = 9999;
const FI_MCP_ENDPOINT = 'https://mcp.fi.money:8080/mcp/stream';

let messageId = 1;

// Simple CORS-enabled API server
const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Only handle GET requests to /fi-auth
  if (req.method !== 'GET' || req.url !== '/fi-auth') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
    return;
  }

  console.log('🔗 Getting Fi authentication URL...');

  try {
    // Step 1: Initialize MCP session
    console.log('📡 Step 1: Initializing MCP session...');
    const sessionId = await initializeMcpSession();
    console.log('✅ Got session ID:', sessionId);

    // Step 2: Call tool to get login URL
    console.log('📡 Step 2: Getting login URL from MCP...');
    const loginUrl = await getFiLoginUrl(sessionId);

    if (loginUrl) {
      console.log('🎉 Success! Got Fi login URL:', loginUrl);
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        success: true, 
        login_url: loginUrl,
        session_id: sessionId 
      }));
    } else {
      throw new Error('No login URL received from Fi MCP');
    }

  } catch (error) {
    console.error('❌ Fi authentication failed:', error);
    
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      success: false, 
      error: error.message 
    }));
  }
});

// Initialize MCP session (same as working Node.js test)
async function initializeMcpSession() {
  const message = {
    jsonrpc: '2.0',
    id: messageId++,
    method: 'initialize',
    params: {
      protocolVersion: '2024-11-05',
      capabilities: { tools: {} },
      clientInfo: { name: 'FlexiFi-Web', version: '1.0.0' }
    }
  };

  const response = await sendMcpMessage(message);
  return response.headers['mcp-session-id'];
}

// Get Fi login URL by calling MCP tool (same as working Node.js test)
async function getFiLoginUrl(sessionId) {
  const message = {
    jsonrpc: '2.0',
    id: messageId++,
    method: 'tools/call',
    params: {
      name: 'fetch_bank_transactions',
      arguments: {}
    }
  };

  const response = await sendMcpMessage(message, sessionId);
  
  if (response.data.result?.content?.[0]?.text) {
    try {
      const authData = JSON.parse(response.data.result.content[0].text);
      
      if (authData.status === 'login_required' && authData.login_url) {
        return authData.login_url;
      }
    } catch (parseError) {
      console.error('Failed to parse MCP response:', parseError);
    }
  }
  
  return null;
}

// Send MCP message (same as working Node.js test)
function sendMcpMessage(message, sessionId = null) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(message);
    
    const url = new URL(FI_MCP_ENDPOINT);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'Accept': 'application/json'
      }
    };

    // Add session ID if provided
    if (sessionId) {
      options.headers['mcp-session-id'] = sessionId;
    }
    
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonResponse = JSON.parse(data);
          resolve({ data: jsonResponse, headers: res.headers });
        } catch (e) {
          reject(new Error('Invalid JSON response: ' + data));
        }
      });
    });
    
    req.on('error', (e) => {
      reject(e);
    });
    
    req.write(postData);
    req.end();
  });
}

server.listen(PORT, () => {
  console.log(`🚀 Fi Authentication API running on http://localhost:${PORT}`);
  console.log(`📡 Call GET http://localhost:${PORT}/fi-auth to get Fi login URL`);
  console.log('');
});

server.on('error', (error) => {
  console.error('❌ Server error:', error);
}); 