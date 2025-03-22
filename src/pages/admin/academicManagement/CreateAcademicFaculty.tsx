import { Button, Col, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAddFacultyOfProgrammingMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";

const CreateAcademicFaculty = () => {
  const [facultyOfProgramming] = useAddFacultyOfProgrammingMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await facultyOfProgramming(data);
    if (res?.data.success) {
      toast(res?.data?.message);
    }
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <PHForm onSubmit={onSubmit}>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="name"
                  label="Faculty Of Programming"
                />
              </Col>
            </Row>
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Row>
    </div>
  );
};

export default CreateAcademicFaculty;
