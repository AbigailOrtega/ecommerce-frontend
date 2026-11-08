const { rmSync } = require('fs');

// The SSR function carries its own copy of index.csr.html (server/assets-chunks). The one in browser/
// is only harmful: Vercel serves static files before rewrites and treats it as the directory index,
// so "/" got the client-only shell from the CDN instead of the server-rendered home page.
rmSync('./dist/ecommerce-frontend/browser/index.csr.html', { force: true });
console.log('post-build: removed browser/index.csr.html (served by the SSR function instead)');
