/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  DRIVE_DISK: Env.schema.enum(['local'] as const),
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  SESSION_DRIVER: Env.schema.string(),
  PGHOST: Env.schema.string({ format: 'host' }),
  PGPORT: Env.schema.number(),
  PGUSER: Env.schema.string(),
  PGPASSWORD: Env.schema.string.optional(),
  PGDATABASE: Env.schema.string(),
  IPX_ENABLED: Env.schema.boolean(),
  IPX_DOMAINS: Env.schema.string.optional(),
})
