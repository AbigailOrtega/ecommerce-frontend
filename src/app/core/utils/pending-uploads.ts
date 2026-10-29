/**
 * Images uploaded from an admin form that are not saved yet. The upload happens as soon as a
 * file is picked, so an image removed or abandoned before saving would stay in Cloudinary
 * forever; these are handed to `discard` instead. The backend keeps any image still in use.
 */
export class PendingUploads {
  private readonly urls = new Set<string>();

  constructor(private readonly discard: (url: string) => void) {}

  add(url: string): void {
    this.urls.add(url);
  }

  /** The image left the form: discard it if it was never saved. */
  removed(url: string | null | undefined): void {
    if (url && this.urls.delete(url)) this.discard(url);
  }

  /** The form was saved with `savedUrls`; uploads that did not make it are discarded. */
  committed(savedUrls: (string | null | undefined)[]): void {
    const saved = new Set(savedUrls);
    this.urls.forEach(url => { if (!saved.has(url)) this.discard(url); });
    this.urls.clear();
  }

  /** The form was cancelled or closed. */
  discardAll(): void {
    this.committed([]);
  }
}
