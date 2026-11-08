import { CloudinaryPipe } from './cloudinary.pipe';

describe('CloudinaryPipe', () => {
  const pipe = new CloudinaryPipe();
  const url = 'https://res.cloudinary.com/demo/image/upload/v1712345/store/products/cojin.jpg';

  it('adds automatic format and quality, and a width limit when given', () => {
    expect(pipe.transform(url, 600))
      .toBe('https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_600,c_limit/v1712345/store/products/cojin.jpg');
  });

  it('adds only format and quality without a width', () => {
    expect(pipe.transform(url)).toBe('https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1712345/store/products/cojin.jpg');
  });

  it('leaves other URLs untouched', () => {
    expect(pipe.transform('https://placehold.co/300x200')).toBe('https://placehold.co/300x200');
    expect(pipe.transform('data:image/png;base64,AAAA')).toBe('data:image/png;base64,AAAA');
  });

  it('returns an empty string for a missing URL', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined, 300)).toBe('');
  });
});
