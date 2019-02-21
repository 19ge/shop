import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Shezhi.less";
import * as Shop from '../services/shop';
import MyNavBar from "../components/MyNavBar";
import icon01 from '../assets/images/b.png';
import icon09 from '../assets/images/v.png';
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import { Checkbox, Modal,InputItem ,List,ActionSheet ,Button, Toast } from 'antd-mobile';
@connect(state => ({ shop: state.shop }))
export default class Shezhi extends Component {
    state={
        modal2: false,
       
    }
    //退出登录
    btntui(){
        const {dispatch}=this.props;
        loginOut();
        
        dispatch(routerRedux.push('/Login'))
    }
    modify(){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Modifyinfo'))
    }
    //修改密码
    modifypsw(){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Loginpsw'))
    }
    //关于我们
    about(){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Aboutus'))
    }
    //切换账号
    switch(){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Switchzh'))
    }
    //退出登录
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
          [key]: true,
        });
      }
      onClose = key => () => {
        this.setState({
          [key]: false,
        });
      }

      btn(){
        //   alert(222)
        if(this.props.checked==false){
            console.log(999)
        }else{
            console.log(2323)
        }
      }
    vipaccount(){
        const {dispatch}=this.props;
          Shop.vaccount().then((result)=>{
              if(result.data.us_is_vip==1){
                //   dispatch(Routeredux.push('/Vipacc'))
                dispatch(routerRedux.push('/Vipacc'))
              }else{
                  Toast.offline('您还不是贵宾会员',2)
              }
          })
    }
    render(){
        const {checked}=this.state;
        const CheckboxItem = Checkbox.CheckboxItem;
        const {history,dispatch,shopData}=this.props;
        const Item = List.Item;
        const Brief = Item.Brief;
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"设置",
            rightContent:"",
            rightFunc(){
            }
        }
        return(
            <div className={styles.App}>
            <style>
            {`
            .my-list{
                margin-bottom:0.3rem;
               
            }
            .am-list-item .am-list-line .am-list-content{
                color:#343434;
                font-size:0.3rem;
            }
            .am-action-sheet{
                left: 0.25rem;
                bottom: 0.3rem;
                width: 7rem;
                background-color: transparent;
            }
            .am-action-sheet-button-list-item{
                background: #fff;
                border-radius:0.12rem;
            }
            .am-action-sheet-button-list .am-action-sheet-cancel-button-mask{
                background-color: transparent;
                height: 0.3rem;
            }
            .am-modal-popup-slide-up .am-list-item .am-list-line .am-list-content{
                text-align: center;
            }
            .am-modal-popup{
                width: 7rem;
                margin-left: 0.25rem;
                border-radius:0.12rem;
            }
            .am-button-primary{
                color: #7E8185;
                background-color: #fff;
            }
            `}
            </style>
            {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <List className="my-list">
                    <Item arrow="horizontal" multipleLine onClick={() =>this.modify() }>
                        个人资料修改
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() =>this.modifypsw() }>
                        密码修改
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() =>this.vipaccount() }>
                        vip账号信息
                    </Item>
                </List>
                <List className="my-list">
                    <Item arrow="horizontal" multipleLine onClick={() =>this.about() }>
                    关于我们
                    </Item>
                </List>
                <List className="my-list">
                    <Item arrow="horizontal" multipleLine onClick={() =>this.switch() }>
                    切换账号
                    </Item>
                    <Item arrow="horizontal" multipleLine  onClick={this.showModal('modal2')}>
                    退出登录
                    </Item>
                </List>
                <Modal
                    popup
                    visible={this.state.modal2}
                    onClose={this.onClose('modal2')}
                    animationType="slide-up"
                    >
                        <List className="popup-list">
                    
                            <List.Item onClick={()=>history.push('/Switchzh')}>切换账号</List.Item>
                            <List.Item onClick={()=>this.btntui()}>退出登录</List.Item>
                    
                        <List.Item>
                            <Button type="primary" onClick={this.onClose('modal2')}>取消</Button>
                        </List.Item>
                    </List>
                </Modal>
            </div>
        )
    }
}