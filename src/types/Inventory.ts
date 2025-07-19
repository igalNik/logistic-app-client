import { EquipmentType } from './EquipmentType';
import { User } from './User';

export interface InventoryItem {
  id: string;
  equipmentTypeId: string | EquipmentType;
  quantity: number;
  serialNumbers?: string[];
  updatedAt?: Date;
  updatedBy?: string | User;
}

export interface GetInventoryResponse {
  status: 'success' | 'fails';
  count: number;
  data: InventoryItem[];
}
export interface GetInventoryByIdResponse {
  status: 'success' | 'fails';
  data: InventoryItem;
}
export interface GetInventoryByEquipmentTypeResponse {
  status: 'success' | 'fails';
  count: number;
  data: InventoryItem[];
} 