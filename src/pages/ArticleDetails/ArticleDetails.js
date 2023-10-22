import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import BlogService from '../../API/BlogService'
import { useFetching } from '../../hooks/useFetching'
import ArticleCard from '../../components/ArticleCard'

const ArticleDetails = () => {
	const { slug } = useParams()
	const history = useHistory()
	const [article, setArticle] = useState(null)
	const userData = useSelector((state) => state.auth.user)
	const token = userData ? userData.token : null

	const [fetchArticle] = useFetching(async () => {
		const articleData = await BlogService.getArticle(slug, token)

		setArticle(articleData)
	})

	const [deleteArticle] = useFetching(async () => {
		await BlogService.deleteArticle(slug, token)
		history.push('/')
	})

	useEffect(() => {
		fetchArticle(slug)
	}, [slug])

	return (
		<div style={{ margin: '0 auto', width: '65%', minWidth: 'min-content' }}>
			{article && (
				<ArticleCard
					article={article}
					showBody={true}
					onEdit={() => {
						history.push(`/articles/${slug}/edit`)
					}}
					onDelete={() => {
						deleteArticle(slug)
					}}
					currentUser={userData}
				/>
			)}
		</div>
	)
}

export default ArticleDetails
