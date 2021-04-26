<template>
	<div>
		<transition name="router-fade" mode="out-in">
			<keep-alive>
			    <router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    	</transition>
    	<transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
		<svg-icon></svg-icon>	
    </div>
</template>

<script>
	import svgIcon from './components/common/svg';
  	export default {
    	components:{
            svgIcon
        },
		created() {
		    // 在页面加载时读取sessionStorage里的状态信息
		    if (sessionStorage.getItem('store')) {
		      this.$store.replaceState(
		        Object.assign(
		          {},
		          this.$store.state,
		          JSON.parse(sessionStorage.getItem('store'))
		        )
		      )
		    }
		
		    // 在页面刷新时将vuex里的信息保存到sessionStorage里
		    // beforeunload事件在页面刷新时先触发
		    window.addEventListener('beforeunload', () => {
		      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
		    })
		  },
  	}

</script>

<style lang="scss">
  	@import './style/common';
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>
