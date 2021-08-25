import { Button, ButtonGroup } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { parseToStudent, Student } from "../model/StudentModel";
import fetch from "../utils/fetch";
import { isResponseOk, useLoadGuard } from "../utils/InternetUtils";

const studentToData = (student: Student) => [
  student.name,
  student.id,
  student.grade,
  student.score,
  student.phone,
  "",
];
const StudentList = () => {
  const [studentList, setStudentList] = useState<Student[]>([]);

  const fetchStudentList = async () => {
    const res = await fetch.get("/unknown");
    // TODO: where to fetch info
    if (isResponseOk(res)) {
      setStudentList(res.data.data.map(parseToStudent));
    }
  };

  const columns = [
    {
      name: "学生",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "学号",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "班级",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "公益时",
      options: {
        filter: true,
        filterType: "checkbox",
        filterOptions: {
          names: [">=30", "<30"],
          logic(score: any, filterVal: Array<string>) {
            const show =
              (filterVal.indexOf(">=30") >= 0 && score > 29) ||
              (filterVal.indexOf("<30") >= 0 && score < 30);
            return !show;
          },
        },
      },
      sort: true,
    },
    {
      name: "电话",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "操作",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: string, tableMeta: any, updateValue: any) => {
          return (
            <ButtonGroup
              color="primary"
              aria-label="outlined secondary button group"
            >
              <Button component={Link} to={"/" + value}>
                详情
              </Button>
            </ButtonGroup>
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
  itemsGuard.guard(fetchStudentList);
  return (
    <>
      {itemsGuard.is.loading() && <>loading...</>}
      {itemsGuard.is.error() && itemsGuard.error.toString()}
      {itemsGuard.is.loaded() && (
        <MUIDataTable
          title={"学生列表"}
          data={studentList.map(studentToData)}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default StudentList;
