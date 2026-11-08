const { writeFileSync } = require('fs');

const stripePublicKey = process.env['STRIPE_PUBLIC_KEY'] || '';
// error reporting from the browser; empty = off
const sentryDsn = process.env['SENTRY_DSN'] || '';

const content = `export const environment = {
  production: true,
  apiUrl: '/api',
  stripePublicKey: '${stripePublicKey}',
  sentryDsn: '${sentryDsn}',
};
`;

writeFileSync('./src/environments/environment.prod.ts', content);
console.log('environment.prod.ts generado con STRIPE_PUBLIC_KEY' + (sentryDsn ? ' y SENTRY_DSN' : ''));
