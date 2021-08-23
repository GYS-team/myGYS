import {
  Box,
  Button,
  ButtonGroup,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import moment from "moment";
import { ActivityStatus, Activity, activityStatusMsg } from "../model/activity";
import User, { UserPower } from "../model/user";
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
const ActivityListPage: React.FC<any> = (activityList: Activity[]) => {
  let user = User.useContainer();
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
  let activity = activityList;
  //TODO： 报错 问题不得而知 testActivity成立，但是activityList不成立， 类型相同
  const data2 = testActivity.map(
    (act: Activity): string[] =>
      new Array(
        act.name,
        activityStatusMsg(act.status),
        act.startDate.format("YYYY-MM-DD"),
        "30",
        act.activityUrl
      )
  );
  return (
    <MUIDataTable
      title={"活动列表"}
      data={data2}
      columns={columns}
      options={{
        filter: true,
        filterType: "dropdown",
        responsive: "scroll",
      }}
    />
  );
};

export default ActivityListPage;
