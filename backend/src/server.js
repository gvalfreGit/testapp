import { app } from './app.js';
import { env } from './config/env.js';
import { connectDatabase } from './config/database.js';

async function bootstrap() {
  try {
    await connectDatabase(env.mongodbUri);
    app.listen(env.port, () => {
      console.log(`API rodando em http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('Falha ao iniciar API:', error.message);
    process.exit(1);
  }
}

bootstrap();
