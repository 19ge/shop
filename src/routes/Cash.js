import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import styles from "./styles/Cash.less";
import { List, InputItem, Toast,Button  } from 'antd-mobile';
import * as Shop from '../services/shop';
import icon01 from '../assets/images/card.png';
import icon02 from '../assets/images/txx.png';
import icon03 from '../assets/images/jj2.png';
import icon04 from '../assets/images/jj3.png';
@connect(state => ({ shop: state.shop }))
export default class Cash extends Component {
    state={
        val:"获取验证码",
        codeflag:0,
        data:'',
        name:'',
        phone:'',
        code:'',
        bankp:'',
        banknum:'',
        bankhang:'',
        pwd:'',
        num:""

    }
    async componentDidMount(){
        const result=await Shop.widthdrawal();
        const data=result.data;
        console.log(result,'result');
        this.setState({
            data:data,
        })
    }
    inputName(val){
        this.setState({
            name:val
        })
    }
    inputpwd(val){
        this.setState({
            pwd:val
        })
    }
    inputnum(val){
        this.setState({
            num:val
        })
    }
    inputPhone(val){
        this.setState({
            phone:val
        })
    }
    inputCode(val){
        this.setState({
            code:val
        })
    }
    person(val){
        this.setState({
            bankp:val
        })
    }
    //提交申请
    async btnsub(){
        const {dispatch,register}=this.props;
        let name=this.state.name;
        let num =this.state.num;
        let pwd=this.state.pwd;
        let phone=this.state.phone;
        let code=this.state.code;


        
        let data={
            "tx_num":num,//提现金额
            "tx_us_name":name, //姓名
            "tx_us_tel":phone,//手机号
            "us_pwd":pwd,
            "sode":code,//验证码             
        }
        const result=await Shop.tixian(data);
        if(result.code===1){
            Toast.success(result.msg, 1,()=>{
                const {dispatch}=this.props;
                dispatch(routerRedux.push('/Tixiandetail'))
            });   
        }else{
            Toast.fail(result.msg, 2);
        }
    }

    //获取验证码
    async codeClick(){
        console.log(456)
        let tel=this.state.phone;
        const us_tel = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;    
        if(us_tel.test(this.state.phone)){
            let fortime=120;
            const _this=this;
            const value =await Shop.getCode({us_tel:tel,type:"fg"});
            if(value.code===1){
                this.setState({
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

    //卡号
    // cardnum(val){
    //     this.setState({
    //         banknum:val
    //     })
    // }
    // //开户行
    // hang(val){
    //     this.setState({
    //         bankhang:val
    //     })
    // }
    render(){
      
        const {history}=this.props;
        const navBarProps = {
            leftVisible: true,
            leftFunc() {
                history.go(-1)
            },
            titleName: "提现申请",
            rightContent: "提现明细",
            rightFunc() {
                history.push('/Tixiandetail')
            }
        }
        const {val,data}=this.state
        return(
            <div className={styles.App}>
            <style>
                {`
                    .am-list-item .am-input-label{
                        font-size:0.28rem;
                    }
                    .am-list-item .am-input-extra{
                        color:#EB9103;
                        font-size:0.28rem;
                    }
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
                    .am-navbar-right{
                        font-size:0.32rem;
                    }
                    .imgdiv{
                        width: 6.46rem;
                        height: 3.64rem;
                        position: relative;
                        margin: auto;
                    }
                `}
            </style>
             {/*头部导航栏*/}
            <MyNavBar {...navBarProps}/>
                <div className={styles.card}>
                    <div className='imgdiv'>
                        <div className={styles.imgcard}>
                            <img src={icon01} />
                        </div>
                        <div className={styles.status}>
                        <dl>
                            <dt>
                                <img src={icon02} />
                            </dt>
                            <dd>待提现金额</dd>
                            <div style={{clear:'both'}}></div>
                        </dl>
                        
                        <p className={styles.cash}>{data.yue}</p>
                        <div className={styles.cardbot}>
                            <div>
                                <h5>已提现金额</h5>
                                <p>{data.aready}</p>
                            </div>
                            <div style={{marginLeft:'1.9rem'}}>
                                <h5>提现申请中</h5>
                                <p>{data.ting}</p>
                            </div>
                        </div>
                    </div>
                </div>
                    
                    
                    <div className={styles.bottom}>
                        {/* <p>提现提示：**********************</p> */}
                        <div className={styles.input}>
                            <InputItem
                                placeholder=""
                                clear
                                // maxLength="11"
                                onChange={this.inputName.bind(this)}
                                >姓名</InputItem>
                            <InputItem
                                type="number"
                                placeholder=""
                                clear
                                maxLength="11"
                                onChange={this.inputPhone.bind(this)}
                                >手机号</InputItem>
                            <InputItem
                                type="number"
                                placeholder=""
                                clear
                                maxLength="6"
                                extra={<div onClick={this.state.codeflag===0?()=>this.codeClick():()=>{}}>{val}</div>}
                                onChange={this.inputCode.bind(this)}
                                >验证码</InputItem>
                            <InputItem
                                // type="number"
                                placeholder=""
                                clear
                                // maxLength="11"
                                onChange={this.inputpwd.bind(this)}
                                >登录密码</InputItem> 
                                <InputItem
                                type="number"
                                placeholder=""
                                clear
                                // maxLength="11"
                                onChange={this.inputnum.bind(this)}
                                >提现金额</InputItem>
                            <InputItem
                                type="number"
                                placeholder=""
                                // disabled
                                value='银行卡'
                                
                                >提现至</InputItem>
                            <InputItem
                            placeholder={data.rec}
                            clear
                            ref='xs'
                            maxLength="11"
                            disabled
                            // onChange={this.inputName.bind(this)}
                            >手续费</InputItem>                                 
                        </div>
                        {/* <p>请填写持卡人本人的银行卡信息：</p>
                        <div className={styles.input}>
                            <InputItem
                                placeholder={data.us_bank_person}
                                clear
                                maxLength="11"
                                ref='cardname'
                                onChange={this.person.bind(this)}
                                >持卡人</InputItem>
                            <InputItem
                                type="number"
                                placeholder={data.us_bank_number}
                                clear
                                maxLength="11"
                                ref='cardnumber'
                                onChange={this.cardnum.bind(this)}
                                >卡号</InputItem>
                            <InputItem
                                // type="number"
                                placeholder={data.us_bank_name}
                                clear
                                maxLength="6"
                                ref='cardh'
                                onChange={this.hang.bind(this)}
                                >开户行</InputItem>                                   
                        </div> */}
                        <div className='btn' onClick={()=>this.btnsub()}>
                            <Button>提交申请</Button>
                        </div>
                    </div>

                   
                    
                </div>
            </div>
        )
    }
}