import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import CustomInput from '../../components/UI/CustomInput'
import CustomAuthForm from '../../components/UI/CustomAuthForm'
import CustomButton from '../../components/UI/CustomButton'
import { useFetching } from '../../hooks/useFetching'
import BlogService from '../../API/BlogService'
import { update } from '../../redux/slices/authSlice'

const EditProfile = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const userData = useSelector((state) => state.auth.user)

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: userData.username,
			email: userData.email,
			newPassword: '',
			image: '',
		},
	})

	const [updateUser, isUpdateLoading, updateError] = useFetching(async (data) => {
		const response = await BlogService.updateUserProfile(data, userData.token)
		dispatch(update(response.user))

		if (!isUpdateLoading) {
			history.push('/')
		}
	})

	return (
		<CustomAuthForm title={'Edit Profile'} onSubmit={handleSubmit(updateUser)}>
			<CustomInput
				name="username"
				label="Username"
				control={control}
				rules={{ required: 'Username is required' }}
				error={errors.username || updateError.username}
				inputProps={{
					type: 'text',
					autoComplete: 'username',
					placeholder: 'Username',
				}}
			/>

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
				error={errors.email || updateError.email}
				inputProps={{
					type: 'text',
					placeholder: 'Email',
				}}
			/>

			<CustomInput
				name="newPassword"
				label="New Password"
				control={control}
				rules={{
					required: 'Password is required',
					minLength: { value: 6, message: 'Your password needs to be at least 6 characters' },
					maxLength: { value: 40, message: 'Password must be no more than 40 characters' },
				}}
				error={errors.newPassword}
				inputProps={{
					type: 'password',
					autoComplete: 'new-password',
					placeholder: 'New Password',
				}}
			/>

			<CustomInput
				name="image"
				label="Avatar image"
				control={control}
				rules={{
					required: 'Avatar is required',
					pattern: {
						value: /https?:\/\/.+/i,
						message: 'Invalid URL for avatar image',
					},
				}}
				error={errors.image}
				inputProps={{
					type: 'text',
					placeholder: 'Avatar Image',
				}}
			/>

			<CustomButton name={'Save'} className={'submitButton'} type="submit" />
		</CustomAuthForm>
	)
}

export default EditProfile
