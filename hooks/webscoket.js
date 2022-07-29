//ws://localhost:8000
/*export default function useWebScoket (handleMessage) {
	const ws = new WebSocket("ws://localhost:8888")
	
	const init = () => {
		bindEvent()
	}
	
	function bindEvent () {
		wx.addEventListener('open',handleOpen)
		wx.addEventListener('close',handleClose)
		wx.addEventListener('error',handleError)
		wx.addEventListener('message',handleMesssage)
	}
	
	function handleOpen (e) {
		console.log('open')
	}
	function handleClose (e) {
		console.log('close')
	}
	function handleError (e) {
		console.log('err')
	}
	
	init()
}*/

export default function connectSocketInit(data) {
	            let num = 0
			    const socketTask = uni.connectSocket({
				url: "ws:localhost:8000",
				success(data) {
					console.log("websocket连接成功");
				},
			});
			
			    socketTask.onOpen((res) => {
				
				console.log("WebSocket连接正常打开中...！");
				// 注：只有连接正常打开中 ，才能正常成功发送消息
				socketTask.send({
				data:JSON.stringify(data),
				async success() {
				console.log("消息发送成功");
				},
			});
			})
		}