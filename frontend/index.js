// Dharika Frontend - Test File
console.log('🚀 Dharika Frontend initialized!');

// Simple React-like component structure for testing
const App = {
  name: 'Dharika E-commerce',
  version: '1.0.1',
  description: 'Modern e-commerce platform with gamification',
  
  init: function() {
    console.log(`Welcome to ${this.name} v${this.version}`);
    console.log(this.description);
    console.log('🧪 CI/CD Pipeline Testing in progress...');
  }
};

// Initialize the app
App.init();

module.exports = App; 