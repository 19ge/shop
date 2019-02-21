import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import * as Shop from '../services/shop';
import { Button, WhiteSpace, WingBlank,InputItem,Toast} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import styles from "./styles/Res.less";

import logo06 from '../assets/images/logo06.png';
import logo02 from '../assets/images/logo02.png';
import logo04 from '../assets/images/logo04.png';
import logo05 from '../assets/images/logo05.png';
import logo07 from '../assets/images/logo6.png';
import logo08 from '../assets/images/logo7.png';
var queryString = require('querystring');
@connect(state => ({ shopData: state.shop }))
export default class Resbc extends Component {
    state={
        val:"获取验证码",
        codeflag:0,
        name:"",
        phone:"",
        code:"",
        loginpsw:"",
        passpsw:"",
        idcard:"",
        p_acc:"",
        addviceVal:""
    }
    inputName(val){
        this.setState({
            name:val
        })
    }
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
    inputPass(val){
        this.setState({
            passpsw:val
        })
    }
    inputCard(val){
        this.setState({
            idcard:val
        })
    }
    btnval(val){
        this.setState({
            addviceVal:val
        })
        
    }
    //获取验证码
    async codeClick(){
        let tel=this.state.phone;
        const us_tel = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;    
        if(us_tel.test(this.state.phone)){
            let fortime=60;
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
       
        let name=this.state.name;   //姓名
        let phone=this.state.phone;  //手机号
        let code=this.state.code;    //验证码
        let loginpsw=this.state.loginpsw;   //登录密码
        let passpsw=this.state.passpsw;     //确认登录密码
        let idcard=this.state.idcard;    //身份证号
        let addviceVal=this.state.addviceVal?this.state.addviceVal:this.refs.xx.state.placeholder;   
        console.log(addviceVal,'ooooooooooooo');
        if(name===""){
            Toast.offline("请填写姓名", 2);
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
        if(passpsw===""){
            Toast.offline("请再次输入密码", 2);
            return;
        }
        if(loginpsw!==passpsw){
            Toast.offline("两次输入密码不一致", 1);
            return;
        }
        if(idcard===""){
            Toast.offline("请输入身份证号",2);
            return;
        }
        if(!(/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(idcard))){
            Toast.fail("身份证号格式不正确!", 2);
            return;
        }
        let data = {
            // "ptel":recomm,
            "us_real_name": name,
            "us_tel":phone,
            "sode" :code,
            "us_pwd" :loginpsw,
            "us_card_id":idcard,
            "p_acc":addviceVal,
            
        }
        Toast.loading("正在注册", 0);

        console.log(data);
        const value =await Shop.register(data);
        console.log(data)

        Toast.hide();
        if(value.code===1){
      
            Toast.success('注册成功 !!!', 1,await function(){
                // return false;
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
            titleName: "信息完善",
            rightContent: "",
        }
        const { history, dispatch, shopData } = this.props;
        const {val}=this.state
        let aa = parse.id;

        return(
            <div className={styles.App}>
                <style>
                    {`
                        .am-button{
                            border-radius:0.44rem;
                            margin-top: 0.7rem;
                            height:0.7rem;
                            line-height:0.7rem;
                            
                        } 
                        html:not([data-scale]) .am-button-primary{
                            margin-top:2rem;
                            margin-bottom: 0.7rem
                        }
                        .am-button-primary{
                            background:#D4AB6A;
                            width: 6rem;
                            margin:auto;
                            font-size: 0.32rem;
                            
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
                        .span{
                            color:red;
                        }        
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps} />
                <div className={styles.input}>
                    <InputItem
                        placeholder="请输入您的姓名"
                        clear
                        maxLength="11"
                        onChange={this.inputName.bind(this)}
                        ><span className='span'>*</span>姓名</InputItem>
                    <InputItem
                        type="number"
                        placeholder="请输入您的身份证号"
                        clear
                        maxLength="11"
                        onChange={this.inputPhone.bind(this)}
                        ><span className='span'>*</span>身份证号</InputItem>
                        <InputItem
                        type="number"
                        placeholder="请输入您的现居地址"
                        clear
                        maxLength="18"
                        onChange={this.inputCard.bind(this)}                       
                        ><span className='span'>*</span>现居地址</InputItem>  

                        <Button type="primary" onClick={()=>this.register()}>确 定</Button><WhiteSpace />
                </div>
                
            </div>
        )
    }
}