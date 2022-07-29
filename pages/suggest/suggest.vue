<template>
	<view id="suggest">

	    <view class="content">
	    	 <textarea  v-model="text" placeholder="输入您的建议或者想要我们引入的影片"
			 placeholder-style="color:#bfbfbf" focus/>
	    </view>
		 
	</view>
</template>

<script>
	import { keepSuggest } from '../../service/user.js'
	export default {
		data() {
			return {
				text:""
			}
		},
		methods: {
			//点击提交之后出发的事件
			onNavigationBarButtonTap(e){
				const _this = this
				uni.showModal({
					title: '提示',
					content: '确认提交',
					success: function (res) {
						if (res.confirm) {
							keepSuggest({suggest:_this.text,user:uni.getStorageSync('user').name}).then(res=>{
								_this.text = ""
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				/*keepSuggest({suggest:this.text,user:uni.getStorageSync('user').name}).then(res=>{
					
				})*/
			}
		}
	}
</script>

<style lang="scss">
#suggest{
	.header{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 44px;
		padding: 10rpx;
		background-color:rgb(248, 248, 248);
	}
	textarea{
		width: 100%;
		border-bottom: 1px solid #ccc;
	}
}
</style>
