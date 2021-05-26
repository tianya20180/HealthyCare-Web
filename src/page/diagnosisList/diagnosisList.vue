<template>
	<div>
		  <head-top head-title="诊断记录" go-back='true'></head-top>
		<el-card v-for="(item,i) in diagnosisList" class="article2">
			  <div>
					<span class="title">病情诊断：{{item.illness}}</span>
					<br />
						<span>治疗建议：{{item.suggestion}}</span>
					<br />
					<span>医生：{{item.doctorName}}</span>
					<div class="view"><i class="el-icon-caret-top"></i>{{item.createTime}}</div>
			  </div>
		</el-card>
		<foot-guide></foot-guide>
		
	</div>
</template>
<script>
import headTop from '../../components/header/head'
import footGuide from '../../components/footer/footGuide'
import {searchDoctor,getHotArticle,getCommits,getDiagnosis} from '../../service/getData'
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
			diagnosisList:[],
			userinfo:{}
        }
    },
    async created(){
		console.log("created");
	   this.userinfo=this.$store.state.userinfo;
	   let id=this.userinfo.id;
	   console.log(id);
	   let res=await getDiagnosis(id);
	   console.log(res);
	   this.diagnosisList=res.data;
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
	.article2{
		font-size:15px;
		margin-top: 50px;
	}
	.title{
		font-weight:bold;
	}
</style>
