import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Editaddress.less";
import * as Shop from '../services/shop';
import MyNavBar from "../components/MyNavBar";
import icon01 from '../assets/images/b.png';
import icon09 from '../assets/images/v.png';
import { Toast, WhiteSpace,InputItem ,List,TextareaItem ,Button } from 'antd-mobile';
var queryString = require('querystring');
@connect(state => ({ shop: state.shop }))

export default class Editaddress extends Component {
    state={
       name:'',   //收货人
       tel:'',    //联系电话
       address:'',  //收货地址
       add:'',   //详细地址
       val:'',
       names:'',   
       myValue:' ',
       str:'',
       data:''
    }

    // async componentDidMount(){
    //     const result =await Shop.editaddress();
    //     console.log(result,'result')
    // }
    async componentDidMount(){
        function G(id) {
            return document.getElementById(id);
        }
        var BMap = window.BMap;
        var map = new BMap.Map("l-map");
        map.centerAndZoom("北京",12);                   // 初始化地图,设置城市和地图级别。

        var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
            {"input" : "suggestId"
            ,"location" : map
        });

        ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
            // alert(8)
        var str ='';
            var _value = e.fromitem.value;
            var value = "";
            if (e.fromitem.index > -1) {
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            }    
            str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
            
            
            value = "";
            if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            }    
            str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
            G("searchResultPanel").innerHTML = str;
            // alert(str.value,'123')
            console.log(str,'1')
            // this.setState({str:str})
        });

        var myValue;
        const _this=this;
        ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
            // console.log(111);
            // alert(9999999999999)
        var _value = e.item.value;
            myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
            // this.setState({})
            _this.inputRef.value=myValue;
            // _this.inputRef.inputRef.props.value=myValue;
            // _this.setState({myValue:myValue})
            setPlace();
          
            // console.log(myValue,'5555555555555555')
        });
        this.setState({myValue:myValue})
        // console.log(this.state.myValue,'.')

        function setPlace(){
           
            map.clearOverlays();    //清除地图上所有覆盖物
            function myFun(){
                var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                // console.log(pp);
                
                map.centerAndZoom(pp, 18);
                map.addOverlay(new BMap.Marker(pp));    //添加标注
                _this.setState({
                    x:pp.lat,
                    y:pp.lng,
                })
            }
            var local = new BMap.LocalSearch(map, { //智能搜索
            onSearchComplete: myFun
            });

            local.search(myValue);
            
            console.log(myValue,'2222222222');
        }
        const {location}=this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const result=await Shop.addxq({id:parse.id});
        
        this.setState({data:result.data?result.data:''})
        console.log(result,'result')
    }
    // getPoint(val){
    //     console.log(val,'zzz')
    //     this.setState({
    //         val:val
    //     })
    // }
    async service(){
        const {location}=this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const {x,y}=this.state;
        let name=this.state.name?this.state.name:this.refs.name.state.placeholder; //昵称
        let tel=this.state.tel?this.state.tel:this.refs.tel.state.placeholder; //联系电话
        let add=this.state.add?this.state.add:this.refs.add.state.placeholder; //详细地址
        console.log(add,'sssssssssss')
        // let address=this.state.address?this.state.address:this.state.placeholder; //详细地址




        // let name=this.state.name;
        // let phone=this.state.tel;
        // let address=this.state.address;
      
        const _this=this;
        const data={
            "addr_name":name,
            "addr_tel":tel,
            "addr_detail":add,   //详细地址
            "addr_longitude":x,
            "addr_latitude":y,
            "addr_stree":_this.inputRef.value,   //收货地址
            "id":parse.id, 
        }
        console.log(data,'ht')
        const result=await Shop.editaddress(data);
        if(result.code==1){
           Toast.success(result.msg,2)
        }else{
            Toast.offline(result.msg,2)
        }
        console.log(result,'result')
    }
    // async service(){
    //     let name=this.state.name;
    //     let tel=this.state.tel;
    //     let address=this.state.address;

    //     // let 
    //     const data={
    //         "addr_name":name,  //收货人
    //         "addr_tel":tel,//联系电话
    //         "addr_detail":address,//详细地址
    //     }
    //     const result =await Shop.editaddress(data);
    //     // console.log(result,'result')
    // }
    inputname(val){
        this.setState({
            name:val,
        })
    }
    inputel(val){
        this.setState({
            tel:val,
        })
    }
    detailadd(val){
        this.setState({
            add:val,
        })
    }
    render(){
        const {myValue,data}=this.state;
        console.log(myValue,'qqqqqqqqqq')
        const Item = List.Item;
        const Brief = Item.Brief;
        const {history,dispatch,shopData}=this.props;
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"编辑收货地址",
            rightContent:"",
            rightFunc(){
            }
        }
        return(
            <div className={styles.App}>
                <div id="l-map" style={{display:"none"}}></div>
                <style>
                    {`
                    .am-list-item .am-input-label{
                        color: #181818;
                        font-size: 0.28rem;
                    }
                    .am-list-item .am-input-control{
                        font-size: 0.26rem;
                    }
                    .am-list-item .am-list-line .am-list-content{
                        font-size: 0.28rem;
                    }
                    .am-textarea-label{
                        font-size: 0.28rem;
                    }
                    .am-textarea-control textarea{
                        font-size: 0.26rem;
                    }
                    .am-button{
                        width:5.3rem;
                        height:0.7rem;
                        line-height: 0.7rem;
                        background: #D4AB6A;
                        border-radius:0.35rem;
                        color: white;
                        margin: auto;
                    }
                    .btn{
                        position: absolute;
                        bottom: 0.29rem;
                        left: 50%;
                        margin-left: -2.53rem;
                    }
                    #l-map{height:300px;width:100%;}
                    #r-result{width:100%;}
                    #searchResultPanel{
                        font-size:0.5rem;
                    }
                    .tangram-suggestion table{
                        font-size:0.3rem !important;
                    }
                    .tangram-suggestion table tr td{
                        line-height: 0.5rem;
                    }
                    .address{
                        height: 0.88rem;
                        padding-left: 0.3rem;
                        font-size: 0.28rem;
                        line-height: 0.88rem; 
                    }
                    .address input{
                        border: 0;
                        
                    }
                    .address label{
                        width: 1.7rem;
                        display: inline-block;
                    }
                    #suggestId{
                        width: 76%;
                    }
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <div>
                    <List>
                        <InputItem
                            clear
                            placeholder={data.addr_name}
                            ref="name"
                            //ref={el => this.autoFocusInst = el}
                            onChange={this.inputname.bind(this)}
                        >收货人</InputItem>
                        <InputItem
                            type='number'
                            maxLength='11'
                            clear
                            placeholder={data.addr_tel}
                            ref="tel"
                            // ref={el => this.inputRef = el}
                            onChange={this.inputel.bind(this)}
                        >联系电话</InputItem>
                        <div className='address'>
                            <label>收货地址</label>
                            <input 
                            type='text'
                            placeholder={data.addr_stree}
                            defaultValue={myValue}
                            id="suggestId"
                            ref={x=>this.inputRef=x}
                            />
                        </div>
                        <div id="searchResultPanel" style={{border:'1px solid #C0C0C0',width:'150px',height:'auto', display:'none'}}></div>
                        {/* <InputItem
                            // type='number'
                            // maxLength='11'
                            clear
                            placeholder={data.addr_detail}
                            ref="add"
                            // ref={el => this.inputRef = el}
                            onChange={this.detailadd.bind(this)}
                        >详细地址</InputItem> */}
                        <List>
                            <TextareaItem
                                title="详细地址"
                                placeholder={data.addr_detail}
                                // data-seed="logId"
                                // ref={el => this.autoFocusInst = el}
                                ref="add"
                                autoHeight
                                onChange={this.detailadd.bind(this)}
                            />
                        </List>
                    </List>
                </div>
                <div className='btn' onClick={()=>this.service()}>
                    <Button>保存</Button><WhiteSpace />
                </div>
            </div>
        )
    }
}