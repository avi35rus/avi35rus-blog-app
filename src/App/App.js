import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import AppHeader from '../components/AppHeader'
import ArticleList from '../components/ArticleList'
import ArticleDetails from '../pages/ArticleDetails'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import EditProfile from '../pages/EditProfile'
import CreateArticle from '../pages/CreateArticle'
import EditArticle from '../pages/EditArticle'
import store from '../redux/store'

import PrivateRoute from './Routes/PrivateRoute'
import PublicRoute from './Routes/PublicRoute'

import './App.scss'

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<div className="app">
					<AppHeader />
					<main className="main">
						<Switch>
							<Route path="/" component={ArticleList} exact />
							<Route path="/articles" component={ArticleList} exact />
							<Route path="/articles/:slug" component={ArticleDetails} exact />
							<PublicRoute path="/sign-in" component={SignIn} />
							<PublicRoute path="/sign-up" component={SignUp} />
							<PrivateRoute path="/profile" component={EditProfile} />
							<PrivateRoute path="/new-article" component={CreateArticle} />
							<PrivateRoute path="/articles/:slug/edit" component={EditArticle} />
						</Switch>
					</main>
				</div>
			</Router>
		</Provider>
	)
}

export default App
