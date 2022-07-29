<template>
	<view id="order">
		<div class="title">
			热门排行
		</div>
		
		<view class="conntent">
			<rank :orderList="orderList" @rankItemClick="rankItemClick"></rank>
		</view>
	</view>
</template>

<script>
	import { getOrder } from '../../service/order.js'
	import rank from '../../components/rank/rank.vue'
	export default {
		components:{rank},
		data() {
			return {
				orderList:[]
			}
		},
		async onLoad() {
		   const orderList =await getOrder()
		   this.$data.orderList = orderList
		},
		methods: {
			rankItemClick(value){
			uni.navigateTo({
			   url:`../detail/detail?name=${value}`
			})
			}
		}
	}
</script>

<style lang="scss">
.title{
	margin-top: 30rpx;
	font-size: 38rpx;
}
#order{
	padding: 0 40rpx;
}
</style>
