import moment from "moment";
import { parseToStudent, Student } from "./student";

export enum ActivityStatus {
  NotActivated = 0,
  Activated = 1,
}
export const activityStatusMsg = (status: ActivityStatus): string => {
  const StatusList = {
    0: "未激活",
    1: "激活",
  };
  return StatusList[status] || "未知状态";
};

export interface Activity {
  name: string;
  id: number;
  activityUrl: string;
  description?: string;
  status: ActivityStatus;
  startDate: moment.Moment;
  endDate: moment.Moment;
  inititor: string;
  inititor_phone: string;
  participant?: Student[] | null;
}

export const parseToActivity = (data: any): Activity => ({
  id: data.id,
  name: data.name,
  description: data.description,
  activityUrl: data.activityUrl,
  status: data.status,
  startDate: moment(data.startDate),
  endDate: moment(data.endDate),
  inititor: data.inititor,
  inititor_phone: data.inititor_phone,
  participant:
    data.participant == null ? null : data.participant.map(parseToStudent),
});
