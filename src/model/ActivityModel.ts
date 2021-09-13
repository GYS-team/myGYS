import moment from "moment";
import { Student } from "./StudentModel";

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
  inititor?: string;
  inititor_phone?: string;
  participant?: Student[] | null;
}

export const parseToActivity = (data: any): Activity => {
  return {
    id: data.id,
    name: data.title,
    description: data.detail,
    activityUrl:"",
    status: data.is_valid ? 1 : 0,
    startDate: moment(),
    endDate: moment(),
    inititor: "",
    participant:
      // data.sua.student == null ? null : data.sua.student.map(parseToStudent),
      [],
  };
};

const testActivity: Activity = {
  name: "数学节adsfadsfasdfasddfasdfasdfasdf",
  id: 1,
  description: "null",
  status: 1,
  activityUrl: "/shuxuejie",
  startDate: moment(),
  endDate: moment(),
  inititor: "无",
  inititor_phone: "12345678901",
};
