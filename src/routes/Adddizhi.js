import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Adddizhi.less";
import * as Shop from '../services/shop';
import MyNavBar from "../components/MyNavBar";
import icon01 from '../assets/images/b.png';
import icon09 from '../assets/images/v.png';
import arrayTreeFilter from 'array-tree-filter';
import { Picker, WhiteSpace,InputItem ,List,TextareaItem ,Button,Toast } from 'antd-mobile';
// import icon01 from '../assets/images/b.png';
// import { district, provinceLite } from '/antd-mobile-demo-data';
const cityData = require('../../public/ssx');
@connect(state => ({ shop: state.shop }))
export default class Adddizhi extends Component {
    state={
        data: [],
        name:'',
        phone:'',
        address:'',
        pickerValue:[],
        myValue:'',
        x:'', //经度
        y:'' ,//纬度
    }
    async componentDidMount(){
        // const result=await Shop.addshdz(data);
        // const data={
        //     "addr_name":name,
        //     "addr_tel":phone,
        //     "addr_detail":address,
            
        // }
        // let name=this.state.name;
        // let phone=this.state.phone;
        // let address=this.state.address;
        // console.log(result,'result')
    }
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
         
        var _value = e.item.value;
            myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
           
            _this.inputRef.value=myValue;
           
            setPlace();
        });
        this.setState({myValue:myValue})
        
        function setPlace(){
            
            map.clearOverlays();    //清除地图上所有覆盖物
            function myFun(){
                var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                console.log(pp);
                map.centerAndZoom(pp, 18);
                map.addOverlay(new BMap.Marker(pp));    //添加标注
                //请求接口
            //   const x=pp.lat;
            //   y=pp.lng; 
            _this.setState({
                x:pp.lat,
                y:pp.lng,
            })
                
               
            }
            
            var local = new BMap.LocalSearch(map, { //智能搜索
            onSearchComplete: myFun
            });

            local.search(myValue);
        }
        
    }
    async baocun(){
        const {x,y}=this.state;
        let name=this.state.name;
        let phone=this.state.phone;
        let address=this.state.address;
      
        const _this=this;
        const data={
            "addr_name":name,
            "addr_tel":phone,
            "addr_detail":address,
            "addr_longitude":x,
            "addr_latitude":y,
            "addr_stree":_this.inputRef.value
            
        }
        
        const result=await Shop.addshdz(data);
        if(result.code==1){
           Toast.success(result.msg,2,()=>{
               const {dispatch}=this.props;
               dispatch(routerRedux.push('/Guanliaddress'))
           })
        }else{
            Toast.offline(result.msg,2)
        }
        console.log(result,'result')
    }
    
    onClick = () => {
        setTimeout(() => {
          this.setState({
            data: cityData,
          });
        }, 120);
      };
      getSel() {
        const value = this.state.pickerValue;
        if (!value) {
          return '';
        }
        const treeChildren = arrayTreeFilter(cityData.globalData, (c, level) => c.value === value[level]);
        return treeChildren.map(v => v.label).join(',');
    }  
        //收货人姓名
        inputname(val){
            this.setState({
                name:val
            })
        }
         //电话
         inputel(val){
            this.setState({
                phone:val
            })
        }
         //详细地址
         inputaddress(val){
            this.setState({
                address:val
            })
        }
    
    render(){
        const {myValue}=this.state;
        const Item = List.Item;
        const Brief = Item.Brief;
        const {history,dispatch,shopData}=this.props;
      
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"添加收货地址",
            rightContent:"",
            rightFunc(){
            }
        }
        return(
            <div className={styles.App}>
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
                        width:65%;
                    }
                    .address label{
                        width: 1.7rem;
                        display: inline-block;
                    }
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <div>
                    <div id="l-map" style={{display:"none"}}></div>
                    <List>
                        <InputItem
                        
                            clear
                            placeholder="输入收货人姓名"
                            ref={el => this.autoFocusInst = el}
                            onChange={this.inputname.bind(this)}
                        >收货人</InputItem>
                        <InputItem
                            type='number'
                            maxLength='11'
                            clear
                            placeholder="输入收货人手机号"
                            ref={el => this.inputRef = el}
                            onChange={this.inputel.bind(this)}
                        >联系电话</InputItem>
                        <div className='address'>
                            <label>收货地址</label>
                            <input 
                            type='text'
                            placeholder="输入收货地址"
                            defaultValue={myValue}
                            id="suggestId"
                            ref={x=>this.inputRef=x}
                            />
                        </div>
                        <div id="searchResultPanel" style={{border:'1px solid #C0C0C0',width:'150px',height:'auto', display:'none'}}></div>
                        <List>
                            <TextareaItem
                                title="详细地址"
                                placeholder="河南省郑州市金水区某某某某某某某街道
                                某某某路与某某某路交叉口某某某小区3
                                号楼3单元60楼6003"
                                data-seed="logId"
                                ref={el => this.autoFocusInst = el}
                                autoHeight
                                onChange={this.inputaddress.bind(this)}
                            />
                        </List>
                    </List>
                </div>
                <div className='btn' onClick={()=>this.baocun()}>
                    <Button>保存</Button><WhiteSpace />
                </div>
            </div>
        )
    }
}