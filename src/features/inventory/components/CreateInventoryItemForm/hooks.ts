import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CreateSolder } from '../../../../types/solder/CreateSolder.type';
import { getAllDepartments } from '../../../../api/departments';
import { objectToOption } from '../../../../utils/dropdown.util';
import { initialSolderInfo } from './constants';
import { Department } from '../../../../types/Department';

export const useCreateSolderForm = () => {
  const [solderInfo, setSolderInfo] = useState<CreateSolder>(initialSolderInfo);

  const firstNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  const inputChangeHandlers = useMemo(() => {
    const handlers: Record<
      keyof CreateSolder,
      ChangeEventHandler<HTMLInputElement>
    > = {} as any;

    (Object.keys(solderInfo) as (keyof CreateSolder)[]).forEach((field) => {
      handlers[field] = (event) => {
        setSolderInfo((prev) => ({
          ...prev,
          [field]: event.target.value,
        }));
      };
    });

    return handlers;
  }, [solderInfo]);

  const handleODepartmentSelect = useCallback((value: string) => {
    setSolderInfo((prev) => ({ ...prev, departmentId: value }));
  }, []);

  const handleRoleSelect = useCallback((value: string) => {
    setSolderInfo((prev) => ({ ...prev, role: value }));
  }, []);

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
