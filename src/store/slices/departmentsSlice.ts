import { createSlice } from '@reduxjs/toolkit';
import Departments from '../../pages/Departments';
import { Department } from '../../types/Department';

interface DepartmentsState {
  allDepartments: Department[];
}

const initialState: DepartmentsState = [];

const departmentsSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {},
});
