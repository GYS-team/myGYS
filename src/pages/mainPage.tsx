import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import User from "../model/UserModel";
import Typography from "@material-ui/core/Typography";
import MUIDataTable from "mui-datatables";
import { Box, Button, ButtonGroup, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  ActivityStatus,
  Activity,
  activityStatusMsg,
  parseToActivity,
} from "../model/ActivityModel";
import moment from "moment";
import ActivityListPage from "./AdminActivityListPage";
import cx from "clsx";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
import { useGutterBorderedGridStyles } from "@mui-treasury/styles/grid/gutterBordered";
import { Student } from "../model/StudentModel";

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

const useStyles = makeStyles(({ palette }) => ({
  card: {
    borderRadius: 12,
    minWidth: 256,
    textAlign: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    margin: "auto",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: "0.5px",
    marginTop: 8,
    marginBottom: 0,
  },
  subheader: {
    fontSize: 14,
    color: palette.grey[500],
    marginBottom: "0.875em",
  },
  statLabel: {
    fontSize: 12,
    color: palette.grey[500],
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    letterSpacing: "1px",
  },
}));

export const ProfileCardDemo = React.memo(function ProfileCard(
  student: Student
) {
  const styles = useStyles();
  const shadowStyles = useFadedShadowStyles();
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: "rgba(0, 0, 0, 0.08)",
    height: "50%",
  });
  return (
    <Card className={cx(styles.card, shadowStyles.root)}>
      <CardContent>
        <Avatar className={styles.avatar} src={"https://i.pravatar.cc/300"} />
        <h3 className={styles.heading}>{student.name}</h3>
        <span className={styles.subheader}>{student.number}</span>
      </CardContent>
      <Divider light />
      <Box display={"flex"}>
        <Box p={2} flex={"auto"} className={borderedGridStyles.item}>
          <p className={styles.statLabel}>公益时</p>
          <p className={styles.statValue}>{student.score}</p>
        </Box>
        <Box p={2} flex={"auto"} className={borderedGridStyles.item}>
          <p className={styles.statLabel}>年级</p>
          <p className={styles.statValue}>{student.grade}</p>
        </Box>
      </Box>
    </Card>
  );
});

export const MainPage: React.FC = () => {
  const styles = useStyles();
  const shadowStyles = useFadedShadowStyles();
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: "rgba(0, 0, 0, 0.08)",
    height: "50%",
  });
  let user = User.useContainer();
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item sm={3} xs={12}>
          <Card className={cx(styles.card, shadowStyles.root)}>
            <CardContent>
              <Avatar
                className={styles.avatar}
                src={"https://i.pravatar.cc/300"}
              />
              <h3 className={styles.heading}>{user.info.name}</h3>
              <span className={styles.subheader}>{user.info.number}</span>
            </CardContent>
            <Divider light />
            <Box display={"flex"}>
              <Box p={2} flex={"auto"} className={borderedGridStyles.item}>
                <p className={styles.statLabel}>公益时</p>
                <p className={styles.statValue}>{user.info.score}</p>
              </Box>
              <Box p={2} flex={"auto"} className={borderedGridStyles.item}>
                <p className={styles.statLabel}>年级</p>
                <p className={styles.statValue}>{user.info.grade}</p>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item sm={8} xs={12}>
          <ActivityListPage />
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

export default MainPage;
