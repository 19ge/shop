import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Tixiandetail.less";
import MyNavBar from "../components/MyNavBar";
import MyTabBar from "../components/TabBar";
import * as Shop from '../services/shop';
import { Tabs, Button,Toast ,PullToRefresh ,WhiteSpace} from 'antd-mobile';
import InfiniteScroll from 'react-infinite-scroller';
import icon01 from '../assets/images/t.png';
import v03 from '../assets/images/yy.png';
@connect(state => ({ shop: state.shop }))
export default class Tixiandetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTabBar: "team",
            val: 0,
            checked:1,
            data:'',
            height: document.documentElement.clientHeight,
            page: 1,
            total: 0,    
            refreshing: false,
        }   
    }
    async componentDidMount(){
        Shop.mingxi({ page: this.state.page }).then((result) => {
            if (result.code === 1) {
              if (result.data.data.length < 1) {
              } else {
                this.setState({ data: result.data.data, page: result.data.current_page, total: result.data.total })
              }
            } else {
              Toast.offline(result.msg, 2); return;
            }
        })
    }
    //加载更多的方法,写法固定,只需替换变量名
    getShopList() {
        const { page ,lng,lat} = this.state;   // 页数
        let pageNum = page * 1 + 1;
        this.setState({ refreshing: true, isLoading: true });
        Shop.mingxi({ page: pageNum }).then((result) => {
          console.log("###====",result);
            if (result.code === 1) {
                if (result.data.data.length < 1) {
                this.setState({ refreshing: false, isLoading: false, total: result.data.total });
                } else {
                var newArr = this.state.data.concat(result.data.data);
                this.setState({ page: pageNum, data: newArr, total: result.data.total, refreshing: false, isLoading: false });
                }
            }
        })
    }
    render(){
        const {history,dispatch,shop}=this.props;
        const {data}=this.state;
       
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"提现明细",
            rightContent:"",
            rightFunc(){
            }
        }
         
        return(
            <div className={styles.App}>
            <style>
                    {`
                    .am-tabs-default-bar-tab-active{
                        color:rgba(255,168,0,1);
                    }
                    .am-whitespace.am-whitespace-md{
                        height:0;
                    }
                    .am-tabs-pane-wrap{
                        background: #fff;
                    }
                    
                    `}
                </style>
            {/*头部导航栏*/}
            <MyNavBar {...navBarProps}/>
                <div className={styles.tabbar}>
                    <WhiteSpace />
                    <div style={{ height: 'auto' }}>
                    <PullToRefresh id="ListBox"
                        style={{
                        height: this.state.height,
                        overflow: 'auto',
                        }}
                        indicator={{ deactivate: '上拉可以刷新' }}
                        direction="up"
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.getShopList()}
                    >
                        <div>
                            {
                                data?data.map((item,index)=>{
                                    return(
                                        <div className={styles.box}>
                                            <dl>
                                                <dd>
                                                    <p className={styles.name}>{item.tx_us_name}</p>
                                                    <p className={styles.id}>提现账号:{item.bank_account}</p>
                                                </dd>
                                                <div style={{clear:'both'}}></div>
                                            </dl>
                                            <div className={styles.time}>
                                                <p>{item.tx_num}</p>
                                                <p className={styles.time2}>{item.tx_add_time}</p>
                                            </div>
                                        </div>
                                    )
                                }):''
                            }
                        </div>
                        </PullToRefresh>  
                    </div>
                    
                
                </div>
            </div>
        )
    }
}