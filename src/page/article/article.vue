
<template>
  <div class="editor">
	 <head-top head-title="发表文章" go-back='true'></head-top>
  
    <el-form ref="form" :model="form" label-width="40px" class="form"> 
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
	  <el-form-item label="类别">
	    <el-select v-model="form.articletype"  style="width: 12rem; ">
	    	<el-option value="1" label="养生类"></el-option>
	    	<el-option value="2" label="传染病防治"></el-option>
	    	<el-option value="3" label="儿童健康"></el-option>
	    	<el-option value="4" label="老年健康"></el-option>
	    	<el-option value="5" label="癌症防治"></el-option>
	    	
	    </el-select>
	  </el-form-item>
      <el-form-item label="描述" >
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="正文">
        <quill-editor
          ref="myQuillEditor"
          class="editor"
          v-model="form.content"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
        />
      </el-form-item>
      <el-button class="btn" block type="primary" @click="submit">提交</el-button>
    </el-form>
  </div>

</template>
 
 
<script>

 
 
import { quillEditor } from 'vue-quill-editor'
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import axios from 'axios'
export default {
  components: { quillEditor },
  props: {},
  data() {
    return {
      form: {
		  userinto:{},
        title: '',
        description: '',
        content: '',
		articletype:''
      },
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'], //引用，代码块
 
 
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: 'ordered' }, { list: 'bullet' }], //列表
            [{ script: 'sub' }, { script: 'super' }], // 上下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            [{ direction: 'rtl' }], // 文本方向
 
 
            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
 
 
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], //字体
            [{ align: [] }], //对齐方式
 
 
            ['clean'], //清除字体样式
            // ['image', 'video'], //上传图片、上传视频
          ],
        },
        theme: 'snow',
      },
    }
  },
  computed: {},
  components:{
      headTop,
      footGuide,
  },
  created() {
	  this.userinfo=this.$store.state.userinfo;
	  console.log("created")
  },
  mounted() {},
  watch: {},
  methods: {
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    submit() {
      if (!this.form.title) {
        this.$message('请输入标题')
      }
      if (!this.form.description) {
        this.$message('请输入描述')
      }
      if (!this.form.content) {
        this.$message('请输入正文')
      }
 
      let _this=this;
      let formData = new FormData()
      formData.append('title', this.form.title)
      formData.append('description', this.form.description)
      formData.append('content', this.form.content)
	  formData.append('createuserid', this.userinfo.id)
	  formData.append('articletype', this.form.articletype)
	  
      // 发送 POST 请求
      axios({
        method: 'post',
        url: 'http://localhost:8080/article/addarticle',
        data: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then(function(response) {
		  console.log(response);
		  let res=response.data;
          if (res.status === 0) {
            alert('提交成功');
          }
          // this.form = {
          //   title: '',
          //   description: '',
          //   content: '',
          // }
         _this.$router.go(-1)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
  },
}
</script>
 
 
<style >
.editor {
  height: 15rem;
  width: 95%;
}
.btn {
  margin-top: 120px;
}
.form{
	margin-top: 70px;
}
</style>