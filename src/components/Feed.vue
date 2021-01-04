<template>
	<div>
		<McvLoading v-if="isLoading"/>

		<McvErrorMessage v-if="error"/>

		<div v-if="feed">
			<div 
				class="article-preview" 
				v-for="(article, index) in feed.articles" 
				:key="index"
			>
				<div class="article-meta">
					<router-link 
						:to="{name: 'userProfile', params: {slug: article.author.username}}"
					>
						<img :src="article.author.image"/>
					</router-link>

					<div class="info">
						<router-link 
						:to="{name: 'userProfile', params: {slug: article.author.username}}"
						class="author"
					>
						{{article.author.username}}
					</router-link>
						<span class="date">{{article.createdAt}}</span>
					</div>	

					<div class="pull-xs-right">
						ADD TO FAVORITES
					</div>
				</div>

				<router-link 
					:to="{name: 'article', params: {slug: article.slug}}"
					class="preview-link"
				>
					<h1>{{article.title}}</h1>
					<p>{{article.description}}</p>
					<span>Read more...</span>
					<McvTagList :tags="article.tagList"/>
				</router-link>

			</div>
			<McvPagination 
				:total="feed.articlesCount" 
				:limit="limit" 
				:current-page="currentPage"
				:url="baseUrl"
			/>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/feed'
import {limit} from '@/helpers/vars'
import McvPagination from '@/components/Pagination'
//импорт библиотеки query-string(она для работы с url)
import {stringify, parseUrl} from 'query-string'
import McvLoading from '@/components/Loading'
import McvErrorMessage from '@/components/ErrorMessage'
import McvTagList from '@/components/TagList'

export default {
	name: 'McvFeed',
	props: {
		apiUrl: {
			type: String,
			required: true
		}
	},
	components: {
		McvPagination,
		McvLoading,
		McvErrorMessage,
		McvTagList
	},
	data() {
		return {
			//total: 500,
			limit,
			url: '/'
		}
	},
	computed: {
		...mapState({
			isLoading: state => state.feed.isLoading,
			feed: state => state.feed.data,
			error: state => state.feed.error
		}),
		currentPage() {
			//console.log('currentPage', this.$route)
			return Number(this.$route.query.page || '1')
		},
		baseUrl() {
			//console.log('baseUrl', this.$route)
			return this.$route.path
		},
		offset() {
			return this.currentPage * limit - limit
		}
	},
	watch: {
		currentPage() {
			console.log('currentPage changed')
			this.fetchFeed()
		}
	},
	mounted() {
		console.log('init feed')
		this.fetchFeed()
		//this.$store.dispatch(actionTypes.getFeed, {apiUrl: this.apiUrl})
	},
	methods: {
		fetchFeed() {
			const parsedUrl = parseUrl(this.apiUrl)
			const stringifiedParams = stringify({
				limit,
				offset: this.offset,
				...parsedUrl.query
			})
			//console.log(parsedUrl, stringifiedParams)
			const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
			console.log(apiUrlWithParams)
			this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams})
		}
	}
}
</script>