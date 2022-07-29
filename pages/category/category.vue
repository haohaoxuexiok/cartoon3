<template>
	<view id="category">
		<view class="header">
			分类专区
		</view>
		<div class="body">
		<!--	<ul class="ul1">
				<li>
					<ul class="ul2">
						<li>剧情</li>
						<li v-for="(item,index) in story" :key="index"
						:class="{'active':story_index==index}" @click="story_active(index)">
							{{item}}
						</li>
					</ul>
				</li>
				<li>
					<ul class="ul2">
						<li>地区</li>
						<li v-for="(item,index) in area" :key="index"
						:class="{'active':area_index==index}" @click="area_active(index)">
							{{item}}
						</li>
					</ul>
				</li>
				<li>
					<ul class="ul2">
						<li>语言</li>
						<li v-for="(item,index) in language" :key="index"
						:class="{'active':language_index==index}" @click="language_active(index)">
							{{item}}
						</li>
					</ul>
				</li>
				<!--<li>
					<span>时间</span>
					<ul class="ul2">

					</ul>
				</li>
			</ul>-->
		<select_item type="剧情"  :item="story" @item_active="item_active" ></select_item>
		<select_item type="地区"  :item="area" @item_active="item_active"></select_item>
		<select_item type="语言"  :item="language" @item_active="item_active"></select_item>
		</div>
		
		<view class="content">
			<movie-item :movieList="movieList" @handleClick="handleClick"></movie-item>
		</view>
		

	<!--	<page-pagination :total="page.total" :pageSize="page.pageSize" :showAround="true" :btnText="true" :forceEllipses="true"></page-pagination>-->
        
        <page-pagination :total="page.total" :pageSize="page.limit" 
		:numAround="true" @change='changePage'></page-pagination>

	</view>
</template>

<script>
	import select_item from '../../components/category_select/category_select.vue'
	import movieItem from '../../components/item/item.vue'
	import { getMovie } from '../../service/home.js'
	export default {
		components:{ select_item,movieItem},
		data() {
			return {
				story: ['全部','热血', '冒险', '战斗', '机战', '科幻', '奇幻', '校园', '恋爱', '搞笑',
					'少女', '治愈', '剧情', '后宫', '百合'
				],
				area: ['全部','大陆', '日本', '欧美'],
				language: ['全部','国语', '日语', '英语'],
				time: [],
				movieList:[],
				page:{
					
					limit:9,
					offset:0,
					
				},
				type:{
				   story:"",
				   area:"",
				   language:""
				},
				currentPage:""
			}
		},
		onLoad() {
			//const { limit,offset } = this.page
			getMovie(this.page).then(res=>{
			this.$data.movieList = res.list
			this.page.total = res.total
			})
		},
		methods: {
          item_active(value){
			  this.page.total= 0
			  this.currentPage = 1
			if(value.type == '剧情'){
				if(value.item == '全部'){
				this.type.story = ''
				}else{
				this.type.story = value.item
				}
			}else if(value.type == '地区'){
				if(value.item == '全部'){
				this.type.area = ''
				}else{
				this.type.area = value.item
				}
			}else{
				if(value.item == '全部'){
				this.type.language = ''
				}else{
				this.type.language = value.item
				}
				
			}
			let { limit,offset } = this.page
			offset =  limit * (this.currentPage-1)
			getMovie({...this.type,limit:limit,offset:offset}).then(res=>{
			this.$data.movieList = res.list
			this.page.total = res.total
			console.log(res.total)
			})
		  },
		  changePage(currentPage){
			this.currentPage = currentPage
			let { limit,offset } = this.page
			offset =  limit * (currentPage-1)
			getMovie({...this.type,limit:limit,offset:offset}).then(res=>{
			this.$data.movieList = res.list
			})
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
	li {
		list-style: none;
	}

	ul {
		padding: 0;
	}

	#category {
		padding:10rpx 10rpx 0;
	//	background-color: #F5F5F5;

		.header {
			margin: 0 0 30rpx;
			font-size: 34rpx;
			font-weight: bold;
		}

		.body {
			.ul1 {
				>li {
					margin-bottom: 30rpx;
					text-align: center;
					.ul2 {
						display: flex;
						flex-wrap: wrap;
						li{
							margin: 10rpx;
							padding: 10rpx;
							border-radius: 10rpx;
						}
						li:nth-child(1) {
							color: #999;
						}
					}
				}
			}
		}
	}


</style>
