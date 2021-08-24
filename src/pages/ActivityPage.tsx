import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import User, { UserPower } from "../model/UserModel";
import Typography from "@material-ui/core/Typography";
import MUIDataTable from "mui-datatables";
import { Box, Button, ButtonGroup, Grid } from "@material-ui/core";
import { Link, RouteComponentProps } from "react-router-dom";
import {
  ActivityStatus,
  Activity,
  parseToActivity,
} from "../model/ActivityModel";
import moment from "moment";
import { Student } from "../model/StudentModel";
import fetch from "../utils/fetch";
import { AxiosResponse } from "axios";
import { isResponseOk, checkActivity, delActivity } from "../utils/InternetUtils";

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
  id: 2,
  proof: {
    id: 2,
    is_deleted: false,
    deleted_at: "20:42:50.450904",
    created: "2021-07-20T20:42:50.450904+08:00",
    is_offline: true,
    proof_file: null,
    owner: 3,
  },
  sua: {
    student: {
      user: {
        username: "19337003",
        id: 3,
      },
      name: "dd",
      id: 3,
    },
    suahours: 100,
  },
  is_deleted: false,
  deleted_at: "20:42:50.460189",
  created: "2021-07-20T20:42:50.460189+08:00",
  contact: "13612687802",
  is_checked: true,
  status: 0,
  feedback: "",
  owner: 3,
});

const showActivityPage: React.FC<any> = (
  activity: Activity = testActivity2
) => {
  let user = User.useContainer();

  const studentDataOfActivity =
    activity.participant == null
      ? []
      : activity.participant.map(function (stu: Student) {
          return [stu.name, stu.id, stu.score, "0"];
        });

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
                {activity.status === ActivityStatus.Activated
                  ? "已通过"
                  : "未通过"}
                <br />
              </Typography>
              <Button
                variant="contained"
                disabled={
                  user.power === UserPower.admin &&
                  activity.status === ActivityStatus.NotActivated
                    ? false
                    : true
                }
                onClick={() => {checkActivity(activity)}}
              >
                通过
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {delActivity(activity)}}
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
            data={studentDataOfActivity}
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
