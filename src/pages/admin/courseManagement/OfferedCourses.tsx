import { Table, TableColumnsType } from "antd";
import { OfferedCourseTableRow } from "./Course";
import { useOfferedCourseQuery } from "../../../redux/features/admin/courseManagement";
import { TOfferedCourse } from "../../../types/studentCourse.type";

const OfferedCourses = () => {
  const { data: offeredData, isFetching } = useOfferedCourseQuery(undefined);

  const tableData = Array.isArray(offeredData?.data?.result)
    ? (offeredData?.data?.result as TOfferedCourse[])?.map(
        ({
          _id,
          academicDepartment,
          semesterRegistration,
          academicSemester,
          academicFaculty,
        }) => ({
          key: _id,
          academicDepartment: academicDepartment?.name,
          semesterRegistration: semesterRegistration?.status,
          academicSemester: academicSemester?.name,
          academicFaculty: academicFaculty?.name,
        })
      )
    : [];

  const columns: TableColumnsType<OfferedCourseTableRow> = [
    {
      title: "Academic Department",
      key: "academic department",
      dataIndex: "academicDepartment",
    },
    {
      title: "Semester Registration",
      key: "remester registration",
      dataIndex: "semesterRegistration",
    },
    {
      title: "Academic Semester",
      key: "academic semester",
      dataIndex: "academicSemester",
    },
    {
      title: "Academic Faculty",
      key: "academic faculty",
      dataIndex: "academicFaculty",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return <AddFacultyModel facultyInfo={item} />;
        return <h1>Offered Course</h1>;
      },
    },
  ];

  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        // onChange={onChange}
      />
    </div>
  );
};

export default OfferedCourses;
