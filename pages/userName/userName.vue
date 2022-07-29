<template>
	<view id="userName">
		<input class="userName" type="text" v-model="name" focus>
	</view>
</template>

<script>
	import {modifyName} from '@/service/user.js'
	export default {
		data() {
			return {
				name:uni.getStorageSync('user').name
			}
		},
		methods: {
			onNavigationBarButtonTap(e){
				const _this = this
				uni.showModal({
					title: '提示',
					content: '确认提交',
					success:async function (res) {
						if (res.confirm) {
						const result  =await modifyName({id:uni.getStorageSync('user').id,
							userName:_this.name})
					    uni.setStorage({
					    	key: 'user',
					    	data: result,
							success() {
								uni.switchTab({
									url:'../user/user'
								})
							}
					    })
						
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				}
		}
	}
</script>

<style lang="scss">
#userName{
	position: fixed;
	left: 0;
	top: 44px;
	right: 0;
	bottom: 0;
	height: 100%;
	width: 100%;
	background-color: #F5F5F5;
	
	.userName{
		margin-top: 40rpx;
		padding: 20rpx;
		font-size: 28rpx;
		background-color: #fff;
	}
}
</style>
