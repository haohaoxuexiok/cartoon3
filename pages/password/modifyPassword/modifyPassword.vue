<template>
	<view id="modifyPassword">
		<view class="title">
			设置新密码
		</view>
		<div class="form">
			<view class="new">
				<span>新密码</span>
				<input class="newPassword" v-model="newPassword" type="password">
			</view>
			<view class="new_">
				<span>确认密码</span>
				<input class="new_password" v-model="new_password" type="password">
			</view>
		</div>
		
		<div class="confirm">
			<button type="primary" @click="confirm">确定</button>
		</div>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {modifyPassword} from '@/service/user.js'
	export default {
		data() {
			return {
				newPassword:"",
				new_password:"",
				id:""
			}
		},
		onLoad(option) {
			this.id = option.id?parseInt(option.id):""
		},
		methods: {
			showToast() {
				this.$refs.uToast.show({
				title: '两次密码不一致',
				type: 'warning',
				})
			},
			async confirm(){
				console.log(555)
				if(this.newPassword!==""&&this.new_password!==0){
				if(this.newPassword!==this.new_password){
					this.showToast()
				}else{
				  let result = ""
				  if(this.id == ""){
				  result = await modifyPassword(
				  {password:this.newPassword,id:uni.getStorageSync('user').id}
				  )
				  }else{
					 
				  result = await modifyPassword(
					{password:this.newPassword,id:this.id}
					)  
				  }
				  console.log(result)
				  if(result=="密码修改成功"){
				    uni.showModal({
					title: '提示',
					content: '登录状态已失效请重新登录',
					showCancel:false,
					success: function (res) {
						if (res.confirm) {
							uni.navigateTo({
								url:"../../login/login"
							})
						}
					}
				});	  
				  }
				}
				}
			}
		}
	}
</script>

<style lang="scss">
#modifyPassword{
		padding: 80rpx;
		.title{
			font-size: 50rpx;
		}
		.form{
			margin-top: 90rpx;
		    .new,.new_{
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
