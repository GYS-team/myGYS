import React from "react";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import User, { UserPower } from "../model/user";
import Typography from "@material-ui/core/Typography";
import MUIDataTable from "mui-datatables";
import { Box, Button, ButtonGroup, Grid } from "@material-ui/core";
import { Link, RouteComponentProps } from "react-router-dom";
import {
  ActivityStatus,
  Activity,
  activityStatusMsg,
  parseToActivity,
} from "../model/activity";
import moment from "moment";
import { Student } from "../model/student";
import fetch from "../utils/fetch";
import { AxiosResponse } from "axios";
import { isResponseOk } from "../utils/utils";
import { ConsoleWriter } from "istanbul-lib-report";

const useStyles2 = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 500,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const testActivity2: Activity = parseToActivity({
  name: "数学节adsfadsfasdfasddfasdfasdfasdf",
  id: 1,
  description: "null",
  status: 1,
  activityUrl: "/shuxuejie",
  startDate: moment(),
  endDate: moment(),
  inititor: "无",
  inititor_phone: "12345678901",
});

const showActivityPage: React.FC<any> = (
  activity: Activity = testActivity2
) => {
  const columns = [
    "姓名",
    "学号",
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
              <Button
                component={Link}
                to={"/activity" + activity.activityUrl + "/change"}
              >
                编辑
              </Button>
              <Button>删除</Button>
            </ButtonGroup>
          );
        },
      },
    },
  ];
  const checkActivity = async () => {
    const res: AxiosResponse<any> = await fetch.put("activity/admin/", {
      id: activity.id,
      is_valid: "true",
    });
    if (isResponseOk(res)) {
      console.log(res.data.data);
    }
  };
  const delActivity = async () => {
    const res: AxiosResponse<any> = await fetch.delete(
      "activity/admin/?id=" + activity.id.toString()
    );
    if (isResponseOk(res)) {
      console.log(res.data.data);
    }
  };
  const data2 =
    activity.participant == null
      ? Array()
      : activity.participant.map(
          (stu: Student): string[] =>
            new Array(stu.name, stu.id.toString(), "0", "0")
        );
  let user = User.useContainer();
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item sm={3} xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="body2" component="p">
                {activity.name}; <br />
                {activity.description != null
                  ? activity.description
                  : "暂无描述"}
                ; <br />
                起始日期：{activity.startDate}; <br />
                结束日期：{activity.endDate};<br />
                发起人/发起单位：{activity.inititor};<br />
                联系方式：{activity.inititor_phone};<br />
                是否通过：
                {activity.status == ActivityStatus.Activated
                  ? "已通过"
                  : "未通过"}
                <br />
              </Typography>
              <Button
                variant="contained"
                disabled={
                  user.power == UserPower.admin &&
                  activity.status == ActivityStatus.NotActivated
                    ? false
                    : true
                }
                onClick={checkActivity}
              >
                通过
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={delActivity}
              >
                删除
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={8} xs={12}>
          {" "}
          <MUIDataTable
            title={activity.name}
            data={data2}
            columns={columns}
            options={{
              filter: true,
              filterType: "dropdown",
              responsive: "scroll",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default showActivityPage;
