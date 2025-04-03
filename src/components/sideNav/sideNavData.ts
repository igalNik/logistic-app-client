import { v4 as uuidv4 } from 'uuid';
import { SideNavSectionData } from './types';

export const sideNavData: SideNavSectionData[] = [
  {
    id: uuidv4(),
    title: 'טבלאות',
    items: [
      { id: uuidv4(), text: 'בית', iconName: 'Home', navTo: '/' },
      {
        id: uuidv4(),
        text: 'מחלקות',
        iconName: 'Department',
        navTo: '/departments',
      },
      {
        id: uuidv4(),
        text: 'חיילים',
        iconName: 'People',
        navTo: '/solders',
      },
      {
        id: uuidv4(),
        text: 'מלאי',
        iconName: 'Inventory',
        navTo: '/Inventory',
      },
      {
        id: uuidv4(),
        text: 'חתימות',
        iconName: 'Signature',
        navTo: '/signatures',
      },
    ],
  },
  {
    id: uuidv4(),
    title: 'משימות',
    items: [
      {
        id: uuidv4(),
        text: 'תרומות',
        iconName: 'Gift',
        navTo: '/people',
      },
    ],
  },
];
