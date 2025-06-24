export interface EquipmentType {
  _id: string;
  name: string;
  description?: string;
  provider?: 'צה"ל' | 'תרומה' | 'אישי' | 'אחר';
  hasSerialNumber: boolean;
}
