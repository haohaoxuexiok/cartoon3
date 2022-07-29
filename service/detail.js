import { get } from './index.js'

export function getMovieDetail(name){
	return get('/movie/detailSingle',{
		name:name
	})
}


export function getMovieUrl(name){
	return get('/movie/url',{
		name
	})
}