import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices'
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const rmqUrl = process.env.RMQ_URL
  const logger = new Logger('MAIN');

  // const app = await NestFactory.createMicroservice(AppModule, {
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: rmqUrl,
  //     queue: 'report_queue',
  //     noAck: false,
  //     queueOptions: {
  //       durable: false
  //     }
  //   } 
  // });


  const devOrigins = [
    'http://localhost',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'localho.st:3000',
  ];

  const PORT = process.env.PORT || 5000

  const app = await NestFactory.create(AppModule)
  app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: rmqUrl,
        queue: 'report_queue',
        noAck: false,
        queueOptions: {
          durable: false
        }
      }
    })

    const origin = devOrigins

  app.enableCors(
    {
      origin,
  
      credentials: true,
    }
  );
    // await app.startAllMicroservices()
  
  logger.log('microservices is listening')
  await app.listen(PORT, () => {
    Logger.log(`server started on port ${PORT}`);
  });;
}
bootstrap();
