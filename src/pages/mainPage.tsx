import React from "react";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import User from "../model/user";
import fetch from "../utils/fetch";
import Typography from "@material-ui/core/Typography";
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
  
  const OutlinedCard: React.FC = () => {
    const classes = useStyles2();
    let user = User.useContainer();
  
    return (
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.pos} variant="body2" component="p">
            学号：{user.id}; <br />
            邮箱：{user.info.email}; <br />
            名字：{user.info.name}; <br />
            分数：{user.info.score};
          </Typography>
        </CardContent>
      </Card>
    );
  };