import { get } from './index.js'

export function getMovie(data){
	return get('/movie',{
		...data
	})
}

export function updateMovie(data){
	//console.log(data)
	return get('/getUpdateList',{
		data
	})
}

export function getSwiper(){
	
	return get("/getAppSwiper")
}