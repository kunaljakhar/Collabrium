import { API_CONFIG, GOOGLE_AI_ENDPOINTS, getApiUrl } from '@/config/api';

export interface AIMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface AIResponse {
  candidates: {
    content: {
      parts: { text: string }[];
    };
    finishReason: string;
    safetyRatings: any[];
  }[];
}

export interface ChatRequest {
  contents: AIMessage[];
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
  };
}

class AIService {
  private async makeRequest(endpoint: string, payload: any): Promise<any> {
    const url = getApiUrl(endpoint);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': API_CONFIG.GOOGLE_AI_API_KEY,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw error;
    }
  }

  async generateChatResponse(messages: AIMessage[], temperature: number = 0.7): Promise<string> {
    const payload: ChatRequest = {
      contents: messages,
      generationConfig: {
        temperature,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    };

    try {
      const response: AIResponse = await this.makeRequest(GOOGLE_AI_ENDPOINTS.GENERATE_CONTENT, payload);
      
      if (response.candidates && response.candidates.length > 0) {
        return response.candidates[0].content.parts[0].text;
      }
      
      throw new Error('No response generated');
    } catch (error) {
      console.error('Chat response generation failed:', error);
      return 'I apologize, but I encountered an error processing your request. Please try again.';
    }
  }

  async analyzeDocument(documentContent: string, analysisType: string = 'general'): Promise<string> {
    const prompt = `As a document analysis expert, please analyze the following document for ${analysisType} purposes. Provide a comprehensive analysis including key points, structure, and recommendations:\n\n${documentContent}`;
    
    const messages: AIMessage[] = [
      {
        role: 'user',
        parts: [{ text: prompt }]
      }
    ];

    return this.generateChatResponse(messages, 0.3);
  }

  async generateContent(prompt: string, contentType: string = 'document'): Promise<string> {
    const enhancedPrompt = `As a professional ${contentType} generator, please create high-quality content based on the following requirements:\n\n${prompt}\n\nEnsure the content is well-structured, professional, and suitable for business use.`;
    
    const messages: AIMessage[] = [
      {
        role: 'user',
        parts: [{ text: enhancedPrompt }]
      }
    ];

    return this.generateChatResponse(messages, 0.5);
  }

  async reviewContract(contractContent: string): Promise<string> {
    const prompt = `As a legal contract review specialist, please analyze the following contract. Identify key terms, potential risks, important clauses, and provide recommendations:\n\n${contractContent}`;
    
    const messages: AIMessage[] = [
      {
        role: 'user',
        parts: [{ text: prompt }]
      }
    ];

    return this.generateChatResponse(messages, 0.2);
  }

  async extractInformation(content: string, extractionType: string): Promise<string> {
    const prompt = `Please extract ${extractionType} information from the following content. Organize the extracted information in a clear, structured format:\n\n${content}`;
    
    const messages: AIMessage[] = [
      {
        role: 'user',
        parts: [{ text: prompt }]
      }
    ];

    return this.generateChatResponse(messages, 0.1);
  }

  // Test API connection
  async testConnection(): Promise<boolean> {
    try {
      const testMessage: AIMessage[] = [
        {
          role: 'user',
          parts: [{ text: 'Hello, this is a connection test.' }]
        }
      ];
      
      await this.generateChatResponse(testMessage, 0.1);
      return true;
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  }
}

export const aiService = new AIService(); 