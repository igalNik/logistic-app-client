import { EquipmentType } from '../equipment-type/EquipmentType';
import { User } from '../User';

export interface InventoryItem {
  id: string;
  equipmentTypeId: string | EquipmentType;
  quantity: number;
  serialNumbers?: string[];
  updatedAt?: Date;
  updatedBy?: string | User;
}
