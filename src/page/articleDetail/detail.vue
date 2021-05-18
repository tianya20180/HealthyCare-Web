
<template>
  <div class="">
    <head-top head-title="文章详情" go-back='true'></head-top>
	<div class="card">
		<el-card>
		  <div class="title">{{ detail.title }}</div>
		  <div class="des">{{ detail.description }}</div>
		  <div class="con" v-html="detail.content"></div>
		  <div class="time">{{ detail.createdatetime }}</div>
		</el-card>
	</div>
   
	<foot-guide></foot-guide>
	
  </div>
</template>
 
 
<script>
	import {getArticleDetailById} from 'src/service/getData'
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
    }
  },
  computed: {},
 async created() {
    let id = this.$route.query.id;
    let res=await getArticleDetailById(id);
	console.log(res);
    this.detail = res.data;
  },
  mounted() {},
  watch: {},
  methods: {},
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
</style>
 

