 <template>
  <div class="loginContainer">
      <form class="loginForm" >
          <section class="input_container">
              <input type="password" placeholder="请输入原密码" v-model="originPassword">
          </section>
          <section class="input_container">
              <input  type="password" placeholder="请输入新密码"  v-model="newPassword">
          </section>
          <button @click="submit()" class="submit">提交</button>
         
      </form>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
	import {changePassword} from '../../service/getData'
    export default {
      data(){
            return{
                system: null,
                showAlert: false,
                alertText: null,
				originPassword:'',
				newPassword:'',
				userinfo:null
            }
        },
        created(){
            //判断系统
            let u = navigator.userAgent;
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid) {
                this.system = 'Android';
            } else if (isIOS) {
                this.system = 'IOS';
            } else {
                this.system = 'pc';
            }
        },
        mixins: [],
        components: {
            headTop,
            alertTip,
        },
        props:[],
        methods: {
			submit(){
				this.userinfo=this.$store.state.userinfo;
				let res=changePassword(this.originPassword,this.newPassword,this.userinfo.phone);
				console.log(res);
				alert("修改密码成功");
				 
			},
            download(){
                //如果是ios用户则提示，否则直接下载
                if( this.system == 'IOS'){
                    this.showAlert = true;
                    this.alertText = 'IOS用户请前往AppStore下载'
                }else{
                    try {
                        let elemIF = document.createElement("iframe");
                        elemIF.src = 'http://cangdu.org/files/elm.apk';
                        elemIF.style.display = "none";
                        document.body.appendChild(elemIF);
                    } catch (e) {
                        alert('下载失败')
                    }
                }
            }
        }
    }
</script>
  
<style lang="scss" scoped>
    @import 'src/style/mixin';
  
    .download_page{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        z-index: 202;
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .dowload_container{
        text-align: center;
        .logo_img{
           border-radius: 1rem;
            margin-top: 1rem;
        }
        p{
            @include sc(.8rem, #666);
            margin-bottom: 1rem;
        }
        .determine{
            background-color: #4cd964;
            @include sc(.7rem, #fff);
            text-align: center;
            margin: 0 .7rem;
            line-height: 1.8rem;
            border-radius: 0.2rem;
            margin-top: 0.5rem;
        }
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
	.loginContainer{
	    padding-top: 1.95rem;
	    p, span, input{
	        font-family: Helvetica Neue,Tahoma,Arial;
	    }
	}
	.submit{
		@include sc(.65rem, #fff);
		font-family: Helvetica Neue,Tahoma,Arial;
		padding: .28rem .4rem;
		border: 1px;
		border-radius: 0.15rem;
		float: right;
	   background-color: #4cd964;;
	}
</style>
