import * as fetchs from '../utils/fetch';
//登录
export function userLogin(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/login",fetchs.getAuth("/index/user/login",params.username,params.password),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//登录
export function userLogins(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/login",fetchs.getAuth("/index/user/login",params),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}

//首页-轮播图
export async function lunbo(params) {
  return fetchs.create(fetchs.APIHost+"/index/index/shuff",params).then(response => response.json())
    .then(json => {return json});
}
//首页-分类
export async function fenlei(params) {
  return fetchs.create(fetchs.APIHost+"/index/index/gift",params).then(response => response.json())
    .then(json => {return json});
}
//系统公告
export async function gonggao(params) {
  return fetchs.create(fetchs.APIHost+"/index/news/index",params).then(response => response.json())
    .then(json => {return json});
}
// //公告详情
// export async function gongxq(params) {
//   return fetchs.create(fetchs.APIHost+"/index/news/xq ",params).then(response => response.json())
//     .then(json => {return json});
// }
//首页-新闻公告
export async function xwgg(params) {
  return fetchs.create(fetchs.APIHost+"/index/news/xq",params).then(response => response.json())
    .then(json => {return json});
}
//首页-指定产品
export async function zhiding(params) {
  return fetchs.create(fetchs.APIHost+"/index/index/prod",params).then(response => response.json())
    .then(json => {return json});
}
//门店列表
export async function storelist(params) {
  return fetchs.create(fetchs.APIHost+"/index/index/index",params).then(response => response.json())
    .then(json => {return json});
}
//首页-门店列表
export async function indexlist(params) {
  return fetchs.create(fetchs.APIHost+"/index/index/tui",params).then(response => response.json())
    .then(json => {return json});
}

//注册
export async function  register(params) {
  return fetchs.create(fetchs.APIHost+"/index/login/reg",params).then(response => response.json())
    .then(json => {return json});
}
//超市详情
export async function  shopmess(params) {
  return fetchs.create(fetchs.APIHost+"/index/mer/index",params).then(response => response.json())
    .then(json => {return json});
}
//超市详情-商品
export async function  shopro(params) {
  // console.log(params,'ffffffffffff')
  return fetchs.create(fetchs.APIHost+"/index/mer/prod",params).then(response => response.json())
    .then(json => {return json});
}



// 外部获取验证码
export async function getCode(params) {
  return fetchs.create(fetchs.APIHost+"/index/total/send",params).then(response => response.json())
    .then(json => {return json});
}
//忘记密码
export async function changePwd(params) {
  return fetchs.create(fetchs.APIHost+"/index/login/forget",params).then(response => response.json())
    .then(json => {return json});
}
//微信支付
export async function chat(params) {
  return fetchs.create(fetchs.APIHost+"/index/wechat/index",params).then(response => response.json())
    .then(json => {return json});
}
//支付宝支付
export async function apily(params) {
  return fetchs.create(fetchs.APIHost+"/index/alipay/index",params).then(response => response.json())
    .then(json => {return json});
}
//商品详情
export async function product(params) {
  return fetchs.create(fetchs.APIHost+"/index/mer/det",params).then(response => response.json())
    .then(json => {return json});
}
// 修改密码
export async function modifyPwd(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/pass",fetchs.getAuth("/index/user/pass"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 取消订单
export async function cancelorder(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/order/cancle",fetchs.getAuth("/index/order/cancle"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 银行卡
export async function bank(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/ban",fetchs.getAuth("/index/user/ban"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 银行卡修改
export async function mbank(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/bank",fetchs.getAuth("/index/user/bank"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 选择店铺
export async function chosto(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/mer/list",fetchs.getAuth("/index/mer/list"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 取消报单
export async function quxiao(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/baod/cancle",fetchs.getAuth("/index/baod/cancle"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 确认收货
export async function shouhuo(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/order/receive",fetchs.getAuth("/index/order/receive"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 确认收货-报单
export async function bshouhuo(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/baod/receive",fetchs.getAuth("/index/baod/receive"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 删除订单
export async function delorder(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/order/del",fetchs.getAuth("/index/order/del"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 购物车-修改数量
export async function modifynum(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/cart/num",fetchs.getAuth("/index/cart/num"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 购物车-删除
export async function deleteshop(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/cart/del",fetchs.getAuth("/index/cart/del"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 立即下单
export async function xiadan(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/order/zhun",fetchs.getAuth("/index/order/zhun"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 确认下单
export async function sureorder(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/order/sub",fetchs.getAuth("/index/order/sub"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//我的bao单
export async function mylist(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/baod/index",fetchs.getAuth("/index/baod/index"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//我的bao单
export async function mybao(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/baod/order",fetchs.getAuth("/index/baod/order"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 好友详情
export async function youinfo(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/info",fetchs.getAuth("/index/user/info"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//我的团队
export async function myteam(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/team",fetchs.getAuth("/index/user/team"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//个人中心-设置-关于我们
export async function aboutus(params) {
  return fetchs.create(fetchs.APIHost+"/index/total/about",params).then(response => response.json())
    .then(json => {return json});
}
//管理收货地址-地址列表
export async function addlist(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/addr/index",fetchs.getAuth("/index/addr/index"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//管理收货地址-删除
export async function delectadd(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/addr/del",fetchs.getAuth("/index/addr/del"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//添加收货地址
export async function addshdz(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/addr/add",fetchs.getAuth("/index/addr/add"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//地址详情
export async function addxq(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/addr/xq",fetchs.getAuth("/index/addr/xq"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//编辑收货地址
export async function editaddress(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/addr/edit",fetchs.getAuth("/index/addr/edit"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//管理收货地址-设为默认
export async function defau(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/addr/def",fetchs.getAuth("/index/addr/def"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 奖金明细
export async function reward(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/profit/wal",fetchs.getAuth("/index/profit/wal"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 奖金明细-名字
export async function rname(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/profit/ming",fetchs.getAuth("/index/profit/ming"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//我的
export function mine(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/index",fetchs.getAuth("/index/user/index"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//vip
export function vaccount(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/vip",fetchs.getAuth("/index/user/vip"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//订单详情
export function orderxq(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/order/detail",fetchs.getAuth("/index/order/detail"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}

//支付
export function zhifu(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/pay/index",fetchs.getAuth("/index/pay/index"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//确认下单
export function queorder(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/order/add",fetchs.getAuth("/index/order/add"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//保单产品提交
export function queren(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/baod/add",fetchs.getAuth("/index/baod/add"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//保单产品提交
export function baodan(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/baod/ordXq",fetchs.getAuth("/index/baod/ordXq"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//我的订单
export function myding(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/order/index",fetchs.getAuth("/index/order/index"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//修改个人信息-保存
export function preserve(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/edit",fetchs.getAuth("/index/user/edit"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//修改个人信息-手机号
export function ctel(params){
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/tel",fetchs.getAuth("/index/user/tel"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// // 上传图片
export async function  uploadImgs(params) {
  return fetchs.uploadImg_Token(fetchs.APIHost+"/index/total/upload",params).then(response => response.json()).then(json => {return json});
}
// export async function  bgpic(params) {
//   return fetchs.uploadImg_Token(fetchs.APIHost+"/index/total/bgpic",params).then(response => response.json()).then(json => {return json});
// }
// 加入购物车
export async function addshop(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/cart/add",fetchs.getAuth("/index/cart/add"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 购物列表
export async function shoplist(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/cart/index",fetchs.getAuth("/index/cart/index"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 代理商申请
export async function agent(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/apply/apply",fetchs.getAuth("/index/apply/apply"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// // 个人信息
// export async function PersonalInfo(params) {
//   return fetchs.creat_Token(fetchs.APIHost+"/index/user/login",fetchs.getAuth("/index/user/login"),JSON.stringify(params)).then(response => response.json())
//   .then(json => { return json});
// }
//提交个人信息
export async function Agentuser(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/edit",fetchs.getAuth("/index/user/edit"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//是否申请过门店
export async function isdian(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/apply/is_apply",fetchs.getAuth("/index/apply/is_apply"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}

// 代理商申请-上传身份证-base64
export async function  uploadImg(params) {
  console.log(params,'-')
  return fetchs.create(fetchs.APIHost+"/index/total/uploads",params).then(response => response.json()).then(json => {return json});
}
// 线下门店
export async function offline(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/qu",fetchs.getAuth("/index/user/qu"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//门店输送
export async function Storedelivery(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/mensong",fetchs.getAuth("/index/user/mensong"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//我的钱包
export async function mywallet(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/user/wallet",fetchs.getAuth("/index/user/wallet"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//提现申请
export async function widthdrawal(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/profit/ti",fetchs.getAuth("/index/profit/ti"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//提现
export async function tixian(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/profit/tx",fetchs.getAuth("/index/profit/tx"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}
//提现明细
export async function mingxi(params) {
  return fetchs.creat_Token(fetchs.APIHost+"/index/profit/tx_list",fetchs.getAuth("/index/profit/tx_list"),JSON.stringify(params)).then(response => response.json())
  .then(json => {return json});
}


// 获取分类列表
export function getClassify(){
  return fetchs.read_Token(fetchs.APIHost+"/shop/type",fetchs.getAuth("/shop/type")).then(response => response.json())
  .then(json => { return json});
}

// 获取我的商品列表
export function getGoods(params){
  if(!params.page){
    params={page:1}
  }
  return fetchs.read_Token(fetchs.APIHost+"/good/list?page="+params.page,fetchs.getAuth("/good/list")).then(response => response.json())
  .then(json => { return json});
}



// 删除商品
export function deteteGood(params){
  return fetchs.creat_Token(fetchs.APIHost+"/good/delete",fetchs.getAuth("/good/delete"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}


// 获取轮播列表
export function getCarousel(){
  return fetchs.read_Token(fetchs.APIHost+"/shop/roll",fetchs.getAuth("/shop/roll")).then(response => response.json())
  .then(json => { return json});
}

// 获取商城商品列表
export function getShopList(params){  
  if(!params.page){
    params.page=1
  }
  if(params.search){
    return fetchs.read_Token(fetchs.APIHost+"/shop/list?page="+params.page+"&search="+params.search,fetchs.getAuth("/shop/list")).then(response => response.json())
    .then(json => { return json});
  }else if(params.type){
    return fetchs.read_Token(fetchs.APIHost+"/shop/list?page="+params.page+"&type="+params.type,fetchs.getAuth("/shop/list")).then(response => response.json())
    .then(json => { return json});
  }else if(params.is_hot){
    return fetchs.read_Token(fetchs.APIHost+"/shop/list?page="+params.page+"&is_hot="+params.is_hot,fetchs.getAuth("/shop/list")).then(response => response.json())
    .then(json => { return json});
  }else if(params.id){
    return fetchs.read_Token(fetchs.APIHost+"/shop/list?id="+params.id,fetchs.getAuth("/shop/list")).then(response => response.json())
    .then(json => { return json});
  }
}





// 结算
export function createOrder(params){
  return fetchs.creat_Token(fetchs.APIHost+"/good/buy",fetchs.getAuth("/good/buy"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}


// 商城交易记录
export function getOrder(params){
  if(!params.page){
    params.page=1
  }
  if(!params.type){
    params.type=0
  }
  if(params.id){
    return fetchs.read_Token(fetchs.APIHost+"/shop/Record?id="+params.id+"&type="+params.type,fetchs.getAuth("/shop/Record")).then(response => response.json())
    .then(json => { return json});
  }else{
    return fetchs.read_Token(fetchs.APIHost+"/shop/Record?page="+params.page+'&type='+params.type,fetchs.getAuth("/shop/Record")).then(response => response.json())
    .then(json => { return json});
  }
}


// 获取列表 
export function get_shop_list(params){


  return fetchs.read(fetchs.APIHost+"/good/suc/?page="+params.page+"size="+params.size).then(response => response.json())
  .then(json => { return json});
}


// 确认完成订单
export function endOrder(params){
  return fetchs.creat_Token(fetchs.APIHost+"/good/suc",fetchs.getAuth("/good/suc"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
