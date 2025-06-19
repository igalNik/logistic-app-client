import { v4 as uuidv4 } from 'uuid';
import { SideNavSectionData } from './types';

export const sideNavData: SideNavSectionData[] = [
  {
    id: uuidv4(),
    title: 'ניהול מלאי',
    items: [
      {
        id: uuidv4(),
        text: 'סוג ציוד',
        iconName: 'Equipment',
        navTo: '/equipment-types',
      },
      {
        id: uuidv4(),
        text: 'מלאי',
        iconName: 'Inventory',
        navTo: '/inventory',
      },
    ],
  },
  {
    id: uuidv4(),
    title: 'ניהול סד"כ',
    items: [
      {
        id: uuidv4(),
        text: 'חיילים',
        iconName: 'People',
        navTo: '/solders',
      },
      {
        id: uuidv4(),
        text: 'מחלקות',
        iconName: 'Department',
        navTo: '/departments',
      },
    ],
  },
  {
    id: uuidv4(),
    title: 'תנועות',
    items: [
      {
        id: uuidv4(),
        text: 'החתמות/זיכויים',
        iconName: 'Exchange',
        navTo: '/Inventory',
      },
      {
        id: uuidv4(),
        text: 'קבלת ציוד',
        iconName: 'Receive',
        navTo: '/solders',
      },
      {
        id: uuidv4(),
        text: 'הורדת ציוד',
        iconName: 'Removal',
        navTo: '/remove',
      },
    ],
  },
];
