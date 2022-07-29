import { get } from './index.js'

export function getMovieRelate(type){
	return get('/play/movieRelate',{
		...type
	})
}
