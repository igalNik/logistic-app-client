import { EquipmentType } from './equipment-type/EquipmentType';
// import { User } from './User';

export interface SignatureActionWithSerial {
  _id: string;
  actionType: 'signature' | 'return';
  equipmentId: EquipmentType & { hasSerialNumber: true };
  quantity: number;
  serialNumbers: string[]; // ✅ required
}

export interface SignatureActionWithoutSerial {
  _id: string;
  actionType: 'signature' | 'return';
  equipmentId: EquipmentType & { hasSerialNumber: false };
  quantity: number;
  serialNumbers?: never; // ✅ forbidden
}
export type SignatureAction =
  | SignatureActionWithSerial
  | SignatureActionWithoutSerial;

// export interface Signature {
//   _id: string;
//   userId: Pick<User, '_id' | 'fullName' | 'personalNumber'>;
//   actions: SignatureAction[];
// }
export interface SignatureRow {
  _id: string;
  userId: string;
  userPersonalNumber: string;
  userFirstName: string;
  userLastName: string;
  equipmentId: string;
  equipmentName: string;
  equipmentHasSerial: boolean;
  actionType: 'signature' | 'return'; // ✅ use your ACTION_TYPES enum values
  quantity: number;
  actionDate: Date;
}

export type Signature = SignatureRow[];
