import { useState, useReducer, Reducer } from "react";
import { createContainer } from "unstated-next";
import { isCookieExist, isResponseOk } from "../utils/utils";
import fetch from "../utils/fetch";
import { Student, parseToStudent } from "./student";
import { AxiosResponse } from "axios";
export enum LoginStatus {
  notLogged,
  logged,
  logging,
}

export enum UserPower {
  common,
  admin,
}

const User = createContainer(() => {
  const [status, setStatus] = useState<LoginStatus>(
    // isCookieExist("session_id") ? LoginStatus.logged : LoginStatus.notLogged
    LoginStatus.logged
  );
  const [id, setId] = useState<number>(0);
  const [power, setPower] = useState<UserPower>(UserPower.common);
  const [info, infoDispatcher] = useReducer<
    Reducer<Partial<Student>, Partial<Student>>
  >((info, partialInfo) => {
    return { ...info, ...partialInfo };
  }, {});

  const clearInfo = () => {
    setId(0);
    setPower(UserPower.common);
    infoDispatcher({
      id: 0,
      name: "",
      score: 0,
      phone: "",
    });
  };

  const fetchInfo = async () => {
    const res: AxiosResponse<any> = await fetch.get("student/", {
      params: { id: id },
    });
    if (isResponseOk(res)) {
      const data = res.data;
      setId(data.id);
      setPower(data.admin ? UserPower.admin : UserPower.common);
      const student = data.student;
      if (student != null) {
        infoDispatcher(parseToStudent(student));
      }
    }
  };

  const login = async (NetID: string, password: string) => {
    setStatus(LoginStatus.logged);
    try {
      const res: AxiosResponse<any> = await fetch.post("login/", {
        id: NetID,
        password: password,
      });
      if (!isResponseOk(res)) {
        // if login false.
        throw new Error(
          res.data && res.data.message
            ? res.data.message
            : `${res.status}: ${res.statusText}`
        );
      }
      setStatus(LoginStatus.logged);
      fetchInfo();
    } catch (e) {
      console.log(e.response);
      setStatus(LoginStatus.notLogged);
      throw e;
    }
  };
  const logout = async () => {
    try {
      const res: AxiosResponse<any> = await fetch.post("logout/"); // TODO: where to logout
      if (isResponseOk(res) && res.data.code === 1) {
        setStatus(LoginStatus.notLogged);
        clearInfo();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return {
    // states
    status,
    power,
    id,
    info,
    // actions
    //login,
    updateInfo: fetchInfo,
    login,
    logout,
  };
});

export default User;
