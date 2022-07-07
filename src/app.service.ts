import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report, ReportDocument } from './schema/report.schema';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Report.name) private readonly reportModel: Model<ReportDocument>
  ) {}

  sendHello() {
    const port = this.configService.get('PORT')
    return `Welcome ${port}`
  }

  async getAllReports() {
    const reports = await this.reportModel.find()

    return reports
  }

  async getHello(data) {
    const report = await this.reportModel.create(data)
    // console.log(report);
  }

  async resolveReport(reportId: String) {
    const report = await this.reportModel.deleteOne({ _id: reportId })
    // return report
  }

  async getReports(slug: string) {
    const campReports = await this.reportModel.find({ campaignSlug: slug })
    return campReports
  }

}
