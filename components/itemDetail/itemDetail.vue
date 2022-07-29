<template>
	<view id="itemDetail">
		
		<view class="detailItem" v-for="(item,index) in detailMessage" :key="index">
			<view class="img">
				<image :src="item.imgUrl" mode=""></image>
			</view>			
			<view class="content">
<view class="top">
				<view class="title">
			     {{item.name}}
				</view>
			<!--	<view class="state">
				 {{item.state}}
				</view>-->
</view>
				<view class="update">
				<view class="update_time">
					{{item.update_time}}
				</view>
				<view class="update_state">
					<span>状态</span>：{{item.update_state}}
				</view>

			</view>
				<view class="type">
					<span>类型</span>：{{item.type}}
				</view>
				<view class="area">
					<span>地区</span>：{{item.area}}
				</view>
				<view class="detail">
				<view class="language">
					<span>语言</span>：{{item.language}}
				</view>
				<view class="time">
					<span>年代</span>：{{item.time}}
				</view>
				
	</view>
				<view class="role">
					<span>角色</span>：{{item.role}}
				</view>
				<view class="voice_actor">
					<span>声优</span>：{{item.voice_actor}}
				</view>
				<view class="alias">
					<span>别名</span>：{{item.alias}}
				</view>
								
				<view  :class="{ 'expansion' : isOpen }" class="main_story">
				     <span>主要剧情：</span>{{item.main_story}}  
				</view>
				<view class="story_deal" @click="handleClick">
				 <text v-if="isOpen">展开</text><text v-if="!isOpen" >收起</text>
				 </view>
			</view>	
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"itemDetail",
		props:['detailMessage'],
		data() {
			return {
				isOpen:true
			};
		},
	    methods:{
			handleClick(){
				this.$data.isOpen = !this.$data.isOpen
				console.log(this.$data.isOpen)
			}
		}
	}
</script>

<style lang="scss">
#itemDetail{
	font-size: 28rpx;
}
.detailItem .img image{
	float: right;
	height: 510rpx;
	width: 300rpx;
}
.detailItem .content{
	margin-left: 20rpx;
}
.detailItem .content .top,.update,.type,.area,.detail,.role,.voice_actor,.alias{
	margin: 15rpx 0;
}
.detailItem .content span{
	color: 	#778899;
}
.detailItem .content .top{
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 20rpx;
}
.detailItem .content .top .title{
	margin-right:20rpx;
	font-size: 36rpx;
	font-weight: bold;
}
.detailItem .content .update{
	display: flex;
}
.detailItem .content .update .update_time{
	margin-right: 20rpx;
}
.detailItem  .content .detail{
	display: flex;
}
.detailItem  .content .detail .language{
	margin-right: 20rpx;
}
text{
	display: flex;
	justify-content:flex-end;
	margin-bottom: 20rpx;
	color:#0785D4;
}
.detailItem  .content .main_story{
	width: 100%;
}
.detailItem  .content .expansion{
	width: 100%;
	overflow: hidden;
	-webkit-line-clamp: 4;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
}
</style>
