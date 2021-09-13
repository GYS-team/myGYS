export interface Application {
  id: number;
  activityName: string;
  activityDescription?: string;
  suahours: number;
  contact: number;
  isOffline: boolean;
  isChecked: boolean;
  feedback: string;
}

export const parseToApplication = (data: any): Application => {
  return {
    id: data.id,
    activityName: data.sua.activity.title,
    activityDescription: data.sua.activity.detail,
    contact: data.contact,
    suahours: data.sua.suahours,
    isOffline: data.isOffline,
    isChecked: data.isChecked,
    feedback: data.feedback,
  };
};

export const testApplication: Application = {
  id: 12,
  activityName: "activityName",
  activityDescription: "activityDescription",
  suahours: 30,
  contact: 13415476688,
  isOffline: true,
  isChecked: true,
  feedback: "符合",
};
