// API Configuration
export const API_CONFIG = {
  GOOGLE_AI_API_KEY: import.meta.env.VITE_GOOGLE_AI_API_KEY || 'AIzaSyBX6zDn4ZzYZshUkJAx3eb1J2OBprsgAsw',
  GOOGLE_AI_BASE_URL: 'https://generativelanguage.googleapis.com/v1beta',
} as const;

// Google AI API endpoints
export const GOOGLE_AI_ENDPOINTS = {
  GENERATE_CONTENT: '/models/gemini-2.0-flash:generateContent',
  CHAT: '/models/gemini-2.0-flash:generateContent',
} as const;

// AI Agent types available in the sidebar
export const AI_AGENTS = {
  CHAT_ASSISTANT: {
    name: 'AI Assistant',
    model: 'gemini-2.0-flash',
    description: 'General purpose AI assistant for document workflow',
  },
  DOCUMENT_ANALYZER: {
    name: 'Document Analyzer',
    model: 'gemini-2.0-flash',
    description: 'Specialized in analyzing and extracting information from documents',
  },
  CONTENT_GENERATOR: {
    name: 'Content Generator',
    model: 'gemini-2.0-flash',
    description: 'Creates professional documents and templates',
  },
  CONTRACT_REVIEWER: {
    name: 'Contract Reviewer',
    model: 'gemini-2.0-flash',
    description: 'Reviews and analyzes legal contracts and agreements',
  },
} as const;

// Helper function to get API headers
export const getApiHeaders = () => ({
  'Content-Type': 'application/json',
});

// Helper function to construct API URLs
export const getApiUrl = (endpoint: string) => 
  `${API_CONFIG.GOOGLE_AI_BASE_URL}${endpoint}`; 