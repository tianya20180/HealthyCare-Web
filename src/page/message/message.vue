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
  import {getMessageListByUser,getMessageListByDoctor} from 'src/service/getData'
  
  export default{
    name:'message',
    components: {
      'v-chat-card': chatCard,
	  footGuide
    },
    data(){
      return{
        menuIndex: '3',
		userinfo:{}
      }
    },
	async created(){
		this.userinfo=this.$store.state.userinfo;
		console.log( this.$store.state.historyMsg);
		let res=null;
		if(this.userinfo==0){
			 res=await getMessageListByUser(this.userinfo.id);
		}
		else{
			res=await getMessageListByDoctor(this.userinfo.id);
		}
		if(res.status==0){
		   this.historyMsg =res.data;
		}
	},
    computed: {
      ...mapGetters([
        'historyMsg'
      ]),
    },
  }
</script>