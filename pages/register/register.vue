<template>
	<view id="register">
		<view class="title">
			注册
		</view>
		<view class="content">

			<u-form ref="registerFormRef" label-width="180rpx" :model="registerInfo" :rules="registerFormRules"
				class="form">
				<!-- 用户名-->
				<u-form-item prop="name" size="medium" left-icon="account-fill"
				:left-icon-style="{fontSize:'20px',marginRight:'20px',color:'#808080'}">
					<u-input v-model="registerInfo.name" 
					placeholder="请输入用户名"></u-input>
				</u-form-item>
				<!-- 账号-->
				<u-form-item prop="account" size="medium" left-icon="account"
				:left-icon-style="{fontSize:'20px',marginRight:'20px',color:'#808080'}">
					<u-input v-model="registerInfo.account"
					placeholder="请输入账号"></u-input>
				</u-form-item>
				<!-- 密码 -->
				<u-form-item prop="password"  size="medium" left-icon="lock"
				:left-icon-style="{fontSize:'20px',marginRight:'20px',color:'#808080'}">
					<u-input v-model="registerInfo.password" type="password"
					placeholder="请输入密码"></u-input>
				</u-form-item>

				<u-form-item prop="oldPassword"  size="medium" left-icon="lock-fill"
				:left-icon-style="{fontSize:'20px',marginRight:'20px',color:'#808080'}">
					<u-input v-model="registerInfo.oldPassword" type="password"
					placeholder="确认密码">
					</u-input>
				</u-form-item>
			</u-form>
		</view>
		<view class="handleRegister" @click="handleRegister">
			立即注册
		</view>
	</view>
</template>

<script>
	import {
		nameTest,
		register
	} from '../../service/register.js'
    
	import useWebScoket from '../../hooks/webscoket.js'
	export default {
		data() {
			var validatePassword = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'))
				} else if (value !== this.$data.registerInfo.password) {
					callback(new Error('两次输入密码不一致!'))
				} else {
					callback()
				}
			}
			var validateName = (rule, value, callback) => {
				nameTest(this.$data.registerInfo.name).then(res => {
					if (res === '请输入用户名') {
						callback(new Error('请输入用户名'))
					} else if (res === "用户名已存在") {
						callback(new Error('用户名已存在'))
					} else {
						callback()
					}
				})
				/*uni.request({
					url: `http://localhost:8000/register`, //仅为示例，并非真实接口地址。
					method:'POST',
					data:{
						name:this.$data.registerInfo.name
					},
					header: {
					'Content-Type': 'application/x-www-form-urlencoded'  
					}, 
					success: (res) => {
					console.log(res.data)
					if (res.data === '请输入用户名') {
					  callback(new Error('请输入用户名'))
					} else if (res.data == "用户名已存在") {
					  callback(new Error('用户名已存在'))
					} else {
					  callback()
					  }
					}
				})*/
			}
			return {
				registerInfo: {
					name: "",
					account: "",
					password: "",
					oldPasswor: ""
				},
				registerFormRules: {
					name: [{
						required: true,
						validator: validateName,
						trigger: 'blur'
					}],
					account: [{
							required: true,
							message: '请输入登录账号',
							trigger: 'blur'
						},
						{
							min: 0,
							max: 10,
							message: '长度在 3 到 10 个字符',
							trigger: 'blur'
						}
					],
					// 验证密码是否合法
					password: [{
							required: true,
							message: '请输入登录密码',
							trigger: 'blur'
						},
						{
							min: 0,
							max: 15,
							message: '长度在 3 到 15 个字符',
							trigger: 'blur'
						}
					],
					oldPassword: [{
						required: true,
						validator: validatePassword,
						trigger: 'blur'
					}]
				}
			}
		},
		onReady() {
			this.$refs.registerFormRef.setRules(this.registerFormRules);
		},
		methods: {
			handleRegister() {
				/* uni.request({
			   	url: `http://localhost:8000/register`, //仅为示例，并非真实接口地址。
			   	method:'POST',
			   	data:{
			   		name:this.$data.registerInfo.name,
					account:this.$data.registerInfo.account,
					password:this.$data.registerInfo.password
			   	},
			   	header: {
			   	'Content-Type': 'application/x-www-form-urlencoded'  
			   	}, 
			   	success: (res) => {
					
				},
			  })*/
				register(this.$data.registerInfo).then(res => {
					useWebScoket({total:res.total})
					uni.navigateTo({
						url:'/pages/login/login'
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import url('element-ui/lib/theme-chalk/index.css');
	/deep/.u-form-item {
		border-bottom: 1px solid #ccc;
		margin-bottom: 40rpx;
	}
	/deep/.u-form-item--left__content__label {
		font-size: 32rpx;
	}
	.title {
		font-size: 50rpx;
		margin-left: 20rpx;
		margin-top: 20rpx;
	}
#register{
	padding:  20px;
	.handleRegister {
		position: fixed;
		left: 50%;
		bottom: 10%;
		transform: translate(-50%, -50%);
		width: 90%;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 40rpx;
	    background-color:#079BF3;
		color: aliceblue;
		border-radius: 50rpx;
		text-align: center;

	}

	.content {
		position: fixed;
		left: 50%;
		top: 48%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		padding: 0 10px;
		width: 90%;
		height: 800rpx;
		border-radius: 20px;
		box-sizing: border-box;
	}
}
</style>
