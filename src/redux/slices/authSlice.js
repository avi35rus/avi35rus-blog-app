import { createSlice } from '@reduxjs/toolkit'

const userFromStorage = JSON.parse(localStorage.getItem('user'))

const initialState = {
	user: userFromStorage || null,
	isAuthenticated: !!userFromStorage,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
			state.user = action.payload
			state.isAuthenticated = true
			localStorage.setItem('user', JSON.stringify(action.payload))
		},
		logout: (state) => {
			state.user = null
			state.isAuthenticated = false
			localStorage.removeItem('user')
		},
		update: (state, action) => {
			state.user = {
				...state.user,
				...action.payload,
			}
			localStorage.setItem('user', JSON.stringify(state.user))
		},
	},
})

export const { login, logout, update } = authSlice.actions

export default authSlice.reducer
