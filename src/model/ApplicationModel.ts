import moment from "moment";

export interface Application {
  activityName: string;
  activityDescription?: string;
  suahours: number;
  contact: number;
  startDate: moment.Moment;
  endDate: moment.Moment;
  isOffline: boolean;
  is_checked: boolean;
  feedback: string;
}

export const testApplication: Application = {
  activityName: "activityName",
  activityDescription: "activityDescription",
  suahours: 30,
  contact: 13415476688,
  startDate: moment(),
  endDate: moment(),
  isOffline: true,
  is_checked: true,
  feedback: "符合",
};
