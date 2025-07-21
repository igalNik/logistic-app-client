import { EquipmentType } from '../equipment-type/EquipmentType';

// For equipment with serial numbers
export interface SignatureActionWithSerial {
  _id: string;
  actionType: 'signature' | 'return';
  equipmentId: EquipmentType & { hasSerialNumber: true };
  quantity: number;
  serialNumbers: string[]; // ✅ required
}

// For equipment without serial numbers
export interface SignatureActionWithoutSerial {
  _id: string;
  actionType: 'signature' | 'return';
  equipmentId: EquipmentType & { hasSerialNumber: false };
  quantity: number;
  serialNumbers?: never;
}

export type SignatureAction =
  | SignatureActionWithSerial
  | SignatureActionWithoutSerial;

export interface Signature {
  _id: string;
  userid: string;
  userPersonalNumber: string;
  userFirstName: string;
  userLastName: string;
  equipmentId: string;
  equipmentName: string;
  equipmentHasSerial: boolean;
  actionType: 'signature' | 'return';
  quantity: number;
  actionDate: string; // ISO Date string
}

// export interface Signature {
//   _id: string;
//   userId: Pick<User, '_id' | 'fullName' | 'personalNumber'>;
//   actions: SignatureAction[];
// }
