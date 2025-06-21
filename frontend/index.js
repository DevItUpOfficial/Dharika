// Dharika Frontend - Test File
console.log('🚀 Dharika Frontend initialized!');

// Simple React-like component structure for testing
const App = {
  name: 'Dharika E-commerce',
  version: '1.0.0',
  description: 'Modern e-commerce platform with gamification',
  
  init: function() {
    console.log(`Welcome to ${this.name} v${this.version}`);
    console.log(this.description);
  }
};

// Initialize the app
App.init();

module.exports = App; 