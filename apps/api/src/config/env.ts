const required = (key: string): string => {
  const value = process.env[key]
  if (!value) throw new Error(`missing env ${key}`)
  return value
}

// El hash argon2 contiene "$", que el parser de .env expandiría. Se guarda en base64.
const fromBase64 = (key: string): string => {
  const value = process.env[key]
  return value ? Buffer.from(value, 'base64').toString('utf8') : ''
}

export const env = {
  PORT: Number(process.env.PORT ?? 3102),
  ADMIN_TOKEN: process.env.ADMIN_TOKEN ?? '',
  ADMIN_USERNAME: process.env.ADMIN_USERNAME ?? 'admin',
  SESSION_SECRET: process.env.SESSION_SECRET ?? '',
  ADMIN_PASSWORD_HASH: fromBase64('ADMIN_PASSWORD_HASH_B64'),
  DATABASE_URL: required('DATABASE_URL'),
  SITE_URL: process.env.SITE_URL ?? 'https://terapiadelcaos.paulollanos.dev',
  S3: {
    bucket: required('S3_BUCKET'),
    region: process.env.S3_REGION ?? 'us-east-1',
    endpoint: required('S3_ENDPOINT'),
    endpointInternal: process.env.S3_ENDPOINT_INTERNAL ?? required('S3_ENDPOINT'),
    accessKeyId: required('S3_ACCESS_KEY_ID'),
    secretAccessKey: required('S3_SECRET_ACCESS_KEY'),
  },
} as const
