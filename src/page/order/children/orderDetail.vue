 <template>
  <div class="order_detail_page">
        <head-top head-title="订单详情" go-back='true'></head-top>
        <section v-if="!showLoading" id="scroll_section" class="scroll_container">
            <section class="scroll_insert">
                <section class="order_detail_style">
                    <header>订单信息</header>
                    <section class="item_style">
                        <p class="item_left">订单号：</p>
                        <div class="item_right">
                            <p>{{orderData.orderId}}</p>
                        </div>
                    </section>
                    <section class="item_style">
                        <p class="item_left">支付方式：</p>
                        <div class="item_right">
                            <p>在线支付</p>
                        </div>
                    </section>
                    <section class="item_style">
                        <p class="item_left">下单时间：</p>
                        <div class="item_right">
                            <p>{{orderData.createTime}}</p>
                        </div>
                    </section>
					<section class="item_style">
					    <p class="item_left">金额：</p>
					    <div class="item_right">
					        <p>{{orderData.money}}</p>
					    </div>
					</section>
                </section>
				<el-button type="primary" style="float: right; width: 4rem;height: 2rem;" @click="pay()">立即支付</el-button>
				
            </section>
			
        </section>
		
		<foot-guide></foot-guide>
        <transition name="loading">
            <loading v-if="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import headTop from 'src/components/header/head'
    import {getImgPath} from 'src/components/common/mixin'
    import {getOrderDetail,pay,alipay} from 'src/service/getData'
    import loading from 'src/components/common/loading'
    import BScroll from 'better-scroll'
    import {imgBaseUrl} from 'src/config/env'
	import footGuide from 'src/components/footer/footGuide'
	

    export default {

      data(){
            return{
                showLoading: true, //显示加载动画
                orderData: null,
				userinfo:null,
				userId:'',
				doctorId:'',
				money:'',
                imgBaseUrl
            }
        },
        mounted(){
            this.initData();
        },
		created(){
			this.userinfo=this.$store.state.userinfo;
		},
        mixins: [getImgPath],
        components: {
            headTop,
            loading,
			footGuide
        },
        computed: {
            ...mapState([
                'orderDetail', 'geohash', 'userInfo'
            ]),
        },
        methods: {
			async pay(){
				/*
				   this.$alert('是否确认付款', '付款', {
				             confirmButtonText: '确定',
				             callback: async action => {
								  let orderId=this.orderData.orderId;
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
								
								 }
				           });*/
						   this.$confirm('您确定付款吗？').then(async ()=> {
						   
						   let orderId=this.orderData.orderId;
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
						   }).catch(() => {
						   
						   
						   })
			
				   
			},
            async initData(){
				    this.userId=this.userinfo.id;
					this.doctorId=this.$route.query.doctorId;
					this.money=this.$route.query.money;
					console.log(this.userId);
					console.log(this.doctorId);
					console.log(this.money);
                    let res = await getOrderDetail(this.userId, this.doctorId,this.money);
					this.orderData=res.data;
                    this.showLoading = false;
                    this.$nextTick(() => {
                        new BScroll('#scroll_section', {  
                            deceleration: 0.001,
                            bounce: true,
                            swipeTime: 1800,
                            click: true,
                        }); 
                    })
            },
        },
        watch: {
            userInfo: function (value) {
                if (value && value.user_id) {
                    this.initData();
                }
            }
        }
    }
</script>
  
<style lang="scss" scoped>
    @import 'src/style/mixin';
  
    .order_detail_page{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f1f1f1;
        z-index: 202;
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .scroll_container{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding-top: 1.95rem;
    }
    .scroll_insert{
        padding-bottom: 3rem;
    }
    .order_titel{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: .7rem;
        background-color: #fff;
        margin-bottom: 0.5rem;
        img{
            border: 0.05rem solid $blue;
            border-radius: 50%;
            @include wh(3rem, 3rem);
        }
        p:nth-of-type(1){
            @include sc(.9rem, #333);
            font-weight: bold;
            margin-top: .4rem;
        }
        p:nth-of-type(2){
            @include sc(.55rem, #999);
            width: 10rem;
            margin-top: .3rem;
            text-align: center;
        }
        .order_again{
            @include sc(.6rem, $blue);
            margin-top: .5rem;
            border: 0.025rem solid $blue;
            padding: .15rem .4rem;
            border-radius: .1rem;
        }
    }
    .food_list{
        background-color: #fff;
        .food_list_header{
            @include fj;
            align-items: center;
            padding: .2rem .5rem;
            border-bottom: 1px solid #f5f5f5;
            .shop_name{
                img{
                    @include wh(1.2rem, 1.2rem);
                    vertical-align: middle;
                    margin-right: .2rem;
                }
                span{
                    @include sc(.75rem, #333);
                    font-weight: bold;
                }
            }
            svg{
                @include wh(.6rem, .6rem);
                fill: #666;
            }
        }
        .food_list_ul{
            li{
                @include fj;
                align-items: center;
                padding: 0 .5rem;
                line-height: 2rem;
                .food_name{
                    @include sc(.6rem, #666);
                    flex: 4;
                }
                .quantity_price{
                    flex: 1;
                    @include fj;
                    align-items: center;
                    span:nth-of-type(1){
                        @include sc(.6rem, #ccc);
                    }
                    span:nth-of-type(2){
                        @include sc(.6rem, #666);
                    }
                }
            }
        }
        .deliver_fee{
            @include fj;
            align-items: center;
            padding: 0 .5rem;
            line-height: 2rem;
            border-top: 1px solid #f5f5f5;
            span{
                @include sc(.6rem, #666);
            }
        }
        .pay_ment{
            @include sc(.6rem, #fb6b23);
            border-top: 1px solid #f5f5f5;
            font-weight: bold;
            line-height: 2rem;
            text-align: right;
            padding-right: .5rem;
        }
    }
    .order_detail_style{
        background-color: #fff;
        margin-top: 0.5rem;
        header{
            @include sc(.75rem, #333);
            padding: .5rem;
            border-bottom: 1px solid #f5f5f5;
        }
        .item_style{
            display: flex;
            padding: .5rem;
            p{
                @include sc(.65rem, #666);
                line-height: 1rem;
            }
        }
    }
    .loading-enter-active, .loading-leave-active {
        transition: opacity .7s
    }
    .loading-enter, .loading-leave-active {
        opacity: 0
    }
    
</style>
