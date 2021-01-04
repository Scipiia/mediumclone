<template>
	<div class="setting-page" v-if="currentUser">
		<div class="container page">
			<div class="row">
				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-centre">Settings</h1>
					<mcv-validation-errors 
						v-if="validationErrors" 
						:validation-errors="validationErrors"
					/>
					<form @submit.prevent="onSubmit">
						<fieldset>
							<fieldset class="form-group">
								<input 
									type="text" 
									class="form-control form-control-lg" 
									v-model="form.image"
									placeholder="URL of profile picture"
								>
							</fieldset>

							<fieldset class="form-group">
								<input 
									type="text" 
									class="form-control form-control-lg" 
									v-model="form.username"
									placeholder="Username"
								>
							</fieldset>

							<fieldset class="form-group">
								<textarea 
									class="form-control form-control-lg" 
									v-model="form.bio"
									placeholder="Short bio about you"
								></textarea>
							</fieldset>

							<fieldset class="form-group">
								<input 
									type="text" 
									class="form-control form-control-lg" 
									v-model="form.email"
									placeholder="Email"
								>
							</fieldset>

							<fieldset class="form-group">
								<input 
									type="password" 
									class="form-control form-control-lg" 
									v-model="form.password"
									placeholder="Password"
								>
							</fieldset>
							<button 
								type="submit" 
								class="btn btn-lg btn-primery pull-xs-right" 
								:disabled="isSubmitting"
							>
								Update settings
							</button>
						</fieldset>
					</form>
					<hr>
					<button 
						class="btn btn-outline-danger" 
						@click="logout" 
						type="text"
					>
						Or click here to logout
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import {getterTypes as authGetterTypes} from '@/store/modules/auth'


export default {
	name: 'McvSettings',
	computed: {
		...mapState({
			isSubmitting: state => state.setting.isSubmitting,
			validationErrors: state => state.setting.validationErrors
		}),
		...mapGetters({
			currentUser: authGetterTypes.currentUser
		}),
		form() {
			return {
				username: this.currentUser.username,
				bio: this.currentUser.bio,
				image: this.currentUser.image,
				email: this.currentUser.email,
				password: ''
			}
		}
	},
	methods: {
		onSubmit () {
			console.log('Submitted settings')
		},
		logout() {
			console.log('logout')
		}
	}
}
</script>