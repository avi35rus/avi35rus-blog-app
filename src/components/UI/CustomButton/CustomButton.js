import React from 'react'

import classes from './CustomButton.module.scss'

const CustomButton = ({ name, className, ...props }) => {
	const buttonClassName = `${classes.сustomButton} ${className && classes[className]}`

	return (
		<button className={buttonClassName} {...props}>
			{name}
		</button>
	)
}

export default CustomButton
