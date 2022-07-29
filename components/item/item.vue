<template>
	<view id="item">
		<view class="movieItem"  v-for="(item,index) in movieList"
		:key="index" @click="handleClick(item.name)">
			<view class="banner">
				<image :src="item.imgUrl" mode=""></image>
				<view class="state">
					<span>{{item.state}}</span>
				</view>
			</view>
			<view class="title">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
//	import { addOrder } from '../../service/order.js'
	import { getOrder,addOrder,addCategoryNum,getCategoryRank } from '../../service/order.js'
	import connectSocketInit from '@/hooks/webscoket.js'
	export default {
		name:"item",
		/*props:{
			movieList:{
				type:Array,
				default:()=>[]
			}
		},*/
		props:['movieList'],
		data() {
			return {
				
			};
		},
		methods:{
			async handleClick(value){
			this.$emit("handleClick",value)
			await addOrder(value)
			const orderList =await getOrder()
			const order = orderList.map(item=>{
				return {
					name:item.name,
					tapNum:item.tapNum
				}
			})
			
			await addCategoryNum(value)
			const categoryRank = await getCategoryRank()
			
			
			connectSocketInit({order:order,categoryRank:categoryRank})
			
			
			//console.log(categoryList)
			}
		
		},
		created() {
			
		}
	}
</script>

<style>
#item{
	display: flex;
	flex-wrap: wrap;
	
}
.movieItem{
	width: 30%;
	margin: 20rpx 0;
	margin-left: 19rpx;
}
.movieItem .banner{
	position: relative;
}
.movieItem .banner image{
	height:300rpx;
	width: 100%;
}
.movieItem .banner .state{
	box-sizing: border-box;
	position: absolute;
	bottom: 10rpx;
	right: 0;
	left: 0;
	padding: 0 10rpx;
	width: 100%;
	background-color: rgb(0,0,0,0.1);
	font-size: 24rpx;
	color: #fff;
	text-align: right;
}
.movieItem .title{
	font-size: 28rpx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
