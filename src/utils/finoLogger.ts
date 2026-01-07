/**
 * Fino Chat Logging System
 * Tracks conversations for analytics and improvement
 */

interface LogEntry {
  timestamp: number;
  type: 'user_message' | 'ai_response' | 'error' | 'rate_limit' | 'validation_error';
  message?: string;
  metadata?: Record<string, any>;
  sessionId: string;
}

interface Analytics {
  totalMessages: number;
  totalConversations: number;
  averageMessagesPerSession: number;
  errorRate: number;
  commonQueries: string[];
}

class FinoLogger {
  private sessionId: string;
  private logs: LogEntry[] = [];
  private maxLogsInMemory = 100;

  constructor() {
    this.sessionId = this.getOrCreateSessionId();
    this.loadLogs();
  }

  /**
   * Get or create session ID
   */
  private getOrCreateSessionId(): string {
    let sessionId = sessionStorage.getItem('fino-session-id');
    if (!sessionId) {
      sessionId = `fino-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('fino-session-id', sessionId);
    }
    return sessionId;
  }

  /**
   * Load logs from localStorage
   */
  private loadLogs(): void {
    try {
      const saved = localStorage.getItem('fino-logs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Keep only recent logs (last 7 days)
          const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
          this.logs = parsed.filter(log => log.timestamp > sevenDaysAgo);
        }
      }
    } catch (error) {
      console.error('Failed to load logs:', error);
    }
  }

  /**
   * Save logs to localStorage
   */
  private saveLogs(): void {
    try {
      // Keep only last N logs
      if (this.logs.length > this.maxLogsInMemory) {
        this.logs = this.logs.slice(-this.maxLogsInMemory);
      }

      localStorage.setItem('fino-logs', JSON.stringify(this.logs));
    } catch (error) {
      console.error('Failed to save logs:', error);
    }
  }

  /**
   * Log user message
   */
  logUserMessage(message: string): void {
    const entry: LogEntry = {
      timestamp: Date.now(),
      type: 'user_message',
      message,
      sessionId: this.sessionId
    };

    this.logs.push(entry);
    this.saveLogs();
  }

  /**
   * Log AI response
   */
  logAiResponse(message: string, metadata?: Record<string, any>): void {
    const entry: LogEntry = {
      timestamp: Date.now(),
      type: 'ai_response',
      message,
      metadata,
      sessionId: this.sessionId
    };

    this.logs.push(entry);
    this.saveLogs();
  }

  /**
   * Log error
   */
  logError(error: string, metadata?: Record<string, any>): void {
    const entry: LogEntry = {
      timestamp: Date.now(),
      type: 'error',
      message: error,
      metadata,
      sessionId: this.sessionId
    };

    this.logs.push(entry);
    this.saveLogs();

    // Also log to console in development
    if (import.meta.env.DEV) {
      console.error('[Fino Error]', error, metadata);
    }
  }

  /**
   * Log rate limit hit
   */
  logRateLimit(metadata?: Record<string, any>): void {
    const entry: LogEntry = {
      timestamp: Date.now(),
      type: 'rate_limit',
      metadata,
      sessionId: this.sessionId
    };

    this.logs.push(entry);
    this.saveLogs();
  }

  /**
   * Log validation error
   */
  logValidationError(error: string, input: string): void {
    const entry: LogEntry = {
      timestamp: Date.now(),
      type: 'validation_error',
      message: error,
      metadata: { inputLength: input.length },
      sessionId: this.sessionId
    };

    this.logs.push(entry);
    this.saveLogs();
  }

  /**
   * Get analytics
   */
  getAnalytics(): Analytics {
    const userMessages = this.logs.filter(l => l.type === 'user_message');
    const errors = this.logs.filter(l => l.type === 'error');
    const sessions = new Set(this.logs.map(l => l.sessionId));

    // Count common queries
    const queryCount: Record<string, number> = {};
    for (const log of userMessages) {
      if (log.message) {
        const normalizedQuery = log.message.toLowerCase().trim();
        queryCount[normalizedQuery] = (queryCount[normalizedQuery] || 0) + 1;
      }
    }

    // Get top 5 common queries
    const commonQueries = Object.entries(queryCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([query]) => query);

    return {
      totalMessages: userMessages.length,
      totalConversations: sessions.size,
      averageMessagesPerSession: userMessages.length / (sessions.size || 1),
      errorRate: (errors.length / (userMessages.length || 1)) * 100,
      commonQueries
    };
  }

  /**
   * Export logs (for debugging/analysis)
   */
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  /**
   * Clear all logs
   */
  clearLogs(): void {
    this.logs = [];
    localStorage.removeItem('fino-logs');
  }
}

// Singleton instance
const finoLogger = new FinoLogger();

export default finoLogger;








