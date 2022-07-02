import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
    ) {}

  @EventPattern('report-camp')
  getHello(@Payload() data, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef()
    const originalMsg = ctx.getMessage()
    this.appService.getHello(data);
    channel.ack(originalMsg)
  }
}
