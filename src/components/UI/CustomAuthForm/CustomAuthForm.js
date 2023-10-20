import React from 'react'

import classes from './CustomAuthForm.module.scss'

const CustomAuthForm = ({ children, title, onSubmit }) => {
	return (
		<div className={classes.customAuthFormContainer}>
			{title && <h1>{title}</h1>}
			<form onSubmit={onSubmit} className={classes.customAuthForm}>
				{children}
			</form>
		</div>
	)
}

export default CustomAuthForm
