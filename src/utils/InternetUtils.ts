import Cookies from "js-cookie";
import { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import fetch from "./fetch";
import { Activity } from "../model/ActivityModel";
import { Application } from "../model/ApplicationModel";
import User from "../model/UserModel";

export const isCookieExist = (key: string): boolean => {
  if (Cookies.get(key) == null) {
    Cookies.set(key, "test");
    if (Cookies.get(key)) {
      Cookies.remove(key);
      return false;
    }
  }
  return true;
};

export function isResponseOk(res: AxiosResponse): boolean;
export function isResponseOk(res: number): boolean;
export function isResponseOk(res: number | AxiosResponse): boolean {
  let status: number = typeof res === "number" ? res : res.status;
  // return the HTTP Status Code
  return Math.floor(status / 100) === 2;
}

export enum LoadStatus {
  notLoaded,
  loading,
  loaded,
  error,
}
export const useLoadGuard = (retryTimes: number = 0) => {
  const [status, setStatus] = useState<LoadStatus>(LoadStatus.notLoaded);
  const [times, setTimes] = useState<number>(0);
  const [error, setError] = useState<any>(null);

  const clearStatus = () => {
    setStatus(LoadStatus.notLoaded);
    setTimes(0);
    setError(null);
  };

  const useGuard = (
    func: () => Promise<void>,
    deps: readonly any[] | undefined = []
  ) => {
    useEffect(() => {
      if (status !== LoadStatus.loading) {
        func()
          .then(() => setStatus(LoadStatus.loaded))
          .catch((err) => {
            if (times < retryTimes) {
              setTimes((t) => t + 1);
              setStatus(LoadStatus.notLoaded);
            } else {
              setError(err);
              setStatus(LoadStatus.error);
            }
          });
        setStatus(LoadStatus.loading);
      }
    }, deps);
  };

  return {
    error,
    status,
    clearStatus,
    guard: useGuard,
    is: {
      notLoaded: () => status === LoadStatus.notLoaded,
      loading: () => status === LoadStatus.loading,
      loaded: () => status === LoadStatus.loaded,
      error: () => status === LoadStatus.error,
    },
  };
};

export const checkActivity = async (activity: Activity) => {
  let user = User.useContainer();
  const res: AxiosResponse<any> = await fetch.put(
    "activity/admin/",
    {
      id: activity.id,
      is_valid: "true",
    },
    {
      headers: {
        Authorization: user.token,
      },
    }
  );
  if (isResponseOk(res)) {
    console.log(res.data.data);
  }
};
export const delActivity = async (activity: Activity) => {
  let user = User.useContainer();
  const res: AxiosResponse<any> = await fetch.delete("activity/admin/", {
    params: { id: activity.id },
    headers: {
      Authorization: user.token,
    },
  });
  if (isResponseOk(res)) {
    console.log(res.data.data);
  }
};

export const checkApplication = async (application: Application) => {
  let user = User.useContainer();
  const res: AxiosResponse<any> = await fetch.put(
    "application/admin/",
    {
      id: application.suahours,
      // TODO
      is_valid: "true",
    },
    {
      headers: {
        Authorization: user.token,
      },
    }
  );
  if (isResponseOk(res)) {
    console.log(res.data.data);
  }
};
export const delApplication = async (application: Application) => {
  let user = User.useContainer();
  const res: AxiosResponse<any> = await fetch.delete("activity/admin/", {
    params: { id: application.contact },
    headers: {
      Authorization: user.token,
    },
  });
  if (isResponseOk(res)) {
    console.log(res.data.data);
  }
};
