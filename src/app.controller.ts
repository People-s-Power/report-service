import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
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

  @EventPattern('resove-camp-report')
  resolveReport(@Payload() reportId: string, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef()
    const originalMsg = ctx.getMessage()
    this.appService.resolveReport(reportId);
    channel.ack(originalMsg)
  }


  @MessagePattern({ cmd: 'camp-reports' })
   async getCampaignReport(@Payload() slug: string, @Ctx() ctx: RmqContext) {
      const channel = ctx.getChannelRef()
      const originalMsg = ctx.getMessage()
      console.log('Fire')
      channel.ack(originalMsg)
      const results = await this.appService.getReports(slug)
      return results
    }

}
