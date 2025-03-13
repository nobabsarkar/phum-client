/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex } from "antd";
import PHForm from "../../components/form/PHForm";
import PHSelect from "../../components/form/PHSelect";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCourses.api";

const MyCourses = () => {
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery(undefined);

  const navigate = useNavigate();

  const semesterOption = facultyCoursesData?.data?.map((item: any) => ({
    label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    value: item?.semesterRegistration?._id,
  }));

  const courseOption = facultyCoursesData?.data?.map((item: any) => ({
    label: item?.course?.title,
    value: item?.course?._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    navigate(`/faculty/courses/${data?.semesterRegistration}/${data?.course}`);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={8}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            options={semesterOption}
            name="semesterRegistration"
            label="Semester"
          />
          <PHSelect options={courseOption} name="course" label="Course" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default MyCourses;
