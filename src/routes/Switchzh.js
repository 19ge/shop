import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Switchzh.less";
import {change, loginOut} from '../utils/fetch';
import * as Shop from '../services/shop';
import { List, Radio, Icon, WhiteSpace, Toast } from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import icon01 from '../assets/images/aa.png';
import icon02 from '../assets/images/jia2.png';
import icon03 from '../assets/images/jian.png';
import { APIHost } from '../utils/fetch';
import { Item } from '_antd-mobile@2.2.6@antd-mobile/lib/tab-bar';
@connect(state => ({ shop: state.shop }))
export default class Switchzh extends Component {
    state = {
        value: 0,
        checked:'0',
        rightContent:'编辑',
        data:'',
        pass:'',
        aaa:''
       
      };
    
    componentDidMount(){
    var aas =localStorage.getItem('key');
    aas = eval('(' + aas + ')');
    console.log(aas,'aas123');
    this.setState({aaa:aas})
    }
   
    // onChange = (value,index) => {
    //     console.log('checkbox');
    //     this.setState({
    //       value,
    //     });
    // };
    success(){
        if(this.state.checked==1){
            this.setState({checked:0,rightContent:'编辑',})
        }else{
            this.setState({checked:1,rightContent:'完成',})
        }
    }
    login(){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/login'))
    }
    //切换账号
    async btnchange(item){
        const {dispatch}=this.props;
        change(item.tel,item.password);
        const result=await Shop.userLogins();
        if(result.code==1){
            dispatch(routerRedux.push('/Personal'))
        }else{
            Toast.offline('账户过期请重新登录',2,()=>{
                dispatch(routerRedux.push('/Login'))
            })
            
        }
        
        
    }
    //删除
    async deletes(item){
      
        var aas =localStorage.getItem('key');
        aas = eval('(' + aas + ')');
      
        aas.map((itm,index)=>{
            console.log(22)
            if(itm.id==item){
                aas.splice(index,1)
            }
            
        })
        localStorage.setItem('key', JSON.stringify(aas));
        this.setState({aaa:aas})

    }
    render(){

        const {aaa}=this.state;
     
        const {history,dispatch,shopData}=this.props;
        const RadioItem = Radio.RadioItem;
        const { value,rightContent,checked} = this.state;
        const displayblock={
            display:'block'
        }
        const displaynone={
            display:'none'
        }
        return(
            <div className={styles.App}>
                <style>
                    {`
                    .am-list-item{
                        height:1.7rem;
                    }
                    .am-list .am-list-item.am-radio-item .am-list-line .am-list-extra .am-radio{
                        height:1.7rem;
                        top:0.4rem;
                    }
                    .am-list-body{
                        margin-bottom:0.1rem;
                    }
                    .am-list-content{
                        display:flex;
                    }
                    .delete{
                        float:left;
                        margin-top:0.5rem;
                        width:0.45rem;
                        height:0.45rem;
                        margin-left:0.38rem;
                    }
                    // .am-list-body{
                    //     display: flex;
                    // }
                    `   
                    }
                </style>
                {/*头部导航栏*/}
                {/* <MyNavBar {...navBarProps}/> */}
                <div className={styles.title}>
                    <Icon type="left" className="left" onClick={ ()=>history.go(-1)} />
                    <div className={styles.center}>切换账号</div>
                    <div onClick={()=>this.success()} className={styles.right}>{rightContent}</div>
                </div>
                <div className={styles.content}>
                    {
                        aaa?aaa.map((item,index)=>{
                            // const c=item
                            return(
                                <List> 
                                    <img style={checked==0?displaynone:displayblock} onClick={()=>this.deletes(item.id)} className='delete' src={icon03} />
                                    <RadioItem onClick={()=>this.btnchange(item,index)}>
                                        
                                        <dl>
                                            <dt>
                                                <img src={APIHost+item.tx} />
                                            </dt>
                                            <dd>
                                                <p style={{paddingBottom:'0.1rem'}}>{item.zh}</p>
                                                <label>{item.level}</label>
                                            </dd>
                                            <div style={{clear:'both'}}></div>
                                        </dl>
                                    </RadioItem>    
                                </List>
                            )
                        }):""
                    }
                    
                    <div className={styles.addaccount} onClick={()=>this.login()}>
                        <img src={icon01} />
                        <p>添加账号</p>
                    </div>
                </div>
            </div>
        )
    }
}