import { useMutation } from "@tanstack/react-query";

import { addServiceEmployeeMutationOptions, EmployeeModel } from "@entities/employee";
import { ServiceForm, ServiceFormTitle, ServiceModel } from "@entities/service";
import { FormMode } from "@shared/routes";

type EmployeeServicePageProps = {
    mode: FormMode;
    employeeId: EmployeeModel["id"];
    serviceUUID?: ServiceModel["uuid"];
};

export const EmployeeServicePage = (props: EmployeeServicePageProps) => {
    const { mode, employeeId, serviceUUID } = props;

    const { mutateAsync: addServiceToEmployee, isPending } = useMutation(addServiceEmployeeMutationOptions);

    const handleAddServiceToEmployee = (data: ServiceModel) => {
        addServiceToEmployee({ employeeId, uuids: [data.uuid] });
    };

    return (
        <>
            <ServiceFormTitle mode={mode} employeeId={employeeId} />
            <ServiceForm mode={mode} uuid={serviceUUID} onSave={handleAddServiceToEmployee} isSubmitting={isPending} />
        </>
    );
};
