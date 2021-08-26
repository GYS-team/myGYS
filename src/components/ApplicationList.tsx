import { Button, ButtonGroup } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { AxiosResponse } from "axios";
import fetch from "../utils/fetch";
import { isResponseOk, useLoadGuard } from "../utils/InternetUtils";
import { Application, parseToApplication } from "../model/ApplicationModel";
const applicationToData = (application: Application) => [
  application.activityName,
  application.contact,
  application.suahours,
  application.isChecked,
  "",
];

const ApplicationList: React.FC = () => {
  const [applicationList, setApplicationList] = useState<Application[]>([]);

  const fetchApplicationList = async () => {
    // 从数据库读取活动列表数据
    const res: AxiosResponse<any> = await fetch.get("index/");
    if (isResponseOk(res)) {
      setApplicationList(res.data.data.map(parseToApplication));
    } else {
      throw Error();
    }
  };

  const columns = [
    {
      name: "活动",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "联系方式",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "申请公益时数",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "审核结果",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "操作",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string, tableMeta: any, updateValue: any) => {
          return (
            <Button
              component={Link}
              to={"/activity" + value}
              color="primary"
              aria-label="outlined secondary button group"
            >
              详情
            </Button>
          );
        },
      },
    },
  ];
  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "scroll",
  };

  const itemsGuard = useLoadGuard();
  itemsGuard.guard(fetchApplicationList);
  return (
    <>
      {itemsGuard.is.loading() && <>loading... </>}
      {itemsGuard.is.error() && console.log("error")}
      {itemsGuard.is.loaded() && (
        <MUIDataTable
          title={"申请列表"}
          data={applicationList.map(applicationToData)}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default ApplicationList;
