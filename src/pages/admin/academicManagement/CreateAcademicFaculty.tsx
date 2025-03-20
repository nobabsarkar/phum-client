import { Button, Col, Divider, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { bloodGroupOptions, genderOptions } from "../../../types";
import {
  useAddAcademicFacultiesMutation,
  useGetAcademicFacultiesQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/courseManagement";
import { toast } from "sonner";

const facultyDefaultValues = {
  name: {
    firstName: "John",
    middleName: "A.",
    lastName: "Doe",
  },
  designation: "Teacher",
  gender: "male",
  dateOfBirth: "",
  email: "johndoe5@example.com",
  contactNo: "+8801712345678",
  emergencyContactNo: "+8801812345678",
  bloodGroup: "O+",
  presentAddress: "123 Main Street, Dhaka, Bangladesh",
  permanentAddress: "456 Another Street, Chittagong, Bangladesh",
  isDeleted: false,
};

const CreateAcademicFaculty = () => {
  const [addFaculties] = useAddAcademicFacultiesMutation();

  const { isLoading: dIsLoading } = useGetAllSemestersQuery(undefined);

  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);

  const academicSemesterOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const { data: academicDepartmentData } =
    useGetAllAcademicDepartmentQuery(undefined);

  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (item) => ({
      value: item._id,
      label: item.name,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const facultyData = {
      password: "faculty123",
      faculty: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data?.image);

    const res = await addFaculties(formData);
    if (res?.data?.success) {
      toast(res?.data?.message);
    }
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={facultyDefaultValues}>
          {/*  */}
          <Divider>Personal Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="designation" label="Designation" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect options={genderOptions} name="gender" label="Gender" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Date Of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={bloodGroupOptions}
                name="bloodGroup"
                label="Blood Group"
              />
            </Col>

            <Divider>Contact Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="Contact" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={academicDepartmentOptions}
                disabled={dIsLoading}
                name="academicDepartment"
                label="Academic Department"
              ></PHSelect>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={academicSemesterOptions}
                disabled={dIsLoading}
                name="academicFaculty"
                label="Academic Faculty"
              ></PHSelect>
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateAcademicFaculty;
