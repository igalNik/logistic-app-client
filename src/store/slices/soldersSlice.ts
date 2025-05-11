import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { GetAllSoldersResponse, getAllSolders } from '../../api/solders';

export interface SoldersState {
  allSolders: User[];
}

const initialState: SoldersState = { allSolders: [] };

export const getAllSolders = createAsyncThunk<
  GetAllSoldersResponse | undefined
>('solders/getAll', async () => {
  try {
    const users = await getAllSolders();
    return users;
  } catch (error) {
    console.log(error);
  }
});

const soldersSlice = createSlice({
  name: 'solders',
  initialState,
  reducers: {
    setUsers(state: SoldersState, action: PayloadAction<User[]>) {
      state.allSolders = action.payload;
    },
  },
});
export default soldersSlice.reducer;
