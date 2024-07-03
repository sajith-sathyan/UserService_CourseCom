export default function serverConfig(app, mongoose, config) {
  const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://sajithsathyandeveloper:Yk86JAy2gtcSbHD1@cluster0.pxpagjq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

  mongoose.connect(mongoUri);

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
