import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import * as Shop from '../services/shop';
import { Button, WhiteSpace, WingBlank,InputItem,Toast} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import styles from "./styles/Res.less";
var queryString = require('querystring');
@connect(state => ({ shopData: state.shop }))
export default class Res extends Component {
    state={
        val:"获取验证码",
        codeflag:0,
        name:"",
        phone:"",
        code:"",
        loginpsw:"",
        passpsw:"",
        zhifupsw:"",
        idcard:"",
        p_acc:"",
       
        tjcode:""
    }
    inputName(val){
        this.setState({
            tjcode:val
        })
    }
    //账号
    inputaccount(val){
        this.setState({
            name:val
        })
    }
     //身份证号
     inputid(val){
        this.setState({
            idcard:val
        })
    }
    //手机号
    inputPhone(val){
        this.setState({
            phone:val
        })
    }
    inputCode(val){
        this.setState({
            code:val
        })
    }
    inputPwd(val){
        this.setState({
            loginpsw:val
        })
    }
    inputzhifu(val){
        this.setState({
            zhifupsw:val
        })
    }
    //获取验证码
    async codeClick(){
        let tel=this.state.phone;
        const us_tel = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;    
        if(us_tel.test(this.state.phone)){
            let fortime=120;
            const _this=this;
            const value =await Shop.getCode({us_tel:tel,type:"reg"});
            if(value.code===1){
                this.setState({
                    codeflag:1,
                })
                if(_this.state.codeflag){
                let secon=setInterval(function(){
                    _this.setState({
                    val:`${fortime--}s`
                    })
                    if(_this.state.codeflag===0||fortime<=-1){
                    clearInterval(secon);
                    _this.setState({
                        val:"再次获取",
                        codeflag:0
                    })
                    }
                },1000)
                }
            }else{
                Toast.offline(value.msg,1);
            }
        }else{
          Toast.offline("请输入11位手机号",1);
          return;
        }
    }
      //注册
      async register(){
        const {dispatch,register}=this.props;
        let tjcode=this.state.tjcode?this.state.tjcode:this.refs.dd.state.placeholder; //昵称
         if(tjcode=='推荐码'){
             tjcode=''
         }
        // let tjcode=this.state.tjcode?this.state.tjcode:this.refs.res.state.placeholder;   //推荐码
        let name=this.state.name;   //账号
        let phone=this.state.phone;  //手机号
        let idcard=this.state.idcard;
        let code=this.state.code?this.state.code:this.refs.dd.placeholder;    //验证码
        let loginpsw=this.state.loginpsw;   //登录密码
        let zhifupsw=this.state.zhifupsw;     //支付密码;
        if(name===""){
            Toast.offline("请填写姓名", 2);
            return;
        }
        if(!(/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(idcard))){
            Toast.fail("身份证号格式不正确!", 2);
            return;
        }
        if(phone===""){
            Toast.offline("请输入11位手机号", 2);
            return;
        }
        if(code===""){
            Toast.offline("请输入验证码", 2);
            return;
        }
        if(loginpsw===""){
            Toast.offline("请输入登录密码", 2);
            return;
        }
        if(zhifupsw===""){
            Toast.offline("请输入支付密码", 1);
            return;
        }
        let data = {
            "p_vip_account":tjcode,   //推荐码
            "us_account": name,    //账号
            "us_tel":phone,    //手机号
            "sode" :code,     //验证码
            "us_pwd" :loginpsw,   //登陆密码
            "us_safe_pwd" :zhifupsw,   //支付密码
            "us_card_id":idcard
            
        }
        Toast.loading("正在注册", 0);

        console.log(data);
        const value =await Shop.register(data);
        // console.log(data)

        Toast.hide();
        if(value.code===1){
      
            Toast.success('注册成功 !!!', 1,await function(){
                dispatch(routerRedux.push('/login'))
            });
            
        }else{
            Toast.fail(value.msg, 2);
        }
    }
    render(){

        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?",""));   
        const navBarProps = {
            leftVisible: true,
            leftFunc(){
                history.go(-1)
            },
            titleName: "注册",
            rightContent: "",
        }
        const { history, dispatch, shopData } = this.props;
        const {val}=this.state
        let aa = parse.id;
        const tcode=parse.vip?parse.vip:'';
        return(
            <div className={styles.App}>
                <style>
                    {`
                        .am-button{
                            border-radius:0.44rem;
                            margin-top: 0.7rem;
                            height:0.6rem;
                            line-height:0.6rem;
                            
                        } 
                        html:not([data-scale]) .am-button-primary{
                            margin-top:2rem;
                            margin-bottom: 0.7rem
                        }
                        .am-button-primary{
                            background:#D4AB6A;
                            width: 6.3rem;
                            margin-left: 0.6rem;
                            font-size: 0.26rem;
                            
                        } 
                        a:hover{
                            text-decoration: none;
                        } 
                        input{
                            font-size:0.3rem !important;
                        }
                        
                         
                        .am-list-item.am-input-item{
                            padding-left:0;
                        } 
                        
                        .am-list-item.am-input-item {
                            height: 1.1rem;
                            border-bottom: .01rem solid #C7C7C7;
                            padding-left: .1rem;
                        }
                        .am-list-item .am-input-control input::-webkit-input-placeholder {
                            color:#999999;
                            font-size:0.26rem;
                            text-align:left;
                        }
                        .am-list-item .am-input-extra{
                            color: #F83F3F;
                            font-size: 0.26rem;
                        }
                        .am-list-item .am-input-clear-active{
                            background-color:#0187FC;
                        } 
                        .am-list-item .am-input-label{
                            font-size: 0.26rem;
                        } 
                        .am-list-item .am-list-line{
                            padding-right: 0;
                        }         
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps} />
                <div className={styles.input}>
                    <InputItem
                        placeholder={tcode?tcode:'推荐码'}
                        clear
                        // value={tcode?tcode:'推荐码'}
                        onChange={this.inputName.bind(this)}
                        ref='dd'
                        >推荐码</InputItem>
                    <InputItem
                        // type="number"
                        placeholder="请输入您的真实姓名"
                        clear
                        // maxLength="11"
                        onChange={this.inputaccount.bind(this)}
                        >姓名</InputItem>
                        <InputItem
                        // type="number"
                        placeholder="请输入身份证号"
                        clear
                        // maxLength="11"
                        onChange={this.inputid.bind(this)}
                        >身份证号</InputItem>
                        <InputItem
                        type="number"
                        placeholder="请输入您的手机号"
                        clear
                        maxLength="11"
                        onChange={this.inputPhone.bind(this)}                       
                        >手机号 <span style={{color:"#189DE2",paddingLeft:'0.2rem'}}>+86</span></InputItem>
                        <InputItem
                        type="password"
                        placeholder="请输入6~32位数字加字母"
                        clear
                        maxLength="16"
                        onChange={this.inputPwd.bind(this)}                      
                        >登录密码</InputItem>
                        <InputItem
                        type="password"
                        placeholder="请输入6位数字支付密码"
                        clear
                        maxLength="16"
                        onChange={this.inputzhifu.bind(this)}
                        >支付密码</InputItem>
                    <InputItem
                        type="number"
                        placeholder="请输入验证码"
                        clear
                        maxLength="6"
                        extra={<div onClick={this.state.codeflag===0?()=>this.codeClick():()=>{}}>{val}</div>}
                        onChange={this.inputCode.bind(this)}
                        >验证码</InputItem>            
                </div>
                <Button type="primary" onClick={()=>this.register()}>立即注册</Button><WhiteSpace />
            </div>
        )
    }
}