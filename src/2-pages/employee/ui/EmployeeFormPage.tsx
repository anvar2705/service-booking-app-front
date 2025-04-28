import { useParams } from "react-router";

import { EmployeeForm } from "@entities/employee";

export const EmployeeFormPage = () => {
    const { id, mode } = useParams();

    return <EmployeeForm id={id} mode={mode} />;
};
