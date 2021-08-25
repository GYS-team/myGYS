import moment from "moment";
import { parseToStudent, Student } from "./StudentModel";

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
  inititor_phone?: string;
  participant?: Student[] | null;
}

export const parseToActivity = (data: any): Activity => {
  return {
    id: data.id,
    name: data.sua.student.name,
    description: data.description,
    activityUrl: data.activityUrl,
    status: data.is_checked ? 1 : 0,
    startDate: moment(data.created),
    endDate: moment(data.deleted_at),
    inititor: data.sua.name,
    inititor_phone: data.sua.userphone,
    participant:
      // data.sua.student == null ? null : data.sua.student.map(parseToStudent),
      []
  };
};
