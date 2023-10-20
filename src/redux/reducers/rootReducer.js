import { combineReducers } from 'redux'

import articlesReducer from '../slices/articlesSlice'
import authSlice from '../slices/authSlice'

const rootReducer = combineReducers({
	articles: articlesReducer,
	auth: authSlice,
})

export default rootReducer
