/**
 * @Author ygy
 * @Description //TODO vue自定义插件与公共方法
 * @Date 17:23 2019/6/25
 **/
import Vue from 'vue'
import {Loading,MessageBox} from 'element-ui';
//保留小数位
var linq = require('linq');
Vue.directive('floatOld', {
  update: function bind(el, binding, vnode, oldVnode) {
    console.log("11111111111111111111111111111")
    var bindValue = binding.value;
    var value = !el.value?el.innerText:el.value;
    //判断是否"--"
    if (value == "" || value == "NaN" ) {
      if(!el.value){
        el.innerText = "";
      }else{
        el.value = "";
      }
    } else {
      if(!el.value){
        el.innerText = parseFloat(value).toFixed(bindValue);
        el.value = "";
      }else{
        el.value = parseFloat(value).toFixed(bindValue);
        el.innerText = "";
      }
    }
  },
  bind: function bind(el, binding, vnode, oldVnode) {
    var bindValue = binding.value;
    var value = !el.value?el.innerText:el.value;
    //判断是否"--"
    if (value == "" || value == "NaN" ) {
      if(!el.value){
        el.innerText = "";
      }else{
        el.value = "";
      }
    } else {
      if(!el.value){
        el.innerText = parseFloat(value).toFixed(bindValue); // td、
        el.value = "";
      }else{
        el.value = parseFloat(value).toFixed(bindValue); // input
        el.innerText = "";
      }
    }
  }
});
/*Vue.directive('float', {
  update: function bind(el, binding, vnode, oldVnode) {
    var _self = vnode.context;
    if(el == document.activeElement){
      return
    }
    var arr = [];
    var bindValue,value;
    if(typeof (binding.value)=="object"){
      arr[0]=binding.value.node.replace("[index]","["+binding.value.index+"]");
      arr[1]=parseFloat(binding.value.float);
      bindValue = binding.value.float;
    }else{
      arr = binding.expression.split(",");
      bindValue = binding.value;
    }
    value = !el.value?el.innerText:el.value;
    //判断是否"--"
    _self.retainValidDecimal(arr[0],arr[1]);
  },
  bind: function bind(el, binding, vnode, oldVnode) {
    var _self = vnode.context;
    if(el == document.activeElement){
      return
    }
    var arr = [];
    var bindValue,value;
    if(typeof (binding.value)=="object"){
      arr[0]=binding.value.node.replace("[index]","["+binding.value.index+"]");
      arr[1]=parseFloat(binding.value.float);
      bindValue = binding.value.float;
    }else{
      arr = binding.expression.split(",");
      bindValue = binding.value;
    }
    value = !el.value?el.innerText:el.value;
    //判断是否"--"
    _self.retainValidDecimal(arr[0],arr[1]);
  }
});*/
//数据转换成百分制
Vue.directive('percent', {
  bind: function bind(el, binding, vnode, oldVnode) {
    if(el == document.activeElement){
      return
    }
    //判断是否为数字
    var bindValue = 0;
    if (binding.value) {
      bindValue = binding.value;
    }
    var re = /^\d+(?=\.{0,1}\d+$|$)/
    if(el.value&&el.value=="NaN"){
      el.value = ""
    }
    if(el.innerText&&el.innerText=="NaN"){
      el.innerText = ""
    }
    if (el.value&&el.value != "") { // input
      if (re.test(el.value)) {
        el.value = (el.value * 100).toFixed(bindValue) + "%";
      } else {
        el.value = el.value;
      }
    }
    if(el.innerText&&el.innerText != ""){ // td
      if (re.test(el.innerText)) {
        el.innerText = (el.innerText * 100).toFixed(bindValue) + "%";
      } else {
        el.innerText = el.innerText;
      }
    }
  },
  update: function bind(el, binding, vnode, oldVnode) {
    if(el == document.activeElement){
      return
    }
    //判断是否为数字
    var bindValue = 0;
    if (binding.value) {
      bindValue = binding.value;
    }
    var re = /^\d+(?=\.{0,1}\d+$|$)/
    if(el.value&&el.value=="NaN"){
      el.value = ""
    }
    if(el.innerText&&el.innerText=="NaN"){
      el.innerText = ""
    }
    if (el.value&&el.value != "") { // input
      if (re.test(el.value)) {
        el.value = (el.value * 100).toFixed(bindValue) + "%";
      } else {
        el.value = el.value;
      }
    }
    if(el.innerText&&el.innerText != ""){ // td
      if (re.test(el.innerText)) {
        el.innerText = (el.innerText * 100).toFixed(bindValue) + "%";
      } else {
        el.innerText = el.innerText;
      }
    }
  }
});
//数据转换成日期（yyyy-MM-dd）
Vue.directive('format-date', {
  bind: function bind(el, binding, vnode, oldVnode) {
    //判断是否为数字
    var re = /^\d+(?=\.{0,1}\d+$|$)/
    if (el.textContent != "") {
      // 是纯数字
      if (re.test(el.textContent)) {
        // 长度为6  比如 201802
        if (el.textContent.length == 6) {
          var y = el.textContent.slice(0, 4);
          var m = el.textContent.slice(4, 6);
          el.textContent = y + '-' + m;
        } else {
          // 长度为8 比如 20180219
          var y = el.textContent.slice(0, 4);
          var m = el.textContent.slice(4, 6);
          var d = el.textContent.slice(6, 8);
          el.textContent = y + '-' + m + '-' + d;
        }
      }
    }
  }
});
/*
                   _ooOoo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  O\  =  /O
               ____/`---'\____
             .'  \\|     |//  `.
            /  \\|||  :  |||//  \
           /  _||||| -:- |||||-  \
           |   | \\\  -  /// |   |
           | \_|  ''\---/''  |   |
           \  .-\__  `-`  ___/-. /
         ___`. .'  /--.--\  `. . __
      ."" '<  `.___\_<|>_/___.'  >'"".
     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
     \  \ `-.   \_ __\ /__ _/   .-` /  /
======`-.____`-.___\_____/___.-`____.-'======
                   `=---='
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         佛祖保佑       永无BUG
*/
export default {
install: function (Vue, str, options) {
/**
* @Author ygy
* @Description //TODO 初始化公共业务  1、header赋值2、pageData赋值3、
* @Date 10:24 2019/8/22
* @Param
* @return
**/
    Vue.prototype.initializationOfPublicServices=function(){
      var bbDm = this.allParam.bbDmVersion.substring(0,this.allParam.bbDmVersion.lastIndexOf("_"));
      for(var i=0;i<this.initializationData.data.length;i++){
        if(this.initializationData.data[i].header.sksssjq == this.allParam.sksssjq && this.initializationData.data[i].header.sksssjz == this.allParam.sksssjz&&this.initializationData.data[i].header.bbDm == bbDm){
          this.tableData.header = this.initializationData.data[i].header;  // header赋值
          if(this.initializationData.data[i].pageData!=""&&(JSON.stringify(this.initializationData.data[i].pageData) != "{}")){
            this.tableData.pageData = this.initializationData.data[i].pageData; //pageData 赋值
          }
          break;
        }
      }
      console.log(this.tableData.header)
      console.log(this.tableData.pageData)
    }
    /**
     * @Author ygy
     * @Description //TODO 日期转时间戳
     * @Date 14:02 2019/8/16
     * @Param data
     * @return timestamp
     **/
    Vue.prototype.dataToTimestamp=function (data) {
      return parseInt(new Date(data).getTime()/1000);
    }
    /**
     * @Author ygy
     * @Description //TODO 行合计
     * @Date 16:27 2019/8/12
     * @Param list:参与合计计算的参数 hj：合计值填写的参数
     * @return
     **/

    Vue.prototype.totalRows=function(list,hj){
      var list = this.strToFun(list);
      var hj1 = this.strToFun(hj);
      if(typeof (hj1)=="string"||typeof (hj1)=="object"){
        hj1 = eval(hj1);
      }
      for(var key in hj1){
        var count = 0;
        var fix = 2;
        $.each(list,function (index,item) {
          var i = item[key.substring(0,key.lastIndexOf("hj"))]+"";

          if(index == 0){
            if(i==0||i=="0"){
              i="0.00"
            }
            if(i.indexOf(".")>-1){
              fix = i.split(".")[1].length
            }
          }
          if(i==""){
            i=0;
          }
          count+=parseFloat(i);
        })
        hj1[key] = count.toFixed(fix)+"";
      }
      // eval(this.strToFun(hj,hj1));
    }
    /**
     * @Author ygy
     * @Description //TODO 列合计
     * @Date 16:27 2019/8/12
     * @Param list:多行，formula：公式
     * @return
     **/

    Vue.prototype.totalColumn=function(list,formula){
      var list = this.strToFun(list);
      var regEqual = RegExp(/=/g)//等于号
      var regCalculator=RegExp(/\+|\-|\*|\//g);//计算连接符
      if(regEqual.test(formula)){ // 如果有等于号
        var arr = formula.split(regEqual);//截取等于号两边
        var equalRightValue = arr[1].split(regCalculator) // 值
        var equalRightCalculator = arr[1].match(regCalculator) // 计算连接符
        var fix;
        // var arr1 = [];
        for(var i=0;i<list.length;i++){
          var str ="";
          for(var j=0;j<equalRightValue.length;j++){
            str += (!list[i][equalRightValue[j]]?0:list[i][equalRightValue[j]])+(j==equalRightValue.length-1?'':equalRightCalculator[j])
          }
          str = eval(str.split("--","-"));
          list[i][arr[0]] = str.toFixed(2)+"";
          // arr1.push(str);
        }
      }else{
      }
      // return arr1;
    }
    /**
     * @Author ygy
     * @Description //TODO 复选框赋值
     * @Date 14:41 2019/7/4
     **/
    Vue.prototype.checkChange = function (e, val, key, options) {
      if(!e.target.childNodes[0]||!e.target.firstChild.checked){
        var flag = this.strToFun(key);
        if(flag == val){
          var obj = this.strToFun(key,"");
          e.target.firstChild.checked = false;
        }else{
          var obj = this.strToFun(key,val);
        }
      }else {
        var obj = this.strToFun(key,"");
        e.target.firstChild.checked = false;
      }
    }
    /**
     * @Author ygy
     * @Description //TODO 获取初始化数据和表间数据
     * @Date 14:41 2019/7/4
     **/
    Vue.prototype.getInitializationAndSaveInfo = function (param1,param2) {
      //用以下方式模拟ajax异步请求，按照先后顺序执行ajax
      this.tool.showLoading();
      var _self = this;
      $.when(this.tool.getAiaxData("/getInitialization/InterCsh/cshMsg",param1),this.tool.getAiaxData("/api/selectSbbInfo",param2)).done(function (data1,data2) {
        this.tool.closeLoading(); // 隐藏等待图标
        _self.initializationData = data1;
        _self.saveInfo = data2.content;
        console.log(_self.saveInfo)
        // _self.initializationDataAssignment(); // 初始化数据赋值
        // _self.betweenTables();//表间取值
        // 执行其他代码
      }).fail(function () {
        this.tool.closeLoading(); // 隐藏等待图标
      })
    }
    /**
     * @Author ygy
     * @Description //TODO 表间取值(本期保存过的数据，和往期或者用于表间计算的其他表数据) 缓存或者ajax取数据
     * @Date 14:41 2019/7/4
     **/
    Vue.prototype.getSelectSbbInfo = function (requestRarameters) {
      console.log(this.allParam)
      this.tool.showLoading()
      var _self = this;
      var returnData;
      if (this.allParam.valueTakingMethod=="ajax"){
        console.log("▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ajax▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼");
        $.ajax({
          url: "/htftsolu/selectSbbInfo",
          dataType: "json",
          data: _self.allParam.requestRarameters,
          type: "POST",
          async:false,
          success: function (data) {
            if(data.returnCode=="00"){
              returnData = data.content;
            }else{
              MessageBox.alert(data.returnMessage,"错误",{type: 'error'});
            }
            _self.tool.closeLoading();
          },
          error: function (data) {
            _self.tool.closeLoading();
            MessageBox.alert("请求失败","错误",{type: 'error'});
          }
        });
      }else{
        console.log("■■■■■■■■■■■■■■■localStorage■■■■■■■■■■■■■■■■■■")
        returnData = localStorage.getItem('initData'); // 拿缓存
      }
      return returnData;
    }
    /**
     * @Author ygy
     * @Description //TODO 获取字典表
     * @Date 14:41 2019/7/4
     **/
    Vue.prototype.getDict = function (url) {
      var dict;
      $.ajax({
        url: url,
        dataType: "json",
        data: {},
        async: false,
        type: "get",
        success: function (data) {
          dict = data;
        },
        error: function (data) {
        }
      });
      return dict;
    }

    /**
     * @Author ygy
     * @Description //TODO 获取地址栏参数
     * @Date 11:11 2019/8/1
     **/
    Vue.prototype.getUrlParam = function (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      var r = location.search.substr(1).match(reg);
      if (r != null) return decodeURIComponent(r[2]);
      return null;
    }
    /**
     * @Author ygy
     * @Description //TODO 只允许输入数字，type=="all" 包括整数和小数  contain 可以包含的内容
     * @Date 11:11 2019/8/1
     **/
    Vue.prototype.onlyNumbers = function (key,type,contain) {
      var flag = false;
      var obj = this.strToFun(key)
      if(contain&&obj.indexOf(contain)>-1){ // 如果包含了百分号
        obj = obj.replace(contain,"")//替换调可以包含的内容
        flag = true;
      }
      if(type=="all"){
        obj = obj.replace(/[^0-9.]/g, '');
        var reg = RegExp(/\./g);
        var str = obj;
        if (str.match(reg)) {
          if (str.match(reg).length > 1) {
            obj = obj.substr(0, obj.length - 1);
          }
        }
      }else{
        obj = obj.replace(/[^0-9]/g, '');
        if(obj.indexOf("0")==0&&obj.length>1){
          obj = obj.substr(1, obj.length - 1);
        }
      }
      if(contain&&flag){
        obj = obj+"%";
      }
      this.strToFun(key,obj)
    }
    /**
     * @Author ygy
     * @Description //TODO 保留有效小数
     * @Date 11:11 2019/8/1
     **/
    Vue.prototype.retainValidDecimal = function (key, float) {
      var flag = this.strToFun(key);
      if(!flag||flag=="NaN"){
        this.strToFun(key,parseFloat("0").toFixed(float));
      }else{
        this.strToFun(key,parseFloat(flag).toFixed(float));
      }
    }
    /**
     * @Author ygy
     * @Description //TODO 将输入的数字变为小数，由指令v-percent将小数转变为百分数显示
     * @Date 16:06 2019/8/29
     * @Param
     * @return
     **/
    Vue.prototype.percentageProcessing = function (e,key) {
      var val = this.strToFun(key);
      if (val.indexOf("%")>-1) {
        val = parseFloat(val.replace("%"))/100;
        this.strToFun(key,val);
      } else if (0<parseFloat(val)&&parseFloat(val)<1) {
        e.currentTarget.value = (parseFloat(val))*100+"%"
        this.strToFun(key,val);
      } else {
        val = parseFloat(val)*0.01
        this.strToFun(key,val);
      }
    }


    /**
     * @Author ygy
     * @Description //TODO 键盘切换单元格
     * @Date 11:11 2019/8/1
     **/
    Vue.prototype.keyboardSwitchingCell = function (tableId, inputType) {
      var rowInputs = [];
      var trs = $("#" + tableId).find("tr");
      var inputRowIndex = 0;
      $.each(trs, function (i, obj) {
        if ($(obj).find("th").length > 0) { //跳过表头
          return true;
        }
        var rowArray = [];
        var thisRowInputs;
        if (!inputType) { //所有的input
          thisRowInputs = $(obj).find("input:not(:disabled):not(:hidden):not([readonly])");
        } else {
          thisRowInputs = $(obj).find("input:not(:disabled):not(:hidden):not([readonly])[type=" + inputType + "]");
        }
        if (thisRowInputs.length == 0)
          return true;
        thisRowInputs.each(function (j) {
          $(this).attr("_r_", inputRowIndex).attr("_c_", j);
          rowArray.push({"c": j, "input": this});
          $(this).keydown(function (evt) {
            var r = $(this).attr("_r_");
            var c = $(this).attr("_c_");

            var tRow
            if (evt.which == 38) {
              if (r == 0)
                return;
              r--;
              tRow = rowInputs[r];
              if (c > tRow.length - 1) {
                c = tRow.length - 1;
              }
            } else if (evt.which == 40 || evt.which == 13) {
              if (r == rowInputs.length - 1) {
                return;
              }
              r++;
              tRow = rowInputs[r];
              if (c > tRow.length - 1) {
                c = tRow.length - 1;
              }
            } else if (evt.which == 37) {
              if (r == 0 && c == 0) {
                return;
              }
              if (c == 0) {
                r--;
                tRow = rowInputs[r];
                c = tRow.length - 1;
              } else {
                c--;
              }
            } else if (evt.which == 39) {
              tRow = rowInputs[r];
              if (r == rowInputs.length - 1 && c == tRow.length - 1) {
                return;
              }
              if (c == tRow.length - 1) {
                r++;
                c = 0;
              } else {
                c++;
              }
            }
            $(rowInputs[r].data[c].input).focus();
          });
        });
        rowInputs.push({"length": thisRowInputs.length, "rowindex": inputRowIndex, "data": rowArray});
        inputRowIndex++;
      });

      /////////////调用其他初始化后方法，生命周期钩子决定必须在mounted中调用//////////////////////
      this.inputFoccusAndBlur();
      this.inputChange();
    }
    /**
     * @Author ygy
     * @Description //TODO 监听input焦点，0.00时选中后文本框为空，否则原值
     * @Date 9:01 2019/8/28
     * @Param
     * @return
     **/
    Vue.prototype.inputFoccusAndBlur = function () {
      var oldVal;
      var regSz=RegExp(/^(?:0|\-?(?:0\.\d*[1-9]|[1-9]\d*(?:\.\d*[1-9])?))$/)
      $("input").focus(function(e){
        oldVal = e.currentTarget.value;
        if(e.currentTarget.value=="0.00"||e.currentTarget.value==0||e.currentTarget.value==0.00){
          $(this).val("");
        }
      }).blur(function (e) {
        if(e.currentTarget.value==""&&(regSz.test(oldVal)||oldVal=="0.00")){
          $(this).val(oldVal);
        }
      });
    }
    /**
     * @Author ygy
     * @Description //TODO 监听input值改变后为空还原回0.00
     * @Date 18:26 2019/8/29
     * @Param
     * @return
     **/
    Vue.prototype.inputChange = function () {
      var _self = this;
      $("[data-NaN]").bind("input propertychange",function(e){
        console.log(e.target.dataset.nan)
        if(!_self.strToFun(e.target.dataset.nan)){
          _self.strToFun(e.target.dataset.nan,"0.00");
        }
      });
    }
    /**
     * @Author ygy
     * @Description //TODO 计算属期 处理月份添加函数（date当前日期，num增加的月份【正数：增加月份，负数：减少月份】会自动判断大小月和闰年）
     * @Date 16:29 2019/7/31
     **/
    Vue.prototype.calculatingDate = function (date, num) {
      //判断是否为数字
      var re = /^\d+(?=\.{0,1}\d+$|$)/
      if (date != "") {
        // 是纯数字
        if (re.test(date)) {
          // 长度为6  比如 201802
          if (date.length == 6) {
            var y = date.slice(0, 4);
            var m = date.slice(4, 6);
            date = y + '-' + m;
          } else {
            // 长度为8 比如 20180219
            var y = date.slice(0, 4);
            var m = date.slice(4, 6);
            var d = date.slice(6, 8);
            date = y + '-' + m + '-' + d;
          }
        }
      }
      var num = parseInt(num);
      var sDate = new Date(date);
      var sYear = sDate.getFullYear();
      var sMonth = sDate.getMonth() + 1;
      var sDay = sDate.getDate();
      var eYear = sYear;
      var eMonth = sMonth + num;
      var eDay = sDay;
      while (eMonth > 12) {
        eYear++;
        eMonth -= 12;
      }
      var eDate = new Date(eYear, eMonth - 1, eDay);
      while (eDate.getMonth() != eMonth - 1) {
        eDay--;
        eDate = new Date(eYear, eMonth - 1, eDay);
      }
      var eDates = new Date(eDate);
      var sYear1 = eDates.getFullYear();
      var sMonth1 = eDates.getMonth() + 1;
      var sDay1 = eDates.getDate();
      //小月
      if (sDay1 != 1 && (sMonth1 == 4 || sMonth1 == 6 || sMonth1 == 9 || sMonth1 == 11)) {
        sDay1 = 30
      } else if (sMonth1 == 2) {
        if (this.tool.isLeapYear(sYear1)) {
          sDay1 = 29
        } else {
          sDay1 = 28
        }
      } else {
        if(sDay1 == 1){
          sDay1 = 1;
        }else{
          sDay1 = 31
        }
      }
      if (sMonth1 < 10) {
        sMonth1 = "0" + sMonth1;
      }
      if (sDay1 < 10) {
        sDay1 = "0" + sDay1;
      }
      return "" + sYear1 + sMonth1 + sDay1;
    }
    /**
     * @Author ygy
     * @Description //TODO
     * @Date 15:27 2019/8/9
     * @Param
     * @return array
     **/
    Vue.prototype.strToArray = function (str,reg) {
      return str.split(reg);
    },
    /**
     * @Author ygy
     * @Description //TODO 将字符串转为function执行
     * @Date 14:50 2019/8/10
     * @Param
     * @return
     **/
    Vue.prototype.strToFun=function(str,val){
      str = str.replace(/'/g,"");
      var _self = this;
      if(val!=undefined){
        var json = new Function("_self","return _self.tableData.pageData." + str + " = " + "'"+val+"'");
      }else{
        var json = new Function("_self","return _self.tableData.pageData." + str);
      }
      return json(_self);
    },
      /**
       * @Author ygy
       * @Description //TODO 根据属期和报表代码查找对应的表的数据
       * @Date 15:33 2019/8/3
       **/
      Vue.prototype.screeningReportData = function (sqq,sqz,bbDm,obj) {
        var data={};
        for(var i=0;i<obj.length;i++){
          if(obj[i].header.bbDm==bbDm&&obj[i].header.sksssjq == sqq&&obj[i].header.sksssjz == sqz){
            data = obj[i];
            break;
          }
        }
        return data;
      }
    Vue.prototype.tool={
      /**
       * @Author ygy
       * @Description //TODO 判断闰年
       * @Date 11:10 2019/8/1
       **/
      isLeapYear:function(Year) {
        if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
          return (true);
        } else {
          return (false);
        }
      },
      /**
       * @Author ygy
       * @Description //TODO 显示等待框
       * @Date 11:10 2019/8/1
       **/
      showLoading:function(str) {
        var text = !str ? "拼命加载中..." : str;
        Loading.service({fullscreen: true, text: '拼命加载中...', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)'});
      },
      /**
       * @Author ygy
       * @Description //TODO 隐藏等待框
       * @Date 11:10 2019/8/1
       **/
      closeLoading:function() {
        Loading.service({}).close();
      },
      /*  getAiaxData(url,prm){
    var param;
    if(url =="/getInitialization/InterCsh/cshMsg"){
      param = {
        batchData:prm
      }
      return false;  // 这块以后删除
    }else{
      param = {
        batchData:JSON.stringify(prm)
      }
    }
    var defer = $.Deferred();
    $.ajax({
      url: url,
      dataType: "json",
      data: param,
      async: true,
      type: "POST",
      success: function (data) {
        defer.resolve(data);
      },
      error: function (data) {
        MessageBox.alert("请求失败","错误",{type: 'error'});
      }
    });
    return defer;
  }*/

      freezeTable:function(table, freezeRowNum, freezeColumnNum, width, height) {
        if (typeof(freezeRowNum) == 'string')
          freezeRowNum = parseInt(freezeRowNum)

        if (typeof(freezeColumnNum) == 'string')
          freezeColumnNum = parseInt(freezeColumnNum)

        var tableId;
        if (typeof(table) == 'string') {
          tableId = table;
          table = $('#' + tableId);
        } else
          tableId = table.attr('id');

        var divTableLayout = $("#" + tableId + "_tableLayout");

        if (divTableLayout.length != 0) {
          divTableLayout.before(table);
          divTableLayout.empty();
        } else {
          table.after("<div id='" + tableId + "_tableLayout' style='overflow:hidden;height:" + height + "px; width:" + width + "px;'></div>");

          divTableLayout = $("#" + tableId + "_tableLayout");
        }

        var html = '';
        if (freezeRowNum > 0 && freezeColumnNum > 0)
          html += '<div id="' + tableId + '_tableFix" style="padding: 0px;"></div>';

        if (freezeRowNum > 0)
          html += '<div id="' + tableId + '_tableHead" style="padding: 0px;"></div>';

        if (freezeColumnNum > 0)
          html += '<div id="' + tableId + '_tableColumn" style="padding: 0px;"></div>';

        html += '<div id="' + tableId + '_tableData" style="padding: 0px;"></div>';


        $(html).appendTo("#" + tableId + "_tableLayout");
       // $(html).appendTo(".el-scrollbar__view");

        var divTableFix = freezeRowNum > 0 && freezeColumnNum > 0 ? $("#" + tableId + "_tableFix") : null;
        var divTableHead = freezeRowNum > 0 ? $("#" + tableId + "_tableHead") : null;
        var divTableColumn = freezeColumnNum > 0 ? $("#" + tableId + "_tableColumn") : null;
        var divTableData = $("#" + tableId + "_tableData");

        divTableData.append(table);

        if (divTableFix != null) {
          var tableFixClone = table.clone(true);
          tableFixClone.attr("id", tableId + "_tableFixClone");
          divTableFix.append(tableFixClone);
          $("#"+tableId + "_tableFixClone input").attr('clone','true')
        }

        if (divTableHead != null) {
          var tableHeadClone = table.clone(true);
          tableHeadClone.attr("id", tableId + "_tableHeadClone");
          divTableHead.append(tableHeadClone);
          $("#"+tableId + "_tableHeadClone input").attr('clone','true')
        }

        if (divTableColumn != null) {
          var tableColumnClone = table.clone(true);
          tableColumnClone.attr("id", tableId + "_tableColumnClone");
          divTableColumn.append(tableColumnClone);
          $("#"+tableId + "_tableColumnClone input").attr('clone','true')
        }

        $("#" + tableId + "_tableLayout table").css("margin", "0");

        if (freezeRowNum > 0) {
          var HeadHeight = 0;
          var ignoreRowNum = 0;
          $("#" + tableId + "_tableHead tr:lt(" + freezeRowNum + ")").each(function () {
            if (ignoreRowNum > 0)
              ignoreRowNum--;
            else {
              var td = $(this).find('td:first, th:first');
              HeadHeight += td.outerHeight(true);

              ignoreRowNum = td.attr('rowSpan');
              if (typeof(ignoreRowNum) == 'undefined')
                ignoreRowNum = 0;
              else
                ignoreRowNum = parseInt(ignoreRowNum) - 1;
            }
          });
          HeadHeight += 2;

          divTableHead.css("height", HeadHeight-3);
          divTableFix != null && divTableFix.css("height", HeadHeight);
        }

        if (freezeColumnNum > 0) {
          var ColumnsWidth = 0;
          var ColumnsNumber = 0;
          $("#" + tableId + "_tableColumn tr:eq(" + freezeRowNum + ")").find("td:lt(" + freezeColumnNum + "), th:lt(" + freezeColumnNum + ")").each(function () {
            if (ColumnsNumber >= freezeColumnNum)
              return;

            ColumnsWidth += $(this).outerWidth(true);
            ColumnsNumber += $(this).attr('colSpan') ? parseInt($(this).attr('colSpan')) : 1;
          });
          ColumnsWidth += 2;

          divTableColumn.css("width", ColumnsWidth);
          divTableFix != null && divTableFix.css("width", ColumnsWidth);
        }

        divTableData.scroll(function () {
          divTableHead != null && divTableHead.scrollLeft(divTableData.scrollLeft());

          divTableColumn != null && divTableColumn.scrollTop(divTableData.scrollTop());
        });
        divTableFix != null && divTableFix.css({ "overflow": "hidden", "position": "absolute", "z-index": "50" });
        divTableHead != null && divTableHead.css({ "overflow": "hidden", "width": $("#allTable").width(), "position": "absolute", "z-index": "45" ,"background-color":"#fff"});
        divTableColumn != null && divTableColumn.css({ "overflow": "hidden", "height": height - 100, "position": "absolute", "z-index": "40" });
        divTableData.css({ "overflow": "auto", "width":$("#allTable").width(), "height": height-82, "position": "absolute" });

        divTableFix != null && divTableFix.offset(divTableLayout.offset());
        divTableHead != null && divTableHead.offset(divTableLayout.offset());
        divTableColumn != null && divTableColumn.offset(divTableLayout.offset());
        divTableData.offset(divTableLayout.offset());
      },
      adjustTableSize:function(type) {
        var tableId = "taxTable";
        if($("#taxTable").width()<1200){
          $("#" + tableId + "_tableHead").css({
            left:type=="closeBar"?"25%":"9px"
          })
          $("#" + tableId + "_tableData").css({
            left:type=="closeBar"?"25%":"9px"
          })
          $("#" + tableId + "_tableColumn").css({
            left:type=="closeBar"?"25%":"9px"
          })
          $("#" + tableId + "_tableFix").css({
            left:type=="closeBar"?"25%":"9px"
          })
        }else{
          $("#" + tableId + "_tableHead").width($("#allTable").width());
          $("#" + tableId + "_tableData").width($("#allTable").width());
        }

      },
/*
      adjustTableSize:function(table, width, height) {
        var tableId;
        if (typeof(table) == 'string')
          tableId = table;
        else
          tableId = table.attr('id');

        $("#" + tableId + "_tableLayout").width(width).height(height);
        $("#" + tableId + "_tableHead").width(width - 17);
        $("#" + tableId + "_tableColumn").height(height - 17);
        $("#" + tableId + "_tableData").width(width).height(height-400);
      },
*/
      pageHeight:function() {
        if ($.browser.msie) {
          return document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight;
        } else {
          return self.innerHeight;
        }
      },

//返回当前页面宽度
      pageWidth:function() {
        if ($.browser.msie) {
          return document.compatMode == "CSS1Compat" ? document.documentElement.clientWidth : document.body.clientWidth;
        } else {
          return self.innerWidth;
        }
      },
      // 解析固定行列
      analyzingFixedColumns:function () {
        var _self = this;
        var table = $("#taxTable");
        var tableId = table.attr('id');
        var freezeRowNum = table.attr('freezeRowNum');
        var freezeColumnNum = table.attr('freezeColumnNum');
        if (typeof(freezeRowNum) != 'undefined' || typeof(freezeColumnNum) != 'undefined') {
          this.freezeTable(table, freezeRowNum || 0, freezeColumnNum || 0, this.pageWidth(),this.pageHeight());
          var flag = false;
          // table不需要自适应，暂不加浏览器宽度变化后重新处理table高度，
/*
          $(window).resize(function() {
            if (flag)
              return ;
            setTimeout(function() {
              adjustTableSize(tableId, pageWidth(), pageHeight());
              flag = false;
            }, 100);
            flag = true;
          });
*/
        }
      }
    }
    /**
     * @Author ygy
     * @Description //TODO 根据选中的code 筛查出code name
     * @Date 17:33 2019/8/27
     * @param data 下拉框数据 checkCode选中的code  assignment 赋值对象
     **/
    Vue.prototype.selectFun=function(data,checkCode,assignment){
      var data = this.strToFun(data.replace("tableData.pageData."));
      var v = linq.from(data).where(function (item) { return item.dm == checkCode }).defaultIfEmpty([]).toArray()[0].dmmc;
      this.strToFun(assignment.replace("tableData.pageData."),v);
    }

    /**
     * @Author ygy
     * @Description //TODO td 弹出信息提示
     * @Date 19:17 2019/8/27
     * @Param
     * @return
     **/
    //弹出提示信息
    Vue.prototype.popUpMessage=function(e,rowNum,colNum){

      if(e.currentTarget.firstChild.value=="0.00"||e.currentTarget.firstChild.value==0||e.currentTarget.firstChild.value==0.00){
        e.currentTarget.firstChild.value="";
      }
      if($("#popUpMessageDiv").length>0){
        return
      }
      var dom=document.createElement('div');
      var dom1=document.createElement('div');
      dom.className='popUpMessage';
      dom1.className='lineDiv';
      dom.id="popUpMessageDiv"
      var html = "没有找到提示信息哦！！！";
      $.each(this.hintInformation,function (index,item) {
        if(item.rowNum == rowNum&&item.colNum == colNum){
          html= item.message;
        }
      })
      dom.innerHTML=html;
      var width = $(".el-main").width();
      var left = parseFloat(e.currentTarget.offsetWidth)+20;
      e.currentTarget.appendChild(dom1);
      e.currentTarget.appendChild(dom);
      $("#popUpMessageDiv").css({
        "width":width - e.screenX -105,
        "left":left-7+"px",
      });
    }

/*
  var oldVal;
  var regSz=RegExp(/^(?:0|\-?(?:0\.\d*[1-9]|[1-9]\d*(?:\.\d*[1-9])?))$/)
  $("input").focus(function(e){
    oldVal = e.currentTarget.value;
    if(e.currentTarget.value=="0.00"||e.currentTarget.value==0||e.currentTarget.value==0.00){
      $(this).val("");
    }
  }).blur(function (e) {
    if(e.currentTarget.value==""&&(regSz.test(oldVal)||oldVal=="0.00")){
      $(this).val(oldVal);
    }
  });*/





    /**
     * @Author ygy
     * @Description //TODO td 鼠标移走弹框消失
     * @Date 19:18 2019/8/27
     * @Param
     * @return
     **/
      Vue.prototype.leave=function(e){
       $("#popUpMessageDiv").remove();
       $(".lineDiv").remove();
    }
    /**
     * @Author ygy
     * @Description //TODO input 鼠标移走弹框消失
     * @Date 19:18 2019/8/27
     * @Param
     * @return
     **/
      Vue.prototype.blurToData=function(e){
        if(e.currentTarget.value==""){
          e.currentTarget.value="0.00";
        }
    }
  }
}




