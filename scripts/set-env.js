const { writeFileSync } = require('fs');

const stripePublicKey = process.env['STRIPE_PUBLIC_KEY'] || '';

const content = `export const environment = {
  production: true,
  apiUrl: '/api',
  stripePublicKey: '${stripePublicKey}',
};
`;

writeFileSync('./src/environments/environment.prod.ts', content);
console.log('environment.prod.ts generado con STRIPE_PUBLIC_KEY');
