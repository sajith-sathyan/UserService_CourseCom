export default function serverConfig(app, mongoose, config) {
  const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://sajith:oFIh5e5rezmAuppY@cluster0.kkkbpdh.mongodb.net/myDatabase?retryWrites=true&w=majority&tls=true';

  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsCAFile: '/path/to/ca.pem', // Path to CA certificate if needed
    tlsAllowInvalidCertificates: false, // Adjust based on your security needs
    serverSelectionTimeoutMS: 5000
  });

  const db = mongoose.connection;

  db.on('connected', () => {
    console.log('Connected to MongoDB');
  });

  db.on('error', (err) => {
    console.error(`MongoDB connection error: ${err.message}`);
  });

  db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
  });

  process.on('SIGINT', () => {
    db.close(() => {
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });
  });

  function startServer() {
    app.listen(config.port, () => {
      console.log(`UserAuth Server Start At port ${config.port}`);
    });
  }

  return {
    startServer
  };
}
