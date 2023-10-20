import React from 'react'
import { Controller } from 'react-hook-form'

import classes from './CustomCheckbox.module.scss'

const CustomCheckbox = ({ control, name, label, rules, error }) => {
	return (
		<div className={classes.customCheckboxContainer}>
			<label>
				<Controller
					name={name}
					control={control}
					rules={rules}
					render={({ field }) => <input type="checkbox" {...field} />}
				/>
				<span>{label}</span>
			</label>
			{error && <p className={classes.errorMessage}>{error.message}</p>}
		</div>
	)
}

export default CustomCheckbox
