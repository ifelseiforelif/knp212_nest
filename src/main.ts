import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const run = async () => {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () =>
    console.log(`Server is running http://localhost:${PORT}`),
  );
};
run();
