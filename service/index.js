
//192.168.0.194
const BASEURL = "http://localhost:8888"
export function request(url,method="GET",data){
	const _this = this
	let token = uni.getStorageSync('token')
	return new Promise((resolve,reject) => {
		uni.request({
			url:BASEURL+url,
			method,
			data,
			header: {	
			'Content-Type': 'application/json;charset=utf-8',
			'Authorization':uni.getStorageSync('token'),
			//'content-type': 'application/x-www-form-urlencoded',
			}, 
			success: function(res) {	
				resolve(res.data)
			},
			fail:function(err){
			
			}
		})
	})
}

export function get(url,data){
	return request(url,'GET',data)
}

export function post(url,data){
	return request(url,'POST',data)
}

export function clear(url,data){
	return request(url,'DELETE',data)
}