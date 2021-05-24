
<template>
  <div class="">
    <head-top head-title="文章详情" go-back='true'></head-top>
	<div class="card">
		<el-card class="article">
		  <div class="title">{{ detail.title }}</div>
		  <div class="des">{{ detail.description }}</div>
		  <div class="con" v-html="detail.content"></div>
		  <div class="time">{{ detail.createdatetime }}</div>
		  <div class="author">作者：{{ detail.authorName }}</div>
		 <!-- <div class="view"><i class="el-icon-caret-top" @click="like()"></i>{{detail.likeCount}}</div>
		  <div class="view"><i class="el-icon-view" ></i>{{detail.viewCount}}</div>-->
		</el-card>
	</div>
   
	<foot-guide></foot-guide>
	
  </div>
</template>
 
 
<script>
	import {getArticleDetailById,viewArticle,likeArticle} from 'src/service/getData'
	import headTop from 'src/components/header/head'
	import footGuide from 'src/components/footer/footGuide'
	
export default {

  components: {
	      headTop,
	  	footGuide
	  },
  props: {},
  data() {
    return {
      detail: {},
	  userinfo:{}
    }
  },
  computed: {},
 async created() {
    let id = this.$route.query.id;
	this.userinfo=this.$store.state.userinfo;
    let res=await getArticleDetailById(id);
	console.log(res);
    this.detail = res.data;
	 res=await viewArticle(id);
	 console.log(res);
	 this.detail.viewCount=res.data;
  },
  mounted() {},
  watch: {},
  methods: {
	  async like(){
		  let articleId = this.$route.query.id;
		  console.log(this.userinfo);
		  let userId=this.userinfo.id;
		  console.log("like");
		  let res=await likeArticle(articleId,userId);
		  console.log(res);
		  if(res.status==0){
			  alert("点赞成功");
			  this.detail.likeCount=res.data;
		  }else{
			  alert("点赞失败");
		  }
	  },
	  
	  
  },
}
</script>
 
 
<style scoped lang="less">
.title {
  font-weight: bold;
  font-size: 16px;
  text-align: left;
  margin-bottom: 10px;
}
.des {
  font-size: 14px;
  text-align: left;
  margin-bottom: 10px;
}
.con {
  font-size: 14px;
  text-align: left;
  margin-bottom: 10px;
}
.time {
  font-size: 14px;
  text-align: left;
}
.card{
	position: relative;
	margin-top: 80px;
}
.view{
			color: #aaa;
			float: right;
			font-size:12px;
}
.author{
	font-size:20px;
}
</style>
 

