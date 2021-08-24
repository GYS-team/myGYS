import React from "react";
import { BrowserRouter, Redirect, Switch, Route, Link } from "react-router-dom";
import clsx from "clsx";

import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import fetch from "./utils/fetch";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Box } from "@material-ui/core";

import User, { LoginStatus } from "./model/UserModel";
import { routes, RouteName } from "./utils/routes";
import SignInPage from "./pages/SignInPage";
import studentList from "./pages/StudentListPage";
import MainPage from "./pages/MainPage";
import ActivityPage from "./pages/ActivitySubmitPage";
import showActivityPage from "./pages/Activity";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    title: {
      flexGrow: 1,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
);

const NotFound: React.FC = () => <>Not Found</>;
const routes2nav = (id: RouteName) => {
  return (
    <ListItem button key={routes[id].url} component={Link} to={routes[id].url}>
      <ListItemText primary={routes[id].name} />
    </ListItem>
  );
};

export const InnerPageRoutes: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  let user = User.useContainer();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuRoundedIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            SYSU-MATH-ZH 公益时平台
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={user.logout}
            edge="end"
          >
            <MenuRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography variant="h6" noWrap className={classes.title}>
            公益时平台
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {routes2nav("activityList")}
          {routes2nav("deleteList")}
          {routes2nav("deleteRecord")}
          {routes2nav("representList")}
          {routes2nav("studentList")}
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Switch>
          <Route path={routes.activityList.url} component={MainPage} />
          <Route path={routes.studentList.url} component={studentList} />
          <Route path={routes.representList.url} component={ActivityPage} />
          <Route path={routes.deleteList.url} component={showActivityPage} />
          <Route path={routes.deleteRecord.url} component={NotFound} />
          {
            // 怎么给到对应路径去到对应页面
          }
          <Redirect to="/admin" />
        </Switch>
        <Box></Box>
        <Typography paragraph></Typography>
      </main>
    </div>
  );
};

const SignInPageRoutes: React.FC = () => {
  let user = User.useContainer();
  const logged: boolean = user.status === LoginStatus.logged;
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact={true} from="/" to={logged ? "/admin" : "/login"} />
        <Route
          exact
          path="/login"
          render={() => (!logged ? <SignInPage /> : <Redirect to="/admin" />)}
        />
        <Route
          render={() =>
            logged ? (
              <Switch>
                <Route path="/admin" component={InnerPageRoutes} />
              </Switch>
            ) : (
              <Redirect to={"/login"} />
            )
          }
        />
      </Switch>
    </BrowserRouter>
  );
};

export default SignInPageRoutes;
