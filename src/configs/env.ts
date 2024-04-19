export const ENV = {
  NODE_ENV: process.env.NODE_ENV,
  DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
} as const;
