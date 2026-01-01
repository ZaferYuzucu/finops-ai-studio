/**
 * Fino Chat Type Definitions
 */

export interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
  timestamp?: number;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  description: string;
  category: string;
  keywords: string[];
  priority: number;
  content: string;
}

export interface ConversationState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}

export interface FinoChatHistory {
  conversations: ChatMessage[];
  lastUpdated: number;
}



