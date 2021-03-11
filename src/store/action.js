import {
	getUser,
	getAddressList
} from '../service/getData'
import {
	GET_USERINFO,
	SAVE_ADDRESS
} from './mutation-types.js'

export default {

	async getUserInfo({
		commit,
		state
	}) {
		let res = await getUser();
		commit(GET_USERINFO, res)
	},
	async saveAddress({
		commit,
		state
	}) {

		if(state.removeAddress.length > 0) return;

		let addres = await getAddressList(state.userInfo.user_id);
		commit(SAVE_ADDRESS, addres);	
	},
	//设置聊天对象的信息
	actionSetChatToUser({commit}, obj) {
	  commit('setChatToUser', obj)
	},
	
	//初始化消息推送
	actionInitMessagePush({commit}, channel) {
	  commit('initMessagePush', channel)
	  commit('messagePushOnMessage')
	  commit('messagePushOnError', channel)
	  commit('messagePushOnClose')
	},
	
	//关闭消息推送
	actionCloseMessagePush({commit}) {
	  commit('closeMessagePush')
	},
	
	//减少未读信息的数量
	actionReduceUnreadMsg({commit}, num) {
	  commit('reduceUnreadMsg', num)
	},
	
	//设置聊天组名
	actionSetGroupName({commit}, otherId) {
	  commit('setGroupName', otherId)
	},
	
	//清空聊天组名
	actionClearGroupName({commit}) {
	  commit('clearGroupName')
	},
	
	//将某个用户发来的信息设为已读状态
	actionChangeReadState({commit}, name) {
	  commit('changeReadState', name)
	},
	
	//清空消息记录
	actionClearMsgRecord({commit}) {
	  commit('clearMsgRecord')
	}
}