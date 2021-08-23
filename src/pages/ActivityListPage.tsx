import { Button, ButtonGroup } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import moment from "moment";
import {
  ActivityStatus,
  Activity,
  activityStatusMsg,
  parseToActivity,
} from "../model/ActivityModel";
import User, { UserPower } from "../model/UserModel";
import { AxiosResponse } from "axios";
import fetch from "../utils/fetch";
import { isResponseOk, useLoadGuard } from "../utils/InternetUtils";
const testActivity: Activity[] = [
  {
    name: "数学节",
    id: 1,
    description: "null",
    status: 1,
    activityUrl: "/shuxuejie",
    startDate: moment(),
    endDate: moment(),
    inititor: "无",
    inititor_phone: "12345678901",
  },
];
const ActivityListPage: React.FC<any> = () => {
  let user = User.useContainer();
  const [activityList, setActivityList] = useState<Activity[]>([]);
  const itemsGuard = useLoadGuard();

  const fetchActivityList = async () => {
    // 从数据库读取活动列表数据
    const res: AxiosResponse<any> = await fetch.get("application/admin/");
    if (isResponseOk(res)) {
      setActivityList(res.data.data.map(parseToActivity));
    } else {
      throw Error();
    }
  };

  const columns = [
    {
      name: "活动",
      options: {
        filter: false,
        sort: false,
      },
    },
    "状态",
    {
      name: "起始时间",
      options: {
        filter: false,
        sort: true,
      },
    },
    "分数",
    {
      name: "操作",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string, tableMeta: any, updateValue: any) => {
          return (
            <ButtonGroup
              color="primary"
              aria-label="outlined secondary button group"
            >
              <Button component={Link} to={"/activity" + value}>
                详情
              </Button>
              <Button
                // onClick={setActivity}
                disabled={user.power == UserPower.admin}
              >
                通过
              </Button>
              <Button
                // onClick= {deleteActivity}
                disabled={user.power == UserPower.admin}
              >
                删除
              </Button>
            </ButtonGroup>
          );
        },
      },
    },
  ];
  // let activity = activityList;
  // //TODO： 报错 问题不得而知 testActivity成立，但是activityList不成立， 类型相同
  // const data2 = testActivity.map(
  //   (act: Activity): string[] =>
  //     new Array(
  //       act.name,
  //       activityStatusMsg(act.status),
  //       act.startDate.format("YYYY-MM-DD"),
  //       "30",
  //       act.activityUrl
  //     )
  // );
  itemsGuard.guard(fetchActivityList);
  return (
    <>
      {itemsGuard.is.loading() && <>loading... </>}
      {itemsGuard.is.error() && itemsGuard.error.toString()}
      {itemsGuard.is.loaded() && (
        <MUIDataTable
          title={"活动列表"}
          data={activityList}
          columns={columns}
          options={{
            filter: true,
            filterType: "dropdown",
            responsive: "scroll",
          }}
        />
      )}
    </>
  );
};

export default ActivityListPage;
