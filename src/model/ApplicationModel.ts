export interface Application {
  activityName: string;
  activityDescription?: string;
  suahours: number;
  contact: number;
  startDate: moment.Moment;
  endDate: moment.Moment;
  isOffline: boolean;
}