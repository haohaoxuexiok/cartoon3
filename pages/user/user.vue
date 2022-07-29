<template>
	<view id="user">
		<view class="background">
			
		</view>
		<view class="header">
			<image class="avater" v-if="avatarUrl"
			:src="login_state?avatarUrl:'../../static/user/no_login.png'"
			@click="chooseImage"></image>
		    
			<image class="avater" v-if="!avatarUrl"
			:src="login_state?'../../static/user/avater.png':'../../static/user/no_login.png'"
			@click="chooseImage"></image>
			<view class="isLogin">
				<view class="no_login" v-if="!login_state">
					<span @click="handleLogin">登录</span>
					<span class="space">/</span>
					<span @click="handleRegister">注册</span>
				</view>
				<view class="login" @click="modify_UserName" v-if="login_state">
					<span>{{name}}</span>
					<image class="modify_UserName" src="../../static/user/modifyUserName.png"></image>
				</view>
			</view>	
		</view>
		<view class="modify_pas" @click="modify_pas" v-if="state">
			<div class="left_pas">
				<image class="modify_icon" src="../../static/user/modify.png" mode=""></image>
				<span>修改密码</span>
			</div>
			
			<image class="arrow" src="../../static/user/arrow.png" mode=""></image>
		</view>
		
		<div class="history" @click="history">
		<div class="left_his">
		<image class="history_icon" src="../../static/user/history.png" mode=""></image>
		<span>观看记录</span>
		</div>
		<image class="arrow" src="../../static/user/arrow.png" mode=""></image>
		</div>
		<view class="suggest" @click="suggest">
			<div class="left_sug">
				<image class="suggest_icon" src="../../static/user/suggest.png" mode=""></image>
				<span>用户建议</span>
			</div>
			
			<image class="arrow" src="../../static/user/arrow.png" mode=""></image>
		</view>
		
		<view class="leave" @click="leave" v-if="state">
			<span>退出登录</span>
		</view>
	</view>
</template>

<script>
	import { userAvatar } from '@/service/user.js'
	export default {
		data() {
			return {
				login_state:uni.getStorageSync('login_state'),
				name:uni.getStorageSync('user').name,
				avatarUrl:"",
				state:uni.getStorageSync('login_state')
			}
		},
		onLoad() {
			console.log(this.avatarUrl,555)
		    this.avatarUrl = uni.getStorageSync('user').avatar
		},
		onShow(){
		    this.name = uni.getStorageSync('user').name
		},
		methods: {
			chooseImage(){
				let _this = this
				uni.chooseImage({
					count:1,
					sizeType: ['original', 'compressed'],
					success: (res) => {
					const tempFilePaths =res.tempFilePaths//图片临时数组
						uni.uploadFile({
							url: 'http://localhost:8888/uploadAvatar', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'avatar',
							header: {
							'Authorization':uni.getStorageSync('token'),
							}, 
							success: (uploadFileRes) => {
								 var getTimestamp=new Date().getTime();  
								_this.avatarUrl = uploadFileRes.data+"?timestamp="+getTimestamp
								userAvatar()
							}
						});
					}
			    })
			},
			modify_UserName(){
				uni.navigateTo({
					url:'/pages/userName/userName'
				})
			},
			modify_pas(){
				uni.navigateTo({
					url:'/pages/password/password'
				})
			},
			leave(){
				this.login_state=false
				this.state = false
				uni.clearStorage();
			},
			handleLogin(){
				uni.redirectTo({
					url:"../login/login"
				})
			},
			handleRegister(){
				uni.navigateTo({
					url:"../register/register"
				})
			},
			history(){
		     if(uni.getStorageSync('login_state') == ''){
			uni.showToast({
				title: '请先登录',
				duration: 2000,
				icon:"none"
			});
		}else{
			uni.navigateTo({
				url:"../history/history"
			})
		}
				
			},
			suggest(){
				if(uni.getStorageSync('login_state') == ''){
					uni.showToast({
					title: '请先登录',
						duration: 2000,
						icon:"none"
					});
				}else{
					uni.navigateTo({
						url:"../suggest/suggest"
					})
				}
			},
		},
		
	}
</script>

<style lang="scss" scoped>
#user{
	display: flex;
	flex-direction: column;
	position:fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	height: 100%;
	width: 100%;
	padding: 0 20rpx;
	background-color:#F5F5F5;
	box-sizing: border-box;

	.header{
		position: relative;
		margin-top: 150rpx;
		padding: 20rpx 20rpx;
		height: 200rpx;
		border-radius: 20rpx;
		background-color: #fff;
		text-align: center;
		.avater{
			position: absolute;
			top: -70%;
			left: 50%;
			transform: translate(-50%,50%);
			width: 120rpx;
			height: 120rpx;
			border: 10px solid #fff;
			border-radius: 50%;
			border: 1px solid #f5f5f5;
			background-color: #fff;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.isLogin{
			margin-top: 50rpx;
			.space{
				margin: 0 5px;
			}
			.login{
				display: flex;
				justify-content: center;
				align-items: center;
				font-size:28rpx;
				.modify_UserName{
					height: 40rpx;
					width: 40rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.history,.suggest,.modify_pas{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 20rpx;
		margin-top: 50rpx;
		background-color: #fff;
		border-radius:20rpx;
		.history_icon,.suggest_icon,.modify_icon{
			height: 50rpx;
			width: 50rpx;
		}
		.arrow{
			height: 30rpx;
			width: 30rpx;
		}
		.left_his,.left_sug,.left_pas{
			display: flex;
			align-items: center;
			font-size: 26rpx;
			span{
				margin-left: 25rpx;
			}
		}
	}
	.leave{
		padding: 20rpx 0;
		margin-top: 50rpx;
		color: #1296db;
		font-weight: bold;
		font-size: 34rpx;
		background-color: #fff;
		border-radius:20rpx;
		text-align: center;
	}
}
</style>
