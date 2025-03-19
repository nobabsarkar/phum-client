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

// const facultyDefaultValues = {
//   faculty: {
//     id: "F-0003",
//     user: "67448fa748bdb77bda11bf28",
//     designation: "Assistant Professor",
//     name: {
//       firstName: "Jane",
//       middleName: "Marie",
//       lastName: "Smith",
//     },
//     gender: "female",
//     dateOfBirth: "1990-06-15T00:00:00.000Z",
//     email: "jane.smith@example.com",
//     contactNo: "0123456789",
//     emergencyContactNo: "0987654321",
//     bloodGroup: "A+",
//     presentAddress: "456 Elm Street, Springfield",
//     permanentAddress: "123 Maple Avenue, Shelbyville",
//     academicDepartment: "674d5f58dfd6a8b6cc2e9a0a",
//     isDeleted: false,
//   },
// };

const facultyDefaultValues = {
  name: {
    firstName: "John",
    middleName: "A.",
    lastName: "Doe",
  },
  designation: "Teacher",
  gender: "male",
  dateOfBirth: "", // Add date if available
  email: "johndoe5@example.com",
  contactNo: "+8801712345678",
  emergencyContactNo: "+8801812345678",
  bloodGroup: "O+",
  presentAddress: "123 Main Street, Dhaka, Bangladesh",
  permanentAddress: "456 Another Street, Chittagong, Bangladesh",
  // academicDepartment: "67acb24226b21c377be06744",
  // academicFaculty: "67acb24226b21c377be06744",
  isDeleted: false,
};

const CreateAcademicFaculty = () => {
  const [addFaculties] = useAddAcademicFacultiesMutation();

  const { data: dData, isLoading: dIsLoading } =
    useGetAllSemestersQuery(undefined);

  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);

  const academicSemesterOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const facultyData = {
      password: "faculty123",
      faculty: data,
      // image: data.image,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data?.image);

    addFaculties(formData);

    console.log(formData);
    console.log(data);
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
                options={departmentOptions}
                disabled={dIsLoading}
                name="academicDepartment"
                label="Academic Department"
              ></PHSelect>
              {/* <PHInput
                            type="text"
                            name="academicDepartment"
                            label="Academic Department"
                          ></PHInput> */}
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
