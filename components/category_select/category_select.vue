<template>
	<view id="category_select">
		<ul class="ul1">
			<li>
				<ul class="ul2">
					<li>{{type}}</li>
					<li v-for="(item,index) in item" :key="index" :class="{'active':currentIndex==index}"
						@click="item_active(index,item,type)">
						{{item}}
					</li>
				</ul>
			</li>
		</ul>
	</view>
</template>

<script>
	export default {
		name: "category_select",
		props: {
			type: {
				type: String,
				default: ""
			},
			item: {
				type: Array,
				default: () => []
			},

		},
		data() {
			return {
				currentIndex: 0,
			};
		},
		methods: {
			item_active(index,item,type) {
				this.currentIndex = index
				
				this.$emit('item_active',{index,item,type})
			}
		}
	}
</script>

<style lang="scss">
	.active {
		color: #fff;
		background-color: #079BF3;
	}

	li {
		list-style: none;
	}

	ul {
		padding: 0;
	}

	#category_select {
		.ul1 {
			>li {
				margin-bottom: 30rpx;
				text-align: center;

				.ul2 {
					display: flex;
					flex-wrap: wrap;

					li {
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
</style>
