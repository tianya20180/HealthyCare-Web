<template>
  	<div class="paddingTop search_page">
        <head-top head-title="搜索" goBack="true"></head-top>
        <form class="search_form">
            <input type="search" name="search" placeholder="请输入医生或者疾病" class="search_input" v-model="searchValue" @input="checkInput">
            <input type="submit" name="submit" class="search_submit" @click.prevent="searchTarget('')">
        </form>
        <section v-if="doctorList.length">
            <h4 class="title_restaurant">医生</h4>
            <ul class="list_container">
                <router-link :to="{path:'/detailed', query:{id:item.id}}" tag="li" v-for="item in doctorList" :key="item.id" class="list_li">
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
                            <p>问诊量 {{item.month_sales||item.recent_order_num}} 单</p>
							
                        </div>
                    
                    </section>
                </router-link>
            </ul>
        </section>
		<section v-else>
			<el-card v-for="(item,i) in artilceList">
			 
				  <div >
					   <router-link :to="{ path: '/articleDeatil', query: { id: item.id }}">
							<span>{{item.title}}</span>
					    </router-link>
				  </div>
			 
				
			</el-card>
		</section>
       
        <div class="search_none" v-if="emptyResult">很抱歉！无搜索结果</div>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
import headTop from '../../components/header/head'
import footGuide from '../../components/footer/footGuide'
import {searchDoctor,getHotArticle} from '../../service/getData'
import {imgBaseUrl} from '../../config/env'
import {getStore, setStore} from '../../config/mUtils'

export default {
	data(){
        return {
            geohash: '', // msite页面传递过来的地址信息
            searchValue: '', // 搜索内容
            doctorList: [], // 搜索返回的结果
            imgBaseUrl, // 图片域名地址
            searchHistory: [], // 搜索历史记录
            showHistory: true, // 是否显示历史记录，只有在返回搜索结果后隐藏
            emptyResult: false, // 搜索结果为空时显示
			userinfo:null,
			id:'',
			path:'',
			artilceList:[]
        }
    },
    async created(){
       this.userinfo=this.$store.state.userinfo;
	   this.id=this.userinfo.id;
	   console.log(this.userinfo);
	   console.log(this.id);
	   this.path='../../static/image/avatar/'+　this.userinfo.avatar;
	   console.log(this.path);
	   let res=await getHotArticle();
	   this.artilceList=res.data;
    },
    mounted(){
        this.geohash = this.$route.params.geohash;
        //获取搜索历史记录
        if (getStore('searchHistory')) {
            this.searchHistory = JSON.parse(getStore('searchHistory'));
        }
    },
    components:{
        headTop,
        footGuide,
    },
    methods:{
        //点击提交按钮，搜索结果并显示，同时将搜索内容存入历史记录
        async searchTarget(historyValue){
            if (historyValue) {
                this.searchValue = historyValue;
            }else if (!this.searchValue) {
                return 
            }
            //隐藏历史记录
            
            //获取搜索结果
            
			let res = await searchDoctor(this.searchValue);
			this.doctorList=res.data;
			console.log("search res:"+this.doctorList.data);
            this.emptyResult = !this.doctorList.length;
			console.log("length:"+this.doctorList.length);
			console.log("empty result:"+this.emptyResult);
            /**
             * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
             * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
             */
          
        },
        //搜索结束后，删除搜索内容直到为空时清空搜索结果，并显示历史记录
        checkInput(){
            if (this.searchValue === '') {
                this.showHistory = true; //显示历史记录
                this.doctorList = []; //清空搜索结果
                this.emptyResult = false; //隐藏搜索为空提示
            } 
        },
        //点击删除按钮，删除当前历史记录
        deleteHistory(index){
            this.searchHistory.splice(index, 1);
            setStore('searchHistory',this.searchHistory);
        },
        //清除所有历史记录
        clearAllHistory(){
            this.searchHistory = [];
            setStore('searchHistory',this.searchHistory);
        }
    }
}

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    
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
	#view{
		front-size:1px;
	}
	#like{
		front-size:1px;
	}
</style>
