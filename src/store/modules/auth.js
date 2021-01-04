import authApi from '@/api/auth'
import {setItem} from '@/helpers/pesistanceStorage'

const state = {
	isSubmitting: false,
	isLoading: false,
	currentUser: null,
	validationErrors: null,
	isLoggedIn: null
}


export const mutationTypes = {
	registerStart: '[auth] registerStart',
	registerSuccess: '[auth] registerSuccess',
	registerFailure: '[auth] registerFailure',

	//для страницы логина
	loginStart: '[auth] loginStart',
	loginSuccess: '[auth] loginSuccess',
	loginFailure: '[auth] loginFailure',

	getCurrentUserStart: '[auth] getCurrentUserStart',
	getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
	getCurrentUserFailure: '[auth] getCurrentUserFailure',

	//для настроек пользователя
	updateCurrentUserStart: '[auth] updateCurrentUserStart',
	updateCurrentUserSuccess: '[auth] updateCurrentUserSuccess',
	updateCurrentUserFailure: '[auth] updateCurrentUserFailure'
}

export const actionTypes = {
	register: '[auth] register',

	//логин
	login: '[auth] login',

	getCurrentUser: '[auth] getCurrentUser',

	updateCurrentUser: '[auth] updateCurrentUser'
}

export const getterTypes = {
	currentUser: '[auth] currentUser',
	isLoggedIn: '[auth] isLoggedIn',
	isAnonymous: '[auth] isAnonymous' 
}

const getters = {
	[getterTypes.currentUser]: state => {
		return state.currentUser
	},
	[getterTypes.isLoggedIn]: state => {
		return Boolean(state.isLoggedIn)
	},
	[getterTypes.isAnonymous]: state => {
		return state.isLoggedIn === false
	}
}

const mutations = {
	[mutationTypes.registerStart](state) {
		state.isSubmitting = true
		state.validationErrors = null
	},

	[mutationTypes.registerSuccess](state, payload) {
		state.isSubmitting = false
		state.currentUser = payload
		state.isLoggedIn = true
	},

	[mutationTypes.registerFailure](state, payload) {
		state.isSubmitting = false
		state.validationErrors = payload
	},

	//login страница 
	[mutationTypes.loginStart](state) {
		state.isSubmitting = true,
		state.validationErrors = null
	},

	[mutationTypes.loginSuccess](state, payload) {
		state.isSubmitting = false,
		state.currentUser = payload,
		state.isLoggedIn = true
	},

	[mutationTypes.loginFailure](state, payload) {
		state.isSubmitting = false,
		state.validationErrors = payload
	},

	[mutationTypes.getCurrentUserStart](state) {
		state.isLoading = true
	},
	[mutationTypes.getCurrentUserSuccess](state, payload) {
		state.isLoading = false
		state.currentUser = payload
		state.isLoggedIn = true
	},
	[mutationTypes.getCurrentUserFailure](state) {
		state.isLoading = false
		state.isLoggedIn = false
		state.currentUser = null
	},
	[mutationTypes.updateCurrentUserStart]() {},
	[mutationTypes.updateCurrentUserSuccess](state, payload) {
		state.currentUser = payload
	},
	[mutationTypes.updateCurrentUserFailure]() {}
}


const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationTypes.registerStart)
      authApi
        .register(credentials)
        .then(response => {
					context.commit(mutationTypes.registerSuccess, response.data.user)
					setItem('accessToken', response.data.user.token)  //сохраняем токен, что бы при ребуте страницы показывало что мы зареганы
          resolve(response.data.user)
        })
        .catch(result => {
          context.commit(mutationTypes.registerFailure, result.response.data.errors)
        })
    })
	},

	[actionTypes.login](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationTypes.loginStart)
      authApi
        .login(credentials)
        .then(response => {
					context.commit(mutationTypes.loginSuccess, response.data.user)
					setItem('accessToken', response.data.user.token)  //сохраняем токен, что бы при ребуте страницы показывало что мы зареганы
          resolve(response.data.user)
        })
        .catch(result => {
          context.commit(mutationTypes.loginFailure, result.response.data.errors)
        })
    })
	},
	
	[actionTypes.getCurrentUser](context) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getCurrentUserStart)
      authApi
        .getCurrentUser()
        .then(response => {
					context.commit(mutationTypes.getCurrentUserSuccess, response.data.user)
          resolve(response.data.user)
        })
        .catch(() => {
          context.commit(mutationTypes.getCurrentUserFailure)
        })
    })
	},

	[actionTypes.updateCurrentUser](context, {currentUserInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.updateCurrentUserStart)
      authApi
        .updateCurrentUser(currentUserInput)
        .then(user => {
					context.commit(mutationTypes.updateCurrentUserSuccess, user)
          resolve(user)
        })
        .catch((result) => {
          context.commit(mutationTypes.updateCurrentUserFailure, result.response.data.errors)
        })
    })
  }
}

export default {
	state,
	mutations,
	actions,
	getters
}