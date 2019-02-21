import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Mywallet.less";
import { List, InputItem, WhiteSpace,TextareaItem  } from 'antd-mobile';
import * as Shop from '../services/shop';
import icon01 from '../assets/images/b.png';
import icon02 from '../assets/images/jj.png';
import icon03 from '../assets/images/jj2.png';
import icon04 from '../assets/images/jj3.png';
@connect(state => ({ shop: state.shop }))
export default class Mywallet extends Component {
    state={
        data:'',
    }
    async componentDidMount(){
        const result=await Shop.mywallet();
        const data=result.data;
        this.setState({
            data:data,
        })
        // console.log(result,'result')
    }
    render(){
        const {data}=this.state;
        const {history}=this.props;
        return(
            <div className={styles.App}>
                <div className={styles.bgtop}>
                    <div className={styles.title}>
                        <div className={styles.back} onClick={()=>history.go(-1)}>
                            <img src={icon01} />
                        </div>
                        <div className={styles.center}>我的钱包</div>
                    </div>
                    <dl>
                        <dt>余 额</dt>
                        <dd>{data.yue}</dd>
                    </dl>
                   
                    <div className={styles.left}>
                        <div className={styles.leftcon}>
                            <h4>消费总金额</h4>
                            <p>{data.buy_all}</p>
                        </div>
                        <div className={styles.leftcon}>
                            <h4>消费折扣折让总金额</h4>
                            <p>{data.dis_all}</p>
                        </div>
                    </div>
                    
                </div>
                <div className={styles.list}>
                    <div className={styles.listtop}>
                        <dl>
                            <dt>
                                <img src={icon02} />
                            </dt>
                            <dd>
                                <h5>推荐奖</h5>
                                <p>{data.dir}</p>
                            </dd>
                        </dl>
                    </div>
                    <div className={styles.listtop}>
                        <dl>
                            <dt>
                                <img src={icon03} />
                            </dt>
                            <dd>
                                <h5>提成</h5>
                                <p>{data.che}</p>
                            </dd>
                        </dl>
                    </div>
                    <div className={styles.listtop}>
                        <dl>
                            <dt>
                                <img src={icon04} />
                            </dt>
                            <dd>
                                <h5>分红奖</h5>
                                <p>{data.red}</p>
                            </dd>
                        </dl>
                    </div>
                </div>  
            </div>
        )
    }
}