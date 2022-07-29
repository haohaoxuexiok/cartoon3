<template>
	<view id="password">
		<view class="title">
			验证当前密码
		</view>
		<div class="form">
			<span>密码</span>
			<input class="password" v-model="password" type="password">
		</div>
		
		<div class="next">
			<button type="primary" @click="next">下一步</button>
		</div>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {testPassword} from '@/service/user.js'
	export default {
		data() {
			return {
				password:""
			}
		},
		methods: {
			showToast() {
				this.$refs.uToast.show({
				title: '密码验证错误',
				type: 'warning',
				})
			},
			async next(){
				const result =await testPassword({password:this.password})
				if(result=="密码正确"){
					uni.navigateTo({
						url:"./modifyPassword/modifyPassword"
					})
				}else{
				   this.showToast()
				}
			}
		}
	}
</script>

<style lang="scss">
	#password{
		padding: 80rpx;
		.title{
			font-size: 50rpx;
		}
		.form{
			display: flex;
			margin-top: 90rpx;
			padding:15rpx;
			border-bottom: 1px solid #ccc;
			font-size: 30rpx;
		   .password{
			  margin-left: 40rpx;
		    }
		}
		.next{
			margin-top: 100rpx;
		}
	}

</style>
