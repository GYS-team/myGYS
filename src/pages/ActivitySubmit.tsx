import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { isCookieExist, isResponseOk } from "../utils/utils";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { useForm } from "react-hook-form";
import { Activity, ActivityStatus, parseToActivity } from "../model/activity";
import moment from "moment";
import { Button } from "@material-ui/core";
import User from "../model/user";
import fetch from "../utils/fetch";
import { AxiosResponse } from "axios";
const defaultDate = new Date("2014-08-18");
const ActivityPage: React.FC = () => {
  const [startDate, setStartDate] = React.useState<Date | null>(defaultDate);
  const [endDate, setEndDate] = React.useState<Date | null>(defaultDate);
  const { register, handleSubmit, errors } = useForm<Activity>();
  const handleStartDateChange = (date: Date | null) => setStartDate(date);
  const handleEndDateChange = (date: Date | null) => setEndDate(date);
  let user = User.useContainer();

  const onSubmit = async (data: Activity) => {
    data.startDate = moment(startDate);
    data.endDate = moment(endDate);
    data.status = 0;
    alert(JSON.stringify(data));
    // TODO: where to submit
    const res: AxiosResponse<any> = await fetch.post("activity/admin", {
      title: data.name,
      detail: data.description,
    });
    if (!isResponseOk(res)) {
      // if login false.
      throw new Error(
        res.data && res.data.message
          ? res.data.message
          : `${res.status}: ${res.statusText}`
      );
    }
  };

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
                helperText={errors.inititor_phone && "必须输入活动主办方"}
              />
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary">
              确认
            </Button>
          </Grid>
        </form>
      </React.Fragment>
    </MuiPickersUtilsProvider>
  );
};

export default ActivityPage;
