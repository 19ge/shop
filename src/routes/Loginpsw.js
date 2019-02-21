import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import { Button, WhiteSpace, WingBlank,Toast} from 'antd-mobile';
import * as Shop from '../services/shop';
import {login,loginn,change} from '../utils/fetch';
import { List, InputItem } from 'antd-mobile';
import styles from "./styles/Loginpsw.less";
import gift06 from '../assets/images/foun.png';
import { __await } from 'tslib';
@connect(state => ({ shopData: state.shop }))

export default class Loginpsw extends Component {
    state={
        codeflag:0,
        opwd:"",    //旧密码
        npwd:"",    //新密码
        cnpwd:"",   //确认新密码
        val:"获取验证码",
        data:'',
        tel:''
    }
    async componentDidMount(){
        const result=await Shop.mine();
        this.setState({data:result.data})
    }
    inputOpwd(val){
        this.setState({
            opwd:val
        })
    }
    inputPwd(val){
        this.setState({
            npwd:val
        })
    }
    inputPass(val){
        this.setState({
            cnpwd:val
        })
    }
    imputCode(val){
        this.setState({
            code:val
        })
    }
    inputel(val){
        this.setState({
            tel:val
        })
    }
     //获取验证码
    async codeClick(){
        let tel=this.state.tel?this.state.tel:this.refs.dd.state.placeholder;
        const mobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if(mobile.test(tel)){
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
    async btnsub(){
        const {dispatch}=this.props;
        let opwd=this.state.opwd;
        let npwd=this.state.npwd;
        let cnpwd=this.state.cnpwd;
        let code=this.state.code;
        // let tel=this.state.refs.dd.placeholder
        let tel=this.state.tel?this.state.tel:this.refs.dd.state.placeholder;

        if(opwd===""){
            Toast.offline("请输入旧密码", 2);
            return;
        }
        if(npwd===""){
            Toast.offline("请输入新密码", 2);
            return;
        }
        if(cnpwd===""){
            Toast.offline("确认新密码", 2);
            return;
        }
        if(npwd!==cnpwd){
            Toast.offline("两次输入密码不一致", 1);
            return;
        }
        let data = {
            "old_pwd": opwd,
            "us_pwd":npwd,
            "sode":code,
            "us_tel":tel
        }
        Toast.loading("正在修改", 0);
        const result=await Shop.modifyPwd(data);
        Toast.hide();
        if(result.code===1){
                Toast.success('修改成功 !!!', 1,await function(){
                    login(tel,npwd);  
                    var aas =localStorage.getItem('key');
                   
              
                aas = eval('(' + aas + ')')?eval('(' + aas + ')'):[];
                var password = loginn(npwd);
                // console.log(aas,'ssssssssssss')
                // console.log(npwd,'ppppppppppp')
                aas?aas.map((item,index)=>{
                    
                    if(item.tel==tel){
                        // aas.splice(index,1)
                        console.log(password,'d')
                        aas[index].password=password;
                    }
              
                }):''
                // console.log(aas,'qqqqqqqqqqqqqqss')
                localStorage.setItem('key', JSON.stringify(aas));    

                });
                
            }else{
                Toast.fail(result.msg, 2);
            }
    }
    render(){
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"修改密码",
            rightContent:"",
           
        }
        const {history,dispatch,shopData}=this.props;
        const { val,data } = this.state;
        return(
            <div className={styles.App}>
                 {/* 样式 */}
                 <style>
                    {`
                    .am-list-item .am-input-label.am-input-label-5{
                        width:2.3rem;
                        font-size:0.3rem;
                    }
                    .am-list-item .am-input-control{
                        font-size:0.24rem;
                    }
                    html:not([data-scale]) .am-list-body div:not(:last-child) .am-list-line{
                         border-bottom: 1PX solid #ddd; 

                    }
                    .input{
                        height:0.88rem;
                        line-height:0.88rem;
                    }
                    .input input{
                        height:100%;
                        width:70%;
                        border:0;
                        padding-left:0.3rem;
                    }
                    // ::-webkit-input-placeholder{
                    // font-size: 0.3rem;
                    // color:#999999;
                    // }
                    .input label{
                        font-size:0.3rem;
                        padding-left:0.3rem;
                        width: 30%;
                        display: inline-block;
                    }
                    .input input{
                        width:40%;
                    }
                    .input .getyzm{
                        width:30%;
                        color:#0766E0;
                        font-size:0.26rem;
                        padding-left:0.6rem
                    }
                    .am-button-primary{
                        font-size: 0.3rem;
                        background: #D4AB6A !important;
                        width:5.3rem;;
                        height:0.7rem;
                        line-height:0.7rem;
                        margin:auto;
                        border-radius:0.35rem;
                        margin-top:1.45rem;
                    }  
                    a:hover{
                        text-decoration: none;
                    }  
                    .am-list-item.am-input-item{
                        height: 1rem;
                        border-bottom: .01rem solid #C7C7C7;
                        {/* padding-left: .1rem; */}
                    } 
                    .am-list-item .am-input-control input::-webkit-input-placeholder {
                        color:#8D8D8D;
                        font-size:0.24rem;
                        text-align:left;
                    }
                    .am-button-primary{
                        background-color:#0187FC;
                    }  
                    .bottomway{
                        margin-bottom:0.12rem;
                    }
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <div className={styles.conbox}>
                    <div className="bottomway">
                    <InputItem
                            type="password"
                            placeholder={data.us_tel}
                            clear
                            disabled
                            ref='dd'
                            onChange={this.inputel.bind(this)}                  
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
                            placeholder="输入旧登录密码"
                            clear
                            maxLength="16"
                            onChange={this.inputOpwd.bind(this)}                  
                            >旧登录密码</InputItem>
                    </div>
                    
                        <InputItem
                            type="password"
                            placeholder="设置新登录密码"
                            clear
                            maxLength="16"
                            onChange={this.inputPwd.bind(this)}  
                        
                            >新登录密码</InputItem>
                        <InputItem
                            type="password"
                            placeholder="确认密码"
                            clear
                            maxLength="16"
                            onChange={this.inputPass.bind(this)}                  
                            >确认登录密码</InputItem>
                </div>
                <div className={styles.btn}>
                    <Button type="primary" onClick={()=>this.btnsub()}>确定</Button>   
                </div>

            </div>
        )
    }
}