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
import User from "../model/user";
import Typography from "@material-ui/core/Typography";
import MUIDataTable from "mui-datatables";
import { Box, Button, ButtonGroup, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ActivityStatus, Activity, activityStatusMsg } from "../model/activity";
import moment from "moment";
import ActivityPage from "./ActivitySubmitPage";
import ActivityListPage from "./ActivityList";

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

export const mainPage: React.FC = () => {
  const classes = useStyles2();
  let user = User.useContainer();

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item sm={3} xs={12}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography className={classes.pos} variant="body2" component="p">
                学号：{user.id}; <br />
                邮箱：{user.info.phone}; <br />
                名字：{user.info.name}; <br />
                分数：{user.info.score};<br />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={8} xs={12}>
          <ActivityListPage activityList={testActivity}/>
        </Grid>
      </Grid>
    </Box>
  );
};

const testActivity: Activity[] = [
  {
    name: "数学节adsfadsfasdfasddfasdfasdfasdf",
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

export default mainPage;
