<template>
	<view id="history">
		<view class="no_record" v-if="historyRecord.length==0">
			<span>暂无观看记录</span>
			<image class="icon" src="../../static/user/no_record.png" mode=""></image>
		</view>
		<view class="has_record" v-if="historyRecord.length!==0">
			<record_item :historyRecord="historyRecord"></record_item>
		</view>
	</view>
</template>

<script>
	import { getHistory,clearHistory } from "@/service/user.js"
	import  record_item  from "@/components/record_item/record_item.vue"
	

	export default {
		components:{ record_item },
		data() {
			return {
			    historyRecord:[]
			}
		},
		async onLoad() {
		
	    const dataList =await getHistory(uni.getStorageSync('user').name)
		    
			this.historyRecord = dataList 
			console.log()
		},
		methods: {
			onNavigationBarButtonTap(e){
				const _this = this
				uni.showModal({
					title: '提示',
					content: '确认清空观看记录',
					success: function (res) {
						if (res.confirm) {
							clearHistory()
							_this.historyRecord = ""
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
#history{
	.no_record{
		display: flex;
		align-items: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		font-size: 40rpx;
		color: #bfbfbf;
		.icon{
			width: 120rpx;
			height: 80rpx;
		}
	}
}
</style>
