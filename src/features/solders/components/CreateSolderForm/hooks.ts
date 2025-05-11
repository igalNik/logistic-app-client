import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CreateSolder } from '../../../../types/solder/CreateSolder.type';
import { getAllDepartments } from '../../../../api/departments';
import { objectToOption } from '../../../../utils/dropdown.util';
import { initialSolderInfo } from './constants';
import { DropdownOption } from '../../../../types/dropdown.types';
import { Department } from '../../../../types/Department';

export const useCreateSolderForm = () => {
  const [solderInfo, setSolderInfo] = useState<CreateSolder>(initialSolderInfo);
  const firstNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  const inputChangeHandlers = useMemo(() => {
    const handlers: Record<keyof CreateSolder, (val: string | number) => void> =
      {} as any;

    (Object.keys(solderInfo) as (keyof CreateSolder)[]).forEach((field) => {
      handlers[field] = (val: string | number) => {
        setSolderInfo((prev) => ({
          ...prev,
          [field]: typeof prev[field] === 'number' ? Number(val) : String(val),
        }));
      };
    });

    return handlers;
  }, []);

  const handleODepartmentSelect = useCallback(
    (option: DropdownOption) => {
      setSolderInfo((prev) => ({ ...prev, departmentId: option.id }));
    },
    [] // No dependencies, as setSolderInfo is stable
  );
  const handleRoleSelect = useCallback(
    (option: DropdownOption) => {
      setSolderInfo((prev) => ({ ...prev, role: option.label }));
    },
    [] // No dependencies, as setSolderInfo is stable
  );

  const getDepartmentOptions = useCallback(async function () {
    const res = await getAllDepartments();
    const departments = res?.data;

    if (!departments) return [];

    const options = departments.map((department) =>
      objectToOption<Department>(department, '_id', 'name')
    );

    return options;
  }, []);

  return {
    solderInfo,
    firstNameRef,
    inputChangeHandlers,
    handleODepartmentSelect,
    getDepartmentOptions,
    handleRoleSelect,
  };
};
