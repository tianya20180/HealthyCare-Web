<template>
	<div>
		  <head-top head-title="评论列表" go-back='true'></head-top>
		<el-card v-for="(item,i) in commitList" class="article1">
			  <div>
					<span class="title">{{item.userName}}</span>
					<br />
						<span>{{item.content}}</span>
					<div class="view"><i class="el-icon-caret-top"></i>{{item.createTime}}</div>
			  </div>
		</el-card>
		<foot-guide></foot-guide>
		
	</div>
</template>
<script>
import headTop from '../../components/header/head'
import footGuide from '../../components/footer/footGuide'
import {searchDoctor,getHotArticle,getCommits} from '../../service/getData'
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
			commitList:[],
			userinfo:{}
        }
    },
    async created(){
	   this.userinfo=this.$store.state.userinfo;
	   let id=this.userinfo.id;
	   console.log(id);
       this.userinfo=this.$store.state.userinfo;
	   let res=await getCommits(id);
	   console.log(res);
	   this.commitList=res.data;
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
	.article1{
		font-size:15px;
		margin-top: 70px;
	}
	.title{
		font-weight:bold;
	}
</style>
