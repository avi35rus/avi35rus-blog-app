import React, { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import CustomInput from '../../components/UI/CustomInput'
import CustomArticleForm from '../../components/UI/CustomArticleForm'
import CustomButton from '../../components/UI/CustomButton'
import { useFetching } from '../../hooks/useFetching'
import BlogService from '../../API/BlogService'

const CreateArticle = () => {
	const history = useHistory()
	const userToken = useSelector((state) => state.auth.user.token)

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: '',
			description: '',
			body: '',
			tagList: [''],
		},
	})

	const { fields, append, remove } = useFieldArray({ control, name: 'tagList' })

	const [createArticle, isCreateLoading, createError] = useFetching(async (data) => {
		const response = await BlogService.createArticle(data, userToken)

		history.push(`/articles/${response.article.slug}`)
	})

	const handleAddTag = () => {
		append('')
	}

	const handleRemoveTag = (index) => {
		remove(index)
	}

	useEffect(() => {
		handleAddTag()
	}, [])

	return (
		<CustomArticleForm title={'Create new article'} onSubmit={handleSubmit(createArticle)}>
			<CustomInput
				name="title"
				label="Title"
				control={control}
				rules={{ required: 'Title is required' }}
				error={errors.title || createError.title}
				inputProps={{
					type: 'text',
					placeholder: 'Title',
				}}
			/>

			<CustomInput
				name="description"
				label="Short Description"
				control={control}
				rules={{ required: 'Short Description is required' }}
				error={errors.description || createError.shortDescription}
				inputProps={{
					type: 'text',
					placeholder: 'Short Description',
				}}
			/>

			<CustomInput
				name="body"
				label="Text"
				control={control}
				rules={{ required: 'Text is required' }}
				error={errors.body || createError.text}
				inputProps={{
					type: 'textarea',
					placeholder: 'Text',
					style: { height: '168px' },
				}}
				textarea={true}
			/>

			<div>
				<span style={{ fontSize: '14px', lineHeight: '22px', color: 'rgba(38, 38, 38, 1)' }}>Tags</span>
				{fields.map((field, index) => (
					<div key={field.id} style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
						<CustomInput
							name={`tagList[${index}]`}
							control={control}
							rules={{ required: 'Tag is required' }}
							error={errors.tagList && errors.tagList[index]}
							inputProps={{
								type: 'text',
								placeholder: 'Tag',
							}}
						/>
						<CustomButton
							name={'Delete'}
							className={'deleteTagButton'}
							type="button"
							onClick={() => handleRemoveTag(index)}
						/>
						{index === fields.length - 1 && (
							<CustomButton name={'Add tag'} className={'addTagButton'} type="button" onClick={handleAddTag} />
						)}
					</div>
				))}
				{fields.length === 0 && (
					<CustomButton
						style={{ display: 'flex' }}
						name={'Add tag'}
						className={'addTagButton'}
						type="button"
						onClick={handleAddTag}
					/>
				)}
			</div>

			<CustomButton name={'Send'} className={'submitButton'} type="submit" disabled={isCreateLoading} />
		</CustomArticleForm>
	)
}

export default CreateArticle
