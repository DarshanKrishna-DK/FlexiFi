export interface GeminiMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

class GeminiService {
  private apiKey: string | null = null;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  constructor() {
    // In a real implementation, you would get this from environment variables
    // For now, we'll use a mock implementation
    this.apiKey = process.env.REACT_APP_GEMINI_API_KEY || null;
  }

  async sendMessage(message: string): Promise<string> {
    // Mock implementation for development
    // In production, you would make actual API calls to Gemini
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Mock responses based on message content
    const responses = [
      "Based on your financial goals, I recommend a diversified investment approach. Consider allocating 60% to equity funds, 30% to debt instruments, and 10% to alternative investments.",
      "For your investment planning, I suggest starting with a systematic investment plan (SIP) of ₹15,000 per month. This will help you build wealth gradually while managing risk.",
      "Looking at current market conditions, I recommend focusing on large-cap equity funds and government bonds for stability. You might also consider ELSS funds for tax benefits.",
      "Your financial profile suggests a moderate risk appetite. I recommend a balanced portfolio with blue-chip stocks, mutual funds, and some fixed deposits for emergency funds.",
      "For long-term wealth creation, consider investing in index funds and diversified equity mutual funds. Start with small amounts and increase gradually as your income grows."
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return randomResponse;
  }

  async sendMessageToGemini(message: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Gemini API key not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: message
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
