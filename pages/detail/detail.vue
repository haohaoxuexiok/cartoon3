<template>
	<view id="detail">
		<movie-detail :detailMessage="detailMessage"></movie-detail>
		
		<view class="space">
			<span>播放地址</span>
		</view>
		
		<resource_link :movieUrl="movieUrl" :currentName="currentName"
		:imgUrl="imgUrl" @entryPlay="entryPlay"></resource_link>
	</view>
</template>

<script>
	import { getMovieDetail,getMovieUrl } from '../../service/detail.js'
	import movieDetail from '../../components/itemDetail/itemDetail.vue'
	import resource_link from '../../components/resource_link/resource_link.vue'
	export default {
		components:{ movieDetail,resource_link },
		data() {
			return {
				detailMessage:{},
				movieUrl:[],
				currentName:"",
				imgUrl:"",
				types:[]
			}
		},
		methods: {
			entryPlay(value){
			 	uni.setStorage({
			 		key:'currentName',
					data:this.currentName
			 	})
				const type = JSON.stringify(this.types)
				const {num,url} = value
				uni.navigateTo({
					url:`../play/play?name=${this.currentName}&imgUrl=${this.imgUrl}&num=${num}&url=${url}&type=${type}`
				})
			}
		},
		onLoad(option) {
			this.currentName = option.name
			getMovieDetail(option.name).then(res => {
				this.$data.detailMessage = res
				
				this.imgUrl = res[0].imgUrl
				//console.log(res[0].type)
			//\n\t\t\t剧场电影 日本动漫 少女 机战 \n\t\t
			let type = res[0].type.replace("\n\t\t\t",'').replace('\n\t\t','')
			let dealType = type.split(/\s/)
			dealType.pop()
			this.types.push(dealType[dealType.length-1])
			this.types.push(dealType[dealType.length-2])
			
			//console.log(this.types)
			})
			getMovieUrl(option.name).then(res => {
				this.$data.movieUrl = res
			})
		}
	}
</script>

<style lang="scss" scoped>
#detail{
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	height: 100%;
	width: 100%;
	padding: 0 10px;
	box-sizing: border-box;
	.space{
		width:100%;
	    height: 70rpx;
		line-height: 70rpx;
		font-size: 28rpx;
		font-weight: bold;
		border-top: 2px solid #ccc;
		background-color:#f4f4f4;
		span{
			display: block;
			height: 100%;
			width: 150rpx;
			background-color: #fff;
			text-align: center;
		}
	}
}
</style>
