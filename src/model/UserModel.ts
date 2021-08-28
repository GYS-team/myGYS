import { useState, useReducer, Reducer, useEffect } from "react";
import { createContainer } from "unstated-next";
import { isResponseOk } from "../utils/InternetUtils";
import fetch from "../utils/fetch";
import { Student, parseToStudent } from "./StudentModel";
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

export const User = createContainer(() => {
  const [status, setStatus] = useState<LoginStatus>(
    // isCookieExist("session_id") ? LoginStatus.logged : LoginStatus.notLogged
    LoginStatus.notLogged
  );
  const [id, setId] = useState<number>(0);
  const [power, setPower] = useState<UserPower>(UserPower.admin);
  const [token, setToken] = useState<string>("");
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
      headers: {
        Authorization: "Token " + token,
      },
    });
    if (isResponseOk(res)) {
      const data = res.data.data;
      setId(data.id);
      setPower(data.admin ? UserPower.admin : UserPower.common);
      infoDispatcher(parseToStudent(data));
    }
  };

  const Login = async (NetID: string, password: string) => {
    setStatus(LoginStatus.logging);
    try {
      const res: AxiosResponse<any> = await fetch.post("login/", {
        id: NetID,
        password: password,
      });
      if (!isResponseOk(res)) {
        throw new Error(
          res.data && res.data.message
            ? res.data.message
            : `${res.status}: ${res.statusText}`
        );
      }
      // const res = {
      //   data:{
      //     data:{
      //       token: '123',
      //     }
      //   }
      // }
      setStatus(LoginStatus.logged);
      setToken(res.data.data.token);
    } catch (e) {
      console.log(e.response);
      // setStatus(LoginStatus.notLogged);
      setStatus(LoginStatus.logged); //TODO: test
      throw e;
    }
  };
  const logout = async () => {
    try {
      const res: AxiosResponse<any> = await fetch.post(
        "logout/",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (isResponseOk(res) && res.data.code === "00") {
        setStatus(LoginStatus.notLogged);
        clearInfo();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (token !== "") fetchInfo();
    console.log(token);
  }, [token]);
  return {
    status,
    power,
    id,
    info,
    token,
    updateInfo: fetchInfo,
    login: Login,
    logout,
  };
});

export default User;
