<template>
	<div>
		 
		<el-card v-for="(item,i) in artilceList" class="article1">
			  <div>
				   <router-link :to="{ path: '/articleDeatil', query: { id: item.id }}">
						<span class="title">{{item.title}}</span>
				    </router-link>
					<br />
					<router-link :to="{ path: '/articleDeatil', query: { id: item.id }}">
						<span>{{item.description}}</span>
					</router-link>
					<div class="view"><i class="el-icon-caret-top"></i>{{item.likeCount}}</div>
					<div class="view"><i class="el-icon-view"></i>{{item.viewCount}}</div>
			  </div>
		 
			
		</el-card>
		<div class="search_none" v-if="this.count==0">很抱歉！当前分类暂无文章</div>
		
		<div class="Pagination" style="text-align: left; margin-top: 10px">
		  <el-pagination
		    @size-change="handleSizeChange"
		    @current-change="handleCurrentChange"
		    :current-page="currentPage"
		    :page-size="20"
		    layout="total, prev, pager, next"
		    :total="count"
		  >
		  </el-pagination>
		</div>
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
			artilceList:[],
			currentPage:1,
			offset:20,
			count:'',
			limit:20
			
        }
    },
    async created(){
		console.log("created");
	   this.id=this.$route.query.articleCategory;
	   //console.log(id);
       this.userinfo=this.$store.state.userinfo;
	   this.init();
    },
    mounted(){
     
    },
    components:{
        headTop,
        footGuide,
    },
    methods:{
		handleSizeChange(val) {
		    console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
		    this.currentPage = val;
		    this.offset = (val - 1)*this.limit;
		    this.init();
		},
		async init(){
			console.log("init");
			let res=await getArticleByCategoryId(this.id,this.currentPage,this.offset);
			console.log(res);
			this.artilceList=res.data.records;
			this.count =res.data.total;
			
		}
        }
}

</script>

<style>
	.view{
				color: #aaa;
				float: right;
				font-size:12px;
	}
	.article1{
		font-size:15px;
		
	}
	.title{
		font-weight:bold;
	}
	.search_none{
	
	    margin: 0 auto;
	    @include font(0.65rem, 1.75rem);
	    color: #333;
	    background-color: #fff;
	    text-align: center;
	    margin-top: 5.5rem;
	}
	.Pagination{
		margin-top: 15rem;
	}
</style>
