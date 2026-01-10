import { useEffect } from 'react';

/**
 * SPA note: Search crawlers may not always respect runtime meta changes.
 * We still set these for best-effort compliance and “noarchive/noimageindex” signals.
 */
export function useRobotsMeta(content: string) {
  useEffect(() => {
    const head = document.head;
    if (!head) return;

    const existing = head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const prev = existing?.getAttribute('content');

    const meta = existing ?? document.createElement('meta');
    meta.setAttribute('name', 'robots');
    meta.setAttribute('content', content);
    if (!existing) head.appendChild(meta);

    return () => {
      // Restore previous content if we overwrote it
      if (prev !== null && prev !== undefined) meta.setAttribute('content', prev);
    };
  }, [content]);
}

