<template>
    <div class="loginContainer">
        <head-top head-title="诊断书" goBack="true">
            <!-- <div slot="changeLogin" class="change_login" @click="changeLoginWay">{{loginWay? "密码登录":"短信登录"}}</div> -->
        </head-top>
 
			<el-form>
				<el-form-item label="病情及诊断">
				   <el-input type="textarea" :rows="4" v-model="diagnosis"></el-input>
				 </el-form-item>
							
							
				<el-form-item label="治疗建议">
				    <el-input type="textarea" :rows="4" v-model="suggestion"></el-input>
				 </el-form-item>
			</el-form>
				
			
			<el-button type="primary" style="width: 4rem;margin: 0 auto;" @click="submit()">提交</el-button>
        
        
    </div>
</template>

<script>
    import headTop from '../../components/header/head'
    import alertTip from '../../components/common/alertTip'
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapMutations} from 'vuex'
    import {addInfomation,addDiagnosis} from '../../service/getData'
	import Stomp from 'stompjs'
	import SockJS from 'sockjs-client'
    export default {
        data(){
            return {
               orderId:'',
			   height:'',
			   weight:'',
			   desc:'',
			   userinfo:'',
			   desc:'',
			   facePhoto:'',
			   tonguePhoto:'',
			   time:'',
			   userId:'',
			   doctorId:'',
			   identity:'',
			   photo:'',
			   title:'',
			   age:'',
			   diagnosis:'',
			   suggestion:'',
			   identity:'',
			   stompClient:''
            }
        },
        async created(){
		   this.userinfo=this.$store.state.userinfo;
           this.userId=this.$route.query.userId;
		   this.identity=this.userinfo.identity;
		   this.connect();
        },
        components: {
            headTop,
            alertTip,
        },
     
        methods: {  
		  async connect() {
		  	let socket = new SockJS('http://192.144.236.155:8080/endpoint-websocket');
		  	let headers = {Authorization:''};
		    this.stompClient = Stomp.over(socket);
		  	await this.stompClient.connect(headers,   () =>  {
		  	            }, (err) => {
		  	                // 连接发生错误时的处理函数
		  	                console.log('失败')
		  	                console.log(err);
		  	 },
		  	 );
		  	 
		  },
		   async submit(){
			   let msg="诊断以及病情："+this.diagnosis+"治疗建议："+this.suggestion;
			   let avatar=this.userinfo.avatar;
			   let url='../../static/image/avatar/'+avatar;
			   let obj = {
			   	  content:msg,
			   	  fromId:this.userinfo.id,
			      toId: this.userId,
			   	  avatar:url,
			   	  time:"2021",
			      contentType:0,
			   	  sendType:this.identity
			   };
			    let jsonStr= JSON.stringify(obj);
				this.stompClient.send("/app/ptp/single/chat", {}, jsonStr);
				let data={
					'suggestion':this.suggestion,
					'diagnosis':this.diagnosis,
					'userId':this.userId,
					'doctorId':this.userinfo.id
				}
				console.log(data);
				let res=await addDiagnosis(data);
				console.log(res);
				this.$router.go(-1);
		   }
        }
    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .loginContainer{
        padding-top: 1.95rem;
        p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .change_login{
        position: absolute;
        @include ct;
        right: 0.75rem;
        @include sc(.7rem, #fff);
    }

    .loginForm{
        background-color: #fff;
        margin-top: .6rem;
        .input_container{
            display: flex;
            justify-content: space-between;
            padding: .6rem .8rem;
            border-bottom: 1px solid #f1f1f1;
            input{
                @include sc(.7rem, #666);
            }
            button{
                @include sc(.65rem, #fff);
                font-family: Helvetica Neue,Tahoma,Arial;
                padding: .28rem .4rem;
                border: 1px;
                border-radius: 0.15rem;
            }
            .right_phone_number{
                background-color: #4cd964;
            }
        }
        .phone_number{
            padding: .3rem .8rem;
        }
        .captcha_code_container{
            height: 2.2rem;
            .img_change_img{
                display: flex;
                align-items: center;
                img{
                    @include wh(3.5rem, 1.5rem);
                    margin-right: .2rem;
                }
                .change_img{
                    display: flex;
                    flex-direction: 'column';
                    flex-wrap: wrap;
                    width: 2rem;
                    justify-content: center;
                    p{
                        @include sc(.55rem, #666);
                    }
                    p:nth-of-type(2){
                        color: #3b95e9;
                        margin-top: .2rem;
                    }
                }
            }
        }
    }
    .login_tips{
        @include sc(.5rem, red);
        padding: .4rem .6rem;
        line-height: .5rem;
        a{
            color: #3b95e9;
        }
    }
    .login_container{
        margin: 0 .5rem 1rem;
        @include sc(.7rem, #fff);
        background-color: #4cd964;
        padding: .5rem 0;
        border: 1px;
        border-radius: 0.15rem;
        text-align: center;
    }
    .button_switch{
        background-color: #ccc;
        display: flex;
        justify-content: center;
        @include wh(2rem, .7rem);
        padding: 0 .2rem;
        border: 1px;
        border-radius: 0.5rem;
        position: relative;
        .circel_button{
            transition: all .3s;
            position: absolute;
            top: -0.2rem;
            z-index: 1;
            left: -0.3rem;
            @include wh(1.2rem, 1.2rem);
            box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0,0,0,.1);
            background-color: #f1f1f1;
            border-radius: 50%;
        }
        .trans_to_right{
            transform: translateX(1.3rem);
        }
        span{
            @include sc(.45rem, #fff);
            transform: translateY(.05rem);
            line-height: .6rem;
        }
        span:nth-of-type(2){
            transform: translateY(-.08rem);
        }
    }
    .change_to_text{
        background-color: #4cd964;
    }
    .to_forget{
        float: right;
        @include sc(.6rem, #3b95e9);
        margin-right: .3rem;
    }
	.profileinfopanel-upload1{
	    display: block;
	    position: absolute;
	    opacity: 0;
	    top: 2.35rem;
	    left: 0;
	    @include wh(100%,3.1rem);
	}
	.profileinfopanel-upload2{
	    display: block;
	    position: absolute;
	    opacity: 0;
	    top: 2.35rem;
	    left: 0;
	    @include wh(100%,3.1rem);
	}
	h2{
	    @include sc(.6rem,#333);
	    font-weight:500;
	    display:flex;
	    align-items:center;
	}
</style>
