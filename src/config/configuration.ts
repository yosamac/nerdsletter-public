export default () => ({
  api: {
    host: process.env.API_HOST || '0.0.0.0',
    port: parseInt(process.env.API_PORT, 10) || 3000,
    context: process.env.ENDPOINT_ROUTE 
  },
  logger: {
    level: process.env.LOG_LEVEL || process.env.LOGGING_LEVEL || 'INFO'
  },
  mesh: {
    subscription: {
      host: process.env.SUBSCRIPTION_MESH_HOST || '0.0.0.0',
      port: parseInt(process.env.SUBSCRIPTION_MESH_PORT, 10) || 4001
    },
  }
});