<template>
	<view id="record_item">
		<view class="item" v-for="(item,index) in historyRecord" :key="index">
			<image class="imgUrl" :src="item.imgUrl" mode=""></image>
			<view class="right">
				<view class="top">
					<view class="title">
						{{item.detail_name}}
					</view>
					
				</view>
				<div class="footer">
					<view class="progress">
						<div class="time">
							{{item.time}}
						</div>
						上次观看至 - {{item.video}}
					</view>
					<view class="continue" @click="handlePlay(item.detail_name)">
						继续观看>>>
					</view>
				</div>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"record_item",
		props:{
			historyRecord:{
				type:Array,
				default:() => []
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			handlePlay(value){
				uni.navigateTo({
				   url:`../detail/detail?name=${value}`
				})
			}
		}
	}
</script>

<style lang="scss">
#record_item{
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 0 10px;
	background-color:#F5F5F5;
    .item{
	    display: flex;
	    padding: 20rpx;
		margin-bottom: 20rpx;
		border-radius: 10rpx;
		background-color: #fff;
	    .imgUrl{
			margin-right: 20rpx;
		    width: 21%;
		    height: 150rpx;
	    }
		.right{
			flex: 1;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			.top{
				.time{
					font-size: 26rpx;
					color:	#808080;
				}
				.title{
					font-size: 30rpx;
				}
			}
			.footer{
				display: flex;
				justify-content: space-between;
				align-items:flex-end;
				.progress{
					font-size: 26rpx;
					color:	#808080;
				}
				.continue{
					font-size: 24rpx;
					color:#A9A9A9;
				}
			}
		}
    }
}
</style>