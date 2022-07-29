<template>
	<view id="upload_item">
		<view class="item" v-for="(item,index) in updateMovieList" :key="index">
			<view class="title">
				{{item.name}}
			</view>
			<view class="state">
				{{item.state}}
			</view>
		</view>
	</view>
</template>

<script>
	import {getCurrentDetailTime,getCurrentTime,getTime} from '@/utils/getTime.js'
	import {updateMovie} from '@/service/home.js'
	export default {
		name: "upload_item",
		props: {
			current: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
            updateMovieList:[]
			};
		},
		watch: {
			current: {
			async handler(val) {
				let date = new Date();
				let dateDay = date.getDay();  
				const week = ['周一','周二','周三','周四','周五','周六','周天']
				const currentData = getCurrentTime()
				let time = ""
				//console.log(val==dateDay)
				if(dateDay-1 == val){
					
					time = getTime(currentData,0)
				}else{
					
					time = getTime(currentData,val-dateDay+1)	
				}
				let createTime = time
				

				this.updateMovieList =await updateMovie(createTime)
				
				},
				deep: true,
				immediate: true,
			}
		}
	}
</script>

<style lang="scss">
#upload_item{
	margin-bottom: 50rpx;
	.item{
		display: flex;
		justify-content: space-between;
		margin:10rpx 10rpx;
		padding: 10px 0;
		border-bottom: 1px solid #ccc;
		.title{
			font-size:30rpx;
		}
		.state{
			color:#ccc;
		}
	}
}
</style>
