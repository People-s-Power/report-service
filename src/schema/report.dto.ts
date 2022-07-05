export enum ReportEnum {
  Deceptive = 'Deceptive and fraudulent',
  Breaches = 'Breaches human rights',
  Guilty = 'Guilty of hate speech',
  Obscene = 'Obscene image',
  Harmful = 'Harmful to children',
  Incites = 'Incites violence, sucide or harm',
  Encourages = 'Encourages racism',
  Impersonation = 'Impersonation'
}

export class reportDTO {
  campaignSlug: string;
  reportType: ReportEnum;
  reportMessage: string;
}

export interface IreportDTO {
  campaignSlug: string;
  reportType: ReportEnum;
  reportMessage: string;
}