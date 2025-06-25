import { Outlet } from "react-router-dom";

const AuthLayout = () => (
    <div className="min-h-screen w-full flex items-center justify-center">
        <Outlet />
    </div>
);

export default AuthLayout;