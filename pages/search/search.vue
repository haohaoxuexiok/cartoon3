<template>
	<view id="search">
	   <view class="search">
	   	<u-search placeholder="请输入相关影片" v-model="keyword"
		@custom="searching" @input="input"></u-search>
	   </view>
	   
	   <view class="keys" v-for="(item,index) in keys" 
	   :key="index" @click="keysClick(keyword+item)" v-if="isShowKey">
	   	<span>{{keyword}}</span>{{item}}
	   </view>
	   
	  
	   <view class="searchRecord" v-if="isShow&&searchRecord.length!==0">
		<view class="title">
			<span>历史搜索</span>
			<view class="right" @click="clear">
				<image class="clear" src="../../static/search/clear.png" mode=""></image>
				<span>清除</span>
			</view>
			
		</view>
		<view class="content">
			<view class="item" v-for="(item,index) in searchRecord"
			:key="index" @click="historyRecord(item)">
			{{item}}
			</view>
		</view>
	   </view>
	   
	   <view class="hotWordsList" v-if="isShow">
		<span>热门搜索</span>
	   	<rank :orderList="hotWordsList" @rankItemClick="rankItemClick"></rank>
	   </view>
	   <movie-item :movieList="movieList" @handleClick="handleClick"></movie-item>
	   
	</view>
</template>

<script>
	import { getSearchResult,getSearchResults,
	         getHotSearch,getHotSearchWords,
			 addSearchNum,getHotSearchRank } from '../../service/search.js'
	import movieItem from '../../components/item/item.vue'
	import rank from '../../components/rank/rank.vue'
	import connectSocketInit from '@/hooks/webscoket.js'
	export default {
		components:{movieItem,rank},
		data() {
			return {
				keyword:"",
				movieList:[],
				keys:[],
				hotWordsList:[],
				isShow:true,
				isShowKey:true,
				searchRecord:[]
			}
		},
		async onLoad() {
			
			this.hotWordsList =await getHotSearchWords()
			if(uni.getStorageSync('searchRecord')){
			this.searchRecord = uni.getStorageSync('searchRecord')
			}
		},
		methods: {
			async historyRecord(value){
				await addSearchNum(value)
				
				this.dealSearchRecord(value)
				this.keyword = value
				const result = await getSearchResult(this.$data.keyword)
				
				this.$data.movieList = result
				this.isShowKey = false
			},
			clear(){
				const _this = this
				uni.showModal({
					title: '提示',
					content: '确认清空搜索记录',
					success: function (res) {
						if (res.confirm) {
							uni.removeStorageSync('searchRecord')
							_this.searchRecord = []
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
		    dealSearchRecord(keyword){
				const result=this.searchRecord.indexOf(keyword)
				//console.log(result)
				if(result == -1){
				this.searchRecord.unshift(keyword)
				
				}else{
					console.log(result,this.searchRecord)
				if(keyword!== uni.getStorageSync('searchRecord')[0]){
				this.searchRecord.unshift(this.searchRecord.splice(result,1)[0])
					}
				}
				uni.setStorage({
					key:"searchRecord",
					data:this.searchRecord
				})
				
			},
		    async searching(){
			  if(this.keyword!==''){
			  await addSearchNum(this.keyword)
			  
			  //1.
			  const hotSearchRank =await getHotSearchRank()
			  connectSocketInit({hotSearchRank:hotSearchRank})
			  
			  this.dealSearchRecord(this.keyword)
			  const result = await getSearchResult(this.$data.keyword)
			  
			  this.$data.movieList = result
			  this.isShowKey = false
			  }
			},
			async keysClick(value){
				await addSearchNum(value)
				
				//2.
				const hotSearchRank =await getHotSearchRank()
				console.log(hotSearchRank)
				connectSocketInit({hotSearchRank:hotSearchRank})
				
				this.dealSearchRecord(value)
				//console.log(value)
				this.keyword = value
				const result = await getSearchResult(this.$data.keyword)
				this.$data.movieList = result
				this.isShowKey = false
	            
			},
			async rankItemClick(value){
				await addSearchNum(value)
				
				//1.
				const hotSearchRank =await getHotSearchRank()
				connectSocketInit({hotSearchRank:hotSearchRank})
				
				this.dealSearchRecord(value)
				this.keyword = value
				const result = await getSearchResult(this.$data.keyword)
				this.$data.movieList = result
				this.isShowKey = false
			},
			handleClick(value){
				uni.navigateTo({
				   url:`../detail/detail?name=${value}`
				})
			},
			async input(value){
				this.isShowKey = true
				this.movieList = []
				if(value!==''){
				this.isShow = false
				const keys =await getSearchResults(value)
				this.keys = []
				for(let i = 0;i<keys.length;i++)
                this.keys.push(keys[i].name.slice(this.keyword.length))
				}else{
					this.keys = []
					this.isShowKey = false
					this.isShow = true
				}
			}			  
		}
	}
</script>

<style lang="scss" scoped>
#search{
	padding: 20rpx 25rpx;
	.keys{
		padding: 18rpx 0; 
		border-bottom: 1px solid #eee;
		span{
			color:#00BFFF;
		}
	}
	.hotWordsList{
		margin-top:30rpx;
		span{
			padding:20rpx 20rpx 0;
			font-weight: bold;
			font-size: 38rpx;
		}
	}
	.searchRecord{
		margin-top:20rpx;
		.title{
			display: flex;
			justify-content: space-between;
			align-items:flex-end;
		    span{
			    padding:20rpx 20rpx 0;
			    font-weight: bold;
			    font-size: 38rpx;
		    }
			.right{
				display: flex;
				justify-content: center;
				align-items: flex-end;
				span{
					padding: 0;
					font-size: 26rpx;
					font-weight: normal;
					color: #707070;
				}
			}
			.clear{
				height:38rpx;
				width:38rpx;
			}
		}
	    .content{
		    display: flex;
		    flex-wrap: wrap;
		    margin-top:30rpx;
		   .item{
			    padding: 10rpx;
			    margin:0 0 20rpx 20rpx;
			    font-size: 26rpx;
			    border-radius: 20rpx;
			    background-color: #F5F5F5;
		    }
	    }
	}
}
</style>
