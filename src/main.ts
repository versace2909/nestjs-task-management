import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AnotherInterceptor } from './auth/interceptors/another.interceptor';
import { LoggingInterceptor } from './auth/interceptors/logging.interceptor';
import { TransformInterceptor } from './auth/interceptors/transform-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(
  //   new LoggingInterceptor(),
  //   new TransformInterceptor(),
  //   new AnotherInterceptor(),
  // );

  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('Task Management API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
