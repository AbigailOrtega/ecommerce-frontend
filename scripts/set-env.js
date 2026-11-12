const { writeFileSync } = require('fs');

const stripePublicKey = process.env['STRIPE_PUBLIC_KEY'] || '';
// error reporting from the browser; empty = off
const sentryDsn = process.env['SENTRY_DSN'] || '';

// the only domain where /plataforma (the super admin's page) exists; unset = no platform page anywhere
const platformHost = (process.env['PLATFORM_HOST'] || '').trim().toLowerCase();

const content = `export const environment = {
  production: true,
  apiUrl: '/api',
  stripePublicKey: '${stripePublicKey}',
  sentryDsn: '${sentryDsn}',
  platformHost: '${platformHost}',
};
`;

writeFileSync('./src/environments/environment.prod.ts', content);
console.log('environment.prod.ts generado con STRIPE_PUBLIC_KEY' + (sentryDsn ? ' y SENTRY_DSN' : '')
  + (platformHost ? ` y PLATFORM_HOST=${platformHost}` : ' (sin PLATFORM_HOST: no hay página de plataforma)'));
