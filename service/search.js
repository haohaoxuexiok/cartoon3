import { get,post } from './index.js'

export function getSearchResult(name){
	return get('/search',{
		name:name
	})
}

export function getSearchResults(name){
	return get('/searchKeys',{
		name:name
	})
}

export function getHotSearchWords(){
	return get('/getHotSearchWords')
}

export function addSearchNum(name){
	return post('/addSearchNum',{
		name:name
	})
}

export function getHotSearchRank(){
	return get('/getHotSearchRank')
}