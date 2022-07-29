import { post,get } from './index.js'

export function addOrder(data){
	//console.log(data)
	return post('/orderDeal',{
		name:data
	})
}

export function getOrder(data){
	return get('/order',{
		name:data
	})
}

export function addCategoryNum(name){
	return post('/addCategoryNum',{
		name:name
	})
}

export function getCategoryRank(){
	return get('/getCategoryRank')
}