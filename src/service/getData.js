import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

let baseUrl = '';
let routerMode = 'history';
if (process.env.NODE_ENV == 'development') {  
    baseUrl = 'http://localhost:8080';
}else{  
    baseUrl = 'http://www.test.com';
}


/**
 * 获取首页默认地址
 */

export const cityGuess = () => fetch('/v1/cities', {
	type: 'guess'
});


/**
 * 获取首页热门城市
 */

export const hotcity = () => fetch('/v1/cities', {
	type: 'hot'
});


/**
 * 获取首页所有城市
 */

export const groupcity = () => fetch('/v1/cities', {
	type: 'group'
});


/**
 * 获取当前所在城市
 */

export const currentcity = number => fetch('/v1/cities/' + number);


/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => fetch('/v1/pois', {
	type: 'search',
	city_id: cityid,
	keyword: value
});


/**
 * 获取msite页面地址信息
 */

export const msiteAdress = geohash => fetch('/v2/pois/' + geohash);


/**
 * 获取msite页面食品分类列表
 */

export const msiteFoodTypes = geohash => fetch('/v2/index_entry', {
	geohash,
	group_type: '1',
	'flags[]': 'F'
});


/**
 * 获取msite商铺列表
 */

export const shopList = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
	let supportStr = '';
	support_ids.forEach(item => {
		if (item.status) {
			supportStr += '&support_ids[]=' + item.id;
		}
	});
	let data = {
		latitude,
		longitude,
		offset,
		limit: '20',
		'extras[]': 'activities',
		keyword: '',
		restaurant_category_id,
		'restaurant_category_ids[]': restaurant_category_ids,
		order_by,
		'delivery_mode[]': delivery_mode + supportStr
	};
	return fetch('/shopping/restaurants', data);
};


/**
 * 获取search页面搜索结果
 */

export const searchRestaurant = (geohash, keyword) => fetch('/v4/restaurants', {
	'extras[]': 'restaurant_activity',
	geohash,
	keyword,
	type: 'search'
});



export const searchDoctor = (keyword) => fetch(baseUrl+'/doctor/search', {
	userName:keyword
});

export const getDoctorByTime = () => fetch(baseUrl+'/doctor/getDoctorByTime', {
	
});
export const getDoctorByCategory = (category) => fetch(baseUrl+'/doctor/getDoctorByCategory', {
	category
});

/**
 * 获取food页面的 category 种类列表
 */

export const foodCategory = (latitude, longitude) => fetch('/shopping/v2/restaurant/category', {
	latitude,
	longitude
});


/**
 * 获取food页面的配送方式
 */

export const foodDelivery = (latitude, longitude) => fetch('/shopping/v1/restaurants/delivery_modes', {
	latitude,
	longitude,
	kw: ''
});


/**
 * 获取food页面的商家属性活动列表
 */

export const foodActivity = (latitude, longitude) => fetch('/shopping/v1/restaurants/activity_attributes', {
	latitude,
	longitude,
	kw: ''
});


/**
 * 获取shop页面商铺详情
 */

export const shopDetails = (shopid, latitude, longitude) => fetch('/shopping/restaurant/' + shopid, {
	latitude,
	longitude: longitude + '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics'
});



/**
 * 获取shop页面菜单列表
 */

export const foodMenu = restaurant_id => fetch('/shopping/v2/menu', {
	restaurant_id
});


/**
 * 获取商铺评价列表
 */

export const getRatingList = (shopid, offset, tag_name = '') => fetch('/ugc/v2/restaurants/' + shopid + '/ratings', {
	has_content: true,
	offset,
	limit: 10,
	tag_name
});


/**
 * 获取商铺评价分数
 */

export const ratingScores = shopid => fetch('/ugc/v2/restaurants/' + shopid + '/ratings/scores');


/**
 * 获取商铺评价分类
 */

export const ratingTags = shopid => fetch('/ugc/v2/restaurants/' + shopid + '/ratings/tags');


/**
 * 获取短信验证码
 */


export const mobileCode = phone => fetch(baseUrl+'/v1/sendMessage', {
	phone: phone
}, 'GET');


/**
 * 获取图片验证码
 */

export const getcaptchas = () => fetch('/v1/captchas', {},'POST');


/**
 * 检测帐号是否存在
 */

export const checkExsis = (checkNumber) => fetch(baseUrl+'/v1/exists', {
	phone: checkNumber
});


/**
 * 发送帐号
 */

export const sendMobile = (sendData, captcha_code, type, password) => fetch('/v1/mobile/verify_code/send', {
	action: "send",
	captcha_code,
	[type]: sendData,
	type: "sms",
	way: type,
	password,
}, 'POST');


/**
 * 确认订单
 */

export const checkout = (geohash, entities, shopid) => fetch('/v1/carts/checkout', {
	come_from: "web",
	geohash,
	entities,
	restaurant_id: shopid,
}, 'POST');


/**
 * 获取快速备注列表
 */

export const getRemark = (id, sig) => fetch('/v1/carts/' + id + '/remarks', {
	sig
});


/**
 * 获取地址列表
 */

export const getAddress = (id, sig) => fetch('/v1/carts/' + id + '/addresses', {
	sig
});


/**
 * 搜索地址
 */

export const searchNearby = keyword => fetch('/v1/pois', {
	type: 'nearby',
	keyword
});


/**
 * 添加地址
 */

export const postAddAddress = (userId, address, address_detail, geohash, name, phone, phone_bk, poi_type, sex, tag, tag_type) => fetch('/v1/users/' + userId + '/addresses', {
	address,
	address_detail,
	geohash,
	name,
	phone,
	phone_bk,
	poi_type,
	sex,
	tag,
	tag_type,
}, 'POST');


/**
 * 下订单
 */

