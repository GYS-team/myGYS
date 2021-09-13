import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { isResponseOk } from "../utils/InternetUtils";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { useForm } from "react-hook-form";

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import User, { UserPower } from "../model/UserModel";
import fetch from "../utils/fetch";
import { AxiosResponse } from "axios";
import { Application } from "../model/ApplicationModel";
import { useState } from "react";
const ApplicationSubmitPage: React.FC = () => {
  let user = User.useContainer();
  const { register, handleSubmit, errors } = useForm<Application>();
  const [isOffline, setIsOffline] = useState<boolean>(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsOffline((event.target as HTMLInputElement).value === "true");
  };
  const onSubmit = async (data: Application) => {
    // 提交活动申请函数
    data.isOffline = isOffline;
    const res: AxiosResponse<any> = await fetch.post(
      "application/",
      {
        proof: {
          is_offline: true,
          // is_offline = data.isOffline
        },
        sua: {
          activity: {
            title: data.activityName,
            detail: data.activityDescription,
          },
          suahours: data.suahours,
        },
        contact: data.contact,
        is_checked: true,
      },
      {
        headers: {
          Authorization: user.token,
        },
      }
    );
    if (!isResponseOk(res)) {
      throw new Error(
        res.data && res.data.message
          ? res.data.message
          : `${res.status}: ${res.statusText}`
      );
    } else {
      console.log(res.data.message);
    }
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          创建公益时申请
        </Typography>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                inputRef={register({ required: true })}
                required
                id="activityName"
                name="activityName"
                label="活动名称"
                fullWidth
                error={errors.activityName && true}
                helperText={errors.activityName && "请输入活动名称"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register}
                id="activityDescription"
                name="activityDescription"
                label="描述"
                fullWidth
                autoComplete="暂无描述"
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register({ required: true })}
                required
                id="contact"
                name="contact"
                label="联系方式"
                fullWidth
                error={errors.contact && true}
                helperText={errors.contact && "必须输入活动主办方手机"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register({ required: true })}
                required
                id="suahours"
                name="suahours"
                label="公益时数"
                fullWidth
                error={errors.suahours && true}
                helperText={
                  errors.suahours && "请填写你在该活动中获得的公益时数目"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" name="isOffline" id="isOffline">
                <FormLabel component="legend">提交方式</FormLabel>
                <RadioGroup
                  aria-label="isOffline"
                  name="isOffline"
                  value={isOffline}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="线下提交"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="线上提交"
                    disabled
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={user.power !== UserPower.common}
            >
              确认
            </Button>
          </Grid>
        </form>
      </React.Fragment>
    </MuiPickersUtilsProvider>
  );
};

export default ApplicationSubmitPage;
