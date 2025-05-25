import { getAllSolders } from '../../../api/solders';

export const soldersLoader = async () => {
  const users = await getAllSolders();
  return users;
};
