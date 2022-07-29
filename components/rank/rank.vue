<template>
	<view id="rank">
		<view class="rankItem" v-for="(item,index) in orderList"
		:key="index" @click="rankItemClick(item.name)">
		<view class="left">
			<span>{{index+1}}</span>
			<view class="name">
				{{item.name}}
			</view>
		</view>
			<!--<view class="state">
				{{item.state}}
			</view>-->
		</view>
	</view>
</template>

<script>
	export default {
		name:"rank",
		props:['orderList'],
		data() {
			return {
				
			};
		},
		methods:{
			rankItemClick(value){
				this.$emit("rankItemClick",value)
				/*uni.navigateTo({
				   url:`../detail/detail?name=${value}`
				})*/
			}
		}
	}
</script>

<style lang="scss">
	
#rank{
	padding:40rpx 20rpx;
	.rankItem{
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;
		&:nth-child(1) span{
			background-color:#ff4a4a;
			color: #fff;
		}
		&:nth-child(2) span{
			background-color:#ff7701;
			color: #fff;
		}
		&:nth-child(3) span{
			background-color:#ffb400;
			color: #fff;
		}
		span{
			width: 40rpx;
			height: 40rpx;
			line-height: 40rpx;
			background-color:#eee;
			text-align: center;
			font-weight: normal;
		} 
		.left{
			display: flex;
		    .name{
				margin-left: 20rpx;
			}
		}
	}
}

</style>