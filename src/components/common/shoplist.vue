<template>
	<div class="shoplist_container">
		<section v-if="shopListArr.length">
		    <h4 class="title_restaurant">医生</h4>
		    <ul class="list_container">
		       <!-- <router-link :to="{path:'/chat', query:{id:id,to:item.id}}" tag="li" v-for="item in shopListArr" :key="item.id" class="list_li">-->
			   <router-link :to="{path:'/detailed', query:{id:item.id}}" tag="li" v-for="item in shopListArr" :key="item.id" class="list_li">
		            <section class="item_left">
		                 <img :src="'../../../static/image/avatar/'+item.avatar" class="restaurant_img">
		            </section>
		            <section class="item_right">
		                <div class="item_right_text">
		                    <p>
		                        <span>{{item.name}}</span>
		                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="14" class="pay_icon">
		                            <polygon points="0,14 4,0 24,0 20,14" style="fill:none;stroke:#FF6000;stroke-width:1" />
		                            <line x1="1.5" y1="12" x2="20" y2="12" style="stroke:#FF6000;stroke-width:1.5"/>
		                            <text x="3.5" y="9" style="fill:#FF6000;font-size:9;font-weight:bold;">支付</text>
		                        </svg>
		                    </p>
							<button class="ask">查看详情</button>
							
							<p>姓名 {{item.userName}} </p>
		                    <p>问诊量 {{item.count}} 单</p>
							<my-rate v-model="item.score" readonly="false"/>
						
		                </div>
		            
		            </section>
		        </router-link>
		    </ul>
		</section>
		
	</div>
</template>

<script>

import {mapState} from 'vuex'
import {getDoctorByTime} from 'src/service/getData'
import {imgBaseUrl} from 'src/config/env'
import {showBack, animate} from 'src/config/mUtils'
import {loadMore, getImgPath} from './mixin'
import loading from './loading'
import ratingStar from './ratingStar'
import myRate from './myRate'

