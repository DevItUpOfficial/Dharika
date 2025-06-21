// Dharika Backend - Test Server
console.log('🚀 Dharika Backend API Server initialized!');

// Simple Express-like server structure for testing
const server = {
  name: 'Dharika API',
  version: '1.0.0',
  port: process.env.PORT || 5000,
  
  routes: {
    '/api/health': 'Health check endpoint',
    '/api/products': 'Products management',
    '/api/auth': 'Authentication endpoints',
    '/api/cart': 'Shopping cart management',
    '/api/payments': 'Razorpay payment integration',
    '/api/game': 'Runner game APIs'
  },
  
  start: function() {
    console.log(`🌟 ${this.name} v${this.version}`);
    console.log(`📡 Server ready on port ${this.port}`);
    console.log('📋 Available routes:');
    Object.entries(this.routes).forEach(([route, desc]) => {
      console.log(`   ${route} - ${desc}`);
    });
  }
};

// Start the server
server.start();

module.exports = server; 