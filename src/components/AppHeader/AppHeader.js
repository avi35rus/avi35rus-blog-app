import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar } from 'antd'

import { logout } from '../../redux/slices/authSlice'
import CustomButton from '../UI/CustomButton'

import classes from './AppHeader.module.scss'

const Header = () => {
	const dispatch = useDispatch()

	const user = useSelector((state) => state.auth.user)
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

	const handleLogout = () => {
		dispatch(logout())
	}

	return (
		<header className={classes.header}>
			<Link to="/" className={classes.logo}>
				Realworld Blog
			</Link>
			<nav className={classes.authNav}>
				{isAuthenticated ? (
					<>
						<Link to="/new-article">
							<CustomButton name={'Create article'} className={'createArticleButton'} />
						</Link>
						<Link to="/profile">
							<span className={classes.userName}>{user.username}</span>
						</Link>
						<Link to="/profile">
							{user.image && <Avatar size="large" src={user.image} alt={`${user.username}'s avatar`} />}
						</Link>
						<CustomButton name={'Log Out'} className={'logOutButton'} onClick={handleLogout} />
					</>
				) : (
					<>
						<Link to="/sign-in">
							<CustomButton name={'Sign In'} className={'signInButton'} />
						</Link>
						<Link to="/sign-up">
							<CustomButton name={'Sign Up'} className={'signUpButton'} />
						</Link>
					</>
				)}
			</nav>
		</header>
	)
}

export default Header
