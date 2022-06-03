import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //Retira do objeto da requisição os atributos que não constam no DTO
    forbidNonWhitelisted: true, //Não permite que sejam enviadas informações não listadas no DTO
    transform: true, //Define que o objeto enviando nas requests seja do tipo do DTO
  })),
  await app.listen(3000);
}
bootstrap();
