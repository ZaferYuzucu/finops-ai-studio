/**
 * Runtime File Store - In-Memory CSV Content Storage
 * 
 * Purpose: Store CSV file contents in memory during the session
 * Why: localStorage has size limits and is unreliable for large files
 * 
 * CRITICAL: Data is lost on page refresh (by design)
 * Users must re-upload files after refresh
 */

class RuntimeFileStore {
  private store: Map<string, string>;

  constructor() {
    this.store = new Map();
  }

  /**
   * Store CSV content for a dataset
   */
  set(datasetId: string, content: string): void {
    if (!datasetId || !content) {
      console.error('[RuntimeFileStore] Invalid parameters:', { datasetId, contentLength: content?.length });
      return;
    }

    if (content.length < 10) {
      console.warn('[RuntimeFileStore] Content too short:', datasetId, content.length);
    }

    this.store.set(datasetId, content);
    console.log('[RuntimeFileStore] Stored:', datasetId, `${(content.length / 1024).toFixed(2)} KB`);
  }

  /**
   * Retrieve CSV content for a dataset
   */
  get(datasetId: string): string | null {
    const content = this.store.get(datasetId);
    
    if (!content) {
      console.error('[RuntimeFileStore] Content not found:', datasetId);
      console.error('[RuntimeFileStore] Available datasets:', Array.from(this.store.keys()));
      return null;
    }

    console.log('[RuntimeFileStore] Retrieved:', datasetId, `${(content.length / 1024).toFixed(2)} KB`);
    return content;
  }

  /**
   * Check if dataset exists in store
   */
  has(datasetId: string): boolean {
    return this.store.has(datasetId);
  }

  /**
   * Remove dataset from store
   */
  delete(datasetId: string): boolean {
    const deleted = this.store.delete(datasetId);
    if (deleted) {
      console.log('[RuntimeFileStore] Deleted:', datasetId);
    }
    return deleted;
  }

  /**
   * Clear all stored content
   */
  clear(): void {
    const count = this.store.size;
    this.store.clear();
    console.log('[RuntimeFileStore] Cleared all data:', count, 'datasets');
  }

  /**
   * Get all dataset IDs
   */
  getAllKeys(): string[] {
    return Array.from(this.store.keys());
  }

  /**
   * Get store size info
   */
  getStats(): { count: number; totalSizeKB: number } {
    let totalSize = 0;
    this.store.forEach(content => {
      totalSize += content.length;
    });

    return {
      count: this.store.size,
      totalSizeKB: totalSize / 1024
    };
  }
}

// Singleton instance
export const runtimeFileStore = new RuntimeFileStore();

// For debugging
if (typeof window !== 'undefined') {
  (window as any).__runtimeFileStore = runtimeFileStore;
}
