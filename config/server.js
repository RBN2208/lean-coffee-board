module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),

  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'f89f02d96534fc35acf91214b34ae234'),
    },
  },
})
