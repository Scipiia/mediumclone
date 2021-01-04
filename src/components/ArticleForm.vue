<template>
	<div class="editor-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-10 offset-md-1 col-xs-12">
					<!--<McvValidationErrorrs/>-->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
//import McvValidationErrorrs from '@/components/ValidationErrors'

export default {
	name: 'McvArticleForm',
	components: {
		//McvValidationErrorrs
	},
	props: {
		initialValues: {
			type: Object,
			reqiured: true
		},
		errors: {
			type: Object,
			reqiured: false
		},
		isSubmitting: {
			type: Boolean,
			reqiured: true
		}
	},
	data() {
		return {
			title: '',
			description: '',
			body: '',
			tagList: ''
		}
	},
	methods: {
		onSubmit() {
			const form = {}
			this.$emit('articleSubmit', form)
		}
	}
}
</script>