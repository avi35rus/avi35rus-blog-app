import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, Spin, Alert } from 'antd'

import { setArticles, setCurrentPage, setTotalArticlesCount } from '../../redux/slices/articlesSlice'
import BlogService from '../../API/BlogService'
import { useFetching } from '../../hooks/useFetching'
import ArticleCard from '../ArticleCard'

import classes from './ArticleList.module.scss'

const ArticleList = () => {
	const dispatch = useDispatch()
	const articlesData = useSelector((state) => state.articles)
	const { articles, currentPage, articlesPerPage, totalArticlesCount } = articlesData
	const userData = useSelector((state) => state.auth.user)
	const token = userData ? userData.token : null

	const [fetchArticles, isArticlesLoading, articlesError] = useFetching(async () => {
		const offset = (currentPage - 1) * articlesPerPage
		const articlesData = await BlogService.getArticles(articlesPerPage, offset, token)

		const { articles, articlesCount } = articlesData

		dispatch(setArticles(articles))
		dispatch(setTotalArticlesCount(articlesCount))
	})

	const handlePageChange = (page) => {
		dispatch(setCurrentPage(page))
		localStorage.setItem('currentPage', page)
	}

	useEffect(() => {
		const savedCurrentPage = localStorage.getItem('currentPage')
		if (savedCurrentPage) {
			dispatch(setCurrentPage(parseInt(savedCurrentPage, 10)))
		}
	}, [])

	useEffect(() => {
		fetchArticles()
	}, [currentPage])

	return (
		<div className={classes.articleList}>
			{isArticlesLoading ? (
				<Spin size="large" />
			) : articlesError ? (
				<Alert message={articlesError} type="error" />
			) : (
				<>
					{articles.map((article) => (
						<ArticleCard key={article.slug} article={article} showBody={false} />
					))}
					<Pagination
						style={{ textAlign: 'center' }}
						current={currentPage}
						onChange={handlePageChange}
						total={totalArticlesCount}
						showSizeChanger={false}
					/>
				</>
			)}
		</div>
	)
}

export default ArticleList
