export interface SingleRoute {
  url: string;
  name: string;
}

export type RouteName =
  | "studentList"
  | "activityList"
  | "representList"
  | "deleteList"
  | "deleteRecord";

export type RouteConfig = Record<RouteName, SingleRoute>;

export const routes: RouteConfig = {
  studentList: {
    url: "/admin/studentList",
    name: "学生列表",
  },
  activityList: {
    url: "/admin/activityList",
    name: "活动列表",
  },
  representList: {
    url: "/admin/representList",
    name: "申述列表",
  },
  deleteList: {
    url: "/admin/deleteList",
    name: "删除列表",
  },
  deleteRecord: {
    url: "/admin/deleteRecord",
    name: "删除记录",
  },
};

export default routes;
