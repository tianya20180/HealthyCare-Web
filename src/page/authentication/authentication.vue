 <template>
    <div class="rating_page">
        <head-top head-title="认证信息上传" go-back='true'></head-top>
		
        <section class="profile-info">
			
            <section class="headportrait">
                <input type="file"  @change="uploadDoctor">
                <h2>医生证明上传</h2>
            </section>
			
           <section class="headportrait">
               <input type="file"  @change="uploadCard">
               <h2>身份证上传</h2>
           </section>
		
			
			
			<section class="headportrait">
			   <h2>工作年限</h2> <el-input type="text" v-model="years" style="width: 12rem; " />
			</section>
			<section class="headportrait">
			    <h2>医院</h2> <el-input type="text"   v-model="hospital"   style="width: 12rem; "/>
			</section>
			<section class="headportrait">
			   <h2>自我介绍</h2>  <el-input type="text" v-model="introduce" style="width: 12rem; "/>
			</section>
			<section class="headportrait">
			   <h2>问诊价格</h2>  <el-input type="text" v-model="money" style="width: 12rem; "/>
			</section>
			<section class="headportrait">
			   <h2>科室</h2> 
			   
				  <el-select v-model="category"  style="width: 12rem; ">
				  	<el-option value="1" label="皮肤科"></el-option>
				  	<el-option value="2" label="耳喉鼻科"></el-option>
				  	<el-option value="3" label="肝病科"></el-option>
				  	<el-option value="4" label="儿科"></el-option>
				  	<el-option value="5" label="内科"></el-option>
				  	<el-option value="6" label="消化科"></el-option>
				  	<el-option value="7" label="妇科"></el-option>
				  	<el-option value="8" label="心脑科"></el-option>
				  </el-select>
			   
			</section>
			 <el-checkbox v-model="check"></el-checkbox><span class="myfront">我已阅读并接受<a @click="showDialog()" href="#"> 《认证协议》</a></span>
			<el-dialog title="认证协议" :visible.sync="disable" center :append-to-body='true' :lock-scroll="false" width="90%">
			      <p>
					  迎您使用谷芽（“我们”）的产品和/或服务，您在访问我们的平台、使用我们的产品和/或服务时，我们可能会收集和使用您的相关信息，我们知道任何用户的个人信息安全都是至关重要的，我们将高度重视并竭力保护好您的个人信息隐私的安全。本隐私政策适用于您对谷芽平台平台的访问以及香园平台所提供的全部产品和/或服务（本隐私政策中统称为我们的产品和/或服务）的使用而提供或留存的信息，我们希望通过本隐私政策向您说明我们在您访问我们的平台、使用我们的产品和/或服务时是如何收集、使用、保存、共享和转让这些信息，以及我们将为您提供查询、更新、删除、保护以及注销这些信息的方式。
					  <br/>
					  
					  
					  
					  【重要提醒】
					  
					  本次更新我们主要是进一步明确我们产品和/或服务收集、使用及共享个人信息的类型、方式和用途等，进一步明确关于您查询、更正和删除个人信息的方式，以及账户注销申请的方式等。 
					  
					  
					  ，一旦您选择使用或在我们更新本隐私政策后（我们会及时提示您更新的情况）继续使用我们的产品和服务，即视为您同意本隐私政策（含更新版本）的全部内容，同意我们按本隐私政策收集、使用、共享和处理您的相关信息。
					  
					  
					  
					  
					  本隐私政策帮助您了解以下内容：
					  
					  我们如何收集和使用您的个人信息；
					  我们如何使用 Cookie 和其他追踪技术；
					  我们如何共享、转让、公开披露您的个人信息；
					  我们如何存储保存和保护您的个人信息；
					  您的权利；
					  我们如何处理未成年人的个人信息；
					  如何更新本政策；
					  如何联系我们；
					  争议解决；
					  定义和名词解释。
					  <br/>
					  一.我们如何收集和使用您的个人信息
					  
					  前言：
					  
					  个人信息是指以电子或者其他方式记录的能够单独或者与其他信息，结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。 具体的关于个人信息的定义以及本隐私政策将涉及到的个人信息，将通过本隐私政策如下具体内容的阐述以及第十章节的定义和名词解释进行明确。
					  我们根据《中华人民共和国网络安全法》和《信息安全技术个人信息安全规范》（GB/T 35273-2017）以及其它相关法律法规的要求，并严格遵循正当、合法、必要的原则，出于您访问我们的平台、使用我们提供的服务和/或产品等过程中而收集和使用您的个人信息。
					  如在后续服务过程中，我们需将您的个人信息用于本隐私政策未载明的其它用途，或基于特定的服务或目的将收集而来的信息用于其他目的，我们将以合理的方式向您告知并再次征得您的明示同意。
					  在收集您的个人信息后，我们将通过技术手段对数据进行去标识化处理，去标识化处理的信息将无法识别主体。请您了解并同意，在此情况下我们有权使用已经去标识化的信息；并在不透露您个人信息的前提下，我们有权对用户数据库进行分析并予以商业化的利用。
					  我们会对我们的产品与/或服务使用情况进行统计，并可能会与公众或第三方共享这些统计信息，以展示我们的产品与/或服务的整体使用趋势。但这些统计信息将进行匿名化处理，不包含您的任何身份识别信息。
					  对于您选择在我们平台发布非匿名信息如发布帖子和评论等，视为您同意在平台向其他用户公开展示您的个人信息以及您发布的信息。
					  
					  我们在以下情况或出于以下目的，收集和使用您的个人信息：
					  <br/>
					  （一）帮助您成为我们的在线注册用户
					  
					  为接受谷芽全面的服务，您应首先注册一个用户账号，为完成创建账号，您需至少提供如下信息：您准备使用的账户名、密码、您本人的电话号码（用于身份验证）或电子邮箱地址（用于验证邮箱），我们将通过发短信或者邮件的方式来验证您的身份是否有效。
					  同时谷芽平台作为医疗互联网平台，平台中大多数服务仅面向医疗卫生人士提供，因此在您需要使用相应的服务时（如谷芽平台论坛医疗相关版块服务、丁香机构号服务，谷芽平台网站提供的医学专区服务、丁香播咖、丁香公开课等服务），平台将验证您的医疗卫生专业人士的身份，您需要提供如下信息：姓名、医院、城市、科室、职称、执业信息等。
					  如您不注册账号，通过微信、微博、以及支付宝等我们提供的第三方平台授权登陆的，我们仍然需要绑定您的电话号码，通过电话号码来验证您的身份是否有效。
					  如您拒绝提供手机号码或身份证号码进行实名验证，将导致注册不成功，您可以退出注册页面后进入谷芽平台平台，仅浏览平台内的相关信息内容，但不可进行任何其它的操作或接受相应服务。
					  您账号注册成功后，您可以补充您的昵称、性别、生日、兴趣爱好以及您实名验证的相关信息，这些信息均属于您的“账户信息”，同时如果您提供如下信息，将有助于更好地帮助我们提供更好的服务和体验，
					  好的服务和体验：如工作职位、公司、教育背景等。但如果您不提供这些补充和额外信息，将不会影响使用本服务的基本功能。 
					  
					  （二）向您提供产品和服务
					  
					  1.谷芽平台提供信息展示以及信息搜索浏览功能
					  谷芽平台平台提供丰富的医疗健康相关的信息，这些信息包含文章、课程、视频、用户发布的帖子以及帖子中的评论等。为此，在您进行信息浏览时，我们可能会收集您在使用该等服务时的设备信息，包括设备名称、设备型号、唯一设备识别码、操作系统版本和应用程序版本、语言设置、分辨率、电信运营商信息，浏览器类型等等软硬件信息。
					  同时在您进行浏览时，还可根据个人需求和喜好选择搜索服务，通过搜索关键词精准找寻内容。为提供该等搜索服务，我们将可能收集您的日志信息，即您在搜索时，我们将自动搜集您使用谷芽平台的相关详细情况，并作为网络日志保存，包括但不限于您输入的搜索关键词信息和点击的链接，您发布的评论，咨询的相关问题，对我们服务的反馈与评价，您上传的文字资料、图片、视频等信息以及您的IP地址、浏览器的类型和使用的语言、硬件，设备信息、操作系统的版本、网络运营商的信息、您访问服务的日期、时间、时长等。
					  当您通过搜索来进一步搜索精确信息时，我们会保留您的搜索内容以方便您重复输入或为您展示与搜索的信息内容有相关性的内容。请您注意，您的搜索关键词信息无法单独识别您的身份，不属于您的个人信息，我们有权以任何的目的对其进行使用；只有当您的搜索关键词信息与您的其他信息相互结合使用并可以识别您的身份时，则在结合使用期间，我们会将您的搜索关键词信息作为您的个人信息，与您的搜索历史记录一同按照本隐私政策对其进行处理与保护。
					  
					  2.信息发布功能
					  谷芽平台平台为医疗卫生人员用户提供如下信息发布功能：用户发布贴子，发表评论，发布和上传视频，参与讨论话题、等，我们可能会收集您的手机号码、所在城市，所在医院，科室、职称、患者信息、患者年龄、患者性别、患者病情、本内容前述的浏览器类型、设备信息、日志信息等。尤其是对于必须是由医生用户才能参与的【查看/发布病例】的服务，我们必须收集您的个人敏感身份信息，包含姓名、城市、医院、科室、职称、学历等个人敏感信息。在具体的服务中，我们将向您阐明原因和内容范围，如您拒绝提供该等明确的个人身份信息的，您将无法使用该特别服务，但不影响您使用其它已提供相关个人信息可取得的服务。
					  
		
					  
					  
					  
					  （四）我们通过间接方式收集到的您的个人信息
					  
					  当您选择通过微信、微博、支付宝等第三方平台登陆使用我们的产品和/或服务时，我们可能从第三方处获取您授权共享的的账户信息（头像、昵称）；同时您可能通过我们的产品和/或服务使用由我们的关联方、合作方提供的服务，您同意我们根据实际第三方平台的授权要求以及业务合作需求及情况，从该等第三方以及我们的关联方或合作方处接收、使用、汇总、分析经您授权同意其向我们提供的您的个人信息。
					  
					  
					  
					  
					  （五）需征得您同意的例外情形
					  
					  您知晓，根据相关法律法规的规定，在以下情形中，我们可以在不征得您的知情同意的情况下而收集、使用相关个人信息：
					  
					  与国家安全、国防安全有关的；
					  与公共安全、公共卫生、重大公共利益有关的；
					  与犯罪侦查、起诉、审判和判决执行等有关的；
					  出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；
					  所收集的个人信息是个人信息主体自行向社会公众公开的；
					  从合法公开披露的信息中收集的您的个人信息的，如合法的新闻报道、政府信息公开等渠道；
					  根据您的要求签订合同所必需的；
					  用于维护所提供的产品与/或服务的安全稳定运行所必需的，例如发现、处置产品与/或服务的故障；
					  为合法的新闻报道所必需的；
					  学术研究机构基于公共利益开展统计或学术研究所必要，且对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的；
					  法律法规规定的其他情形。
					  
					  （六）如果您对我们收集和使用您的个人信息的法律依据有任何疑问或需要提供进一步的信息，请通过第八章节「如何联系我们」提供的联系方式与我们联系。
				  </p>
			</el-dialog>
			<el-button type="primary" style="width: 4rem;margin: 0 auto;" @click="submit()">提交</el-button>
        </section>
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'
    import headTop from 'src/components/header/head'
    import {signout,upload,authentication} from 'src/service/getData'
    import alertTip from 'src/components/common/alertTip'
    import {getImgPath} from 'src/components/common/mixin'
    import {imgBaseUrl} from 'src/config/env'
    import {removeStore} from 'src/config/mUtils'
    export default {
        data(){
            return{
                username:'',    //用户名
                resetname:'', //重置用户名
                infotel:'',     //用户手机
                avatar:'',      //用户头像
                show:false,     //显示提示框
                isEnter:true,  //是否登录
                isLeave:false, //是否退出
                showAlert: false,
                alertText: null,
                imgBaseUrl,
				userinfo:null,
				years:'',
				introduce:'',
				money:'',
				hospital:'',
				category:'',
				cardPhoto:'',
				doctorPhoto:'',
				doctorId:'',
				check:false,
				disable:false
            }
        },
        beforeDestroy(){
            clearTimeout(this.timer)
        },
		created(){
			this.userinfo=this.$store.state.userinfo;
			if(this.userinfo.status!=0){
				alert("该医生已经认证，无需认证");
				this.$router.go(-1);		   
			}
			console.log(this.$store.state);
			console.log(this.userinfo);
		},
        components: {
            headTop,
            alertTip,
        },
        mixins: [getImgPath],
        computed:{
            ...mapState([
                'userInfo', 'imgPath'
            ]),
        },
        methods: {
            ...mapMutations([
                'OUT_LOGIN', 'SAVE_AVANDER'
            ]),
			showDialog(){
				this.disable=true;
			},
			uploadCard(e){
				console.log("身份证上传");
				this.$base64Img(e).then((res)=>{		//调用全局方法
				     this.cardPhoto=res;
					 console.log(this.cardPhoto);
				 })
			},
			
			uploadDoctor(e){
				console.log("医生证上传");
				this.$base64Img(e).then((res)=>{		//调用全局方法
				    this.doctorPhoto=res;
					console.log(this.doctorPhoto);
				 })
			},
			created(){
				this.userinfo=this.$store.state.userinfo;
				console.log(this.userinfo);
				
			},
            exitlogin(){
                this.show=true;
                this.isEnter=true;
                this.isLeave=false;
            },
            waitingThing(){
                //取消推出
                clearTimeout(this.timer)
                this.isEnter=false;
                this.isLeave=true;
                this.timer = setTimeout(() =>{
                    clearTimeout(this.timer)
                    this.show=false;
                },200)
            },
            //退出登录
            async outLogin(){
                this.OUT_LOGIN();
                this.waitingThing();
                this.$router.go(-1);
                removeStore('user_id')
                await signout();
            },
            changePhone(){
                this.showAlert = true;
                this.alertText = '请在手机APP中设置';
            },
           async submit(){
			   if(!this.check){
				   alert("请同意用户协议")
				   return;
			   }
			   if(this.cardPhoto==null||this.cardPhoto==''
			   ||this.doctorPhoto==null||this.doctorPhoto==''){
				   alert("请填写完整");
				   return;
			   }
			   console.log(this.userinfo);
			   this.doctorId=this.userinfo.id;
			   console.log(this.doctorPhoto);
			    let formData={
					cardPhoto:this.cardPhoto,
					doctorPhoto:this.doctorPhoto,
					doctorId:this.doctorId,
					category:this.category,
					workYears:this.years,
					introduce:this.introduce,
					money:this.money
				}
				console.log(formData);
				let res=await authentication(formData);
				console.log(res);
				if(res.status==0)
					alert("提交成功");
				else
					alert("提交失败");
			}
        },
        watch: {
            userInfo: function (value) {
                if (value && value.user_id) {
                    this.username = value.username;
                    this.infotel = value.mobile;
                    this.avatar = value.avatar;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin.scss';

    .rating_page{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f2f2f2;
        z-index: 202;
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .profile-info{
        @include wh(100%,3.1rem);
        .profileinfopanel-upload{
            display: block;
            position: absolute;
            opacity: 0;
            top: 2.35rem;
            left: 0;
            @include wh(100%,3.1rem);
        }
        .headportrait{
            margin-top:.4rem;
            padding:.5rem .4rem;
            @include fj(space-between);
            align-items:center;
            border-top:1px solid #ddd;
            background:#fff;

            h2{
                @include sc(.6rem,#333);
                font-weight:500;
                display:flex;
                align-items:center;
            }
            .headportrait-div{
                span{
                    display:inline-block;

                    svg{
                        @include wh(100%,100%);
                    }
                }
                .headportrait-div-top{
                    @include wh(2rem,2rem);
                    @include borderRadius(50%);
                    vertical-align:middle;
                }
                .headportrait-div-bottom{
                    @include wh(.66667rem,1.4rem);
                    position:relative;
                    top:0.44rem;
                }
            }
        }
        .headportraitwo{
            margin-top:0;
            padding:.3rem .4rem;
            .headportrait-div{
                @include fj(left)
                p{
                    text-align:left;
                    line-height:1.39rem;
                    @include sc(.7rem,#999);
                    margin-right:.2rem;
                    font-weight:100;
                    font-family:Arial;
                }
                .headportrait-div-bottom{
                    top:0;
                }
            }
        }
        .headportraithree{
            border-bottom:1px solid #ddd;
        }
        .bind-phone{
            padding:.4rem .4rem;
            @include sc(.5rem,#666);
        }
        .exitlogin{
            width:96%;
            margin:1.3rem auto 0;
            line-height:1.5rem;
            @include borderRadius(5px);
            text-align:center;
            background:#d8584a;
            @include sc(.6rem,#fff);

        }
        .exitlogin:active{
            opacity:.8;
            background:#C1C1C1;
        }
    }
    .info-router{
        display:block;
    }
    .coverpart{
        @include wh(100%,100%);
        @include allcover;
        .cover-background{
            @include wh(100%,100%);
            @include allcover;
            background:#000;
            z-index:100;
            opacity:.2;
        }
        .cover-content{
            width:94%;
            background:$fc;
            padding:17px;
            position:absolute;
            top:20%;
            left:3%;
            z-index:1000;
            @include borderRadius(5px);
            .sa-icon{
                @include wh(90px,90px);
                border:4px solid #f8bb86;
                @include borderRadius(50%);
                margin:20px auto;
                position:relative;
                .sa-body{
                    @include wh(5px,47px);
                    @include borderRadius(2px);
                    background:#f8bb86;
                    @include cl;
                    top:10px;
                }
                .sa-dot{
                    @include wh(7px,7px);
                    @include borderRadius(50%);
                    background:#f8bb86;
                    @include cl;
                    bottom:10px;
                }
            }
            h2{
                width:100%;
                text-align:center;
                @include sc(30px,#575757);
                font-weight:500;
                margin:25px 0;
            }
            .sa-botton{
                width:100%;
                text-align:center;

                button{
                    display:inline-block;
                    padding:.4rem 1rem;
                    @include borderRadius(5px);
                    @include sc(.6rem,$fc);
                    letter-spacing:1px;
                    margin-top:26px;
                }
                .waiting{
                    background:#C1C1C1;
                    margin-right:.4rem;
                }
                .quitlogin{
                    background:rgb(221, 107, 85);
                }
            }

        }
    }
    @-webkit-keyframes bounceIn {
  from, 20%, 40%, 60%, 80%, 100% {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

@keyframes bounceIn {
  from, 20%, 40%, 60%, 80%, 100% {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
@-webkit-keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }

  100% {
    opacity: 0;
  }
}

@keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }

  100% {
    opacity: 0;
  }
}
body .coverpart .cover-animate{
    transition:all 1s;
    animation:bounceIn .6s;
}
body .coverpart .cover-animate-leave{
    animation:zoomOut .4s;
}
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
.myfront{
	font-size:1px
}
</style>
