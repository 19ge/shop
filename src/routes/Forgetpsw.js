import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import * as Shop from '../services/shop';
import { Button, WhiteSpace, WingBlank,InputItem,Toast } from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import styles from "./styles/Forgetpsw.less";

import logo06 from '../assets/images/logo06.png';
import logo04 from '../assets/images/logo04.png';
import logo05 from '../assets/images/logo05.png';
// import Login from './f:/DFSL/src/routes/template';

@connect(state => ({ shopData: state.shop }))
export default class Forgetpsw extends Component {
    state={
        val:"获取验证码",
        codeflag:0,
        phone:"",
        code:"",
        pwd:"",
        pass:""
    }
    inputPhone(val){
        this.setState({
            phone:val
        })
    }
    imputCode(val){
        this.setState({
            code:val
        })
    }
    inputPwd(val){
        this.setState({
            pwd:val
        })
    }
    inputPass(val){
        this.setState({
            pass:val
        })
    }
    //获取验证码
    async codeClick(){
        let tel=this.state.phone;
        const mobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if(mobile.test(this.state.phone)){
            let fortime=120;
            const _this=this;
            const value =await Shop.getCode({us_tel:tel,type:"fg"});
            if(value.code===1){
                _this.setState({
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
       //修改密码
    async changepw(){
        const {dispatch}=this.props;
        let phone=this.state.phone;
        let code=this.state.code;
        let pwd=this.state.pwd;
        let pass=this.state.pass;
        if(phone===""){
            Toast.offline("请输入11位手机号", 1);
            return;
        }
        if(code===""){
            Toast.offline("请输入验证码", 1);
            return;
        }
        if(pwd===""){
            Toast.offline("请输入登录密码", 1);
            return;
        }
        if(pass===""){
            Toast.offline("请确认登录密码", 1);
            return;
        }
        // if(pass.length<8){
        //     Toast.offline("密码位数在6-20位之间", 1);
        //     return;
        // }
        // if(pass.length>18){
        //     Toast.offline("密码位数在6-20位之间", 1);
        //     return;
        // }
        if(pwd!==pass){
            Toast.offline("两次输入密码不一致", 1);
            return;
        }
        const result=await Shop.changePwd({us_tel:phone,us_pwd:pass,sode:code});
        if(result.code ===1){
            Toast.success('密码重置成功',2,await function(){
                dispatch(routerRedux.push('/login'));
            });
        }else{
            Toast.offline(result.msg,2);
        }
    }
    render(){
        const navBarProps = {
            leftVisible: true,
            leftFunc(){
                history.go(-1)
            },
            titleName: "忘记密码",
            rightContent: "",
          
           
        }
        const { history, dispatch, shopData } = this.props;
        const {val}=this.state
        return(
            <div className={styles.App}>
                <style>
                    {`
                        .am-navbar-right {
                            font-size: 0.34rem !important;
                            font-weight: bold;
                        }
                        .am-button{
                            border-radius:0.44rem;
                            margin-top: 0.7rem;    
                        } 
                        .am-list-item .am-list-line{
                            padding-right:0;
                        }
                        html:not([data-scale]) .am-button-primary{
                            margin-top:1.5rem;
                        }
                        .am-button-primary{
                            background:#D4AB6A;
                            width: 5.3rem;
                            margin:auto;
                            font-size: 0.32rem;   
                        }
                        .am-list-item .am-input-label{
                            font-size: 0.26rem;   
                        }
                        a:hover{
                            text-decoration: none;
                        }
                        
                        .am-list-item.am-input-item{
                            padding-left:0
                        }
                        .am-list-item.am-input-item{
                            height: 1.1rem;
                            border-bottom: .01rem solid #C7C7C7;
                           
                        }
                        .am-list-item .am-input-extra{
                            color: #EDCE00;
                            font-size: 0.26rem;

                        }
                        .am-list-item .am-input-control{
                            padding-left: 0.2rem;
                        }
                        .am-list-item .am-input-control input::-webkit-input-placeholder {
                            color:#9A9898;
                            font-size:0.26rem;
                            text-align:left;
                        }
                        .am-list-item .am-input-clear-active{
                            background-color:#0187FC;
                        } 
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps} />
                <div className={styles.input}>
                <InputItem
                type="number"
                placeholder="请输入注册手机号"
                clear
                maxLength="11"
                onChange={this.inputPhone.bind(this)}
                >手机号</InputItem>
            <InputItem
                type="number"
                placeholder="请输入验证码"
                clear
                maxLength="6"
                extra={<div onClick={this.state.codeflag===0?()=>this.codeClick():()=>{}}>{val}</div>}
                onChange={this.imputCode.bind(this)}
                >输入验证码</InputItem>
            <InputItem
                type="password"
                placeholder="8-18位字符"
                clear
                maxLength="16"
                onChange={this.inputPwd.bind(this)}
                >设置登录密码</InputItem>
            <InputItem
                type="password"
                placeholder="请确认登录密码"
                clear
                maxLength="16"
                onChange={this.inputPass.bind(this)}
                >确认登录密码</InputItem>
                </div>
                <Button type="primary" onClick={()=>this.changepw()}>保存设置</Button><WhiteSpace />
            </div>
        )
    }
    
}
