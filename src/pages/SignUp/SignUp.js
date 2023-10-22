import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import CustomInput from '../../components/UI/CustomInput'
import CustomAuthForm from '../../components/UI/CustomAuthForm'
import CustomCheckbox from '../../components/UI/CustomCheckbox'
import CustomButton from '../../components/UI/CustomButton'
import { useFetching } from '../../hooks/useFetching'
import BlogService from '../../API/BlogService'

const SignUp = () => {
	const {
		handleSubmit,
		control,
		formState: { errors },
		watch,
	} = useForm({
		defaultValues: {
			email: '',
			username: '',
			password: '',
			repeatPassword: '',
		},
	})

	const [registerUser, , registerError] = useFetching(async (data) => {
		await BlogService.registerUser(data)
	})

	return (
		<CustomAuthForm title={'Create new account'} onSubmit={handleSubmit(registerUser)}>
			<CustomInput
				name="username"
				label="Username"
				control={control}
				rules={{
					required: 'Username is required',
					minLength: { value: 3, message: 'Username is too short' },
					maxLength: { value: 20, message: 'Username is too long' },
				}}
				error={errors.username || registerError.username}
				inputProps={{
					type: 'text',
					autoComplete: 'username',
					placeholder: 'Username',
				}}
			/>

			<CustomInput
				name="email"
				label="Email address"
				control={control}
				rules={{
					required: 'Email is required',
					pattern: {
						value: /^\S+@\S+$/i,
						message: 'Invalid email format',
					},
				}}
				error={errors.email || registerError.email}
				inputProps={{
					type: 'text',
					autoComplete: 'email',
					placeholder: 'Email address',
				}}
			/>

			<CustomInput
				name="password"
				label="Password"
				control={control}
				rules={{
					required: 'Password is required',
					minLength: { value: 6, message: 'Your password needs to be at least 6 characters' },
					maxLength: { value: 40, message: 'Password must be no more than 40 characters' },
				}}
				error={errors.password}
				inputProps={{
					type: 'password',
					autoComplete: 'new-password',
					placeholder: 'Password',
				}}
			/>

			<CustomInput
				name="repeatPassword"
				label="Repeat Password"
				control={control}
				rules={{
					required: 'Repeat Password is required',
					validate: (value) => value === watch('password') || 'Passwords do not match',
				}}
				error={errors.repeatPassword}
				inputProps={{
					type: 'password',
					autoComplete: 'new-password',
					placeholder: 'Password',
				}}
			/>

			<CustomCheckbox
				name="agree"
				label="I agree to the processing of my personal information"
				control={control}
				rules={{ required: 'You must agree to the terms' }}
				error={errors.agree}
			/>

			<CustomButton name={'Create'} className={'submitButton'} type="submit" />

			<p>
				Already have an account? <Link to="/sign-in">Sign In</Link>.
			</p>
		</CustomAuthForm>
	)
}

export default SignUp
