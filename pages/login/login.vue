<template>
	<view id="login">
		<image class="background" src="../../static/login/bac2.png" mode="aspectFit"></image>
		<view class="content">
			<u-form labelPosition="left" :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
				<u-form-item label="账号" labelWidth="60px" prop="account">
					<u-input v-model="loginForm.account" @input="input" placeholder="请输入账号"
						placeholderStyle="color:#DCDCDC"></u-input>
				</u-form-item>

				<u-form-item label="密码" labelWidth="60px" prop="password">
					<u-input v-model="loginForm.password" placeholder="请输入密码" placeholderStyle="color:#DCDCDC">
					</u-input>
				</u-form-item>
			</u-form>
            
			<view class="register" @click="register">
				<span>注册</span>
			</view>
			<view class="found" @click="found">
				<span>找回密码</span>
			</view>
			<view class="handleLogin" @click="handleLogin">
				<text>登</text>录
			</view>
		</view>
        
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		login
	} from '../../service/login.js'
    import {keepUserVisitRecord,getUserVisitRecord,changeUserAction} from '@/service/user.js'
	import {getCurrentDetailTime,getCurrentTime,getTime} from '@/utils/getTime.js'
	import useWebScoket from '../../hooks/webscoket.js'
	export default {
		data() {
			return {
				loginForm: {
					account: "",
					password: ""
				},
				loginFormRules: {
					// 验证用户名是否合法
					account: [
						{
							required: true,
							message: '请输入登录账号',
							trigger: ['blur']
						},
						{
							min: 0,
							max: 10,
							message: '长度在 0 到 10 个字符',
							trigger: ['blur']
						},
						
					],
					// 验证密码是否合法
					password: [
						
						{
							required: true,
							message: '请输入登录密码',
							trigger: ['blur']
						},
						{
							min: 0,
							max: 15,
							message: '长度在 0 到 15 个字符',
							trigger: ['blur']
						}
					]
				},
				list: [
				{
					name: '周一'
				}, {
					name: '周二'
				},{
					name: '周三',
				
				}, {
					name: '周四',
				
				}, {
					name: '周五',
				
				},{
					name: '周六',
				
				},
				{
					name: '周天',
				
				}
				],
			}
		},
		onReady() {
			this.$refs.loginFormRef.setRules(this.loginFormRules);
		},
		methods: {
			found(){
				uni.navigateTo({
					url:'/pages/password/foundPassword/foundPassword'
				})
			},
			showToast(title) {
				this.$refs.uToast.show({
				title: title,
				type: 'warning',
				})
			},
			input(value) {
				console.log(value)
			},
			register() {
				uni.navigateTo({
					url: "/pages/register/register"
				})
			},
			handleLogin() {
		const _this = this
	this.$refs.loginFormRef.validate(async (rule, value, callback) => {
		if (rule == true) {
			const {
				account,
				password
			} = this.$data.loginForm
			login(this.$data.loginForm).then(res => {
			if (res !== "用户名或者密码错误") {
			 if(res.state=="启用"){
			uni.clearStorage()
			uni.setStorage({
				key: 'token',
				data: res.token,
				success() {
					_this.$store.dispatch('change_loginState')	
					uni.setStorage({
						key: 'user',
						data: res,
					})
					uni.switchTab({
						url: '/pages/home/home',
						success:async () => {
							if(uni.getStorageSync('user')){
						     
							let date = new Date();
							let dateDay = date.getDay();
							if(dateDay == 0){
								dateDay = 7
							}
							const currentData = getCurrentDetailTime();
							const time = currentData + "\xa0" + _this.list[dateDay-1].name;
							 keepUserVisitRecord({time:time,user:uni.getStorageSync('user').name,userId:uni.getStorageSync('user').id})
							 const result = await getUserVisitRecord(getCurrentTime())
						//	 changeUserAction({user:uni.getStorageSync('user').name,action:true})
							 useWebScoket({userVisitRecord:result})
							}
						}
					})
			    }
		    })
		  }else{
			  _this.showToast('没有登录权限')
		  }
		}else{
			      _this.showToast('用户名或密码错误')           
				
							}

						
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	#login {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		z-index: 9;
		background-color:#c5c5c5;
	}
    
	#login .background {
		position: relative;
		left: 50%;
		top: 20%;
		transform: translate(-50%,-50%);
		z-index: -1;
	}

	.content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #fff;
		font-size: 38rpx;
	}

	.handleLogin {
		height: 80rpx;
		line-height: 80rpx;
		margin-top: 150rpx;
		width: 600rpx;
		border: 2px solid #fff;
		border-radius: 20rpx;
		text-align: center;
		color: #fff;
		font-size: 30rpx;
		font-weight: bold;
	}

	.handleLogin text {
		margin-right: 20rpx;
	}

	/deep/.u-form-item--left__content__label {
		font-size: 34rpx;
		color: #fff;
	}

	/deep/.u-form-item {
		border-bottom: 2px solid #fff;
		padding: 0;
		margin-bottom: 20rpx;
	}

	.register {
		float: right;
		font-size: 28rpx;
		font-weight: bold;
		color: #fff;
		overflow: hidden;
	}
	.found{
		float: left;
		font-size: 28rpx;
		font-weight: bold;
		overflow: hidden;
	}
</style>
