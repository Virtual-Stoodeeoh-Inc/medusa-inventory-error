import { loadEnv, defineConfig } from "@medusajs/framework/utils";

loadEnv(process.env.NODE_ENV || "development", process.cwd());

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    redisPrefix: "MEDUSA",
    redisOptions: {
      tls: process.env.REDIS_URL?.startsWith("rediss") ? {
        rejectUnauthorized: false,
        checkServerIdentity: (/*host, cert*/) => {
          // skip certificate hostname validation
          return undefined;
        },
      }: undefined,
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
    },
    databaseDriverOptions: {
      connection: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    },
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  admin: {
    path: `/dashboard`,
  },
});
