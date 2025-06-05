// export interface SoldersRow {
//   personalNumber: string;
//   fullName: string;
//   phoneNumber: string;
//   email: string;
//   role: string;
//   appRole: string;
//   department: { id: string; name: string };

import { User } from '../../../../types/User';

// }
export type SoldersRow = Partial<User>;
