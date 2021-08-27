import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { isCookieExist, isResponseOk } from "../utils/InternetUtils";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { useForm } from "react-hook-form";
import { Activity } from "../model/ActivityModel";
import moment from "moment";
import { Button } from "@material-ui/core";
import User, { UserPower } from "../model/UserModel";
import fetch from "../utils/fetch";
import { AxiosResponse } from "axios";
const defaultDate = new Date("2014-08-18");
const ActivitySubmitPage: React.FC = () => {
  let user = User.useContainer();
  const { register, handleSubmit, errors } = useForm<Activity>();

  const onSubmit = async (data: Activity) => {
    // 提交活动申请函数
    data.startDate = moment(startDate);
    data.endDate = moment(endDate);
    data.status = 0;
    const res: AxiosResponse<any> = await fetch.post(
      "activity/admin",
      {
        title: data.name,
        detail: data.description,
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

  // 只是为了处理时间而声明
  const [startDate, setStartDate] = React.useState<Date | null>(defaultDate);
  const [endDate, setEndDate] = React.useState<Date | null>(defaultDate);
  const handleStartDateChange = (date: Date | null) => setStartDate(date);
  const handleEndDateChange = (date: Date | null) => setEndDate(date);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          创建活动
        </Typography>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                inputRef={register({ required: true })}
                required
                id="activityName"
                name="name"
                label="活动名称"
                fullWidth
                error={errors.name && true}
                helperText={errors.name && "请输入活动名称"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <KeyboardDatePicker
                inputRef={register({ required: true })}
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                id="startDate"
                name="startDate"
                label="起始时间"
                value={startDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change start date",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <KeyboardDatePicker
                inputRef={register({ required: true })}
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                id="endDate"
                name="endDate"
                label="终止时间"
                value={endDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change end date",
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                inputRef={register}
                id="description"
                name="description"
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
                id="inititor"
                name="inititor"
                label="活动主办方"
                fullWidth
                error={errors.inititor && true}
                helperText={errors.inititor && "必须输入活动主办方"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register({ required: true })}
                required
                id="inititor_phone"
                name="inititor_phone"
                label="联系方式"
                fullWidth
                error={errors.inititor_phone && true}
                helperText={errors.inititor_phone && "必须输入活动主办方手机"}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={user.power == UserPower.common}
            >
              确认
            </Button>
          </Grid>
        </form>
      </React.Fragment>
    </MuiPickersUtilsProvider>
  );
};

export default ActivitySubmitPage;
