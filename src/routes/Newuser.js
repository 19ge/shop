import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Modal, List, Button, WhiteSpace, WingBlank,Toast } from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import styles from "./styles/Newuser.less";
import copy from 'copy-to-clipboard';

var queryString = require('querystring');
@connect(state => ({ shop: state.shop }))

export default class Newuser extends Component {
    
    copyCode=(url)=>{
        copy(url);
        Toast.success("复制成功!如未成功请手动复制!",3);
    }
  
    render(){
        const {history,dispatch,shopData}=this.props;
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
            },
       
            titleName:"邀请新用户",
            rightContent:"",
            rightFunc(){
               
            }
        }
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const vip=parse.vip;       
        return(
            <div className={styles.App}>
            <style>
                    {`

                        .am-button{
                            width:5.3rem;
                            height:0.8rem;
                            line-height: 0.8rem;
                            background: #D4AB6A;
                            border-radius:0.35rem;
                            color: white;
                            margin: auto;
                        }
                        .btn{
                            margin-top:0.82rem;
                        }

                    `}
                </style>
            {/*头部导航栏*/}
            <MyNavBar {...navBarProps}/>
                <div className={styles.code}>
                    <div className={styles.imgcode}>
                        <img className={styles.mama} src={"http://qr.liantu.com/api.php?text=https://www.9efag8.cn/Res?vip="+vip} />
                    </div>
                    <div className={styles.text}>长按二维码直接注册。</div>
                    <p className={styles.link}>分享链接：<span>{"http://qr.liantu.com/api.php?text=https://www.9efag8.cn/Res?vip="+vip}</span></p>
                </div>
                <div className='btn'>
                    <Button onClick={()=>this.copyCode("http://qr.liantu.com/api.php?text=https://www.9efag8.cn/Res?vip="+vip)}>一键复制</Button><WhiteSpace />
                </div>
                

            </div>
        )
    }
}