<template>
	<div class="profile_page">
		<el-card>
			<div class="myorder-div2">
				<img :src="path" style="width: 4rem; height: 4rem;"></img>
			</div>
		</el-card>
		<el-card>
			<div class="myorder-div2">
				<span class="outsapn">姓名</span><span class="innerspan">{{username}}</span>
			</div>
			<div class="myorder-div2">
				<span class="outsapn">工作年限</span><span class="innerspan">{{years}}</span>
			</div >
			<div class="myorder-div2">
				<span class="outsapn">医院</span><span class="innerspan"> {{hospital}}</span>
			</div>
			
			<div class="myorder-div2">
				<span class="outsapn">详细介绍</span><span class="innerspan">   {{desc}}</span>
			</div>
			<div class="myorder-div2">
				<span class="outsapn">问诊价格</span><span class="innerspan">{{money}}元</span>
			</div>
		</el-card>
		 <el-card>
			 <div >
			 	<span>评论</span>
				<div >
				    <p v-for="(item) in commits" style="font-size: .6rem;">{{item.content}} <br>
				    {{item.userName}} 发表于 {{item.createTime}} 
					<span>评分:{{item.score}}</span>
					<el-divider></el-divider></p> 
					
				</div>
			 </div>
			 
		 </el-card>
	
	     <el-card>
			
			 	<el-button type="primary" class="ask1" @click="submit()">发起问诊</el-button>

		 </el-card>
	    
		
	</div>
</template>

<script>
	import {getDoctorInfo,getCommits,getAsk} from 'src/service/getData'
	
	export default {
	    data(){
	        return{
	            profiletitle: '我的',
	            username: '',           //用户名
	            resetname: '',
	            mobile: '',             //电话号码
	            working_years: 0,            //我的余额
	            count : 0,             //
	            pointNumber : 0,       //积分数
	            avatar: '',             //头像地址
				years:0,
				userinfo:null,
				path:'',
				identity:0,
				detail:'',
				special:'',
				disabled:false,
				money:0,
				desc:'',
				hospital:'',
				myuser:null,
				id:'',
				to:'',
				doctorId:'',
				commits:[]
	        }
	    },
		async created(){
			
			let doctorId=this.$route.query.id;

			this.myuser=this.$store.state.userinfo;
			console.log(this.myuser)
			this.to=doctorId;
		 	this.id=this.myuser.id;
			console.log(this.id);
			let res =await getDoctorInfo(doctorId);
			let commitsRes =await getCommits(doctorId);
			this.userinfo=res.data;
			console.log(commitsRes);
			if(commitsRes.status==0){
				//console.log(this.commitRes);
				this.commits=commitsRes.data;
			}
			
			this.initData();
		},
	    methods:{
			async submit(){
				let doctorId=this.$route.query.id;
				let res=await getAsk(this.id,doctorId);
				console.log(this.id);
				console.log(doctorId);
				if(res.status==0){
					console.log(res);
					let data=res.data;
					console.log(data);
					if(data==null||data==undefined||data.status==0) {
						this.$router.push({path: '/order/orderDetail', query: {doctorId:doctorId,money:this.money}});
						
					}else{
						this.$router.push({path: '/chat', query: {id:data.userId,to:data.doctorId,orderId:data.orderId}});
						
					}
				}
			},
	        initData(){
				console.log(this.userinfo.userName);
			    console.log(this.userinfo);
	            this.avatar = this.userinfo.avatar;
			    console.log("avatar:"+this.avatar);
	            this.username = this.userinfo.userName;
	            this.mobile = this.userinfo.phone ;
	            this.money = this.userinfo.orderMoney;
	            this.count = this.userinfo.count;
	            this.detail= this.userinfo.detail;
				this.path='/static/image/avatar/'+　this.avatar;
				this.identity = this.userinfo.identity;
				this.special= this.userinfo.special;
				this.desc=this.userinfo.des;
				this.hospital=this.userinfo.hospital;
				this.doctorId=this.userinfo.id;
				this.years=this.userinfo.workYears;
				console.log(this.path);
				this.path='../../../static/image/avatar/'+this.avatar;
	        },
	    }
	}
</script>

<style>
	.profile_page{
	    p, span{
	        font-family: Helvetica Neue,Tahoma,Arial;
	    }
	}
	.myorder-div2{
	    width:100%;
		margin-top: 0.5rem;
	    border-bottom:1px solid #f1f1f1;
	    padding:.433333rem .266667rem .433333rem 0;
	    @include sc(.7rem,#333);
	    display:flex;
	    justify-content:space-between;
	    span{
	        display:block;
	    }
	    .myorder-divsvg{
	        @include wh(.46667rem,.466667rem);
	        svg{
	            @include wh(100%,100%);
	        }
	    }
		
	}
	.ask1{
		flex: 1;
		margin-left: .2rem;
		@include sc(0.65rem, #fff);
		background-color: $blue;
		font-weight: bold;
		margin-left: 5rem;
		width: 4rem;
        height: 2rem;
	}
	.innerspan{
		font-size:20px
	}
	.outspan{
		font-size:22px
	}
	.commit{
		front-size:0.1rem
	}
</style>
