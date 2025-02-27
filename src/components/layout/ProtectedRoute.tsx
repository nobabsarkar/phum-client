import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logOut, useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  // const user = useAppSelector(selectCurrentUser);
  let user;
  if (token) {
    user = verifyToken(token);
  }

  if (role !== undefined && role !== user?.role) {
    dispatch(logOut());
    return <Navigate to="/login" replace={true}></Navigate>;
  }

  if (!token) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }

  return children;
};

export default ProtectedRoute;