export const placeOrders = (user_id, cart_id, address_id, description, entities, geohash, sig) => fetch('/v1/users/' + user_id + '/carts/' + cart_id + '/orders', {
	address_id,
	come_from: "mobile_web",
	deliver_time: "",
	description,
	entities,
	geohash,
	paymethod_id: 1,
	sig,
}, 'POST');


/**
 * 重新发送订单验证码
 */

export const rePostVerify = (cart_id, sig, type) => fetch('/v1/carts/' + cart_id + '/verify_code', {
	sig,
	type,
}, 'POST');



/**
 * 下订单
 */

export const validateOrders = ({
	user_id,
	cart_id,
	address_id,
	description,
	entities,
	geohash,
	sig,
	validation_code,
	validation_token
}) => fetch('/v1/users/' + user_id + '/carts/' + cart_id + '/orders', {
	address_id,
	come_from: "mobile_web",
	deliver_time: "",
	description,
	entities,
	geohash,
	paymethod_id: 1,
	sig,
	validation_code,
	validation_token,
}, 'POST');


/**
 * 重新发送订单验证码
 */

export const payRequest = (merchantOrderNo, userId) => fetch('/payapi/payment/queryOrder', {
	merchantId: 5,
	merchantOrderNo,
	source: 'MOBILE_WAP',
	userId,
	version: '1.0.0',
});



/**
 * 获取服务中心信息
 */

export const getService = () => fetch('/v3/profile/explain');



/**
*兑换会员卡
*/

export const vipCart = (id, number, password) => fetch('/member/v1/users/' + id + '/delivery_card/physical_card/bind',{
	number,
	password
}, 'POST')



/**
 * 获取红包
*/

export const getHongbaoNum = id => fetch('/promotion/v2/users/' + id + '/hongbaos?limit=20&offset=0');



/**
 * 获取过期红包
*/


export const getExpired = id => fetch('/promotion/v2/users/' + id + '/expired_hongbaos?limit=20&offset=0');


/**
 * 兑换红包
*/

export const exChangeHongbao = (id, exchange_code, captcha_code) => fetch('/v1/users/' + id + '/hongbao/exchange',{
	exchange_code,
	captcha_code,
}, 'POST');


/**
 * 获取用户信息
 */

export const getUser = () => fetch('/v1/user', {user_id: getStore('user_id')});


/**
 * 手机号登录
 */

export const sendLogin = (code, mobile, identity) => fetch(baseUrl+'/v1/loginByCode', {
	phone:mobile,
	sendCode:code,
	identity
}, 'GET');


/**
 * 获取订单列表
 */

export const getOrderList = (user_id, offset) => fetch('/bos/v2/users/' + user_id + '/orders', {
	limit: 10,
	offset,
});


/**
 * 获取订单详情
 */

export const getOrderDetail = (userId,doctorId,money) => fetch(baseUrl+'/order/addOrder/',
      {
		  userId,
		  doctorId,
		  money
	  });


/**
*个人中心里编辑地址
*/

export const getAddressList = (user_id) => fetch('/v1/users/'+user_id+'/addresses')

/**
*个人中心里搜索地址
*/

export const getSearchAddress = (keyword) => fetch('v1/pois',{
	keyword:keyword,
	type:'nearby'
})

/**
* 删除地址
*/

export const deleteAddress = (userid, addressid) => fetch( '/v1/users/' + userid + '/addresses/' + addressid, {}, 'DELETE')



/**
 * 账号密码登录
 */
export const accountLogin = (phoneNumber, password,identity,captcha_code) => fetch(baseUrl+'/v1/login', {phone:phoneNumber, password,identity,captchaCode:captcha_code}, 'POST');


/**
 * 退出登录
 */
export const signout = () => fetch('/v2/signout');


/**
 * 改密码
 */

/**
 * 注册
 * */
 export const doctorRegister =(userName,password,phone,address,cardId,category)=>fetch(baseUrl+'/v1/register',{userName,password,phone,address,cardId,category},'POST')
 
 export const upload=(data)=> fetch(baseUrl+'/user/upload', {
       file: data,
	   headers: {
	              'Content-Type': 'multipart/form-data',
	        }
     },'POST'
	  )
	  
export const changePassword=(oldPassword,newPassword,phone)=>fetch(baseUrl+'/user/changePassword',{oldPassword,newPassword,phone},'POST')

export const getDoctorInfo=(id)=>fetch(baseUrl+'/doctor/profile',{id},'GET')
export const addDrug=(drugName,sum,times,way,orderId)=>fetch(baseUrl+'/prescription/addDrug',{drugName,sum,times,way,orderId},'POST')
export const addPrescription=(doctorId,userId,orderId)=>fetch(baseUrl+'/prescription/addPrescription',{doctorId,userId,orderId},'GET')
export const getPrescription=(orderId)=>fetch(baseUrl+'/prescription/getPrescription',{orderId},'GET')
export const pay=(orderId)=>fetch(baseUrl+'/pay',{orderId},'GET')
export const getMyUser=(id)=>fetch(baseUrl+'/user/get',{id},'GET')
export const getDoctor=(id)=>fetch(baseUrl+'/doctor/get',{id},'GET')
export const getCommits=(doctorId)=>fetch(baseUrl+'/commit/get',{doctorId},'GET')
export const addCommit=(userName, doctorId, content)=>fetch(baseUrl+'/commit/add',{userName,doctorId,content},'GET')
export const addInfomation=(userId,orderId,height,weight,desc,facePhoto,tonguePhoto,time)=>fetch(baseUrl+'/information/add',{userId,orderId,height,weight,desc,facePhoto,tonguePhoto,time},'POST')
export const getInfomation=(orderId)=>fetch(baseUrl+'/information/get',{orderId},'GET')
