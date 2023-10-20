import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	articles: [],
	currentPage: 1,
	articlesPerPage: 5,
	totalArticlesCount: 0,
}

const articlesSlice = createSlice({
	name: 'articles',
	initialState,
	reducers: {
		setArticles: (state, action) => {
			state.articles = action.payload
		},
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload
		},
		setTotalArticlesCount: (state, action) => {
			state.totalArticlesCount = action.payload
		},
	},
})

export const { setArticles, setCurrentPage, setTotalArticlesCount } = articlesSlice.actions

export default articlesSlice.reducer
