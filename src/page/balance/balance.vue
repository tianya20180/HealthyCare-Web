 <template>
  <div class="page">
        <head-top head-title="我的余额" go-back='true'></head-top>
		
        <section class="content_container">
			<el-dialog title="充值" :visible.sync="showDiag">
			  <el-form :model="null">
			    <el-form-item label="充值金额">
			      <el-input v-model="money"></el-input>
			    </el-form-item>
			    <el-form-item label="密码">
			      <el-input v-model="password"></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="showDiag = false">取 消</el-button>
			    <el-button type="primary" @click="Recharge()">确 定</el-button>
			  </div>
			</el-dialog>
			<el-dialog title="提现" :visible.sync="showTansfer">
			  <el-form :model="null">
			    <el-form-item label="提现金额">
			      <el-input v-model="money"></el-input>
			    </el-form-item>
			    
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="showTansfer = false">取 消</el-button>
			    <el-button type="primary" @click="transfer()">确 定</el-button>
			  </div>
			</el-dialog>
            <section class="content">
                <header class="content_header">
                    <span class="content_title_style">当前余额</span>
                    <section class="contetn_description">
                        <img src="../../images/description.png" height="24" width="24">
                       
                    </section>
                </header>
                <p class="content_num">
                    <span>{{this.userinfo.money}}</span>
                    <span>元</span>
                </p>
                <div class="promit_button" @click="showTransfer()">提现</div>
			    <div class="promit_button" @click="show">充值</div>
            </section>
        </section>
       
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import alertTip from 'src/components/common/alertTip'
    import {signout,upload,recharge,transfer} from 'src/service/getData'
    
    export default {
      data(){
            return{
                showAlert: false,
                alertText: null,
				userinfo:{},
				password:'',
				showDiag:false,
				money:'',
				password:'',
				showTansfer:false
            }
        },
		created(){
			this.userinfo=this.$store.state.userinfo;
			
		},
        mounted(){
          
        },
        components: {
            headTop,
            alertTip,
        },
        computed: {
           
        },
        methods: {
			showTransfer(){
				this.showTansfer=true;
			},
			show(){
				this.showDiag=true;
			},
			async transfer(){
				console.log(this.userinfo);
				let res=await transfer(this.money,this.userinfo.id,this.userinfo.identity);
				if(res.status==0){
					alert("提现成功");
				}
			},
           async Recharge(){
				let res=await recharge(this.money,this.userinfo.id,this.password);
				console.log(res);
				if(res.status==0){
					let routerData = this.$router.resolve({path:'/payGateWay',query:{htmls:res.data}})
					                 this.htmls = res.data.result;
					                 //打开新页面
					                 window.open(routerData.href,'_ blank')
					                  const div = document.createElement('div');
					                  div.innerHTML = htmls;
					                 document.body.appendChild(div);
					                 document.forms [0].submit();
				}
			},
        }
    }
</script>
  
<style lang="scss" scoped>
    @import 'src/style/mixin';
  
    .page{
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .content_container{
        padding: .3rem;
        background-color: $blue;
        .content{
            padding: .4rem;
            background-color: #fff;
            border-radius: .15rem;
            .content_header{
                @include fj;
                font-size: .55rem;
                .contetn_description{
                    display: flex;
                    align-items: center;
                    img{
                        @include wh(.6rem, .6rem);
                        margin-right: .2rem;
                    }
                    .content_title_style{
                        color: $blue;
                    }
                }
                .content_title_style{
                    color: #666;
                }
            }
            .content_num{
                span:nth-of-type(1){
                    @include sc(1.8rem, #333);
                }
                span:nth-of-type(2){
                    @include sc(.7rem, #333);
                }
            }
            .promit_button{
                @include wh(100%, 2rem);
                @include sc(.8rem, #fff);
                border-radius: 0.15rem;
                line-height: 2rem;
                margin-top: 1rem;
                text-align: center;
                background-color: #B52A1D;
            }
        }
    }
    .deal_detail{
        @include sc(.6rem, #999);
        line-height: 2rem;
        padding-left: .5rem;
    }
    .no_log{
        text-align: center;
        margin-top: 1rem;
        img{
            @include wh(8rem, 5rem);
        }
        p{
            margin-top: .5rem;
            @include sc(.7rem, #666);
        }
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
