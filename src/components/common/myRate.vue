<template>
  <div class="star">
    <input type="hidden" v-model="value">
    
    <div v-if="readonly">
      
      <img v-for="i in parseInt(value)" :key="i" :src="full">
      
      <img v-if="value.toString().indexOf('.') > 0" :src="half">
      
      <img v-for="i in parseInt(5 - value)" :key="i * 6" :src="empty">
    </div>
    
    <div v-else>
      
      <img v-for="i in num" :key="i" :src="full" @click="num = i">
      
      <img v-for="i in parseInt(5 - num)" :key="i * 5" :src="empty" @click="num += i">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 分值
    value: {
      type: Number,
      default: 0
    },
    // 只读，表示可以点击还是不可点击
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      num: 0,
      full: require('../../../static/img/红星.png'),
      empty: require('../../../static/img/灰星.png'),
      half: require('../../../static/img/半星.png')
    }
  },
  watch: {
    num () {
      // 可点击状态下，双向绑定的分值改变
      this.$emit('input', this.num)
    }
  }
}
</script>

<style scoped>
  .star img {
     width: 24px;
     height: 24px;
     margin: 0 2px;
   }
</style>
