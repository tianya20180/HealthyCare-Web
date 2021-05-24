<template>
	<div>
		  <head-top head-title="文章列表" go-back='true'></head-top>
		<el-card v-for="(item,i) in artilceList" class="article">
			  <div>
				   <router-link :to="{ path: '/articleDeatil', query: { id: item.id }}">
						<span class="title">{{item.title}}</span>
				    </router-link>
					<br />
					<router-link :to="{ path: '/articleDeatil', query: { id: item.id }}">
						<span>{{item.description}}</span>
					</router-link>
					<!--<div class="view"><i class="el-icon-caret-top"></i>{{item.likeCount}}</div>
					<div class="view"><i class="el-icon-view"></i>{{item.viewCount}}</div>-->
			  </div>
		 
			
		</el-card>
		<foot-guide></foot-guide>
		
	</div>
</template>
<script>
import headTop from '../../components/header/head'
import footGuide from '../../components/footer/footGuide'
import {searchDoctor,getHotArticle,getArticleByCategoryId} from '../../service/getData'
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
		console.log("created");
	   let id=this.$route.query.articleCategory;
	   console.log(id);
       this.userinfo=this.$store.state.userinfo;
	   let res=await getArticleByCategoryId(id);
	   console.log(res);
	   this.artilceList=res.data;
    },
    mounted(){
     
    },
    components:{
        headTop,
        footGuide,
    },
    methods:{
        }
}

</script>

<style>
	.view{
				color: #aaa;
				float: right;
				font-size:12px;
	}
	.article{
		font-size:15px;
	}
	.title{
		font-weight:bold;
	}
</style>
