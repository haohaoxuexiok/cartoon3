<template>
	<view id="home">

		<view class="search" @click="entrySearch">
			<u-search placeholder="请输入相关影片"></u-search>
		</view>
		
        <view class="swiper">
        		<u-swiper :list="swiperImg"  title :height="450"
				img-mode="aspectFill top" @click="swiperCilck">
					
				</u-swiper>
        </view>
		
		<u-tabs :list="list" :is-scroll="false" :current="current" 
		@change="change" >
		</u-tabs>
		
		<upload_item :current="current"></upload_item>
		
      <view class="space">
      	<span>最近更新</span>
      	</view>
      	<movie-item :movieList="newMovieList" @handleClick="handleClick"></movie-item>
      
    
        <view class="space">
			<span>热番推荐</span>
			</view>
        	<movie-item :movieList="movieList" @handleClick="handleClick"></movie-item>
        </view>
</template>

<script>
	import movieItem from '../../components/item/item.vue'
	import upload_item from"@/components/upload_item/upload_item.vue"
	
	import {
		getMovie,
		getSwiper
	} from '@/service/home.js'
	import {
		addOrder
	} from '@/service/order.js'
	import { getSearchResult } from '@/service/search.js'
	import {keepUserVisitRecord,getUserVisitRecord,
	        changeUserAction} from '@/service/user.js'
	import { getOrder } from '../../service/order.js'
	import {getCurrentDetailTime,getCurrentTime,getTime} from '@/utils/getTime.js'
	import useWebScoket from '../../hooks/webscoket.js'
	export default {
		components: {
			movieItem,
			upload_item
		},
		data() {
			return {
				
				swiperImg:[],
				list: [
				{
					name: '周一'
				}, {
					name: '周二'
				},{
					name: '周三',

				}, {
					name: '周四',

				}, {
					name: '周五',

				},{
					name: '周六',

				},
				{
					name: '周天',
				
				}
				],
				current:0,

				movieList: [],
				page: {
					limit: 9,
					offset: 0,
					total: 60
				},
				newMovieList:[]
			}
		},
		async onReady() {
			
		},
		async onLoad() {
			const swiper =await getSwiper()
			console.log(swiper)
			const swiperImg = swiper.map(item=>{
				return{
					id:item.id,
					image:item.swiperImg
				}
			})
					   
			this.swiperImg = swiperImg
			
			
			let date = new Date();
			let dateDay = date.getDay();  
		    if(dateDay == 0){
				dateDay = 7
			}
			this.current = dateDay-1
			const {
				limit,
				offset
			} = this.page
           
		  
			getMovie().then(res => {
				console.log(res.list.length-6)
                this.newMovieList =res.list.splice(res.list.length-6)
			})
			const orderList =await getOrder()
			this.movieList = orderList.splice(0,6)
			
			
			if(uni.getStorageSync('user')){
			let date = new Date();
			let dateDay = date.getDay();
			if(dateDay == 0){
				dateDay = 7
			}
			const currentData = getCurrentDetailTime();
			const time = currentData + "\xa0" + this.list[dateDay-1].name;
			 keepUserVisitRecord({time:time,user:uni.getStorageSync('user').name,userId:uni.getStorageSync('user').id})
			   
			// console.log(time,uni.getStorageSync('user').id)
			
			 const result = await getUserVisitRecord(getCurrentTime())
		//	 changeUserAction({user:uni.getStorageSync('user').name,action:true})
			 useWebScoket({userVisitRecord:result})
     		 }
			
		   
		},
		onUnload() {
			if(uni.getStorageSync('user')){
				changeUserAction({user:uni.getStorageSync('user').name,action:false})
			}
		},
		methods: {
			async swiperCilck(value){
				const result =await getSearchResult(this.swiperImg[value])
				
			},
			change(index) {
				this.current = index;
			  
			},
			handleClick(value) {
				uni.navigateTo({
					url: `../detail/detail?name=${value}`
				})
				//	addOrder(value)
			},
			entrySearch() {
				uni.navigateTo({
					url: '../search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
    #home{
	    padding: 0 20rpx;
	    .search {
		   margin: 60rpx 10rpx 20rpx;
	    }
		
		.space{
			padding: 10rpx 0;
			width: 100%;
			border-bottom: 1px solid #ccc;
			span{
				padding: 10rpx 0;
				font-size:30rpx;
				color: #1E90FF;
				border-bottom: 1px solid #1E90FF;
			}
		}
	}
/deep/.u-tabs-scorll-flex{
	background-color:#f5f5f5;;
}
/deep/.u-list-image-wrap[data-v-7b038a67]{
	
}
</style>
