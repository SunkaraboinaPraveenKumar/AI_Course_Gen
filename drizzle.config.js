/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./configs/schema.jsx",
  dialect: 'postgresql',
  dbCredentials: {
    // Use a server-side variable instead of NEXT_PUBLIC_
    url: process.env.DB_CONNECTION_STRING, 
  },
};
