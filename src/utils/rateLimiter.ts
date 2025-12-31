/**
 * Simple client-side rate limiter
 * Prevents abuse and excessive API calls
 */

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxRequests: 10, // 10 messages
  windowMs: 60000 // per 1 minute
};

class RateLimiter {
  private records: Map<string, RateLimitRecord> = new Map();

  /**
   * Check if request is allowed
   */
  checkLimit(key: string, config: RateLimitConfig = DEFAULT_CONFIG): {
    allowed: boolean;
    remaining: number;
    resetIn: number;
  } {
    const now = Date.now();
    const record = this.records.get(key);

    // No record or expired - allow and create new
    if (!record || now > record.resetTime) {
      this.records.set(key, {
        count: 1,
        resetTime: now + config.windowMs
      });

      return {
        allowed: true,
        remaining: config.maxRequests - 1,
        resetIn: config.windowMs
      };
    }

    // Check if limit exceeded
    if (record.count >= config.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetIn: record.resetTime - now
      };
    }

    // Increment and allow
    record.count++;
    this.records.set(key, record);

    return {
      allowed: true,
      remaining: config.maxRequests - record.count,
      resetIn: record.resetTime - now
    };
  }

  /**
   * Get current limit status
   */
  getStatus(key: string): {
    count: number;
    remaining: number;
    resetIn: number;
  } | null {
    const record = this.records.get(key);
    if (!record) return null;

    const now = Date.now();
    if (now > record.resetTime) {
      this.records.delete(key);
      return null;
    }

    return {
      count: record.count,
      remaining: DEFAULT_CONFIG.maxRequests - record.count,
      resetIn: record.resetTime - now
    };
  }

  /**
   * Reset limit for a key
   */
  reset(key: string): void {
    this.records.delete(key);
  }

  /**
   * Clean up expired records
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.records.entries()) {
      if (now > record.resetTime) {
        this.records.delete(key);
      }
    }
  }
}

// Singleton instance
const rateLimiter = new RateLimiter();

// Cleanup every 5 minutes
setInterval(() => rateLimiter.cleanup(), 5 * 60 * 1000);

export default rateLimiter;

/**
 * Input validation
 */
export function validateChatInput(input: string): {
  valid: boolean;
  error?: string;
} {
  // Check if empty
  if (!input || input.trim().length === 0) {
    return {
      valid: false,
      error: 'Mesaj boş olamaz'
    };
  }

  // Check length
  if (input.length > 500) {
    return {
      valid: false,
      error: 'Mesaj çok uzun (max 500 karakter)'
    };
  }

  // Check for spam patterns
  const spamPatterns = [
    /(.)\1{10,}/, // Repeated characters
    /^[A-Z\s!?]{50,}$/, // All caps
    /(http|https|www\.)/gi // URLs
  ];

  for (const pattern of spamPatterns) {
    if (pattern.test(input)) {
      return {
        valid: false,
        error: 'Geçersiz mesaj formatı'
      };
    }
  }

  return { valid: true };
}

