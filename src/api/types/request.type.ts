// API Request Types for LogisticApp

// Auth Requests
export interface AuthSignupRequest {
  personalNumber: string;
  password: string;
  passwordConfirm: string;
}

export interface AuthLoginRequest {
  personalNumber: string;
  password: string;
}

export interface AuthForgotPasswordRequest {
  email?: string;
  personalNumber?: string;
}

export interface AuthResetPasswordRequest {
  password: string;
  passwordConfirm: string;
}

export interface AuthUpdatePasswordRequest {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
}

// User Requests
export interface CreateUserRequest {
  personalNumber: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email?: string;
  role?: string;
  departmentId?: string;
  password?: string;
  passwordConfirm?: string;
  passwordChangedAt?: string;
  appRole?: string;
}

export interface UpdateUserRequest {
  personalNumber?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  role?: string;
  departmentId?: string;
  password?: string;
  passwordConfirm?: string;
  passwordChangedAt?: string;
  appRole?: string;
}

export interface UpdateManyUsersRequest {
  id: string;
  personalNumber?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  role?: string;
  departmentId?: string;
  password?: string;
  passwordConfirm?: string;
  passwordChangedAt?: string;
  appRole?: string;
}

export type DeleteManyUsersRequest = string[];

// Department Requests
export interface CreateDepartmentRequest {
  name: string;
  officerId: string;
  sergeantId: string;
}

export interface UpdateDepartmentRequest {
  name?: string;
  officerId?: string;
  sergeantId?: string;
}

// Equipment Type Requests
export interface CreateEquipmentTypeRequest {
  name: string;
  description?: string;
  provider: 'צה"ל' | 'תרומה' | 'אישי';
  hasSerialNumber?: boolean;
  tags?: string[];
  imageUrl?: string;
}

export interface UpdateEquipmentTypeRequest {
  name?: string;
  description?: string;
  provider?: 'צה"ל' | 'תרומה' | 'אישי';
  hasSerialNumber?: boolean;
  tags?: string[];
  imageUrl?: string;
}

export interface UpdateManyEquipmentTypesRequest {
  id: string;
  name?: string;
  description?: string;
  provider?: 'צה"ל' | 'תרומה' | 'אישי';
  hasSerialNumber?: boolean;
  tags?: string[];
  imageUrl?: string;
}

export type DeleteManyEquipmentTypesRequest = string[];

// Inventory Requests
export interface CreateInventoryRequest {
  equipmentTypeId: string;
  quantity: number;
  serialNumbers?: string[];
  updatedBy?: string;
  updatedAt?: string;
}

export interface UpdateInventoryRequest {
  equipmentTypeId?: string;
  quantity?: number;
  serialNumbers?: string[];
  updatedBy?: string;
  updatedAt?: string;
}

export interface UpdateManyInventoriesRequest {
  id: string;
  equipmentTypeId?: string;
  quantity?: number;
  serialNumbers?: string[];
  updatedBy?: string;
  updatedAt?: string;
}

// User Equipment Inventory Requests
export interface CreateUserEquipmentInventoryRequest {
  userId: string;
  items: UserEquipmentInventoryItemRequest[];
}

export interface UpdateUserEquipmentInventoryRequest {
  userId?: string;
  items?: UserEquipmentInventoryItemRequest[];
}

export interface UserEquipmentInventoryItemRequest {
  equipmentId: string;
  quantity: number;
  serialNumber?: string[];
  changedAt?: string;
}

// User Equipment Signature Actions Requests
export interface CreateUserEquipmentSignatureActionsRequest {
  userId: string;
  items: UserEquipmentSignatureActionItemRequest[];
  note?: string;
  actionDate?: string;
}

export interface UpdateUserEquipmentSignatureActionsRequest {
  userId?: string;
  items?: UserEquipmentSignatureActionItemRequest[];
  note?: string;
  actionDate?: string;
}

export interface UserEquipmentSignatureActionItemRequest {
  equipmentId: string;
  actionType: 'signature' | 'return';
  quantity: number;
}

// Query Parameters
export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface SortQuery {
  sort?: string;
}

export interface FilterQuery {
  [key: string]: any;
}

export interface FieldSelectionQuery {
  fields?: string;
}

export interface PopulateQuery {
  populate?: string;
}

export type ApiQuery = PaginationQuery & SortQuery & FilterQuery & FieldSelectionQuery & PopulateQuery;

// URL Parameters
export interface UserParams {
  id: string;
}

export interface DepartmentParams {
  id: string;
}

export interface EquipmentTypeParams {
  id: string;
}

export interface InventoryParams {
  id: string;
}

export interface UserEquipmentInventoryParams {
  id: string;
}

export interface UserEquipmentSignatureActionsParams {
  id: string;
}

export interface AuthParams {
  token?: string;
}

// Nested User Parameters (for nested routes)
export interface UserNestedParams {
  userId: string;
}

export interface DepartmentNestedParams {
  departmentId: string;
} 