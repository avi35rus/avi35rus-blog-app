import React, { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import CustomInput from '../../components/UI/CustomInput'
import CustomArticleForm from '../../components/UI/CustomArticleForm'
import CustomButton from '../../components/UI/CustomButton'
import { useFetching } from '../../hooks/useFetching'
import BlogService from '../../API/BlogService'

const EditArticle = () => {
	const history = useHistory()
	const currentUser = useSelector((state) => state.auth.user)
	const { slug } = useParams()

	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			title: '',
			description: '',
			body: '',
			tagList: [''],
		},
	})

	const { fields, append, remove } = useFieldArray({ control, name: 'tagList' })

	const [fetchArticle] = useFetching(async (slug) => {
		const articleData = await BlogService.getArticle(slug)
		reset(articleData)

		if (articleData.author.username !== currentUser.username) {
			history.push(`/articles/${slug}`)
		}
	})

	const [updateArticle, isUpdateLoading, updateError] = useFetching(async (data) => {
		await BlogService.updateArticle(slug, data, currentUser.token)
		history.push(`/articles/${slug}`)
	})

	const handleAddTag = () => {
		append('')
	}

	const handleRemoveTag = (index) => {
		remove(index)
	}

	useEffect(() => {
		fetchArticle(slug)
	}, [slug])

	return (
		<CustomArticleForm title="Edit article" onSubmit={handleSubmit(updateArticle)}>
			<CustomInput
				name="title"
				label="Title"
				control={control}
				rules={{ required: 'Title is required' }}
				error={errors.title || updateError.title}
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
				error={errors.description || updateError.shortDescription}
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
				error={errors.body || updateError.text}
				inputProps={{
					type: 'textarea',
					placeholder: 'Text',
					style: { height: '168px' },
				}}
				textarea
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
							name="Delete"
							className="deleteTagButton"
							type="button"
							onClick={() => handleRemoveTag(index)}
						/>
						{index === fields.length - 1 && (
							<CustomButton name="Add tag" className="addTagButton" type="button" onClick={handleAddTag} />
						)}
					</div>
				))}
				{fields.length === 0 && (
					<CustomButton
						style={{ display: 'flex' }}
						name="Add tag"
						className="addTagButton"
						type="button"
						onClick={handleAddTag}
					/>
				)}
			</div>

			<CustomButton name="Update" className="submitButton" type="submit" disabled={isUpdateLoading} />
		</CustomArticleForm>
	)
}

export default EditArticle
