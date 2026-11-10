import { NavigationError } from '@angular/router';
import { isStaleChunkError, reloadOnStaleChunk } from './stale-chunks';

describe('stale chunks after a deploy', () => {
  const staleError = new TypeError('Failed to fetch dynamically imported module: https://www.mareatextiles.com/chunk-LP7LCQM7.js');

  function fakeWindow() {
    const store = new Map<string, string>();
    return {
      location: jasmine.createSpyObj<Location>('Location', ['assign']),
      sessionStorage: {
        getItem: (k: string) => store.get(k) ?? null,
        setItem: (k: string, v: string) => { store.set(k, v); },
      } as unknown as Storage,
    };
  }

  it('recognizes the browsers\' messages for a missing lazy chunk', () => {
    expect(isStaleChunkError(staleError)).toBeTrue();
    expect(isStaleChunkError(new TypeError('Importing a module script failed.'))).toBeTrue();   // Safari
    expect(isStaleChunkError(new TypeError('error loading dynamically imported module'))).toBeTrue();   // Firefox
    expect(isStaleChunkError(new Error('Http failure response for /api/products: 500'))).toBeFalse();
  });

  it('loads the target URL in full, fetching the new version', () => {
    const win = fakeWindow();
    reloadOnStaleChunk(new NavigationError(1, '/admin/store-info', staleError), win, 1_000_000);
    expect(win.location.assign).toHaveBeenCalledWith('/admin/store-info');
  });

  it('does not reload twice within a minute (no loop if a chunk is really missing)', () => {
    const win = fakeWindow();
    reloadOnStaleChunk(new NavigationError(1, '/a', staleError), win, 1_000_000);
    reloadOnStaleChunk(new NavigationError(2, '/b', staleError), win, 1_030_000);
    reloadOnStaleChunk(new NavigationError(3, '/c', staleError), win, 1_070_000);
    expect(win.location.assign.calls.allArgs()).toEqual([['/a'], ['/c']]);
  });

  it('leaves other navigation errors alone', () => {
    const win = fakeWindow();
    reloadOnStaleChunk(new NavigationError(1, '/x', new Error('guard failed')), win, 1_000_000);
    expect(win.location.assign).not.toHaveBeenCalled();
  });
});
