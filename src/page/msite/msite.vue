<template>
    <div>
    	<head-top signin-up='msite'>
    		
			<router-link to="/home" slot="msite-title" class="msite_title">
				<span class="title_text ellipsis">谷芽在线问诊平台</span>
			</router-link>
    	</head-top>
    	<nav class="msite_nav">
    		<div class="swiper-container" >
		        <div class="swiper-wrapper">
					<router-link to='/categoryList' class="myorder"><span style="float: right;font-size:15px">全部分类</span></router-link>
					
		            <div class="swiper-slide food_types_container" >
	            		<router-link :to="{path: '/category',query:{categoryId:foodItem.id}}" v-for="foodItem in foodTypes" :key="foodItem.id" class="link_to_food">
	            			<figure>
	            				<img :src="foodItem.photo">
	            				<figcaption>{{foodItem.categoryName}}</figcaption>
	            			</figure>
	            		</router-link>
		            </div>
					
					 <div class="swiper-slide food_types_container" >
					 	<router-link :to="{path: '/articleCategory',query:{articleCategory:Item.id}}"  v-for="Item in articleTypes" :key="Item.id" class="link_to_food">
					 		<figure>
					 			<img :src="Item.photo">
					 			<figcaption>{{Item.categoryName}}</figcaption>
					 		</figure>
					 	</router-link>
					 </div>
		        </div>
		        <div class="swiper-pagination"></div>
		    </div>
		   <!-- <img src="../../images/fl.svg" class="fl_back animation_opactiy" >-->
    	</nav>
    	<div class="shop_list_container">
	    	<header class="shop_header">
	    		<svg class="shop_icon">
	    			<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
	    		</svg>
	    		<span class="shop_header_title">热门医生</span>
	    	</header>
	    	<shop-list v-if="hasGetData" :geohash="geohash"></shop-list>
    	</div>
    	<foot-guide></foot-guide>
    </div>    
</template>

<script>
import {mapMutations} from 'vuex'
// import {imgBaseUrl} from 'src/config/env'
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import shopList from 'src/components/common/shoplist'
import {msiteAdress, msiteFoodTypes, cityGuess,getDoctorCategory,getArticleCategory} from 'src/service/getData'
import 'src/plugins/swiper.min.js'
import 'src/style/swiper.min.css'

export default {
	data(){
        return {
        	geohash: '', // city页面传递过来的地址geohash
            msietTitle: '请选择地址...', // msiet页面头部标题
            foodTypes: [], // 食品分类列表
            hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
            imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
			articleTypes:[]
        }
    },
    async beforeMount(){
		if (!this.$route.query.geohash) {
			const address = await cityGuess();
			this.geohash = address.latitude + ',' + address.longitude;
		}else{
			this.geohash = this.$route.query.geohash
		}
		//保存geohash 到vuex
		/*
		this.SAVE_GEOHASH(this.geohash);
    	//获取位置信息
    	let res = await msiteAdress(this.geohash);
    	this.msietTitle = res.name;
    	// 记录当前经度纬度
    	this.RECORD_ADDRESS(res);
		*/
    	this.hasGetData = true;
    },
	async mounted(){
		getDoctorCategory().then(async res => {
			this.foodTypes = res.data;
			console.log(this.foodTypes);
			let articleRes=await getArticleCategory();
			this.articleTypes=articleRes.data;
			console.log(this.articleTypes);
		}).then(() => {
			//初始化swiper
			new Swiper('.swiper-container', {
					        pagination: '.swiper-pagination',
					        loop: true
					    });
		})
	},
    components: {
    	headTop,
    	shopList,
    	footGuide,
    },
    computed: {

    },
    methods: {
    	...mapMutations([
    		'RECORD_ADDRESS', 'SAVE_GEOHASH'
    	]),
    	// 解码url地址，求去restaurant_category_id值
    	getCategoryId(url){
    		let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''));
    		if (/restaurant_category_id/gi.test(urlData)) {
    			return JSON.parse(urlData).restaurant_category_id.id
    		}else{
    			return ''
    		}
    	}
    },
    watch: {

    }
}

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
	.link_search{
		left: .8rem;
		@include wh(.9rem, .9rem);
		@include ct;
	}
	.msite_title{
		@include center;
        width: 50%;
        color: #fff;
        text-align: center;
        margin-left: -0.5rem;
        .title_text{
            @include sc(0.8rem, #fff);
            text-align: center;
            display: block;
        }
	}
	.msite_nav{
		padding-top: 2.1rem;
		background-color: #fff;
		border-bottom: 0.025rem solid $bc;
		height: 10.6rem;
		.swiper-container{
			@include wh(100%, auto);
			padding-bottom: 0.6rem;
			.swiper-pagination{
				bottom: 0.2rem;
			}
		}
		.fl_back{
			@include wh(100%, 100%);
		}
	}
	.food_types_container{
		display:flex;
		flex-wrap: wrap;
		.link_to_food{
			width: 25%;
			padding: 0.3rem 0rem;
			@include fj(center);
			figure{
				img{
					margin-bottom: 0.3rem;
					@include wh(1.8rem, 1.8rem);
				}
				figcaption{
					text-align: center;
					@include sc(0.55rem, #666);
				}
			}
		}
	}
	.shop_list_container{
		margin-top: .4rem;
		border-top: 0.025rem solid $bc;
		background-color: #fff;
		.shop_header{
			.shop_icon{
				fill: #999;
				margin-left: 0.6rem;
				vertical-align: middle;
				@include wh(0.6rem, 0.6rem);
			}
			.shop_header_title{
				color: #999;
				@include font(0.55rem, 1.6rem);
			}
		}
	}
	.all{
		font-size: 15px;
		float: right;
	}

</style>
