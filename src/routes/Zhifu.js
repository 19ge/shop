import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Zhifu.less";
import MyNavBar from "../components/MyNavBar";
import { List, InputItem, WhiteSpace,Button,Toast} from 'antd-mobile';
import { TabBar } from 'antd-mobile';
import * as Shop from '../services/shop';
import z01 from '../assets/images/z01.png';
import z02 from '../assets/images/z02.png';
import z03 from '../assets/images/z03.png';
import z04 from '../assets/images/z04.png';
import z05 from '../assets/images/z05.png';
var queryString = require('querystring');
@connect(state => ({ shopData: state.shop }))

export default class Zhifu extends Component {
    
        state = {
            money:'',
            pwd:'',
            selectedTab: '2',
            hidden: false,
            fullScreen: false,
            ling_lei:'',
            us_id:'',
            type:''

        };
    async componentDidMount() {
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        // console.log(parse,'parse')
        var id=parse.id;
        const type=parse.type
        const result=await Shop.zhifu({id:id,type:type});
        this.setState({money:result})
        this.setState({
            us_id:result.us_id,
            id:id,
            type:type
        })
      }
    inputmoney(value){
        if(value!==""&&this.state.money!==""){
            this.setState({money:value});
          }else{
            this.setState({money:value});
          }
    }
    inputpwd(value){
        if(value!==""&&this.state.pwd!==""){
            this.setState({pwd:value});
          }else{
            this.setState({pwd:value});
          }
    }
    async btnzf(){

        let pwd=this.state.pwd;
        
        const {selectedTab,us_id,money,type}=this.state;

        var Dataaa={
            num:money.money,
            us_id:us_id,
            relevance:this.state.id,
            type:type
        }
    
        if(selectedTab==2){
            
            const alipay=await Shop.apily(Dataaa);
          
            if(alipay.code===0){
                Toast.offline(alipay.msg, 2);
            }else{
                Toast.success(alipay.msg,2,()=>{
                    window.location=alipay.data
                    // const {dispatch}=this.props;
                    // const {location} = this.props;
                    // const parse=queryString.parse(location.search.replace("?",""));
                    // this.setState({type:parse.type})
                    // if(parse.type==2){
                    //     dispatch(routerRedux.push('/Mybaodan'))
                    // }else{
                    //     dispatch(routerRedux.push('/Myorder'))
                    // }
                });   
                
            }
        }else{
            Toast.offline('暂未开放微信支付')
            // const wechat=await Shop.chat(Dataaa);
            // if(wechat.code===0){
            //     Toast.offline(wechat.msg, 2);
            // }else{
            //     Toast.success(wechat.msg,2);
            //     const {dispatch}=this.props;
            //     dispatch(routerRedux.push('/Mybaodan'))
            // }
            // window.location='http://als.jugekeji.cn/index/wechat/bb'
            // window.location=result.data;
           

        }
      }
      handleClick = () => {
        this.inputRef.focus();
      }
    render(){
        const {type}=this.state;
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                if(type==1){
                    history.push('/Myorder')
                }else{
                    history.push('/Mybaodan')
                }
               
              },
            titleName:"支付方式",
            rightContent:"",
            rightFunc(){
                
            }
        }
        const {history,dispatch,shopData}=this.props;
        const {money}=this.state;
        return(
            <div className={styles.App}>
                 {/* 样式 */}
                 <style>
                    {`
                    
                    input[type = "radio"] {
                    　　display: none;
                    }
                   
                    .rightContent{
                        font-weight:normal;
                    }
                    .am-list-item.am-input-item{
                        height:1rem;
                      
                    }
                    .am-list-item .am-input-label,.am-list-item .am-input-control{
                        font-size: 0.26rem;
                    }
                    .am-tab-bar-bar .am-tab-bar-tab{
                        display:flex;
                        flex-direction: row;
                    }
                    .am-tab-bar-bar .am-tab-bar-tab-title{
                        margin-left:0.23rem;
                    }
                    .am-list-body{
                        margin-top: 0.21rem;
                    }
                    .am-tab-bar{
                        top:0.4rem;
                        position: relative;
                        height: 1rem;
                    }
                    .am-button{
                        margin-top:0.65rem;
                        background:#D4AB6A;
                        font-size: 0.34rem;
                       
                        
                    }
                    a:hover{
                        text-decoration-line: none;
                    }
                    .am-list-item .am-input-clear-active{
                        background-color: rgba(1,135,252,1);
                    }
                    #check02{
                        width:0.3rem;
                        height:0.3rem;
                        position: relative;
                        top: 0.09rem;
                    }
                    .radio_box input:checked+label:after {
                    content: '';
                    width: 9px;
                    height: 9px;
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    background: #ef4949;
                    border-radius: 50%;
                    }
                    
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <List>
                    <InputItem          
                        disabled
                        placeholder={money.money}
                        type="number"
                        onChange={this.inputmoney.bind(this)}
                    >支付金额</InputItem>
                  
                </List>
                <div className={styles.account}>
                    <h5>支付方式</h5>
                    {/* 单选框 */}
                    <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                    >
                        <TabBar.Item
                            title={
                                <img src={z01} style={{width:"0.6rem",height:"0.6rem"}}></img>
                            }
                            key="Life"
                            icon={
                                <img src={z04} style={{
                                    width: '0.3rem',
                                    height: '0.3rem', 
                                
                                }}
                            />
                            }
                            selectedIcon={
                                <img src={z05} style={{
                                    width: '0.3rem',
                                    height: '0.3rem',         
                                }}
                            />
                            }
                            selected={this.state.selectedTab === '2'}
                            onPress={() => {
                            this.setState({
                                selectedTab: '2',
                            });
                            }}
                            data-seed="logId"
                        >
                        </TabBar.Item>
                        <TabBar.Item
                        icon={
                                <img src={z04} style={{
                                    width: '0.3rem',
                                    height: '0.3rem',         
                                }}
                            />
                        }
                        selectedIcon={
                                <img src={z05} style={{
                                    width: '0.3rem',
                                    height: '0.3rem',         
                                }}
                            />
                            }
                            title={<img src={z02} style={{width:"0.6rem",height:"0.6rem"}}></img>}
                            key="Koubei"
                        
                            selected={this.state.selectedTab === '3'}
                            onPress={() => {
                            this.setState({
                                selectedTab: '3',
                            });
                            }}
                            data-seed="logId1"
                        >
                        </TabBar.Item>
                    </TabBar>
                    <Button type="primary" onClick={()=>this.btnzf()}>确认支付</Button><WhiteSpace />
                </div>       
                    <div>
                    </div>
            </div>
        )
    }
}