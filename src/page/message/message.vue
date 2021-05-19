<template>
  <div>
    <div class="lists" v-for="(list,index) in historyMsg">
      <v-chat-card :list="list"></v-chat-card>
    </div>
	 <foot-guide></foot-guide>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  //import footGuide from '../../components/footer/footGuide'
  import chatCard from '../../components/chatCard'
  import footGuide from '../../components/footer/footGuide'
  import {getMessageListByUser,getMessageListByDoctor,getAskByUserId,getAskByDoctorId} from 'src/service/getData'
  
  export default{
    name:'message',
    components: {
      'v-chat-card': chatCard,
	  footGuide
    },
    data(){
      return{
        menuIndex: '3',
		userinfo:{},
		historyMsg:[]
      }
    },
	async created(){
		this.userinfo=this.$store.state.userinfo;
		let res=null;
		console.log(this.userinfo.identity);
		if(this.userinfo.identity==0){
			 console.log(this.userinfo.id);
			 res=await getAskByUserId(this.userinfo.id);
			 console.log(res);
			 let data=res.data;
			 for(let obj of data){
				 let msg={
					 avatarUrl:obj.doctorAvatar,
					 unreadCount:obj.userUnread,
					 userName:obj.doctorName,
					 userId:obj.userId,
					 doctorId:obj.doctorId,
					 orderId:obj.orderId
				 }
				 this.historyMsg.push(msg);
			 }			 
			 console.log(this.historyMsg);
		}
		else{
			res=await getAskByDoctorId(this.userinfo.id);
			console.log(res);
			let data=res.data;
			for(let obj of data){
							 let msg={
								 avatarUrl:obj.userAvatar,
								 unreadCount:obj.doctorUnread,
								 userName:obj.userName,
								 userId:obj.userId,
								 doctorId:obj.doctorId
							 }
							 this.historyMsg.push(msg);
			}			 
			console.log(this.historyMsg);
			console.log(this.historyMsg);
		}
		
	}
  }
</script>