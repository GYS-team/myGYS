import React, { useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import User, { UserPower } from "../model/UserModel";
import {
  Box,
  Button,
  Grid,
  ListSubheader,
  Typography,
} from "@material-ui/core";
import { Application, parseToApplication, testApplication } from "../model/ApplicationModel";
import {
  checkApplication,
  delApplication,
  isResponseOk,
  useLoadGuard,
} from "../utils/InternetUtils";
import { AxiosResponse } from "axios";
import fetch from "../utils/fetch";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 250,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const ApplicationPage: React.FC<{ id: number }> = ({ id }) => {
  const [application, setApplication] = useState<Application>(testApplication);
  const fetchApplication = async () => {
    // 从数据库读取活动列表数据
    const res: AxiosResponse<any> = await fetch.get(`application/${id}$`, {
      headers: {
        Authorization: user.token,
      },
    });
    console.log(res.data.data);
    if (isResponseOk(res)) {
      setApplication(parseToApplication(res.data.data));
    } else {
      throw Error(
        res.data && res.data.message
          ? res.data.message
          : `${res.status}: ${res.statusText}`
      );
    }
  };

  let user = User.useContainer();
  const itemsGuard = useLoadGuard();
  itemsGuard.guard(fetchApplication);
  return (
    <>
      {" "}
      {itemsGuard.is.loading() && <>loading...</>}
      {itemsGuard.is.error() && itemsGuard.error.toString()}
      {itemsGuard.is.loaded() && (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <Typography variant="h3" component="h2">
                公益时申请#
              </Typography>
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
                  <ListItemText>
                    描述：{application.activityDescription}
                  </ListItemText>
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
                  <ListSubheader component="div">申请结果</ListSubheader>
                }
              >
                <ListItem button>
                  {application.isChecked ? "通过" : "不通过"}
                </ListItem>
              </List>
            </Grid>{" "}
            <Grid item xs={6} sm={6}>
              <List
                component="nav"
                aria-label="mailbox folders"
                subheader={<ListSubheader component="div">反馈</ListSubheader>}
              >
                <ListItem button>{application.feedback}</ListItem>
              </List>
              <Button
                variant="contained"
                disabled={
                  user.power === UserPower.admin && !application.isChecked
                }
                onClick={() => {
                  checkApplication(application);
                }}
              >
                通过
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  delApplication(application);
                }}
              >
                删除
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ApplicationPage;
