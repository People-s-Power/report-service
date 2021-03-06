import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv'
import { Report, ReportSchema } from './schema/report.schema';
dotenv.config()

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.mongoDB_URI),
    MongooseModule.forFeature([
      { name:Report.name, schema: ReportSchema }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}