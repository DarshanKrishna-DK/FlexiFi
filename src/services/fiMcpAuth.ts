// Fi Authentication Service
// Simple approach using local API that handles MCP communication

interface FiAuthResponse {
  success: boolean;
  login_url?: string;
  session_id?: string;
  error?: string;
}

class FiMcpAuthService {
  private readonly authApiEndpoint = 'http://localhost:9999/fi-auth';

  /**
   * Open Fi authentication using simple API call
   * This calls our local API that handles the MCP communication
   */
  async openFiAuth(): Promise<void> {
    try {
      console.log('🔗 Getting Fi authentication URL...');
      console.log('📡 Calling Fi auth API:', this.authApiEndpoint);
      
      // Call our simple API that handles MCP communication
      const response = await fetch(this.authApiEndpoint, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const authData: FiAuthResponse = await response.json();
      console.log('📥 Auth API response:', authData);

      if (authData.success && authData.login_url) {
        console.log('🎉 Success! Got Fi login URL:', authData.login_url);
        
        // Store session info for later use
        if (authData.session_id) {
          sessionStorage.setItem('fi_mcp_session', authData.session_id);
        }
        
        // Open Fi auth page (same as webbrowser.open() in Python script)
        console.log('🌐 Opening Fi authentication page...');
        window.location.href = authData.login_url;
      } else {
        throw new Error(authData.error || 'No login URL received from Fi service');
      }
      
    } catch (error) {
      console.error('❌ Fi authentication failed:', error);
      throw new Error(`Failed to initiate Fi authentication: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const fiMcpAuthService = new FiMcpAuthService(); 