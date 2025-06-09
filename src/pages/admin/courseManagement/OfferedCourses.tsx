import { Table, TableColumnsType } from "antd";
import { TTableData } from "./Course";

const OfferedCourses = () => {
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return <AddFacultyModel facultyInfo={item} />;
      },
    },
  ];

  return (
    <div>
      <Table
        // loading={isFetching}
        columns={columns}
        // dataSource={tableData}
        // onChange={onChange}
      />
    </div>
  );
};

export default OfferedCourses;
