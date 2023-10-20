import React from 'react'
import { Controller } from 'react-hook-form'

import classes from './CustomInput.module.scss'

const CustomInput = ({ name, label, control, rules, error, inputProps, textarea }) => {
	return (
		<label className={classes.customInput}>
			<span>{label}</span>
			<Controller
				name={name}
				control={control}
				rules={rules}
				render={({ field }) => (
					<>
						{textarea ? (
							<textarea {...field} {...inputProps} className={error ? classes.invalidInput : ''} />
						) : (
							<input {...field} {...inputProps} className={error ? classes.invalidInput : ''} />
						)}
						{error && <p className={classes.errorMessage}>{error.message}</p>}
					</>
				)}
			/>
		</label>
	)
}

export default CustomInput
