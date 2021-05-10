<template>
    <div class="item-left">
        <div class="name-left">
           
        </div>
       <img :src="avatar" alt="" class="avatar-left"/>
	   <img :src="msg"  class="photo" v-if="msg" @click="show()">
      <span v-if="mytime">
            {{ mytime }}
			
        </span>
		<el-dialog title="图片" :visible.sync="disable" center :append-to-body='true' :lock-scroll="false" width="90%">
		      <img :src="msg" style="width: 400px; height: 400px;"/>
		</el-dialog>
    </div>
</template>

<script>
//import dateFormat from '../utils/date'
export default{
	data(){
	    return {
	       disable:false
	    }
	},
  props: ['msg', 'mytime', 'avatar','photo'],
  methods: {
  	  show(){
  		  console.log("show");
  		  this.disable=true;
  	  }
  },
  computed: {
    // getdate () {
    //   return dateFormat(new Date(this.mytime), 'yyyy-MM-dd HH:mm:ss')
    // }
  }
}
</script>

<style scoped>
.item-left {
    position: relative;
    clear: both;
    display: inline-block;
    /*padding: 16px 40px 16px 20px;*/
    padding: 16px 15px 16px 15px;
    margin: 30px 20px 10px 5px;
    border-radius: 10px;
    background-color: rgba(25, 147, 147, 0.2);
    /*background-color: #ffffff;*/
    animation: show-chat-even 0.25s 1 ease-in;
    -moz-animation: show-chat-even 0.25s 1 ease-in;
    -webkit-animation: show-chat-even 0.25s 1 ease-in;
    float: left;
    margin-left: 80px;
    /*color: #0EC879;*/
    color: #000000;
    font-weight: bold;
    text-align: left;
}
.item-left::after {
    position: absolute;
    top: 15px;
    content: '';
    width: 0;
    height: 0;
    border-top: 15px solid rgba(25, 147, 147, 0.2);
    border-left: 15px solid transparent;
    left: -15px;
}
.img-left {
    max-width: 200px;
}
.name-left {
    position: absolute;
    top: -20px;
    width: 280px;
    height: 20px;
    left: -65px;
    text-align: left;
    overflow: hidden;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: lighter;
}
span {
    word-break: break-all;
}
.time-left {
    position: absolute;
    top: -40px;
    width: 200px;
    height: 20px;
    right: -70px;
    text-align: right;
}
.avatar-left {
    position: absolute;
    top: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    left: -70px;
}
	
.photo{
	width: 170px;
	height: 170px;
}
</style>
