// API Configuration for Fi MCP Integration

export interface ApiConfig {
  baseUrl: string;
  mcpEndpoint: string;
  endpoints: {
    login: string;
    authRedirect: string;
    authCallback: string;
    userData: string;
    dashboardData: string;
    chat: string;
  };
  auth: {
    timeout: number;
    sessionKey: string;
    clientId: string;
    clientSecret?: string;
    redirectUri: string;
    fiAuthUrl: string;
  };
  environment: 'development' | 'production';
}

// Get configuration from environment variables
const getApiConfig = (): ApiConfig => {
  const baseUrl = process.env.REACT_APP_FI_API_BASE_URL || 'https://api.fi.money';
  const mcpEndpoint = process.env.REACT_APP_FI_MCP_ENDPOINT || 'https://mcp.fi.money';

  return {
    baseUrl,
    mcpEndpoint,
    endpoints: {
      login: process.env.REACT_APP_LOGIN_ENDPOINT || '/auth/login',
      authRedirect: process.env.REACT_APP_AUTH_REDIRECT_ENDPOINT || '/auth/oauth',
      authCallback: process.env.REACT_APP_AUTH_CALLBACK_ENDPOINT || '/auth/callback',
      userData: process.env.REACT_APP_USER_DATA_ENDPOINT || '/api/user',
      dashboardData: process.env.REACT_APP_DASHBOARD_DATA_ENDPOINT || '/api/dashboard',
      chat: process.env.REACT_APP_CHAT_ENDPOINT || '/api/chat',
    },
    auth: {
      timeout: parseInt(process.env.REACT_APP_AUTH_TIMEOUT || '300000'),
      sessionKey: process.env.REACT_APP_SESSION_STORAGE_KEY || 'fi_session',
      clientId: process.env.REACT_APP_CLIENT_ID || 'flexifi_web_client',
      clientSecret: process.env.REACT_APP_CLIENT_SECRET, // Optional for frontend-only flows
      redirectUri: process.env.REACT_APP_REDIRECT_URI || 'http://localhost:3000/auth/callback',
      fiAuthUrl: process.env.REACT_APP_FI_AUTH_URL || 'https://auth.fi.money/oauth/authorize',
    },
    environment: (process.env.REACT_APP_ENVIRONMENT as 'development' | 'production') || 'production',
  };
};

export const apiConfig = getApiConfig();

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${apiConfig.baseUrl}${endpoint}`;
};

// Helper function to build MCP URLs
export const buildMcpUrl = (endpoint: string): string => {
  return `${apiConfig.mcpEndpoint}${endpoint}`;
};

// API request headers
export const getApiHeaders = (includeAuth: boolean = false): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (includeAuth) {
    const session = sessionStorage.getItem(apiConfig.auth.sessionKey);
    if (session) {
      const sessionData = JSON.parse(session);
      headers['Authorization'] = `Bearer ${sessionData.token}`;
    }
  }

  return headers;
};

// Session management
export const saveSession = (sessionData: any): void => {
  sessionStorage.setItem(apiConfig.auth.sessionKey, JSON.stringify({
    ...sessionData,
    timestamp: Date.now(),
  }));
};

export const getSession = (): any | null => {
  const session = sessionStorage.getItem(apiConfig.auth.sessionKey);
  if (!session) return null;

  const sessionData = JSON.parse(session);
  const now = Date.now();
  
  // Check if session has expired
  if (now - sessionData.timestamp > apiConfig.auth.timeout) {
    clearSession();
    return null;
  }

  return sessionData;
};

export const clearSession = (): void => {
  sessionStorage.removeItem(apiConfig.auth.sessionKey);
};

// OAuth helpers
export const buildAuthUrl = (state?: string): string => {
  const params = new URLSearchParams({
    client_id: apiConfig.auth.clientId,
    redirect_uri: apiConfig.auth.redirectUri,
    response_type: 'code',
    scope: 'read:user read:accounts read:transactions',
    state: state || generateRandomState(),
  });

  return `${apiConfig.auth.fiAuthUrl}?${params.toString()}`;
};

export const generateRandomState = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const redirectToFiAuth = (state?: string): void => {
  const authUrl = buildAuthUrl(state);

  // Store state for verification
  if (state) {
    sessionStorage.setItem('oauth_state', state);
  }

  // Redirect to Fi authentication
  window.location.href = authUrl;
};

export const handleAuthCallback = async (code: string, state: string): Promise<any> => {
  // Verify state
  const storedState = sessionStorage.getItem('oauth_state');
  if (storedState !== state) {
    throw new Error('Invalid OAuth state parameter');
  }

  // Exchange code for token
  const response = await fetch(buildApiUrl(apiConfig.endpoints.authCallback), {
    method: 'POST',
    headers: getApiHeaders(),
    body: JSON.stringify({
      code,
      client_id: apiConfig.auth.clientId,
      redirect_uri: apiConfig.auth.redirectUri,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to exchange authorization code');
  }

  const sessionData = await response.json();
  saveSession(sessionData);

  // Clean up
  sessionStorage.removeItem('oauth_state');

  return sessionData;
};

// Development mode helpers
export const isDevelopment = (): boolean => {
  return apiConfig.environment === 'development';
};

export const isProduction = (): boolean => {
  return apiConfig.environment === 'production';
};
