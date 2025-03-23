import { Button, Col, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAddAcademicDepartmentMutation,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";

const CreateAcademicDepartment = () => {
  const [addDepartment] = useAddAcademicDepartmentMutation();

  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);

  const academicSemesterOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await addDepartment(data);
    if (res?.data?.success) {
      toast(res?.data?.message);
    }
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <PHForm onSubmit={onSubmit}>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="name" label="Academic Department" />
              </Col>

              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect
                  label="Academic Faculty"
                  name="academicFaculty"
                  options={academicSemesterOptions}
                ></PHSelect>
              </Col>
            </Row>
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Row>
    </>
  );
};

export default CreateAcademicDepartment;
