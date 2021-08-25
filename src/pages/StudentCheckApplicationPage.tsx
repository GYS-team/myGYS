import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import User from "../model/UserModel";
import { Grid, ListSubheader, Typography } from "@material-ui/core";
import { Application, testApplication } from "../model/ApplicationModel";
import { RouteComponentProps } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 250,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const ApplicationCheck: React.FC<{ application: Application }> = ({
  application,
}) => {
  const classes = useStyles();
  let user = User.useContainer();
  return (
    <Grid item xs={12}>
      <Typography variant="h3" component="h2">
        公益时申请#
      </Typography>
      <Grid item xs={6} sm={6}>
        <List
          component="nav"
          aria-label="mailbox folders"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              申请人信息
            </ListSubheader>
          }
        >
          <ListItem button>
            <ListItemText>姓名：{user.info.name}</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button divider>
            <ListItemText>学号：{user.info.number}</ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>年级：{user.info.grade}</ListItemText>
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={6} sm={6}>
        <List
          component="nav"
          aria-label="mailbox folders"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              活动信息
            </ListSubheader>
          }
        >
          <ListItem button>
            <ListItemText>名称：{application.activityName}</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button divider>
            <ListItemText>描述：{application.activityDescription}</ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>联系方式：{application.contact}</ListItemText>
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={6} sm={6}>
        <List
          component="nav"
          aria-label="mailbox folders"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              申请结果
            </ListSubheader>
          }
        >
          <ListItem button>
            {application.is_checked ? "通过" : "不通过"}
          </ListItem>
        </List>
      </Grid>{" "}
      <Grid item xs={6} sm={6}>
        <List
          component="nav"
          aria-label="mailbox folders"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              反馈
            </ListSubheader>
          }
        >
          <ListItem button>{application.feedback}</ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default ApplicationCheck;