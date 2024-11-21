import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './guards/auth.guard';
import { Logger } from '@nestjs/common';
import { AppClusterService } from './services/app-cluster.service';

const logger = new Logger('Cluster');
const PORT = process.env.PORT || 3000;
const run = async () => {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new AuthGuard());
  await app.listen(PORT, () =>
    console.log(`Server is running http://localhost:${PORT}`),
  );
};

AppClusterService.clusterize(run);
