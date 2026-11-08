import { Pipe, PipeTransform } from '@angular/core';

const UPLOAD_SEGMENT = '/image/upload/';

/**
 * Asks Cloudinary for a copy sized for where the image is shown, in the best format the browser
 * supports (AVIF/WebP) at automatic quality. Other URLs (placeholders, local previews) pass through.
 *
 *   <img [src]="product.imageUrl | cloudinary: 600">
 */
@Pipe({ name: 'cloudinary' })
export class CloudinaryPipe implements PipeTransform {
  transform(url: string | null | undefined, width?: number): string {
    if (!url) return '';
    if (!url.startsWith('https://res.cloudinary.com/') || !url.includes(UPLOAD_SEGMENT)) return url;
    const [before, after] = url.split(UPLOAD_SEGMENT, 2);
    // c_limit never upscales: a 400px original stays 400px
    const transform = ['f_auto', 'q_auto', ...(width ? [`w_${Math.round(width)}`, 'c_limit'] : [])].join(',');
    return `${before}${UPLOAD_SEGMENT}${transform}/${after}`;
  }
}
