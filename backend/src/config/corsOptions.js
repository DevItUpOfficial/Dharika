const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5500", "http://localhost:3000"], // Allow multiple origins
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

module.exports = corsOptions;
