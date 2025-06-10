import { Table, TableColumnsType } from "antd";
import { TTableData } from "./Course";
import { useOfferedCourseQuery } from "../../../redux/features/admin/courseManagement";

const OfferedCourses = () => {
  const { data: offeredData, isFetching } = useOfferedCourseQuery(undefined);

  console.log(offeredData);

  const tableData = offeredData?.data?.map(({ _id, semesterRegistration }) => ({
    key: _id,
    name: semesterRegistration?.name,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Semester Registration",
      key: "remester registration",
      dataIndex: "semester registration",
    },
    {
      title: "Academic Semester",
      key: "academic semester",
      dataIndex: "academic semester",
    },
    {
      title: "Academic Faculty",
      key: "academic faculty",
      dataIndex: "academic faculty",
    },
    {
      title: "Academic Department",
      key: "academic department",
      dataIndex: "academic department",
    },
    // {
    //   title: "Action",
    //   key: "x",
    //   render: (item) => {
    //     // return <AddFacultyModel facultyInfo={item} />;
    //     return <h1>Offered Course</h1>;
    //   },
    // },
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
