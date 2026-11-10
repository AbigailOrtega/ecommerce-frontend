import { NavigationError } from '@angular/router';

/**
 * After a deploy, a page opened on the previous version still asks for that version's lazy
 * chunks, which no longer exist (404): "Failed to fetch dynamically imported module". The link
 * then does nothing. Loading the target URL in full fetches the new version instead.
 */
export function isStaleChunkError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error ?? '');
  return /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|ChunkLoadError|Loading chunk [\w-]+ failed/i
    .test(message);
}

const RELOADED_AT = 'stale-chunk-reload-at';

/**
 * Router navigation error handler: on a stale chunk, a full load of the URL being navigated to.
 * At most once a minute, so a chunk that is really missing cannot cause a reload loop.
 */
export function reloadOnStaleChunk(
  event: NavigationError,
  win: Pick<Window, 'location' | 'sessionStorage'> | undefined = typeof window === 'undefined' ? undefined : window,
  now = Date.now(),
): void {
  if (!win || !isStaleChunkError(event.error)) return;
  try {
    const last = Number(win.sessionStorage.getItem(RELOADED_AT) ?? 0);
    if (now - last < 60_000) return;
    win.sessionStorage.setItem(RELOADED_AT, String(now));
  } catch {
    // storage unavailable (private mode…): reload anyway; a loop would need it to fail every time
  }
  win.location.assign(event.url);
}
