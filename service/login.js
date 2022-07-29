import { post } from './index.js'

export function login(data){
	console.log(data)
	return post('/login',{
		...data
	})
}