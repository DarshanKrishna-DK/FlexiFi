// Fi API Service for production server integration

import { 
  buildApiUrl, 
  buildMcpUrl, 
  getApiHeaders, 
  apiConfig, 
  getSession, 
  clearSession 
} from '../config/api';

export interface AuthRequest {
  sessionId: string;
  phoneNumber: string;
  otp: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  userId: string;
  sessionId: string;
  expiresAt: string;
  user: {
    id: string;
    phoneNumber: string;
    name?: string;
    email?: string;
  };
}

export interface UserData {
  id: string;
  phoneNumber: string;
  name?: string;
  email?: string;
  accounts: Account[];
  portfolios: Portfolio[];
  preferences: UserPreferences;
}

export interface Account {
  id: string;
  type: 'savings' | 'current' | 'investment' | 'credit';
  name: string;
  balance: number;
  currency: string;
  provider: string;
}

export interface Portfolio {
  id: string;
  name: string;
  totalValue: number;
  currency: string;
  holdings: Holding[];
  performance: PerformanceData;
}

export interface Holding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  currentPrice: number;
  totalValue: number;
  gainLoss: number;
  gainLossPercentage: number;
}

export interface PerformanceData {
  totalReturn: number;
  totalReturnPercentage: number;
  dayChange: number;
  dayChangePercentage: number;
  monthChange: number;
  monthChangePercentage: number;
  yearChange: number;
  yearChangePercentage: number;
}

export interface UserPreferences {
  currency: string;
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  dashboard: {
    defaultView: string;
    refreshInterval: number;
  };
}

export interface DashboardData {
  summary: {
    totalNetWorth: number;
    totalAssets: number;
    totalLiabilities: number;
    monthlyChange: number;
    monthlyChangePercentage: number;
  };
  accounts: Account[];
  portfolios: Portfolio[];
  recentTransactions: Transaction[];
  insights: Insight[];
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  category: string;
  accountId: string;
}

export interface Insight {
  id: string;
  type: 'recommendation' | 'alert' | 'analysis';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  actionable: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  metadata?: {
    charts?: any[];
    recommendations?: any[];
    data?: any;
  };
}

export interface ChatRequest {
  message: string;
  context?: {
    userId: string;
    sessionId: string;
    previousMessages?: ChatMessage[];
  };
}

export interface ChatResponse {
  message: ChatMessage;
  suggestions?: string[];
  charts?: any[];
  data?: any;
}

class FiApiService {
  // Authentication
  async authenticate(authRequest: AuthRequest): Promise<AuthResponse> {
    const response = await fetch(buildApiUrl(apiConfig.endpoints.login), {
      method: 'POST',
      headers: getApiHeaders(),
      body: JSON.stringify(authRequest),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Authentication failed: ${response.status}`);
    }

    return response.json();
  }

  // User data
  async getUserData(): Promise<UserData> {
    const session = getSession();
    if (!session) {
      throw new Error('No active session');
    }

    const response = await fetch(buildApiUrl(apiConfig.endpoints.userData), {
      method: 'GET',
      headers: getApiHeaders(true),
    });

    if (response.status === 401) {
      clearSession();
      throw new Error('Session expired');
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.status}`);
    }

    return response.json();
  }

  // Dashboard data
  async getDashboardData(): Promise<DashboardData> {
    const session = getSession();
    if (!session) {
      throw new Error('No active session');
    }

    const response = await fetch(buildApiUrl(apiConfig.endpoints.dashboardData), {
      method: 'GET',
      headers: getApiHeaders(true),
    });

    if (response.status === 401) {
      clearSession();
      throw new Error('Session expired');
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard data: ${response.status}`);
    }

    return response.json();
  }

  // Chat with AI
  async sendChatMessage(chatRequest: ChatRequest): Promise<ChatResponse> {
    const session = getSession();
    if (!session) {
      throw new Error('No active session');
    }

    const response = await fetch(buildMcpUrl(apiConfig.endpoints.chat), {
      method: 'POST',
      headers: getApiHeaders(true),
      body: JSON.stringify({
        ...chatRequest,
        context: {
          ...chatRequest.context,
          userId: session.userId,
          sessionId: session.sessionId,
        },
      }),
    });

    if (response.status === 401) {
      clearSession();
      throw new Error('Session expired');
    }

    if (!response.ok) {
      throw new Error(`Chat request failed: ${response.status}`);
    }

    return response.json();
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await fetch(buildApiUrl('/health'), {
      method: 'GET',
      headers: getApiHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Health check failed: ${response.status}`);
    }

    return response.json();
  }
}

export const fiApiService = new FiApiService();
