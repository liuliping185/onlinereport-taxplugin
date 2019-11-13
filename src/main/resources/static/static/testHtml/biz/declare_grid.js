
/**
 * 按期申报填报列表页控制脚本
 * 
 * @author 于广洋
 * @modify 王雷
 */
// -------------------------------
/**
 * 绘制税种填报页面
 * 
 * @param {*} companyInfo 
 */
function initPage(companyInfo) {
//    getIEVersion();
//    var companyInfo = companyInfo;
//    var djxh = companyInfo.djxh;
//    var nowdate = ""; // 存储当前选择的时间框;
//    var submitData
    /**
     * 展示税种申报信息
     */

    var showTax = function(taxInfo) {
        var taxInfo = getTestInfo();
        if(taxInfo.length>0){
            for(var i=0;i<taxInfo.length;i++){
                if(taxInfo[i].sbrq){
                    taxInfo[i].sbrq = tool.formatDate(taxInfo[i].sbrq.split(" ")[0]);
                }
            }
        }

        var id = "#taxGrid";
        var buttonHtml = "填写申报表";
        var order = ["pzzlMc", "sssqQ", "sssqZ", "sbrq", "do"];
        var promptStatement = "";
        var headerList = [{
            name: "序号",
            width: "5%"
        }, {
            name: "申报表",
            width: "55%"
        }, {
            name: "税款所属期起",
            width: "10%"
        }, {
            name: "税款所属期止",
            width: "10%"
        }, {
            name: "申报日期",
            width: "10%"
        }, {
            name: "操作",
            width: "10%"
        }];
        //渲染表
        getTableDeclaration(id, order, headerList, taxInfo, buttonHtml,promptStatement)
    };
    /**
     * 税务申报table渲染
     * @param {*} id 
     * @param {*} order 
     * @param {*} headerList 
     * @param {*} ddt 
     * @param {*} buttonHtml 
     */
    var getTableDeclaration = function(id, order, headerList, ddt, buttonHtml,promptStatement) {
        var tableObj = {
            id: id, //tabel父元素的id
            autoHeight: 10, //ddt.length>0?10:"",
            containerWidth: "99%", //table占父元素的百分比
            autoHeight: ddt.length>0?10:"", // 默认10行
            order: order, //数据按照什么顺序排序  1.do为是否保函操作 2.序号列会自动添加不需要写
            onlyId: "uuId", //数据的唯一标识
            height: "320", //表格的高度
            buttonHeight: "", //表格的高度
            buttonHtml: buttonHtml, //按钮里的字
            headerList: headerList, //表头名字及占比，顺序与order对应
            promptStatement:promptStatement, // 没有数据时默认提示
            data: {
                page: "1",
                pageSize: ddt.length
            },
            jsonReady: ddt,
            callback: function(data, node) {
//                data.djxh = companyInfo.djxh;
//                data.iszzsybjc = companyInfo.iszzsybjc; // 一表申报代码
//                data.nsrsbh = companyInfo.nsrsbh; // 那随人识别号
//                data.nssbq = nowdate;
//                data.checkTime = false;
//                if(data.pzzlDm === '11602') {
//                    var List = companyInfo.taxInfos.filter(function (item) {
//                      return item.pzzlDm == '10101' || item.pzzlDm == '10102'
//                    })
//                    if(List.length === 0) {
//                        data.checkTime = true;
//                    }
//                    for(var i=0;i<List.length;i++){
//                        if(List[i].sssqQ !== data.sssqQ || List[i].sssqZ !== data.sssqZ) {
//                            data.checkTime = true;
//                            break;
//                        }
//                    }
//                }
//                submitData = data;
//                if(node.context.innerText=="填写申报表"&&companyInfo.iszzsybjc == "01" &&data.pzzlDm == "10101"){
                if(node.context.innerText=="填写申报表"){
                   initpage.declarationMethod('N')
//                    $('#myMask').show();
//                    $('#myModal').show();
//                    $('#dName').html(data.pzzlMc);
//                    $('#dName').attr("title",data.pzzlMc);//修改title值
//                    $('#ybName').html(data.pzzlMc);
//                    $('#ybName').attr("title",data.pzzlMc);//修改title值

                }else{
//                    declarationMethod("N")
                }
                } //点击按钮后的回调函数
        };
        var object = tool.tableCreate(tableObj);
//        object.jsonReadyTo(ddt, { page: "1", pageSize: ddt.length });
    };

    /**
     * 税务申报 初始化数据获取
     * @param {*} mydate
     */
    var getTaxDeclaration = function(date, type) {
        // TODO 开始加载等待动画
//        showLoading();
//        var param = {
//            djxh: djxh,
//            sbsq: date,
//            isFresh: type.toUpperCase() == "Y",
//            pzzlDm:companyInfo.pzzlDm
//        }
//        $.ajax({
//            url: "/online_report/declare/getPzzlList",
//            data: param,
//            type: "POST",
//            dataType: "JSON"
//        }).done(function(data) {
//            if (data.success) {
//                drawGrid(data.bean);
//                companyInfo = data.bean;
//            } else {
//                alertWarning(data.errmsg);
//            }
//        }).always(function(data) {
//            hideLoading();
//        });
        drawGrid();
    };
    /**
     * 隐藏modal
     */
    var closeModal = function () {
        $('#ybName').html("");
        $('#dName').html("");
        $('#myMask').hide();
        $('#myModal').hide();
    }
    var drawGrid = function (bean) {
        //两个表合成一个表
//    　　$.each(bean.financialInfos,function(i,item){
//        　　　　bean.taxInfos.push(item);
//        　　});
//        if(bean.taxInfos.length==0){
//            showTax(bean.taxInfos);
            showTax();
//            alertInfo("税费申报暂无数据");
//        }else{
////            showTax(bean.taxInfos);
//            showTax();
//        }
    };

    /**
     * 日期改变时触发
     * N 非强制刷新
     * @param {*} obj
     * @param {*} dp
     */
    var changeDate = function(obj, dp) {
        date = dp.cal.getNewDateStr();
        nowdate = date; // 给缓存时间赋值
        // 加了一个延时，时间改变后时间框没有收起隐藏就加载数据，没有找到好的解决办法，暂时用延时处理
        setTimeout(function(){
            getTaxDeclaration(date, "N");
        },50);
    };

    var refresh = function() {
        myConfirm("消息", "您确定需要重置申报清册吗？点击确定继续", "确定", "取消", function() {
            getTaxDeclaration(nowdate, "Y");
        });
    };
    //申报方式 当iszzsybjc=01同时pzzlDm=010101时，调用改方法
    var declarationMethod = function (statu) {
//        submitData.ybjcState = statu;
//         var form = $("#changeForm");
//         form.find("#changeForm_data").val(JSON.stringify(submitData));
//         form.submit();
        closeModal();
        window.location.href="../edit.html";
    }
    /**
     * 重置调用方法
     * @param {} params 
     */
    $("#reset,#reset1").on("click", refresh);
    $("#goRecord").click(function() {
        //TODO 调用备案接口
    });
    // 格式化后台返回的时间
//    $("#getInputValue").val(tool.formatDate(companyInfo.sbsq));
//    nowdate = companyInfo.sbsq;
//    drawGrid(companyInfo);
    drawGrid();
    //页面出现滚动条，监听滚动条变化将高赋值给模态框
    window.onscroll= function(){
        $("#myModal").css("top", $(document).scrollTop()+235 );
    }
    return {
        changeDate: changeDate,
        reset: reset,
        declarationMethod: declarationMethod,
        closeModal:closeModal
    }
}