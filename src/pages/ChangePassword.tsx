import { Button, Row } from "antd";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/admin/userManagement.api";
import { useAppDispatch } from "../redux/hook";
import { logOut } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await changePassword(data);
    console.log(res.data.success);
    if (res?.data?.success) {
      dispatch(logOut());
      navigate("/login");
      //   return <Navigate to="/login" replace={true} />;
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput type="text" name="oldPassword" label="Old Password"></PHInput>
        <PHInput type="text" name="newPassword" label="New Password"></PHInput>
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default ChangePassword;
