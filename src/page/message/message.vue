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
  
  export default{
    name:'message',
    components: {
      'v-chat-card': chatCard,
	  footGuide
    },
    data(){
      return{
        menuIndex: '3',
      }
    },
	created(){
		console.log( this.$store.state.historyMsg);
	},
    computed: {
      ...mapGetters([
        'historyMsg'
      ]),
    },
  }
</script>