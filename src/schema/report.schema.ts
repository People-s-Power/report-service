// import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ReportEnum } from './report.dto';

export type ReportDocument = Report & Document;


@Schema({
  timestamps: true
})
export class Report extends Document {
  @Prop({ required: true })
  campaignSlug: string;
  @Prop({ 
    required: true,
    type: String,
    enum: ReportEnum,
  })
  reportType: ReportEnum;
  @Prop({ required: true })
  reportMessage: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
