/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import PHTimePicker from "../../../components/form/PHTimePicker";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
} from "../../../redux/features/admin/courseManagement";
import { weekDaysOptions } from "../../../types";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");
  const [id, setId] = useState("");
  // console.log("Inside parent component", id);

  const { data: semesterRegistrationData } = useGetAllRegisteredSemestersQuery([
    { name: "sort", value: "year" },
    { name: "status", value: "UPCOMING" },
  ]);

  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );

  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);

  const academicSemesterOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const { data: coursesData } = useGetAllCoursesQuery(undefined);

  const courseOptions = coursesData?.data?.map((item: any) => ({
    value: item._id,
    label: item.title,
  }));

  const { data: academicDepartmentData } =
    useGetAllAcademicDepartmentQuery(undefined);

  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (item) => ({
      value: item._id,
      label: item.name,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          {/* <PHSelectWithWatch
            onValueChange={setId}
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          ></PHSelectWithWatch> */}

          <PHSelect
            name="semesterRegistration"
            label="Semester Registrations"
            options={semesterRegistrationOptions}
          />

          <PHSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={academicSemesterOptions}
          />

          <PHSelect
            name="academicDepartment"
            label="Academic Department"
            options={academicDepartmentOptions}
          />

          <PHSelectWithWatch
            onValueChange={setCourseId}
            options={courseOptions}
            name="course"
            label="Course"
          />

          <PHSelect
            // disabled={!courseId || fetchingFaculties}
            name="faculty"
            label="Faculty"
            // options={facultiesOptions}
          />

          <PHInput type="text" name="section" label="Section" />
          <PHInput type="text" name="maxCapacity" label="Max Capacity" />
          <PHSelect
            mode="multiple"
            options={weekDaysOptions}
            name="days"
            label="Days"
          />
          <PHTimePicker name="startTime" label="Start Time" />
          <PHTimePicker name="endTime" label="End Time" />

          <PHInput disabled={!id} type="text" name="test" label="Test" />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
