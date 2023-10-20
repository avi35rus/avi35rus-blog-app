import React, { useState } from 'react'
import { format } from 'date-fns'
import { Avatar, Tag, Popconfirm, Button } from 'antd'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'

import BlogService from '../../API/BlogService'
import { useFetching } from '../../hooks/useFetching'
import CustomButton from '../UI/CustomButton'
import BoxArticle from '../UI/BoxArticle'

import classes from './ArticleCard.module.scss'

const ArticleCard = ({ article, showBody, onEdit, onDelete, currentUser }) => {
	const { slug, title, description, body, tagList, createdAt, author, favorited, favoritesCount } = article
	const formattedCreatedDate = createdAt ? format(new Date(createdAt), 'MMMM dd, yyyy') : null
	const isCurrentUserAuthor = currentUser ? author.username === currentUser.username : null
	const userData = useSelector((state) => state.auth.user)
	const isAuth = useSelector((state) => state.auth.isAuthenticated)

	const [isFavorited, setIsFavorited] = useState(favorited)
	const [likeCount, setLikeCount] = useState(favoritesCount)

	const [handleLike] = useFetching(async () => {
		const token = userData ? userData.token : null

		if (!isFavorited) {
			const likeData = await BlogService.likeArticle(slug, token)
			setIsFavorited(likeData.article.favorited)
			setLikeCount(likeData.article.favoritesCount)
		} else {
			const unlikeData = await BlogService.unlikeArticle(slug, token)
			setIsFavorited(unlikeData.article.favorited)
			setLikeCount(unlikeData.article.favoritesCount)
		}
	})

	return (
		<BoxArticle>
			<div className={classes.articleHeader}>
				<div className={classes.articleInfo}>
					<div className={classes.articleTitle}>
						<Link to={`/articles/${slug}`}>
							<h2>{title}</h2>
						</Link>
						<button className={classes.articleLike} onClick={userData ? handleLike : null}>
							{isAuth ? (
								isFavorited ? (
									<HeartFilled style={{ color: 'rgba(255, 7, 7, 1)' }} />
								) : (
									<HeartOutlined style={{ color: 'rgba(0, 0, 0, 0.75)' }} />
								)
							) : (
								<HeartOutlined style={{ color: 'rgba(0, 0, 0, 0.75)' }} />
							)}
							{likeCount}
						</button>
					</div>
					<div>
						{tagList.map((tag, index) => (
							<Tag className={classes.articleTag} key={index}>
								{tag}
							</Tag>
						))}
					</div>
					<p className={classes.articleDescription}>{description}</p>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
					<div className={classes.authorInfo}>
						<div>
							<p className={classes.authorUsername}>{author.username}</p>
							<p className={classes.createdDate}>{formattedCreatedDate}</p>
						</div>
						<Avatar size={48} src={author.image} style={{ flexShrink: '0' }} />
					</div>
					{showBody && isCurrentUserAuthor && (
						<div style={{ display: 'flex', gap: '12px' }}>
							<Popconfirm
								title="Delete the article"
								description="Are you sure to delete this article?"
								onConfirm={onDelete}
								okText="Yes"
								cancelText="No"
							>
								<Button danger>Delete</Button>
							</Popconfirm>
							<CustomButton name={'Edit'} className={'editArticleButton'} onClick={onEdit} />
						</div>
					)}
				</div>
			</div>
			{showBody && <ReactMarkdown className={classes.articleBody}>{body}</ReactMarkdown>}
		</BoxArticle>
	)
}

export default ArticleCard
