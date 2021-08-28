export interface SingleRoute {
  url: string;
  name: string;
}

export type RouteName =
  | "mainPage"
  | "studentList"
  | "activityList"
  | "applicationList"
  | "activitySubmit"
  | "applicationSubmit";

export type RouteConfig = Record<RouteName, SingleRoute>;

export const routes: RouteConfig = {
  mainPage: {
    url: "/admin/mainPage",
    name: "学生主页",
  },
  studentList: {
    url: "/admin/studentList",
    name: "学生列表",
  },
  activityList: {
    url: "/admin/activityList",
    name: "活动列表",
  },
  applicationList: {
    url: "/admin/applicationList",
    name: "公益时申请列表",
  },
  activitySubmit: {
    url: "/admin/activitySubmit",
    name: "活动申请",
  },
  applicationSubmit: {
    url: "/admin/applicationSubmit",
    name: "公益时申请",
  },
};

export default routes;
