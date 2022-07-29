<template>
	<view id="foundPassword">
	<view class="title">
		验证当前用户
	</view>
	<div class="form">
		<view class="name">
			<span>用户名</span>
			<input class="userName" v-model="name">
		</view>
		<view class="account">
			<span>账号</span>
			<input class="userAccount" v-model="account">
		</view>
	</div>
	
	<div class="confirm">
		<button type="primary" @click="confirm">下一步</button>
	</div>
	<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {testUser} from '@/service/user.js'
	export default {
		data() {
			return {
				name:"",
				account:""
			}
		},
		methods: {
			showToast() {
				this.$refs.uToast.show({
				title: '验证失败',
				type: 'warning',
				})
			},
			async confirm(){
				const result =await testUser({name:this.name,account:this.account})
				if(result){
					uni.navigateTo({
						url:`../modifyPassword/modifyPassword?id=${result.id}`
					})
				}else{
					this.showToast()
				}
			}
			
		}
	}
</script>

<style lang="scss">
#foundPassword{
		padding: 80rpx;
		.title{
			font-size: 50rpx;
		}
		.form{
			margin-top: 90rpx;
		    .account,.name{
			    display: flex;
			    margin-top: 40rpx;
			    padding:15rpx;
			    border-bottom: 1px solid #ccc;
			    font-size: 30rpx;
		          span{
					width: 25%;
			        margin-right: 40rpx;
		        }
		    }
		}
		.confirm{
			margin-top: 100rpx;
		}
}
</style>
