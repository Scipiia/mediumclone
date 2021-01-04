import axios from 'axios'
import {getItem} from '@/helpers/pesistanceStorage'

axios.defaults.baseURL = 'https://conduit.productionready.io/api'

axios.interceptors.request.use(config => {
	//console.log('config', config)
	const token = getItem('accessToken')
	const autorizationToken = token ? `Token ${token}` : ''
	//console.log('token', autorizationToken)
	config.headers.Autorization = autorizationToken
	return config
})

export default axios