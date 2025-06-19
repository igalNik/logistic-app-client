import { InventoryItem } from './InventoryItem.type';

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
