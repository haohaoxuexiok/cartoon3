<template>
	<view id="play">

		<video :src="currentUrl" page-gesture class="video"></video>


		<view class="body">
			<view class="space">
				<span>播放地址</span>
			</view>
			<resource_link :movieUrl="movieUrl" @entryPlay="changePlay"
			 :currentName="currentName" ></resource_link>
		</view>


		<view class="recommend">
			<view class="space">
				<span>相关推荐</span>
			</view>
			<resource_link @entryPlay="changePlay" :imgUrl="imgUrl"></resource_link>
			<recommen_relate></recommen_relate>
			
			<movie-item :movieList="movieRelate" @handleClick="handleClick"></movie-item>
		</view>
	</view>
</template>

<script>
	import movieItem from '../../components/item/item.vue'
	import resource_link from '../../components/resource_link/resource_link.vue'
	import recommen_relate from '../../components/recommend_relate/recommend_relate.vue'
	import {
		getMovieUrl
	} from '../../service/detail.js'
	import { getMovieRelate } from '../../service/play.js'
	export default {
		components: {
			resource_link,
			recommen_relate,
			movieItem
		},
		data() {
			return {
				movieUrl: [],
				currentUrl: "",
				movieRelate:[],
				currentName:"",
				imgUrl:""
			}
		},
		onReady: function(res) {
			// #ifndef MP-ALIPAY
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
		},
		async onLoad(option) {
		
			this.currentName = option.name
			this.imgUrl = option.imgUrl
			const type = option.type.replace("\\", "")
				.replace('""', '').replace('[', '').replace(']', '')
				.replace(/["]/g, '').split(',')

			const type1 = type[0]
			const type2 = type[1]
            
			const movieRelate =await getMovieRelate({type1,type2})
            
			this.movieRelate = movieRelate
			
			
			getMovieUrl(option.name).then(res => {
				this.$data.movieUrl = res
				this.currentUrl = option.url.replace('https://mmcss.mandao.tv/boo/m3u8.php?url=', '')
			})
		},
		methods: {
			changePlay(value) {
				this.currentUrl = value.url.replace('https://mmcss.mandao.tv/boo/m3u8.php?url=', '')
			},
			handleClick(value){
			uni.navigateTo({
			   url:`../detail/detail?name=${value}`
			})
		  }
		}

	}
</script>

<style lang="scss">
	#play {
		.video {
			width: 100%;
		}

		.body {

			margin-top: 20rpx;
		}

		.space {
			width: 100%;
			height: 70rpx;
			line-height: 70rpx;
			font-size: 28rpx;
			font-weight: bold;
			border-top: 2px solid #ccc;
			background-color: #f4f4f4;

			span {
				display: block;
				height: 100%;
				width: 150rpx;
				background-color: #fff;
				text-align: center;
			}
		}

		.recommend {
			margin-top: 100rpx;
		}

	}
</style>
