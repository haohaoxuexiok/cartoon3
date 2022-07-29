<template>
	<view id="resource_link">
		<view class="num" v-for="(item,index) in movieUrl"
		 :key="index" @click="entryPlay(item)">
			<a>{{item.num}}</a>
		</view>
	</view>
</template>

<script>
	import { keepHistory } from "@/service/user.js"
	
	import getCurrentTime from "../../utils/time.js"
	export default {
		name:"resource_link",
		/*props:{
			movieUrl:{
				type:Array,
				default:() => []
			}
		},*/
		props:['movieUrl','currentName','imgUrl'],
		data() {
			return {
				
			};
		},
		methods:{
			entryPlay(value){	
				const currentTime = getCurrentTime()
				const user = uni.getStorageSync('user').name
				keepHistory({video:value.num,time:currentTime,name:this.currentName,user})
				
				this.$emit("entryPlay",value)
			}
		}
	}
</script>

<style lang="scss">
a{
	text-decoration: none;
	font-size: 26rpx;
}
#resource_link{
	display: flex;
	flex-wrap: wrap;
	.num{
		padding:20rpx 40rpx;
		margin: 20rpx 20rpx;
		background-color:#eee;
		font-size: 28rpx;
		border-radius: 15rpx;
		text-align: center;
	}
}
</style>