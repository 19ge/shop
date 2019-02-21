import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Modifyinfo.less";
import * as Shop from '../services/shop';
import MyNavBar from "../components/MyNavBar";
import icon01 from '../assets/images/tx2.png';
import icon09 from '../assets/images/v.png';
import { Tabs, Icon,InputItem ,List,Toast ,Button,Stepper, Range } from 'antd-mobile';
import { APIHost } from '../utils/fetch';
@connect(state => ({ shop: state.shop }))
export default class Bankcard extends Component {
    state={
        cardname:'',
        cardnum:'',
        cardh:''
    }


    async componentDidMount(){
        const result=await Shop.bank();
        this.setState({
            cardname:result.data.us_bank_person,
            cardnum:result.data.us_bank_number,
            cardh:result.data.us_bank_name
        })
        console.log(this.state.cardname,'adsasasa')
    }
    //持卡人
    person(val){
        this.setState({
            cardname:val
        })
    }
    //卡号
    cardnum(val){
        this.setState({
            cardnum:val
        })
    }
    //开户行
    hang(val){
        this.setState({
            cardh:val
        })
    }
    //提交申请
    async btnsub(){
        const {dispatch,register}=this.props;
        let name=this.state.cardname?this.state.cardname:this.refs.name.state.placeholder;
        let number=this.state.cardnum?this.state.cardnum:this.refs.number.state.placeholder;
        let hang=this.state.cardh?this.state.cardh:this.refs.hang.state.placeholder;
        // let phone=this.state.phone;
        // let code=this.state.code;
        // let bankp=this.state.bankp;
        // let banknum=this.state.banknum;
        // let bankhang=this.state.bankhang;


        
        let data={
            "us_bank_name":hang, //银行名称
            "us_bank_number":number,//银行卡号
            "us_bank_person":name, //银行收款人             
        }
        const result=await Shop.mbank(data);
        if(result.code===1){
            Toast.success(result.msg, 1,()=>{
                const {dispatch}=this.props;
                // dispatch(routerRedux.push('/Tixiandetail'))
            });   
        }else{
            Toast.fail(result.msg, 2);
        }
    }

   
    render(){
        const {history}=this.props;
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"银行卡",
            rightContent:"",
           
        }   
        const {cardname,cardnum,cardh}=this.state;  
        return(
            <div className={styles.App}>
            <style>
            {`
            .btn{
                width: 5.38rem;
                margin: auto;
                margin-top:0.86rem;
                margin-bottom:1.41rem;
            }
            .am-button{
                font-size:0.28rem;
                border-radius:0.4rem;
                background:rgba(212,171,106,1);
                color:#fff;
            }
            `}
            </style>
            {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <div className={styles.input}>
                            <InputItem
                                placeholder={cardname}
                                clear
                                // maxLength="11"
                                ref='name'
                                onChange={this.person.bind(this)}
                                >持卡人</InputItem>
                            <InputItem
                                // type="number"
                                placeholder={cardnum}
                                clear
                                // maxLength="11"
                                ref='number'
                                onChange={this.cardnum.bind(this)}
                                >卡号</InputItem>
                            <InputItem
                                // type="number"
                                placeholder={cardh}
                                clear
                                // maxLength="6"
                                ref='hang'
                                onChange={this.hang.bind(this)}
                                >开户行</InputItem>                                   
                        </div>
                        <div className='btn' onClick={()=>this.btnsub()}>
                            <Button>确认修改</Button>
                        </div>
                
            </div>
        )
    }
}