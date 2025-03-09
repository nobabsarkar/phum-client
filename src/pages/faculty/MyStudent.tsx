/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import {
  useAddMarkMutation,
  useGetAllFacultyCoursesQuery,
} from "../../redux/features/faculty/facultyCourses.api";
import { Button, Modal, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";

type TColumns = {
  key: string;
  name: string;
  role: string;
  showSorterTooltip: string;
};

const MyStudent = () => {
  const { registerSemesterId, courseId } = useParams();
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery([
    { name: "semesterRegistration", vlaue: registerSemesterId },
    { name: "courseId", vlaue: courseId },
  ]);

  const tableData = facultyCoursesData?.data?.map(
    ({ _id, student, semesterRegistration, offeredCourse }: any) => ({
      key: _id,
      name: student?.fullName,
      role: student?.id,
      semesterRegistration: semesterRegistration._id,
      student: student._id,
      offeredCourse: offeredCourse._id,
    })
  );

  const columns: TableColumnsType<TColumns> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      showSorterTooltip: { target: "full-header" },
    },

    {
      title: "Role",
      key: "role",
      dataIndex: "role",
    },
    {
      title: "Action",
      key: "x",
      render: (item: any) => {
        return (
          <div>
            <AddMarksModal studentInfo={item} />
          </div>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={tableData} />;
};

const AddMarksModal = ({ studentInfo }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMark] = useAddMarkMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const studentMark = {
      semesterRegistration: studentInfo?.semesterRegistration,
      offeredCourse: studentInfo?.offeredCourse,
      student: studentInfo?.student,
      courseMarks: {
        classTest1: Number(data.classTest1),
        midTerm: Number(data.midTerm),
        classTest2: Number(data.classTest1),
        finalTerm: Number(data.finalTerm),
      },
    };

    console.log(studentMark);
    const res = await addMark(studentMark);
    console.log(res);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHInput type="text" name="classTest1" label="Class Test 1" />
          <PHInput type="text" name="classTest2" label="Class Test 2" />
          <PHInput type="text" name="midTerm" label="Midterm" />
          <PHInput type="text" name="finalTerm" label="Final" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default MyStudent;
