import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import CustomInput from '../../components/UI/CustomInput'
import CustomAuthForm from '../../components/UI/CustomAuthForm'
import CustomButton from '../../components/UI/CustomButton'
import { useFetching } from '../../hooks/useFetching'
import BlogService from '../../API/BlogService'
import { login } from '../../redux/slices/authSlice'

const SignIn = () => {
	const dispatch = useDispatch()

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const [loginUser, , loginError] = useFetching(async (data) => {
		const response = await BlogService.loginUser(data)
		dispatch(login(response.user))
	})

	return (
		<CustomAuthForm title={'Sign In'} onSubmit={handleSubmit(loginUser)}>
			<CustomInput
				name="email"
				label="Email"
				control={control}
				rules={{
					required: 'Email is required',
					pattern: {
						value: /^\S+@\S+$/i,
						message: 'Invalid email format',
					},
				}}
				error={errors.email || loginError['email or password']}
				inputProps={{
					type: 'text',
					autoComplete: 'email',
					placeholder: 'Email',
				}}
			/>

			<CustomInput
				name="password"
				label="Password"
				control={control}
				rules={{
					required: 'Password is required',
				}}
				error={errors.password || loginError['email or password']}
				inputProps={{
					type: 'password',
					autoComplete: 'password',
					placeholder: 'Password',
				}}
			/>

			<CustomButton name={'Login'} className={'submitButton'} type="submit" />
		</CustomAuthForm>
	)
}

export default SignIn
