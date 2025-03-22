/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { TQueryParam } from "../../../types";

const AcademicFaculty = () => {
  // const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  // const { data: semesterData, isFetching } =
  //   useGetAllAcademicFacultiesQuery(params);

  const { data: semesterData, isFetching } =
    useGetAllAcademicFacultiesQuery(undefined);

  const tableData = semesterData?.data?.map(
    ({ _id, name, createdAt, updatedAt }) => ({
      key: _id,
      name,
      createdAt,
      updatedAt,
    })
  );

  const columns: TableColumnsType = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
    },
  ];

  const onChange: TableProps["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
    }
  };
  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default AcademicFaculty;
