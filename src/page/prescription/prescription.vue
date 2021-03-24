<template>
	<div class="prescription">
		<head-top signin-up='msite'>
			
			<router-link to="/home" slot="msite-title" class="msite_title">
				<span class="title_text ellipsis">谷芽中医问诊平台</span>
			</router-link>
		</head-top>
		<el-card ><span style="margin-left: 4rem;">谷芽平台问诊单</span></el-card>
		<el-card>
			<span>患者名字：wx</span>
			<span style="margin-left: 1rem;">患者年龄：20</span>
		
			<span>患者性别：男</span>
			<span style="margin-left: 1rem;">时间：2021</span>
				<el-divider></el-divider>
		</el-card>
		
		<el-table
		      :data="tableData"
		      style="width: 100%">
		      <el-table-column
		        prop="date"
		        label="中药名称"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="name"
		        label="中药总量"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="address"
		        label="使用方法">
		      </el-table-column>
			  <el-table-column
			    prop="address"
			    label="次数">
			  </el-table-column>
		    </el-table>
		
		<el-card>
			<el-form>
				<el-input type="text" style="width: 8rem;" v-model="drugName"/><label>中药名称</label>
				<el-input type="text" style="width: 8rem;" v-model="sum"/><label>中药总量</label>
				<el-input type="text" style="width: 8rem;" v-model="way"/><label>使用方法</label>
				<el-input type="text" style="width: 8rem;" v-model="times"/><label>次数</label>
				<el-button type="primary" @click="addDrug">添加药品</el-button>
			</el-form>
		</el-card>
		<el-card>
			<span>医生名称：wx</span>
			  
		</el-card>
		<el-button @click="submit()">提交问诊单</el-button>
		<foot-guide></foot-guide>
	</div>
</template>

<script>
	import headTop from 'src/components/header/head'
	import footGuide from 'src/components/footer/footGuide'
	import {addDrug, addPrescription} from 'src/service/getData'
	
	export default {
	        data(){
	            return{
	               tableData:[],
				   drugName:'',
				   times:'',
				   sum:'',
				   way:'',
				   doctorId:'',
				   userId:''
	            }
	        },
	        beforeDestroy(){
	           
	        },
	        components: {
	            headTop,
	            footGuide,
	        },
	        methods: {
	            addDrug(){
					let obj={
						drugName:this.drugName,
						times:this.times,
						sum:this.sum,
						way:this.way
					}
					this.tableData.push(obj);
					let res=addDrug(this.drugName,this.sum,this.times,this.way);
					if(res.status==0){
						alert("添加成功");
					}else{
						alert("添加失败");
					}
				},
				submit(){
					let res=addPrescription(this.doctorId,this.userId);
					if(res.status==0){
						alert("提交成功");
					}else{
						alert("提交失败");
					}
				}
	        }
	    }
</script>

<style>
	.prescription{
		font-size:50%
	}
</style>
