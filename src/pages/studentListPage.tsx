import {
  Box,
  Button,
  ButtonGroup,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import React from "react";
import { Link } from "react-router-dom";
import { Student } from "../model/StudentModel";

const StudentToList = (
  studentList: Student[]
): (number | string | undefined)[][] =>
  studentList.map(function (student: Student) {
    return [
      student.name,
      student.id,
      student.grade,
      student.score,
      student.phone,
      "x",
    ];
  });

const StudentListPage: React.FC<any> = (studentList: Student[] = []) => {
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
  const data = StudentToList(studentList);
  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "scroll",
  };
  return (
    <MUIDataTable
      title={"学生列表"}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default StudentListPage;
