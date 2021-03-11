<template>
  	<div class="paddingTop search_page">
		
	
        <div class="chat-content">
          <div v-for="obj in msgRecord">
            <v-my-msg
            v-if="obj.name == myId"
            :msg="obj.msg"
            :avatar="obj.avatar"
            :mytime="obj.time"></v-my-msg>
          <v-other-msg
            v-else
            :msg="obj.msg"
            :avatar="obj.avatar"
            :mytime="obj.time"></v-other-msg>
          </div>
        </div>

       <form class="search_form" style="">
           <input type="search" name="search" placeholder="请输入消息" class="search_input" v-model="content" >
           <input type="submit" name="submit" class="search_submit" @click.prevent="sendMessage() " value="发送">
       </form>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
import headTop from '../../components/header/head'
import footGuide from '../../components/footer/footGuide'
import {searchRestaurant} from '../../service/getData'
import {imgBaseUrl} from '../../config/env'
import {getStore, setStore} from '../../config/mUtils'
import myMsg from '../../components/myMsg'
import otherMsg from '../../components/otherMsg'
import Stomp from 'stompjs'
import SockJS from 'sockjs-client'


export default {

	data(){
        return {
        input:'',
        myUserInfo:{}, //我的个人信息
        headerMsg: {
          centerWord: '',
          //这种绑定的图片只能放在static文件夹下
          leftImg: '/static/images/back.png',
        },
        container: {}, //.chat-content容器
        websock: null,
        msgRecord: [], //消息记录
		stompClient:'',
		content:'',
		myId:''
        }
    },
    created(){
      // this.initWebSocket();
	  this.myId=this.$route.query.id;
    },
	destroyed() {
	      this.websock.close() //离开路由之后断开websocket连接
	 },
    mounted(){
      this.connect();
    },
    components:{
        headTop,
        footGuide, 
		'v-my-msg': myMsg,
	    'v-other-msg': otherMsg
    },
    methods:{
		
        //点击提交按钮，搜索结果并显示，同时将搜索内容存入历史记录
		sendMessage(){
			 let id = this.$route.query.id;
			 let to = this.$route.query.to;
			 to=(id==1?2:1);
			 console.log("id:"+id);
			 let url='../../static/img/1.jpg';
			 let time=new Date();
			 let jsonStr=JSON.stringify({'content':this.content,'fromId':id,'toId':to,'avatar':url,'time':time.getDate()});
			 const obj = {
			   name: id,
			   msg: this.content,
			   avatar: url,
			   time: time.getDate()
			 };
			 this.msgRecord.push(obj);
			 console.log("json str"+jsonStr);
			 this.stompClient.send("/app/ptp/single/chat", {}, jsonStr);
		},
	    connect() {
			let socket = new SockJS('http://localhost:8080/endpoint-websocket');
			let headers = {Authorization:''};
			let id = this.$route.query.id;
		    this.stompClient = Stomp.over(socket);
			
			this.stompClient.connect(headers,() => {
			                this.stompClient.subscribe('/chat/single/'+id, (msg) => { // 订阅服务端提供的某个topic
			                    console.log('收到服务端消息')
			                    console.log('msg.body:'+msg.body);  // msg.body存放的是服务端发送给我们的信息
								let msgObject=JSON.parse(msg.body);
								console.log("content:"+msgObject.content);
								let time=new Date();
								const obj = {
								  name: msgObject.fromId,
								  msg: msgObject.content,
								  avatar: msgObject.avatar,
								  time: msgObject.time
								}
								this.msgRecord.push(obj)
			                });
			               
			            }, (err) => {
			                // 连接发生错误时的处理函数
			                console.log('失败')
			                console.log(err);
			 });
		}
     }
}

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    
    .search_page{
        margin-bottom: 2rem;
    }
    .search_form{
		position: fixed;
		top: 16.3rem;
        background-color: #fff;
        padding: 0.5rem;
        display: flex;
        input{
            height: 1.5rem;
        }
        .search_input{
            flex: 4;
            border: 0.025rem solid $bc;
            @include sc(0.65rem, #333);
            border-radius: 0.125rem;
            background-color: #f2f2f2;
            font-weight: bold;
            padding: 0 0.25rem;
			width: 13rem;
        }
        .search_submit{
            flex: 1;
            border: 0.025rem solid $blue;
            margin-left: .2rem;
            @include sc(0.65rem, #fff);
            border-radius: 0.125rem;
            background-color: $blue;
            font-weight: bold;
            padding: 0 0.25rem;
        }
    }
    .title_restaurant{
        font-size: 0.6rem;
        line-height: 2rem;
        text-indent: 0.5rem;
        font-weight: bold;
        color: #666;
    }
    .list_container{
        background-color: #fff;
    }
    .list_li{
        display: flex;
        justify-content: 'center';
        padding: 0.5rem;
        border-bottom: 0.025rem solid $bc;
        .item_left{
            margin-right: 0.25rem;
            .restaurant_img{
                @include wh(1.7rem, 1.7rem);
            }
        }
        .item_right{
            font-size: 0.55rem;
            flex: 1;
            .item_right_text{
                padding-bottom: 0.25rem;
                border-bottom: 0.025rem solid $bc;
                p{
                    line-height: .9rem;
                }
                .pay_icon{
                    margin-bottom: -0.08rem;
                }
            }
            .item_right_detail{
                margin-top: 0.25rem;
                li{
                    font-size: 0;
                    span{
                        font-size: .5rem;
                        vertical-align: middle;
                        display: inline-block;
                        margin-bottom: 0.2rem;
                    }
                    .activities_icon{
                        @include sc(.5rem, #fff);
                        font-weight: bold;
                        padding: .04rem;
                        border-radius: 0.15rem;
                        margin-right: 0.125rem;
                    }
                    .only_phone{
                        color: #FF6000;
                    }
                }
            }
        }
    }
    .search_history{
        .history_list{
            background-color: #fff;
            border-bottom: 0.025rem solid $bc;
            @include font(0.7rem, 2rem);
            padding: 0 0.3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .history_text{
                display: inline-block;
                width: 80%;
            }
            .delete_icon{
                @include wh(1rem, 1rem);
            }
        }
        .clear_history{
            background-color: #fff;
            color: $blue;
            @include font(.7rem, 2rem);
            font-weight: bold;
            text-align: center;
        }
    }
    .search_none{
        margin: 0 auto;
        @include font(0.65rem, 1.75rem);
        color: #333;
        background-color: #fff;
        text-align: center;
        margin-top: 0.125rem;
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
	.chat-content {
	  width: 100%;
	  overflow: scroll;
	  background: #ffffff;
	}
	
	
</style>
