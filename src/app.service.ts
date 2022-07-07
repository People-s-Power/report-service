import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report, ReportDocument } from './schema/report.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Report.name) private readonly reportModel: Model<ReportDocument>
  ) {}

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
