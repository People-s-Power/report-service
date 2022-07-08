import { Body, Controller, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
    ) {}

    @Get()
    sendHello() {
      return this.appService.sendHello()
    }

  @EventPattern('report-camp')
  createReport(@Payload() data, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef()
    const originalMsg = ctx.getMessage()
    this.appService.createReport(data);
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

    @Get('report/:slug')
    async getCampReports(@Param() param) {
      const { slug } = param
      const results = await this.appService.getReports(slug)
      return results
    }

    @Get('report')
    getAllReports() {
      return this.appService.getAllReports()
    }

    @Post('report')
    createReportPost(@Body() data) {
      return this.appService.createReport(data);
    }

    @Put('report/:reportId')
    resolveReportPut(@Param() param) {
      const { reportId } = param
      return this.appService.resolveReport(reportId);
    }

}