export default {
	data(){
		return {
			offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
			shopListArr:[], // 店铺列表数据
			preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
			showBackStatus: false, //显示返回顶部按钮
			showLoading: true, //显示加载动画
			touchend: false, //没有更多数据
			imgBaseUrl,
			id:''
		}
	},
	mounted(){
		this.initData();
	},
	created(){
	   this.userinfo=this.$store.state.userinfo;
	   this.id=this.userinfo.id;
	   console.log(this.userinfo);
	   console.log(this.id);
	   console.log(this.path);
	},
	components: {
		loading,
		ratingStar,
		myRate
	},
	props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],
	mixins: [loadMore, getImgPath],
	computed: {
		...mapState([
			'latitude','longitude'
		]),
	},
	updated(){
		// console.log(this.supportIds, this.sortByType)
	},
	methods: {
		async initData(){
			//获取数据
			let res = await getDoctorByTime()
			this.shopListArr = res.data;
			console.log(this.shopListArr);
			if (res.length < 20) {
				this.touchend = true;
			}
			this.hideLoading();
			//开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
			showBack(status => {
				this.showBackStatus = status;
			});
		},
		//到达底部加载更多数据
		async loaderMore(){
			if (this.touchend) {
				return
			}
			//防止重复请求
			if (this.preventRepeatReuqest) {
				return 
			}
			this.showLoading = true;
			this.preventRepeatReuqest = true;

			//数据的定位加20位
			this.offset += 20;
			let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
			this.hideLoading();
			this.shopListArr = [...this.shopListArr, ...res];
			//当获取数据小于20，说明没有更多数据，不需要再次请求数据
			if (res.length < 20) {
				this.touchend = true;
				return
			}
			this.preventRepeatReuqest = false;
		},
		//返回顶部
		backTop(){
			animate(document.body, {scrollTop: '0'}, 400,'ease-out');
		},
		//监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
		async listenPropChange(){
			this.showLoading = true;
			this.offset = 0;
			let res = await shopList(this.latitude, this.longitude, this.offset, '', this.restaurantCategoryIds, this.sortByType, this.deliveryMode, this.supportIds);
			this.hideLoading();
			//考虑到本地模拟数据是引用类型，所以返回一个新的数组
			this.shopListArr = [...res];
		},
		//开发环境与编译环境loading隐藏方式不同
		hideLoading(){
			this.showLoading = false;
		},
		zhunshi(supports){
			let zhunStatus;
			if ((supports instanceof Array) && supports.length) {
 				supports.forEach(item => {
 					if (item.icon_name === '准') {
 						zhunStatus = true;
 					}
 				})
			}else{
				zhunStatus = false;
			}
			return zhunStatus
		},
	},
	watch: {
		//监听父级传来的restaurantCategoryIds，当值发生变化的时候重新获取餐馆数据，作用于排序和筛选
		restaurantCategoryIds: function (value){
			this.listenPropChange();
		},
		//监听父级传来的排序方式
		sortByType: function (value){
			this.listenPropChange();
		},
		//监听父级的确认按钮是否被点击，并且返回一个自定义事件通知父级，已经接收到数据，此时父级才可以清除已选状态
		confirmSelect: function (value){
			this.listenPropChange();
			this.$emit('DidConfrim');
		}
	}
}
</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	
	.shoplist_container{
		background-color: #fff;
		margin-bottom: 2rem;
	}
	.search_page{
	    margin-bottom: 2rem;
	}
	.search_form{
	    background-color: #fff;
	    padding: 0.5rem;
	    display: flex;
	    input{
	        height: 1.5rem;
	    }
	    .search_input{
	        flex: 4;
	        border: 0.025rem solid $bc;
	        @include sc(0.65rem, #333);
	        border-radius: 0.125rem;
	        background-color: #f2f2f2;
	        font-weight: bold;
	        padding: 0 0.25rem;
	    }
	    .search_submit{
	        flex: 1;
	        border: 0.025rem solid $blue;
	        margin-left: .2rem;
	        @include sc(0.65rem, #fff);
	        border-radius: 0.125rem;
	        background-color: $blue;
	        font-weight: bold;
	        padding: 0 0.25rem;
	    }
	}
	.title_restaurant{
	    font-size: 0.6rem;
	    line-height: 2rem;
	    text-indent: 0.5rem;
	    font-weight: bold;
	    color: #666;
	}
	.list_container{
	    background-color: #fff;
	}
	.list_li{
	    display: flex;
	    justify-content: 'center';
	    padding: 0.5rem;
	    border-bottom: 0.025rem solid $bc;
	    .item_left{
	        margin-right: 0.25rem;
	        .restaurant_img{
	            @include wh(1.7rem, 1.7rem);
	        }
	    }
	    .item_right{
	        font-size: 0.55rem;
	        flex: 1;
	        .item_right_text{
	            padding-bottom: 0.25rem;
	            border-bottom: 0.025rem solid $bc;
	            p{
	                line-height: .9rem;
	            }
	            .pay_icon{
	                margin-bottom: -0.08rem;
	            }
	        }
	        .item_right_detail{
	            margin-top: 0.25rem;
	            li{
	                font-size: 0;
	                span{
	                    font-size: .5rem;
	                    vertical-align: middle;
	                    display: inline-block;
	                    margin-bottom: 0.2rem;
	                }
	                .activities_icon{
	                    @include sc(.5rem, #fff);
	                    font-weight: bold;
	                    padding: .04rem;
	                    border-radius: 0.15rem;
	                    margin-right: 0.125rem;
	                }
	                .only_phone{
	                    color: #FF6000;
	                }
	            }
	        }
	    }
	}
	.search_history{
	    .history_list{
	        background-color: #fff;
	        border-bottom: 0.025rem solid $bc;
	        @include font(0.7rem, 2rem);
	        padding: 0 0.3rem;
	        display: flex;
	        justify-content: space-between;
	        align-items: center;
	        .history_text{
	            display: inline-block;
	            width: 80%;
	        }
	        .delete_icon{
	            @include wh(1rem, 1rem);
	        }
	    }
	    .clear_history{
	        background-color: #fff;
	        color: $blue;
	        @include font(.7rem, 2rem);
	        font-weight: bold;
	        text-align: center;
	    }
	}
	.search_none{
	    margin: 0 auto;
	    @include font(0.65rem, 1.75rem);
	    color: #333;
	    background-color: #fff;
	    text-align: center;
	    margin-top: 0.125rem;
	}
	.ask{
		float: right;
		flex: 1;
		border: 0.025rem solid $blue;
		margin-left: .2rem;
		@include sc(0.65rem, #fff);
		border-radius: 0.125rem;
		background-color: $blue;
		font-weight: bold;
		padding: 0 0.25rem;
	}
</style>