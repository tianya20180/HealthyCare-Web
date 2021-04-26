<template>
    <div class="loginContainer">
        <head-top :head-title="问诊单" goBack="true">
            <!-- <div slot="changeLogin" class="change_login" @click="changeLoginWay">{{loginWay? "密码登录":"短信登录"}}</div> -->
        </head-top>
 
        <form class="loginForm" v-if="identity==0">
			<section class="input_container">
			    <input type="text" placeholder="身高" v-model.lazy="height">
			</section>
			<section class="input_container">
			    <input type="text" placeholder="体重" v-model.lazy="weight">
			</section>
			<section class="input_container">
			    <input type="text" placeholder="患病时长" v-model.lazy="time">
			</section>
		
			<section class="input_container">
			    <input type="text" placeholder="病情简述" v-model.lazy="desc">
			</section>
            <section class="input_container">
               <input type="file" class="profileinfopanel-upload1" @change="handleFacePhoto">
               <h2>请上传舌苔照片</h2>
            </section>
			<section class="input_container">
			   <input type="file" class="profileinfopanel-upload2" @change="handleTonguePhoto">
			   <h2>请上传面部照片</h2>
			</section>
        </form>
        <form class="loginForm" v-lese>
        	<section class="input_container">
        	    <input type="text" placeholder="身高" v-model.lazy="height" disabled="disabled">
        	</section>
        	<section class="input_container">
        	    <input type="text" placeholder="体重" v-model.lazy="weight" disabled="disabled">
        	</section>
        	<section class="input_container">
        	    <input type="text" placeholder="患病时长" v-model.lazy="time" disabled="disabled">
        	</section>
        
        	<section class="input_container">
        	    <input type="text" placeholder="病情简述" v-model.lazy="desc" disabled="disabled">
        	</section>
            <section class="input_container">
               <img :src="tonguePhoto"/>
               <h2>舌苔照片</h2>
            </section>
        	<section class="input_container">
        	  <img :src="facePhoto"/>
        	</section>
        </form>
    </div>
</template>

<script>
    import headTop from '../../components/header/head'
    import alertTip from '../../components/common/alertTip'
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapMutations} from 'vuex'
    import {addInfomation } from '../../service/getData'

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
			   identity:''
            }
        },
        async created(){
		   this.userinfo=this.$store.state.userinfo;
           this.orderId=this.$route.query.orderId;
		   this.doctorId=this.$route.query.doctorId;
		   this.userId=this.userinfo.userId;
		   this.identity=this.userinfo.identity;
		   if(this.identity==1){
			   let res=await getInfomation(this.orderId);
			   let info=res.data;
			   if(res.status==0){
				   this.height=info.height;
				   this.weight=info.weight;
				   this.facePhoto='data:image/jpeg;base64'+info.facePhoto;
				   this.tonguePhoto='data:image/jpeg;base64'+info.tonguePhoto;
				   this.desc=info.desc;
				   this.time=info.time;
			   }
		   }
        },
        components: {
            headTop,
            alertTip,
        },
     
        methods: {
		
            handleFacePhoto(e){
                this.$base64Img(e).then((res)=>{		//调用全局方法
                     this.facePhoto =res;
                 })
            },
		   handleTonguePhoto(){
			  this.$base64Img(e).then((res)=>{		//调用全局方法
			       this.tonguePhoto =res;
			   })
		   },
		   async submit(){
			   let res=await addInfomation(this.userId,this.orderId,this.height,this.weight,this.desc,this.facePhoto,this.tonguePhoto,this.time);
			   if(res.status==0){
				   alert("信息提交成功");
				   this.$router.push({ path: '/chat', query: { id: this.userId, to: this.doctorId ,orderId:orderId} });
				   
			   }else{
				   alert("信息提交失败");
			   }
			   
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
</style>
