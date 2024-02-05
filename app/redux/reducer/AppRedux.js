import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	isOnBoardOpened: false,
	userData: {
		phone: '',
		countryItem: null,
	},
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setOnBoardStatus: (state, action) => {
			console.log('redux_Onboard----->' + action.payload);
			state.isOnBoardOpened = action.payload;
		},
		updateUserData: (state, action) => {
			const {phone, countryItem} = action.payload;
			console.log('redux----->' + phone + '<:::>' + JSON.stringify(countryItem, null, 2));

			state.userData.phone = phone;
			state.userData.countryItem = countryItem;
		},
	},
});

export const {setOnBoardStatus, updateUserData} = appSlice.actions;
export default appSlice.reducer;
