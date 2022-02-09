import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { items: [], nextId: 0, deleteId: null, editData: null },

  reducers: {
    replaceUsers(state, action) {
      state.nextId = action.payload.nextId;
      state.items = action.payload.items;
    },
    addUserToItems(state, action) {
      state.nextId++;
      const newItem = action.payload;
      state.items.push({
        id: newItem.id,
        name: newItem.name,
        username: newItem.username,
        email: newItem.email,
        address: newItem.address,
        phone: newItem.phone,
        company: newItem.company,
      });
    },
    sortItems(state, action) {
      if (action.payload === 'ASC') {
        state.items.sort((userA, userB) => {
          return userA.username > userB.username ? 1 : -1;
        });
      } else if (action.payload === 'DESC') {
        state.items.sort((userA, userB) => {
          return userA.username < userB.username ? 1 : -1;
        });
      }
      else {
       state.items.sort((userA, userB) => {
         return userA.id > userB.id ? 1 : -1;
       }); 
      }
    },
    editUser(state, action) {
      const existUser = state.items.find(
        (item) => item.id === +action.payload.id
      );
      if (!existUser) return;
      existUser.email = action.payload.user.email;
      existUser.name = action.payload.user.name;
    },
    clearEditData(state) {
      state.editData = null;
    },
    setDeleteId(state, action) {
      state.deleteId = action.payload;
    },

    deleteUser(state, action) {
      if (state.deleteId) {
        const buffer = state.items.filter((item) => item.id !== action.payload);
        state.items = buffer;
      }
    },
    setEditData(state, action) {
      state.editData = {
        name: action.payload.name,
        email: action.payload.email,
      };
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
