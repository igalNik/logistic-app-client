// API Response Types for LogisticApp

import { Signature } from '@/types/Signature';

// Generic API response wrapper
export interface ApiResponse<T> {
  status: 'success' | 'fail' | 'error';
  items?: number;
  data?: T;
  token?: string;
  message?: string;
}

// User Embedded Department
export interface UserEmbeddedDepartment {
  name: string;
  id: string;
}

// User Response - using _id as per current response templates
export interface UserResponse {
  _id: string;
  personalNumber: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email?: string;
  role: string;
  department: UserEmbeddedDepartment;
  password?: string;
  passwordChangedAt?: string;
  appRole?: string;
  isActive?: boolean;
  fullName?: string;
}

// Department Response
export interface DepartmentResponse {
  _id: string;
  name: string;
  officerId: string;
  sergeantId: string;
}

// Equipment Type Response
export interface EquipmentTypeResponse {
  _id: string;
  name: string;
  description?: string;
  provider: string;
  hasSerialNumber: boolean;
  tags?: string[];
  imageUrl?: string;
}

// Inventory Response
export interface InventoryResponse {
  _id: string;
  equipmentTypeId: string;
  quantity: number;
  serialNumbers?: string[];
  updatedBy?: string;
  updatedAt: string;
}

// User Equipment Inventory Item
export interface UserEquipmentInventoryItem {
  equipmentId: string;
  quantity: number;
  serialNumber?: string[];
  changedAt?: string;
}

// User Equipment Inventory Response
export interface UserEquipmentInventoryResponse {
  _id: string;
  userId: string;
  items: UserEquipmentInventoryItem[];
}

// User Equipment Signature Action Item
export interface UserEquipmentSignatureActionItem {
  equipmentId: string;
  actionType: string;
  quantity: number;
}

// User Equipment Signature Actions Response
export interface UserEquipmentSignatureActionsResponse {
  _id: string;
  userId: string;
  items: UserEquipmentSignatureActionItem[];
  actionDate: string;
  note?: string;
}

// Auth Responses
export type AuthSignupResponse = ApiResponse<UserResponse & { token: string }>;
export type AuthLoginResponse = ApiResponse<UserResponse & { token: string }>;
export type AuthCheckResponse = ApiResponse<UserResponse & { token: string }>;
export type AuthLogoutResponse = ApiResponse<undefined>;
export type AuthForgotPasswordResponse = ApiResponse<{ message: string }>;
export type AuthResetPasswordResponse = ApiResponse<
  UserResponse & { token: string }
>;
export type AuthUpdatePasswordResponse = ApiResponse<
  UserResponse & { token: string }
>;

// User Endpoints
export type GetUserResponse = ApiResponse<UserResponse>;
export type GetUsersResponse = ApiResponse<UserResponse[]>;
export type CreateUserResponse = ApiResponse<UserResponse>;
export type UpdateUserResponse = ApiResponse<UserResponse>;
export type DeleteUserResponse = ApiResponse<undefined>;
export type UpdateManyUsersResponse = ApiResponse<{ updatedCount: number }>;
export type DeleteManyUsersResponse = ApiResponse<{ message: string }>;
export type GetUsersStatsResponse = ApiResponse<
  Array<{
    name: string;
    totalUsers: number;
    users: Array<{ name: string; personalNumber: string }>;
  }>
>;

// Department Endpoints
export type GetDepartmentResponse = ApiResponse<DepartmentResponse>;
export type GetDepartmentsResponse = ApiResponse<DepartmentResponse[]>;
export type CreateDepartmentResponse = ApiResponse<DepartmentResponse>;
export type UpdateDepartmentResponse = ApiResponse<DepartmentResponse>;
export type DeleteDepartmentResponse = ApiResponse<undefined>;

// Equipment Type Endpoints
export type GetEquipmentTypeResponse = ApiResponse<EquipmentTypeResponse>;
export type GetEquipmentTypesResponse = ApiResponse<EquipmentTypeResponse[]>;
export type CreateEquipmentTypeResponse = ApiResponse<EquipmentTypeResponse>;
export type UpdateEquipmentTypeResponse = ApiResponse<EquipmentTypeResponse>;
export type DeleteEquipmentTypeResponse = ApiResponse<undefined>;
export type UpdateManyEquipmentTypesResponse = ApiResponse<{
  updatedCount: number;
}>;
export type DeleteManyEquipmentTypesResponse = ApiResponse<{ message: string }>;

// Inventory Endpoints
export type GetInventoryResponse = ApiResponse<InventoryResponse>;
export type GetInventoriesResponse = ApiResponse<InventoryResponse[]>;
export type CreateInventoryResponse = ApiResponse<InventoryResponse>;
export type UpdateInventoryResponse = ApiResponse<InventoryResponse>;
export type DeleteInventoryResponse = ApiResponse<undefined>;
export type UpdateManyInventoriesResponse = ApiResponse<{
  updatedCount: number;
}>;

// User Equipment Inventory Endpoints
export type GetUserEquipmentInventoryResponse =
  ApiResponse<UserEquipmentInventoryResponse>;
export type GetUserEquipmentInventoriesResponse = ApiResponse<
  UserEquipmentInventoryResponse[]
>;
export type CreateUserEquipmentInventoryResponse =
  ApiResponse<UserEquipmentInventoryResponse>;
export type UpdateUserEquipmentInventoryResponse =
  ApiResponse<UserEquipmentInventoryResponse>;
export type DeleteUserEquipmentInventoryResponse = ApiResponse<undefined>;

// User Equipment Signature Actions Endpoints
export type GetUserEquipmentSignatureActionsResponse =
  ApiResponse<UserEquipmentSignatureActionsResponse>;
export type GetUserEquipmentSignatureActionsListResponse = ApiResponse<
  UserEquipmentSignatureActionsResponse[]
>;
export type CreateUserEquipmentSignatureActionsResponse =
  ApiResponse<UserEquipmentSignatureActionsResponse>;
export type UpdateUserEquipmentSignatureActionsResponse =
  ApiResponse<UserEquipmentSignatureActionsResponse>;
export type DeleteUserEquipmentSignatureActionsResponse =
  ApiResponse<undefined>;

// Signature Response
export type SignatureResponse = Signature;

// Signature Endpoints
export type GetSignatureResponse = ApiResponse<SignatureResponse>;
export type GetSignaturesResponse = ApiResponse<SignatureResponse>;
export type CreateSignatureResponse = ApiResponse<SignatureResponse>;
export type UpdateSignatureResponse = ApiResponse<SignatureResponse>;
export type DeleteSignatureResponse = ApiResponse<undefined>;
export type UpdateManySignaturesResponse = ApiResponse<{
  updatedCount: number;
}>;
export type DeleteManySignaturesResponse = ApiResponse<{ message: string }>;

// Error Response
export interface ErrorResponse {
  status: 'fail' | 'error';
  message: string;
  error?: any;
}
