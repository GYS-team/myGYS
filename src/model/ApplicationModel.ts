export interface Application {
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
    activityName: data.activity.title,
    activityDescription: data.activity.detail,
    contact: data.activity.contact,
    suahours: data.suahours,
    isOffline: data.isOffline,
    isChecked: data.isChecked,
    feedback: data.feedback,
  };
};

export const testApplication: Application = {
  activityName: "activityName",
  activityDescription: "activityDescription",
  suahours: 30,
  contact: 13415476688,
  isOffline: true,
  isChecked: true,
  feedback: "符合",
};
