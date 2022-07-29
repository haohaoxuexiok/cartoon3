import { post } from './index.js'

export function nameTest(data){
	return post('/register',{
		name:data
	})
}

export function register(data){
	return post('/register',{
		...data
	})
}