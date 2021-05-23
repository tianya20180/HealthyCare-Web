<template>
	<div>
		  <head-top head-title="订单列表" go-back='true'></head-top>
		<el-card v-for="(item,i) in orderList" class="order">
			  <div>
					
						<span>订单号：{{item.orderId}}</span>
						<br/>
						<span>金额：{{item.money}}</span>
						<br/>
						<span>医生：{{item.doctorName}}</span>
						<br/>
						<span v-if="item.status==0">状态：未支付</span>
						
						<span v-else>状态：已支付</span>
						
						<el-button v-if="item.status==0" @click="pay(item.orderId)">支付</el-button>
					<div class="view"><i class="el-icon-caret-top"></i>{{item.createTime}}</div>
			  </div>
		</el-card>
		<foot-guide></foot-guide>
		
	</div>
</template>
<script>
import headTop from '../../components/header/head'
import footGuide from '../../components/footer/footGuide'
import {searchDoctor,getHotArticle,getCommits,getOrderByUserId,alipay} from '../../service/getData'
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
			userinfo:{},
			orderList:[]
        }
    },
    async created(){
	   this.userinfo=this.$store.state.userinfo;
	   let id=this.userinfo.id;
	   console.log(id);
       this.userinfo=this.$store.state.userinfo;
	   let res=await getOrderByUserId(id);
	   console.log(res);
	   this.orderList=res.data;
    },
    mounted(){
     
    },
    components:{
        headTop,
        footGuide,
    },
    methods:{
		pay(orderId){
			this.$alert('是否确认付款', '付款', {
			          confirmButtonText: '确定',
			          callback: async action => {
											
											  console.log(orderId);
											  let res = await alipay(orderId);
											  if (res.status == 0) {
											                       let routerData = this.$router.resolve({path:'/payGateWay',query:{htmls:res.data}})
											                        this.htmls = res.data.result;
											       
											                        //打开新页面
											                        window.open(routerData.href,'_ blank')
											                         const div = document.createElement('div');
											                         div.innerHTML = htmls;
											                        document.body.appendChild(div);
											                        document.forms [0].submit();
											     
											  } 
											  
											  //console.log(res);
											  /*
											  if(res.status==0){
												this.$router.push({ path: '/information', query: { id: this.userId, to: this.doctorId ,orderId:orderId} });
											  }else{
												alert("付款失败:"+res.message);  
											  }*/
											 }
			        });
		},
		
		
		
        }
}

</script>

<style>
	.view{
				color: #aaa;
				float: right;
				font-size:12px;
	}
	.order{
		font-size:15px;
		
	}
	.title{
		font-weight:bold;
	}
</style>
