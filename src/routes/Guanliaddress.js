import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Guanliaddress.less";
import MyNavBar from "../components/MyNavBar";
import * as Shop from '../services/shop';
import { TabBar,Card, List, Checkbox, Button, Toast} from 'antd-mobile';
import * as fetch from '../services/shop';
import icon01 from '../assets/images/bbj.png';
import z01 from '../assets/images/sc.png';
import z02 from '../assets/images/z02.png';
import z03 from '../assets/images/z03.png';
import z04 from '../assets/images/dz.png';
import z05 from '../assets/images/dz2.png';
@connect(state => ({ shop: state.shop }))
export default class Guanliaddress extends Component {
    state = {    
        data:'',
        id:'',
        index:'0'
    };
    async componentDidMount(){
        const result=await Shop.addlist();
        const data=result.data;
        this.setState({data:data})
        console.log(data,'result')

    }
    //编辑
    edit(id){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Editaddress?id='+id))
    }
    //删除
    async delect(id){
        const result=await Shop.delectadd({id:id});
        if(result.code==0){
            Toast.offline(result.msg,2)
        }else{
            Toast.success(result.msg,2);
            // const {dispatch}
            // const {data}=this.state;
            // this.setState({data:data})
            const result2=await Shop.addlist();
            const data=result2.data;
            this.setState({data:data})

        }
        console.log(result,'result3')
    }
    //设为默认
    
    // async defualt(id,defaultid){
    //     const result=await Shop.defau({id:id});
        
    //     const datas=result.data;
    //     console.log(defaultid,'datas8888')
    //     // this.setState({checked: !this.state.checked});
    //     if(defaultid===1){
    //         this.state.checked
    //     }else{
    //         this.state.checked=!this.state.checked;
    //     }
    //     if(result.code==1){
    //         Toast.success(result.msg,2)
    //     }else{
    //         Toast.offline(result.msg,2)
    //     }
    // }

    async setDefault(e,index,item,id,){
        console.log(index,'ht')
        this.setState({index})
        let a=localStorage.setItem('index',index);
    //    console.log(a,'ccccccccc')
         this.setState({show:!this.state.show})
        console.log(e.target.checked,'111')
       const {dispatch}=this.props;
       let isDefault=e.target.checked;
       console.log(isDefault,'@@@@')
    //    let sql={id:id,isDefault};
       let value=await fetch.defau({id});
       if(value.code==1){
           Toast.success(value.msg,1);
           dispatch({
               type:'shop/defau',
               payload:{
                   isDefault,
                   index,
                   id:id
               }
           })
       }else{
           Toast.fail(value.msg,1);
       }

   }
    add(){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Adddizhi'))
    }
    render(){
        const AgreeItem = Checkbox.AgreeItem;
     
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"管理收货地址",
            rightContent:"",
            rightFunc(){
       
            }
        }
        const {history,dispatch,shopData}=this.props;
        const {data}=this.state;
        return(
            <div className={styles.App}>
                <style>
                    {`
                    .am-tab-bar-bar .am-tab-bar-tab{
                        flex-direction: row;
                    }
                    .am-tab-bar-bar{
                        height:2.57rem;
                    }
                    .am-card-header-extra{
                        font-size:0.26rem;
                        color:#070707;

                    }
                    .am-card-footer-extra div{
                        img{
                            width:auto;
                            height:0.33rem;
                        }
                    }
                    .am-card-footer-extra .delete{
                        margin-right:0.59rem;
                    }
                    .am-checkbox-agree .am-checkbox-inner{
                        top:1.24rem;
                    }
                    .am-checkbox-inner,.am-checkbox{
                        width:0.26rem;
                        height:0.26rem;
                    }
                    .am-card-footer{
                        color:#131414;
                        font-size:0.22rem;
                    }
                    .am-card-footer-extra{
                        flex: inherit;
                    }
                    .am-checkbox-inner:after{
                        width: 0.08rem;
                        right: 0.04rem;
                        top: -0.04rem;
                    }
                    .right{
                        display:flex;
                    }
                    .right span{
                        padding-left:0.1rem;
                        font-size:0.22rem;
                    }
                    .right img{
                        width:0.24rem;
                        height:0.24rem;
                    }
                    .am-card-body{
                        font-size:0.26rem;
                        padding: 0.3rem 0.3rem 0.2rem;
                    }
                    .btn{
                        position: absolute;
                        bottom: 0.27rem;
                        width: 5.3rem;
                        left: 50%;
                        margin-left: -2.6rem;
                    }
                    .am-button{
                        background: #D4AB6A;
                        color:#fff;
                        border-radius:0.35rem;
                        height: 0.7rem;
                        line-height: 0.7rem;
                        font-size: 0.28rem;
                    }
                    
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <div className={styles.address}>
                    {
                        data?data.map((item,index)=>{
                            const id=item.id;
                            const defaultid=item.addr_default
                            return( 
                                <div style={{width:'100%',marginBottom:'0.18rem'}}>
                                    <Card>
                                        <Card.Header
                                            title=""
                                            thumb={
                                                <div className={styles.pname}>
                                                    <div>{item.addr_name}</div>
                                                </div>
                                            }
                                            extra={<span>{item.addr_tel}</span>}
                                        />
                                        <Card.Body>
                                            <div>收货地址：{item.addr_stree}</div>
                                        </Card.Body>
                                        <Card.Footer content={<div>
                                            <Checkbox checked={(parseInt(localStorage.getItem('index')))===index?true:false} onChange={e=>this.setDefault(e,index,item,id)}  className={styles.editL}><span style={{paddingLeft:'0.2rem'}}>设为默认</span></Checkbox>
                                        </div>} extra={
                                            <div className='right'>
                                                <div className="delete">
                                                    <img  src={icon01} onClick={()=>this.edit(item.id )} />
                                                    <span>编辑</span>
                                                </div>
                                                <div onClick={()=>this.delect(id)}>
                                                    <img src={z01}  />
                                                    <span>删除</span>
                                                </div>
                                                
                                            </div>
                                            }
                                        />
                                    </Card>
                                </div>
                            )
                        }):""
                    }
                       
                </div>
                <div className='btn'>
                    <Button onClick={()=>this.add()}>添加新地址</Button>
                </div>
            </div>
        )
    }
}