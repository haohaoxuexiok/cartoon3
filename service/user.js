import { post,get,clear} from './index.js'



export function clearHistory(){
	return clear(`/clearHistory/${uni.getStorageSync('user').name}`)
}

export function keepHistory(data){
	return post('/keepHistory',{
		...data
	})
}

export function getHistory(data){
	return get('/getHistory',{
		user:data
	})
}

export function keepSuggest(data){

	return post('/keepSuggest',{
		...data
	})
}

export function keepUserVisitRecord(data){

	return post('/keepUserVisitRecord',{
		...data
	})
}
export function getUserVisitRecord(time){

	return get('/getUserVisitRecord',{
		time:time
	})
}

export function changeUserAction(user){

	return post('/changeUserAction',{
		...user
	})
}

export function modifyName(data){
	return post('/modifyName',{
		...data
	})
}
export function testPassword(data){
	return post(`/testPassword/${uni.getStorageSync('user').id}`,{
		...data
	})
}

export function modifyPassword(data){
	console.log(data,5555)
	return post(`/modifyPassword/${data.id}`,{
		password:data.password
	})
}

export function testUser(data){
	return post('/testUser',{
		...data
	})
}

export function userAvatar(){
	return get(`/userAvatar/${uni.getStorageSync('user').id}`)
}
