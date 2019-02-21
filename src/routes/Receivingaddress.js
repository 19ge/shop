import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Receivingaddress.less";
import MyNavBar from "../components/MyNavBar";
import * as Shop from '../services/shop';
import { TabBar,Card, List, Checkbox, Flex} from 'antd-mobile';
import icon01 from '../assets/images/bj.png';
import z01 from '../assets/images/sc.png';
import z02 from '../assets/images/z02.png';
import z03 from '../assets/images/z03.png';
import z04 from '../assets/images/dz.png';
import z05 from '../assets/images/dz2.png';
@connect(state => ({ shop: state.shop }))
export default class Receivingaddress extends Component {
    state = {    

    };
    edit(){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Editaddress'))
    }
    render(){
        const AgreeItem = Checkbox.AgreeItem;
        const data = [
            { value: 0, label: 'Ph.D.' },
          ];
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
            // leftFunc(){
            //     alert('提示', '你点击了左侧???', [
            //         { text: 'Cancel', onPress: () => console.log('cancel') },
            //         { text: 'Ok', onPress: () => console.log('ok') },
            //     ])
            // },
            titleName:"选择收货地址",
            rightContent:"保存",
            rightFunc(){
                // const{dispatch}=this.props;
		        // dispatch(routerRedux.push('/Tixianrecord'));
            }
        }
        const {history,dispatch,shopData}=this.props;
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
                    
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <div className={styles.address}>
                <Flex>
                    <Flex.Item>
                    <AgreeItem data-seed="logId" onChange={e => console.log('checkbox', e)}>
                        <div style={{width:'6.5rem'}}>
                        <Card>
                            <Card.Header
                                title=""
                                thumb={
                                    <div className={styles.pname}>
                                        <div>收货人</div>
                                        <p>矫情怪_Sunny</p>
                                    </div>
                                }
                                extra={<span>18435141321</span>}
                            />
                            <Card.Body>
                                <div>河南省郑州市金水区未来路福元路交叉口山西老面边的小卖铺</div>
                            </Card.Body>
                            <Card.Footer extra={
                                <div>
                                    <img className="delete" src={z01}  />
                                    <img src={icon01} onClick={()=>this.edit()} />
                                </div>
                                }
                             />
                        </Card>
                        </div>
                    </AgreeItem>
                    </Flex.Item>
                </Flex>
                </div>
            </div>
        )
    }
}