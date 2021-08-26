import { Button, ButtonGroup } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Activity, parseToActivity } from "../model/ActivityModel";
import { User, UserPower } from "../model/UserModel";
import { AxiosResponse } from "axios";
import fetch from "../utils/fetch";
import { isResponseOk, useLoadGuard } from "../utils/InternetUtils";
const ActivityList: React.FC = () => {
  let user = User.useContainer();
  const [activityList, setActivityList] = useState<Activity[]>([]);

  const fetchActivityList = async () => {
    // 从数据库读取活动列表数据
    const res: AxiosResponse<any> = await fetch.get("activity/admin/");
    if (isResponseOk(res)) {
      setActivityList(res.data.data.map(parseToActivity));
    } else {
      throw Error();
    }
  };

  const activityToData = (activity: Activity) => {
    return [
      activity.name,
      activity.status,
      activity.startDate,
      "0",
      activity.activityUrl,
    ];
  };
  const columns = [
    {
      name: "活动",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "状态",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "起始时间",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "分数",
      options: {
        filter: true,
        sort: true,
      },
    },
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
              {}
              <Button component={Link} to={"/activity" + value}>
                详情
              </Button>
              <Button
                // onClick={checkActivity(activity)}
                disabled={user.power === UserPower.admin}
              >
                通过
              </Button>
              <Button
                // onClick= {deleteActivity}
                disabled={user.power === UserPower.admin}
              >
                删除
              </Button>
            </ButtonGroup>
          );
        },
      },
    },
  ];
  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "scroll",
  };
  const itemsGuard = useLoadGuard();
  itemsGuard.guard(fetchActivityList);
  return (
    <>
      {itemsGuard.is.loading() && <>loading... </>}
      {itemsGuard.is.error() && console.log("error")}
      {itemsGuard.is.loaded() && (
        <MUIDataTable
          title={"活动列表"}
          data={activityList.map(activityToData)}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default ActivityList;
