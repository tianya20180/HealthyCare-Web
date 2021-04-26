<template>
	<div class="prescription">
		<head-top signin-up='msite'>
			
			<router-link to="/home" slot="msite-title" class="msite_title">
				<span class="title_text ellipsis">谷芽中医问诊平台</span>
			</router-link>
		</head-top>
		<el-card ><span style="margin-left: 4rem;">谷芽平台问诊单</span></el-card>
		<el-card>
			<span>患者名字：wangxi</span>
		
		
			<span>患者性别：男</span>
			<span style="margin-left: 1rem;">时间：2021</span>
				<el-divider></el-divider>
		</el-card>
		
		<el-table
		      :data="tableData"
		      style="width: 100%">
		      <el-table-column
		        prop="drugName"
		        label="中药名称"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="sum"
		        label="中药总量"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="way"
		        label="使用方法">
		      </el-table-column>
			  <el-table-column
			    prop="times"
			    label="次数">
			  </el-table-column>
		    </el-table>
		
		<el-card v-if="identity==1">
		
			
			<el-form>
				<el-input type="text" style="width: 8rem;" v-model="drugName"/><label>中药名称</label>
				<el-input type="text" style="width: 8rem;" v-model="sum"/><label>中药总量</label>
				<el-input type="text" style="width: 8rem;" v-model="way"/><label>使用方法</label>
				<el-input type="text" style="width: 8rem;" v-model="times"/><label>次数</label>
				<el-button type="primary" @click="addDrug">添加药品</el-button>
				<el-button @click="submit()" >提交问诊单</el-button>
			</el-form>
		</el-card>

		
		<foot-guide></foot-guide>
	</div>
</template>

<script>
	import headTop from 'src/components/header/head'
	import footGuide from 'src/components/footer/footGuide'
	import {addDrug, addPrescription,getPrescription } from 'src/service/getData'
	
	export default {
	        data(){
	            return{
	               tableData:[],
				   drugName:'',
				   times:'',
				   sum:'',
				   way:'',
				   doctorId:'',
				   userId:'',
				   myuser:{},
				   orderId:'',
				   patient:{}
	            }
	        },
	        beforeDestroy(){
	           
	        },
			async created(){
				this.myuser=this.$store.state.userinfo;
				this.identity=this.myuser.identity;
				this.orderId=this.$route.query.orderId;
				if(this.identity==0){
					
					let res=await getPrescription(this.orderId);
					
					console.log(res);
					if(res.status==0){
						const Prescription = res.data.drugList;
						this.tableData = [];
						console.log(Prescription);
						Prescription.forEach((item, index) => {
						    const tableData = {};
						
						    tableData.drugName = item.drugName;
						    tableData.sum = item.sum;
						    tableData.way = item.way;
						    tableData.times = item.times;
						 
						    this.tableData.push(tableData);
						})
					}
					
				
				}else{
					let id=this.$route.query.id;
					
					this.myuser=this.$store.state.userinfo;
					this.patient=await getPatient(this.$route.query.id);
				}
			},
	        components: {
	            headTop,
	            footGuide,
	        },
	        methods: {
	            async addDrug(){
					let obj={
						drugName:this.drugName,
						times:this.times,
						sum:this.sum,
						way:this.way
					}
					this.tableData.push(obj);
					let res=await addDrug(this.drugName,this.sum,this.times,this.way,this.orderId);
					if(res.status==0){
						
					}else{
						alert("添加失败");
					}
				},
				async submit(){
					
				    console.log("submit");
					
					let doctorId=this.myuser.id;
					let userId=this.$route.query.userId;
					let res=await addPrescription(doctorId,userId,this.orderId);
					
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
