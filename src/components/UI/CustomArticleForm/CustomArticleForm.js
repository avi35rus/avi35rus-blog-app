import React from 'react'

import classes from './CustomArticleForm.module.scss'

const CustomArticleForm = ({ children, title, onSubmit }) => {
	return (
		<div className={classes.customArticleFormContainer}>
			{title && <h1>{title}</h1>}
			<form onSubmit={onSubmit} className={classes.customArticleForm}>
				{children}
			</form>
		</div>
	)
}

export default CustomArticleForm
