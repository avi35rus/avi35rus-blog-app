import React from 'react'

import classes from './BoxArticle.module.scss'

const BoxArticle = ({ children }) => {
	return <div className={classes.boxArticle}>{children}</div>
}

export default BoxArticle
