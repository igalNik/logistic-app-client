import { getAllDepartments } from '../../../api/departments';

export const departmentsLoader = async () => {
  const departments = await getAllDepartments();

  return departments;
};
