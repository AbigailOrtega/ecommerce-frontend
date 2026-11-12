import { TestBed } from '@angular/core/testing';
import { DOCUMENT, REQUEST } from '@angular/core';
import { Router, UrlTree, provideRouter } from '@angular/router';
import { environment } from '@env/environment';
import { platformHomeRedirect, platformHostGuard } from './platform-host.guard';

describe('platformHostGuard', () => {
  function onHost(url: string) {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: REQUEST, useValue: new Request(url) }],
    });
  }
  const run = (fn: typeof platformHostGuard) => TestBed.runInInjectionContext(() => fn({} as any, []));

  it("opens the platform page only on the platform's domain", () => {
    onHost(`https://${environment.platformHost}:4200/plataforma`);
    expect(run(platformHostGuard)).toBeTrue();
  });

  it("on a store's domain /plataforma does not exist", () => {
    onHost('https://mareatextiles.com/plataforma');
    expect(run(platformHostGuard)).toBeFalse();
  });

  it("the platform domain's home goes to /plataforma; a store's home stays the store", () => {
    onHost(`https://${environment.platformHost}/`);
    const tree = run(platformHomeRedirect) as UrlTree;
    expect(TestBed.inject(Router).serializeUrl(tree)).toBe('/plataforma');

    TestBed.resetTestingModule();
    onHost('https://mareatextiles.com/');
    expect(run(platformHomeRedirect)).toBeFalse();
  });

  it('without a request it reads the page address', () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const expected = TestBed.inject(DOCUMENT).location.hostname === environment.platformHost;
    expect(run(platformHostGuard)).toBe(expected);
  });
});
