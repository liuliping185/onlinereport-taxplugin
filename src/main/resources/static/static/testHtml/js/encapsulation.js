var showLoading, hideLoading, myAlert, myConfirm
window.console = window.console || (function () {
    var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile
    = c.clear = c.exception = c.trace = c.assert = function () { };
    return c;
})();

function getIEVersion() {
       localStorage.setItem("cancellation", null);
       var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
       var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
       var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
       var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
       if(isIE) {
           var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
           reIE.test(userAgent);
           var fIEVersion = parseFloat(RegExp["$1"]);
           if(fIEVersion == 7) {
               alert('您的浏览器版本过低，请使用IE9及以上浏览器或者使用浏览器极速模式');
               return 7;
           } else if(fIEVersion == 8) {
               alert('您的浏览器版本过低，请使用IE9及以上浏览器或者使用浏览器极速模式');
               return 8;
           } else if(fIEVersion == 9) {
//               alert('您的浏览器版本过低，请使用IE9及以上浏览器或者使用浏览器极速模式');
               return 9;
           } else if(fIEVersion == 10) {
               return 10;
           } else {
               alert('您的浏览器版本过低，请使用IE9及以上浏览器或者使用浏览器极速模式');
               return 6;//IE版本<=7
           }
       } else if(isEdge) {
           return 'edge';//edge
       } else if(isIE11) {
           return 11; //IE11
       }else{
           return -1;//不是ie浏览器
       }

       if(!isEdge){
           alert('您的浏览器版本过低，请使用IE9及以上浏览器或者使用浏览器极速模式');
       }
}

//封装等待框
    (function($) {
        var renderHtml = function() {
            var _html = '<div id="loadingDiv" style="display: none; cursor:progress;"><div id="over" style=" position: absolute;top: 0;left: 0; width: 100%;height: 100%; background-color: #f5f5f5;opacity:0.5;z-index: 9999991;"></div><div id="layout" style="position: absolute;top: 40%; left: 40%;width: 20%; height: 20%;  z-index: 9999999;text-align:center;"><img id="showloading" src="/online_report/static/tools/images/loading1.gif" /></div></div>';
            $("body").append(_html);
        }
        renderHtml();
        $.show = {
                //显示等待框
                showLoading: function() {
                    $("#loadingDiv").css({
                        display: 'block'
                    })
                },
                //隐藏等待框
                hideLoading: function() {
                    $("#loadingDiv").css({
                        display: 'none'
                    })
                },

            }
            // 渲染等待框


        showLoading = function() {
            $.show.showLoading();
        }
        hideLoading = function() {
            $.show.hideLoading();
        }
    })(jQuery);
/**
 * 重写确认框 fun:函数对象 params:参数列表， 可以是数组
 */
(function($) {
    $.alerts = {
            alert: function(title, message, btnOk, callback) {
                if (title == null) title = 'Alert';
                $.alerts._show(title, message, btnOk, null, null, 'alert', function(result) {
                    if (callback) callback(result);
                });
            },

            confirm: function(title, message, btnOk, btnNo, callback) {
                if (title == null) title = 'Confirm';
                if (btnOk == null || btnOk == "") btnOk = '确定';
                if (btnNo == null || btnNo == "") btnNo = '取消';
                $.alerts._show(title, message, btnOk, btnNo, null, 'confirm', function(result) {
                    if (callback) callback(result);
                });
            },
            _show: function(title, msg, btnOk, btnNo, value, type, callback) {
                var _html = "";
                _html += '<div id="mb_box"></div><div id="mb_con"><span id="mb_tit">' + title + '</span>'
                if (type == "confirm") {
                    _html += '<img id="mb_img" src="/online_report/static/tools/images/close.png">';
                    _html += '<div id="mb_msg">' + msg + '</div>';
                }
                if (type == "alert") {
                    _html += '<div id="mb_msg">' + msg + '</div>';
                    _html += '<input id="mb_btn_ok" type="button" value=' + btnOk + '>';
                    _html += '</div>';
                }
                if (type == "confirm") {
                    _html += '<input id="mb_btn_ok" type="button" value=' + btnOk + '>';
                    _html += '<input id="mb_btn_no" type="button" value=' + btnNo + '>';
                    //_html += '<input id="mb_btn_ok" type="button" value=' + btnOk + '>';
                    _html += '</div>';
                }
    
                //必须先将_html添加到body，再设置Css样式  
                $("body").append(_html);
                GenerateCss(type);
                switch (type) {
                    case 'alert':
    
                        $("#mb_btn_ok").click(function () {
                            $.alerts._hide();
                            callback(true);
                        });
                        $("#mb_btn_no").focus().keypress(function (e) {
                            if (e.keyCode == 13 || e.keyCode == 27) $("#mb_btn_no").trigger('click');
                        });
                        break;
                    case 'confirm':
                        $("#mb_btn_ok").click(function () {
                            $.alerts._hide();
                            if (callback) callback(true);
                        });
                        $("#mb_btn_no").click(function () {
                            $.alerts._hide();
                            //if (callback) callback(false);
                        });
                        $("#mb_img").click(function () {
                            $.alerts._hide();
                            //if (callback) callback(false);
                        });
                        $("#mb_btn_no").focus();
                        $("#mb_btn_ok, #mb_btn_no").keypress(function (e) {
                            if (e.keyCode == 13) $("#mb_btn_ok").trigger('click');
                            if (e.keyCode == 27) $("#mb_btn_no").trigger('click');
                        });
                        break;
                }
            },
            _hide: function _hide() {
                $("#mb_box,#mb_con").remove();
            }
            // Shortuct functions  
        };myAlert = function myAlert(title, message, btnOk, callback) {
            $.alerts.alert(title, message, btnOk, callback);
        };
    
        myConfirm = function myConfirm(title, message, btnOk, btnNo, callback) {
            $.alerts.confirm(title, message, btnOk, btnNo, callback);
        };
    
        //生成Css  
        var GenerateCss = function GenerateCss(type) {
            $("#mb_box").css({
                width: '100%',
                height: '100%',
                zIndex: '99999',
                position: 'fixed',
                filter: 'Alpha(opacity=40)',
                backgroundColor: 'black',
                top: '0',
                left: '0',
                opacity: '0.4'
            });
    
            $("#mb_box").css({
                width: '100%',
                height: '100%',
                zIndex: '99999',
                position: 'fixed',
                filter: 'Alpha(opacity=40)',
                backgroundColor: 'black',
                top: '0',
                left: '0',
                opacity: '0.4'
            });
            if (type == "alert") {
                $("#mb_con").css({
                    zIndex: '999999',
                    width: '400px',
                   // height: '230px',
                    position: 'fixed',
                    backgroundColor: 'White',
                    borderRadius: '3px'
                });
            } else {
                $("#mb_con").css({
                    zIndex: '999999',
                    width: '400px',
                  //  height: '200px',
                    position: 'fixed',
                    backgroundColor: 'White',
                    borderRadius: '3px'
                });
            }
            $("#mb_img").css({
                width: '19px',
                height: '20px',
                top:'10px',
                right:'10px',
                position:'absolute'
            });
            $("#mb_img_span").css({
                float: 'left',
                padding: '7.5px 15px',
                width: '10%',
                borderBottom: '1px solid #E6E6E6'
            });
            if (type == "alert") {
                $("#mb_tit").css({
                    float: 'left',
                    width: '92%',
                    display: 'block',
                    fontSize: '14px',
                    color: '#444',
                    padding: '10px 15px',
                    backgroundColor: '#fff',
                    borderRadius: '15px 15px 0 0',
                    // fontWeight: 'bold',
                    borderBottom: '1px solid #E6E6E6'
                });
            } else {
                $("#mb_tit").css({
                    float: 'left',
                    width: '100%',
                    display: 'block',
                    fontSize: '14px',
                    color: '#444',
                    padding: '10px 15px',
                    backgroundColor: '#fff',
                    borderRadius: '15px 15px 0 0',
                    // fontWeight: 'bold',
                    borderBottom: '1px solid #E6E6E6'
                });
            }
    
            $("#mb_msg").css({
                clear: 'both',
                padding: '30px',
                lineHeight: '40px',
                textAlign: 'left',
                fontSize: '16px',
                color: '#4c4c4c',
                marginBottom: '50px',
            });
    
            $("#mb_ico").css({
                display: 'block',
                position: 'absolute',
                right: '10px',
                top: '9px',
                border: '1px solid Gray',
                width: '18px',
                height: '18px',
                textAlign: 'center',
                lineHeight: '16px',
                cursor: 'pointer',
                borderRadius: '12px',
                fontFamily: '微软雅黑'
            });
    
            $("#mb_btnbox").css({
                margin: '0px 20px 20px 0',
                textAlign: 'right'
            });
            if (type == "alert") {
                $("#mb_btn_ok,#mb_btn_no").css({
                    width: '80px',
                    height: '30px',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    position: 'absolute'
    
                });
                $("#mb_btn_ok").css({
                    backgroundColor: '#53ACF3',
                    marginRight: '6px',
                    right: '15px',
                    bottom: '15px'
                });
            } else {
                $("#mb_btn_ok,#mb_btn_no").css({
                    width: '80px',
                    height: '30px',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    position: 'absolute'
                });
                $("#mb_btn_ok").css({
                    backgroundColor: '#53ACF3',
                    marginRight: '6px',
                    right:'105px',
                    bottom: '10px',
                });
            }
            $("#mb_btn_no").css({
                border: '1px solid #CCCCCC',
                backgroundColor: '#FFFFFF',
                color: 'black',
                bottom: '10px',
                right: '20px',
            });
    
            //右上角关闭按钮hover样式  
            $("#mb_ico").hover(function () {
                $(this).css({
                    backgroundColor: 'Red',
                    color: 'White'
                });
            }, function () {
                $(this).css({
                    backgroundColor: '#DDD',
                    color: 'black'
                });
            });
    
            var _widht = document.documentElement.clientWidth; //屏幕宽  
            var _height = document.documentElement.clientHeight; //屏幕高  
    
            var boxWidth = $("#mb_con").width();
            var boxHeight = $("#mb_con").height();
    
            //让提示框居中  
            $("#mb_con").css({
                top: (_height - boxHeight) / 2 + "px",
                left: (_widht - boxWidth) / 2 + "px"
            });
    }


})(jQuery);

var alertBoxArr = [];
completedOk = false;
//success   成功
//info      信息
//warning   警告
//danger    错误！
function alertBox(type, msg, showTime, callBack) {
    if (completedOk) {
        return;
    }
    completedOk = true;

    if (msg == "null" || msg == "undefined" || !msg) {
        return;
    }
    var srcUrl;
    var divCss = "alert alert-" + type + " alert-dismissable";
    if (type == "success") {
        srcUrl = '/online_report/static/tools/images/smile.png';
    } else if (type == "info") {
        srcUrl = '/online_report/static/tools/images/tan.png';
    } else {
        srcUrl = '/online_report/static/tools/images/tan1.png';
    }
    if (showTime == null) showTime = 3000;
    var divAlertBox;
    if ($("#divAlertBox").length != 0) {
        $("#divAlertBox span").text(msg);
        divAlertBox = $("#divAlertBox");
        divAlertBox.removeClass().addClass(divCss).slideDown(1000);
        box(divAlertBox);
    } else {
        var divAlertBoxCover = $("<div id='divAlertBoxCover' style='position:fixed;top:0px;left:0px;z-index:9998;width:100%;height:100%;'><div>");
        divAlertBox = $("<div id='divAlertBox' style='display:none;position:fixed;z-index:9999;top:100px;left:100px; ' class='" + divCss + "'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'  onclick='alertBoxHide()' >&times;</button><span>" + "<img src='" + srcUrl + "' style='margin-right:10px;' />" + msg + "</span></div>");
        $("body").append(divAlertBox);
        $("body").append(divAlertBoxCover);
        divAlertBox.slideDown(1000);
        box(divAlertBox);
    }
    var _widht = document.documentElement.clientWidth; //屏幕宽  
    var _height = document.documentElement.clientHeight; //屏幕高  
    var boxWidth = $("#divAlertBox").width();
    var boxHeight = $("#divAlertBox").height();
    $("#divAlertBox").css({
        top: 200 + "px",
        left: (_widht - boxWidth) / 2 + "px"
    })
    if (callBack) {
        setTimeout(function() {
            $("#divAlertBoxCover").remove();
            divAlertBox.fadeOut(1000);
            callBack();
        }, showTime);
    }

}

function pushAlertArr(type, msg, showTime, callBack) {
    var objAlert = {};
    objAlert.type = type;
    objAlert.msg = msg;
    objAlert.showTime = showTime;
    objAlert.callBack = callBack;
    alertBoxArr.push(objAlert);
}


function alertSuccess(msg, showTime, callBack) {
    pushAlertArr("success", msg, showTime, callBack);
    alertBox("success", msg, showTime, callBack);
}

function alertInfo(msg, showTime, callBack) {
    pushAlertArr("info", msg, showTime, callBack);
    alertBox("info", msg, showTime, callBack);
}

function alertWarning(msg, showTime, callBack) {
    pushAlertArr("warning", msg, showTime, callBack);
    alertBox("warning", msg, showTime, callBack);
}

function alertDanger(msg, showTime, callBack) {
    pushAlertArr("danger", msg, showTime, callBack);
    alertBox("danger", msg, showTime, callBack);
}

function alertBoxHide() {
    //        $("#divConfirmBox").fadeOut(1000);
    $("#divAlertBoxCover").remove();
    alertBoxArr.shift();
    completedOk = false;
    if (alertBoxArr.length) {
        setTimeout(function() {
            alertBox(alertBoxArr[0].type, alertBoxArr[0].msg, alertBoxArr[0].showTime, alertBoxArr[0].callBack);
        }, 500);
    };
}

function box(jqObj) {
    //获取DIV为‘box’的盒子
    var oBox = jqObj[0];
    //获取元素自身的宽度
    var L1 = oBox.clientWidth;
    //获取元素自身的高度
    var H1 = oBox.clientHeight;
    //获取实际页面的left值。（页面宽度减去元素自身宽度/2）
    var Left = (document.documentElement.clientWidth - L1) / 2;
    //获取实际页面的top值。（页面宽度减去元素自身高度/2）
    var top = (document.documentElement.clientHeight - H1) / 4;
    oBox.style.left = Left + 'px';
    oBox.style.top = top + 'px';
}
// window.alert = function(msg, showTime, callBack) {
//     alertSuccess(msg, showTime, callBack);
//};
(function($, window, document, undefined) {
    function Paging(element, options) {
        this.element = element;
        this.options = {
            pageNo: options.pageNo || 1,
            totalPage: Math.ceil(parseInt(options.totalSize) / parseInt(options.pageSize)),
            totalSize: options.totalSize,
            pageSize: options.pageSize || 20,
            callback: options.callback

        };
        this.init();
    }
    Paging.prototype = {
        constructor: Paging,
        init: function() {
            this.creatHtml();
            this.bindEvent();
        },
        creatHtml: function() {
            var me = this;
            var content = "";
            var current = me.options.pageNo;
            var total = me.options.totalPage;
            var totalNum = me.options.totalSize;
            var pageSize = me.options.pageSize;

            content += "<span class='partPages'>每页<span>" + pageSize + "</span>条,</span>";
            content += "<span class='totalPages'> 共<span>" + totalNum + "</span>条 </span>";
            content += "<div class='select-container-box'><div class='select-pages-container'><div class='select-page-num'>" + pageSize + " </div><div class='page-corn'><div class='page-corn-up'></div></div><ul class='floatWindow'><li class='floatWindowLi'>10</li><li class='floatWindowLi'>20</li><li class='floatWindowLi'>30</li><li class='floatWindowLi'>50</li></ul></div></div>";
            content += "<div class='container-pageBtn-control'>";
            //content += "<a class='prePageOne'><<</a>";
            //content += "<a class='prePage'><</a>";
            content += "<img class='prePageFF' src='/online_report/static/tools/images/pagination_first.gif'/>";
            content += "<img class='prePageF' src='/online_report/static/tools/images/pagination_prev.gif'>";

            content += "<input class='select-input-page margin-top' value='" + current + "'></a>";

            //content += "<a class='nextPage'>></a>";
            //content += "<a class='prePageLast'>>></a>";
            content += "<img class='prePageL' src='/online_report/static/tools/images/pagination_next.gif'/>";
            content += "<img class='prePageLL' src='/online_report/static/tools/images/pagination_last.gif'>";
            content += "</div>";
            //content += "<img class='page-refresh-btn'  src='/online_report/static/tools/images/pagination_load.png'/>";
            //content += "<span class='totalSize'> 共<span>" + totalNum + "</span>条记录 </span>";
            me.element.html(content);
        },
        bindEvent: function() {
            var me = this;
            me.element.off('click', 'a');
            me.element.off('click', 'button');
            me.element.off('click', 'img');
            me.element.off('click', 'div');
            me.element.on('click', 'div', function(e) {
                if (!me.options.totalPage) {
                    return;
                }
                var id = $(this).context["className"];
                if (id == "select-container-box") {
                    if ($(me.element).find(".floatWindow")[0].style.display == "block") {
                        $(me.element).find(".floatWindow")[0].style.display = "none";
                    } else {
                        $(me.element).find(".floatWindow")[0].style.display = "block";
                    }
                }

                return;
                var num = $(this).html();

                if (me.options.callback) {
                    me.options.callback(me.options.pageNo, me.options.pageSize);
                }
            });
            me.element.on('click', 'li', function() {
                var id = $(this).context["className"];
                if (id == "floatWindowLi") {
                    me.options.pageSize = $(this).html();
                    me.element.find(".select-page-num").html(me.options.pageSize);
                    me.element.find(".partPages").html("每页<span>" + me.options.pageSize + "</span>条,");
                    me.options.pageNo = 1;
                    me.element.find(".select-input-page").val(me.options.pageNo);
                    me.options.totalPage = Math.ceil(parseInt(me.options.totalSize) / parseInt(me.options.pageSize));
                }
                if (me.options.callback) {
                    me.options.callback(me.options.pageNo, me.options.pageSize);
                }
            });
            me.element.on('keyup', 'input', function(e) {
                var id = $(this).context["className"];
                if (id == "select-input-page") {
                    if (e.keyCode == "13") {
                        var v = parseInt(me.element.find(".select-input-page").val());
                        if (isNaN(v)) {
                            alert("请输入数字");
                            return;
                        } else {
                            if (v < 1) {
                                v = 1;
                            } else if (v > me.options.totalPage) {
                                v = me.options.totalPage;
                            }
                            me.options.pageNo = v;
                            me.element.find(".select-input-page").val(me.options.pageNo);
                            if (me.options.callback) {
                                me.options.callback(me.options.pageNo, me.options.pageSize);
                            }
                        }
                    }


                    return;
                    me.options.pageSize = $(this).html();
                    me.element.find(".select-page-num").html(me.options.pageSize);
                    me.element.find(".partPages").html("每页<span>" + me.options.pageSize + "</span>条,");
                }
                //if (me.options.callback) {
                //    me.options.callback(me.options.pageNo,me.options.pageSize);
                //}
            });
            me.element.on('click', 'img', function() {
                if (!me.options.totalPage) {
                    return;
                }
                var id = $(this).context["className"];
                if (id == "prePageFF") {
                    if (me.options.pageNo == 1) {
                        return;
                    }
                    me.options.pageNo = 1;
                    me.element.find(".select-input-page").val(me.options.pageNo);
                }
                if (id == "prePageF") {
                    if (me.options.pageNo == 1) {
                        return;
                    }
                    me.options.pageNo -= 1;
                    me.element.find(".select-input-page").val(me.options.pageNo);
                }
                if (id == "prePageLL") {
                    if (me.options.pageNo == me.options.totalPage) {
                        return;
                    }
                    me.options.pageNo = me.options.totalPage;
                    me.element.find(".select-input-page").val(me.options.pageNo);
                }
                if (id == "prePageL") {
                    if (me.options.pageNo == me.options.totalPage) {
                        return;
                    }
                    me.options.pageNo += 1;
                    me.element.find(".select-input-page").val(me.options.pageNo);
                }

                if (me.options.callback) {
                    me.options.callback(me.options.pageNo, me.options.pageSize);
                }
            });
        }
    };
    $.fn.pagingTable = function(options) {
        return new Paging($(this), options);
    }
})(jQuery, window, document);
//初始化分页
(function($, window, document, undefined) {
    function Paging(element, options) {
        this.element = element;
        this.options = {
            pageNo: options.pageNo || 1,
            totalPage: options.totalPage,
            totalSize: options.totalSize,
            callback: options.callback
        };
        this.init();
    }
    Paging.prototype = {
        constructor: Paging,
        init: function() {
            this.creatHtml();
            this.bindEvent();
        },
        creatHtml: function() {
            var me = this;
            var content = "";
            var current = me.options.pageNo;
            var total = me.options.totalPage;
            var totalNum = Math.ceil(me.options.totalPage / me.options.pageNo);
            if (current == 1) {
                content += "<a class='prePage1'><</a>";
            } else {
                content += "<a class='prePage'><</a>";
            }
            if (total > 6) {
                if (current < 5) {
                    for (var i = 1; i < 6; i++) {
                        if (current == i) {
                            content += "<a class='current'>" + i + "</a>";
                        } else {
                            content += "<a>" + i + "</a>";
                        }
                    }
                    content += ". . .";
                    content += "<a>" + total + "</a>";
                } else {
                    if (current < total - 3) {
                        content += "<a>" + 1 + "</a>";
                        content += ". . .";
                        for (var i = current - 2; i < current + 3; i++) {
                            if (current == i) {
                                content += "<a class='current'>" + i + "</a>";
                            } else {
                                content += "<a>" + i + "</a>";
                            }
                        }
                        content += ". . .";
                        content += "<a>" + total + "</a>";
                    } else {
                        content += "<a>1</a>";
                        content += ". . .";
                        for (var i = total - 4; i < total + 1; i++) {
                            if (current == i) {
                                content += "<a class='current'>" + i + "</a>";
                            } else {
                                content += "<a>" + i + "</a>";
                            }
                        }
                    }
                }
            } else {
                for (var i = 1; i < total + 1; i++) {
                    if (current == i) {
                        content += "<a class='current'>" + i + "</a>";
                    } else {
                        content += "<a>" + i + "</a>";
                    }
                }
            }
            if (current == total) {
                content += "<a class='nextPage1'>></a>";
            } else {
                content += "<a class='nextPage'>></a>";
            }
            //   content += "<a class='nextPage'>></a>";
            content += "<span class='totalPages'> 共<span>" + total + "</span>页 </span>";
            content += "<span class='pageTo'>到第</span>" + "<input type='text' class='searchPage'/>" + "<span> 页 </span>";
            content += "<button class='pageSure'>确定</button>";
            //content += "<span class='totalSize'> 共<span>" + totalNum + "</span>条记录 </span>";
            me.element.html(content);
        },
        bindEvent: function() {
            var me = this;
            me.element.off('click', 'a');
            me.element.off('click', 'button');
            me.element.on('click', 'a', function(e) {
                if ($(this).hasClass("prePage1")) {
                    return;
                }
                if ($(this).hasClass("nextPage1")) {
                    return;
                }
                var num = $(this).html();
                var id = $(this).context["className"];
                if (id == "prePage") {
                    if (me.options.pageNo == 1) {
                        me.options.pageNo = 1;
                    } else {
                        me.options.pageNo = +me.options.pageNo - 1;
                    }
                } else if (id == "nextPage") {
                    if (me.options.pageNo == me.options.totalPage) {
                        me.options.pageNo = me.options.totalPage
                    } else {
                        me.options.pageNo = +me.options.pageNo + 1;
                    }
                } else if (id == "firstPage") {
                    me.options.pageNo = 1;
                } else if (id == "lastPage") {
                    me.options.pageNo = me.options.totalPage;
                } else {
                    me.options.pageNo = +num;
                }
                me.creatHtml();
                if (me.options.pageNo == 1) {
                    me.element.find(".prePage").removeClass("prePage").addClass("prePage1");
                } else {
                    me.element.find(".prePage1").removeClass("prePage1").addClass("prePage");
                }
                if (me.options.pageNo == me.options.totalPage) {
                    me.element.find(".nextPage").removeClass("nextPage").addClass("nextPage1");
                } else {
                    me.element.find(".nextPage1").removeClass("nextPage1").addClass("nextPage");
                }

                if (me.options.callback) {
                    me.options.callback(me.options.pageNo);
                }
            });
            me.element.on('click', 'button', function() {
                $searchPage = $(me.element).find(".searchPage");
                var val = $searchPage.val();
                try {
                    val = parseInt(val);
                    if (!val) {
                        $searchPage.val("");
                        return;
                    }
                } catch (e) {
                    $searchPage.val("");
                    return;
                };
                if (val > me.options.totalPage) {
                    val = me.options.totalPage;
                }
                if (val <= 0) {
                    val = 1;
                }
                me.options.pageNo = val;
                me.creatHtml();
                if (me.options.pageNo == 1) {
                    me.element.find(".prePage").removeClass("prePage").addClass("prePage1");
                } else {
                    me.element.find(".prePage1").removeClass("prePage1").addClass("prePage");
                }
                if (me.options.pageNo == me.options.totalPage) {
                    me.element.find(".nextPage").removeClass("nextPage").addClass("nextPage1");
                } else {
                    me.element.find(".nextPage1").removeClass("nextPage1").addClass("nextPage");
                }
                if (me.options.callback) {
                    me.options.callback(me.options.pageNo);
                }
            });
        }
    };
    $.fn.paging = function(options) {
        return new Paging($(this), options);
    }
})(jQuery, window, document);
/**
 * 工具
 */
var JSTOOL = function() {
    this.getMonthBefore=function(date){
        var nowdays = new Date(date);
        var year = nowdays.getFullYear();
        var month = nowdays.getMonth();
        if(month==0){
            month = 12;
            year = year-1;
        }
        if(month<10){
            month = '0'+month;
        }
        var myDate = new Date(year,month,0);
        var startDate = year+'-'+month+'-01'; // 上个月第一天
        var endDate = year+'-'+month+'-'+myDate.getDate();//上个月最后一天
        return startDate+'&&'+endDate;
    }
    /**
     * 格式化日期
     * 将000000格式化为0000-00-00
     */
    this.formatDate = function(date) {
        return date.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");
    }
    //字符串时间转时间戳用比较大小
    this.bijiaodata = function(data, data1) {
        var flag = false;
        if (this.dateTool(data) > this.dateTool(data1)) {
            flag = true;
        }
        return flag;
    }
    this.dateTool = function(date) {
            date = date.replace(/-/g, '/');
            return timestamp = new Date(date).getTime();
        }
        /**
         * 获取选择申报表的名称
         * @param {} params 
         */
    this.getSelectName = function(params, selectData) {
            var name = ""
            for (var i = 0; i < selectData.length; i++) {
                if (selectData[i].value == params) {
                    name = selectData[i].name
                    break;
                }

            }
            return name;
        }
        //table
    this.tableCreate = function(tableObj) {
        var object = {};
        var commonJson;
        var json = [];
        object.loadJson = loadJson;
        object.jsonReadyTo = jsonReadyTo;
        object.loadingHidden = loadingHidden;
        object.loadingShow = loadingShow;
        object.reSetScroll = reSetScroll;
        var tableMap = [];
        var mainId = tableObj.id;
        $(mainId + " .sortup").click(function() {
            var flag;
            if ($(this).hasClass('glyphicon-menu-up')) {
                $(this).removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
                flag = false;
            } else {
                $(this).removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up");
                flag = true
            }
            $(mainId + ' .tbody').children().remove();
            json = sortArray(json, $(this).attr("name"), flag);
            creatList();
        });

        function sortArray(arr, key, flag) {
            return arr.sort(function(a, b) {
                var x, y;
                if (!flag) {
                    y = a[key];
                    x = b[key];
                } else {
                    x = a[key];
                    y = b[key];
                }

                if (!isNaN(parseInt(x))) { //数字
                    return (x < y) ? -1 : ((x > y) ? 1 : 0);
                } else if (isNaN(x) && !isNaN(Date.parse(x))) {
                    return new Date(x).getTime() - new Date(y).getTime();
                } else {
                    return x.localeCompare(y)
                }
            })
        };

        function creatList(object) {
            if (tableObj.autoHeight) {
                if (json.length <= tableObj.autoHeight) {
                    $(mainId + " .table-responsive").css("height", json.length * 32 + 46 + "px");
                    tableObj.height = json.length * 32;
                } else {
                    tableObj.height = defauldHeight;
                    $(mainId + " .table-responsive").css("height", parseInt(defauldHeight) + 46 + "px");
                }
            }
            var num = 0;
            if (object) {
                if (object.page && object.pageSize) {
                    num = parseInt((parseInt(object.page) - 1) * parseInt(object.pageSize));
                    tableObj.data.page = object.page;
                    tableObj.data.pageSize = object.pageSize;
                } else {
                    num = parseInt((parseInt(tableObj.data.page) - 1) * parseInt(tableObj.data.pageSize));
                }
            } else {
                num = parseInt((parseInt(tableObj.data.page) - 1) * parseInt(tableObj.data.pageSize));
                if (!num) {
                    num = 0;
                }
            }
            $(mainId + ' .tbody').children().remove();
            var tr, td;
            for (var i = 0; i < json.length; i++) {
                var count = 1;
                var $tr = $("<div></div>").addClass("tr").addClass("table-tr");
                for (var key in json[i]) {
                    $td = $("<div></div>").addClass("td");
                    if (key == "do") {
                        if (tableObj.buttonControlArr) {
                            for (var m = 0, lenM = tableObj.buttonControlArr.length; m < lenM; m++) {
                                $div = $("<div></div>");
                                $div.addClass(tableObj.buttonControlArr[m].classA);
                                $div.attr("alt", commonJson[i][tableObj.onlyId]);
                                $div.addClass("btn btn-primary tdDong-btn");
                                $div.html(tableObj.buttonControlArr[m].html);
                                $td.addClass("tdDoing-contain");
                                $td.append($div);
                            }
                        } else {
                            var div = document.createElement("div");
                            $div = $(div);
                            $div.attr("alt", commonJson[i][tableObj.onlyId]);
                            $div.addClass("btn btn-primary tdDong-btn");
                            $div.html(tableObj.buttonHtml);
                            $td.addClass("tdDoing-contain");
                            $td.append(div);
                        }
                    } else {
                        $td.html(json[i][key]);
                        $td.attr("title", json[i][key]);
                    }


                    if (!$tr.html()) {
                        if (key == "checkBox") {
                            var $input = $("<input type='checkbox'/>");

                            if (callbackArr.length) {
                                for (var a = 0, alen = callbackArr.length; a < alen; a++) {
                                    if (commonJson[i][tableObj.onlyId] == callbackArr[a][tableObj.onlyId]) {
                                        $input.attr("checked", "true");
                                    }
                                }
                            }
                            $input.attr("alt", commonJson[i][tableObj.onlyId]);
                            // $input.addClass("btn btn-primar");
                            //   $input.html(tableObj.buttonHtml);
                            //      $td.addClass("tdDoing-contain");
                            $td.append($input);
                            var w = $(mainId + " .row-input")[0].style.width;
                            $td.addClass(".row-input");
                            $td.css("width", w);
                            $tr.append($td);


                            var tdNum = document.createElement('div');
                            $tdNum = $(tdNum);
                            $tdNum.addClass("row-0 td");
                            $tdNum.css("width", $(mainId + " .row-0")[0].style.width);
                            $tdNum.html(i + 1 + num);
                            $tr.append($tdNum);
                            continue;
                        }
                        var tdNum = document.createElement('div');
                        $tdNum = $(tdNum);
                        $tdNum.addClass("row-0 td");
                        $tdNum.css("width", $(mainId + " .row-0")[0].style.width);
                        $tdNum.html(i + 1 + num);
                        $tr.append($tdNum);
                    }
                    var w = $(mainId + " .row-" + count)[0].style.width;
                    $td.addClass("row-" + count);
                    $td.css("width", w);
                    $tr.append($td);
                    count++;
                }
                $(mainId + ' .tbody').append($tr);
            }

            if (!json.length) {
                if(!tableObj.promptStatement){
                    var html = "<div class='notHasList'>暂无数据</div>";
                }else{
                    var html = "<div class='notHasList'>"+tableObj.promptStatement+"</div>";
                }
                
                $(mainId + ' .tbody').append(html);
            }
            loadingHidden();
            reSetScroll();
            if (tableObj.order[0] == "checkBox") {
                initInput();
            }
        };

        function initInput() {
            $(mainId + ' .table-body-container  input[type="checkbox"],input[type="radio"]').iCheck({
                checkboxClass: 'icheckbox_square-blue',
                radioClass: 'iradio_square-blue',
                increaseArea: '20%'
            });
        }

        function reSetScroll() {
            if(tableObj.promptStatement||tableObj.jsonReady.length<1){
                tableObj.height = 75;
            }
            $(mainId + " .table-body-container").css("height", tableObj.height + "px");
            $(mainId + " .table-body-container").niceScroll(mainId + " .table-body-container .table", {
                cursoropacitymax: 0.5,
                cursorwidth: 10, //滚动条的宽度值
                //  boxzoom:false,
                autohidemode: false,
                oneaxismousemode: false,
                horizrailenabled: false
                    //boxzoom: true
            }).resize();
            //$(mainId).niceScroll( mainId+" .table-responsive",{
            //    cursoropacitymax: 0.5,
            //    cursorwidth:10,        //滚动条的宽度值
            //    boxzoom:false,
            //    autohidemode: false
            //})
        };

        function jsonReadyTo(data, object) {
            if (!data) {
                data = tableObj.jsonReady
            }
            var sum = tableObj.order;
            for (var key in json) {
                json[key] = null;
            }
            json.length = 0;
            for (var i in data) {
                var obj = {};
                tableMap[data[i][tableObj.onlyId]] = data[i];
                for (var r = 0, len = sum.length; r < len; r++) {
                    obj[sum[r]] = data[i][sum[r]];
                }
                json[i] = obj;
            }
            commonJson = data;
            //json = data;
            //     json = sortArray(json, 'name', true);
            loadingShow();
            creatList(object);
            //   json = sortArray(json, 'name', true);
        };

        function loadJson(object) {
            if (!object) {
                object = tableObj.data
            }
            var sum = tableObj.order;
            loadingShow();
            $.ajax({
                url: tableObj.url,
                type: 'get',
                async: true,

                cache: false,

                dataType: "json",
                data: object,
                success: function(data) {
                    if (data.returnCode) {
                        if (data.returnCode != "0000") {
                            alert(data.returnMsg);
                            return;
                        }
                        data = data.returnResult;
                    }
                    for (var key in json) {
                        json[key] = null;
                    }
                    json.length = 0;
                    for (var i in data) {
                        var obj = {};
                        tableMap[data[i][tableObj.onlyId]] = data[i];
                        for (var r = 0, len = sum.length; r < len; r++) {
                            obj[sum[r]] = data[i][sum[r]];
                        }
                        json[i] = obj;
                    }
                    commonJson = data;
                    //json = data;
                    //     json = sortArray(json, 'name', true);
                    creatList(object);
                },
                error: function(e) {
                    console.log('error ', e);
                }
            });
        }
        var countNum = 0;

        function createHeader(arr) {

            var $table = $("<div></div>");
            var $thead = $("<div></div>");
            var $tr = $("<div></div>");
            $table.addClass("table");
            $thead.addClass("thead");
            $tr.addClass("tr");

            for (var i = 0, len = arr.length; i < len; i++) {
                var $td = $("<div></div>");
                $td.addClass("td");
                $td.attr("title", arr[i].name);
                $td.css("width", arr[i].width);
                $tr.append($td);
                if (arr[i].name == "checkBox") {
                    var input = $("<input type='checkbox'/>").addClass("selectAll");
                    $td.addClass("row-input");
                    $td.html(input);
                    continue
                };
                $td.addClass("row-" + countNum);
                countNum++;
                $td.html(arr[i].name);
            }

            $thead.append($tr);
            $table.append($thead);
            $(mainId + " .table-header-container").append($table);
            if (tableObj.order[0] == "checkBox") {
                initSelectAll();
            }
        }

        function initSelectAll() {
            $(mainId + " .selectAll").iCheck({
                checkboxClass: 'icheckbox_square-blue selectAllInit',
                radioClass: 'iradio_square-blue',
                increaseArea: '20%'
            });
        };
        var valsArr = [];

        function selectChecked(checkFlag) {
            valsArr.length = 0;
            $(mainId + " input:checked").each(function(index, item) {
                if (!$(this).attr("alt")) {
                    return;
                }
                valsArr.push($(this).attr("alt"));
            });
            callbackCheckBox(valsArr);
            if (checkFlag) {
                flagAll = false;
            }
        }
        var callbackArr = [];

        function callbackCheckBox(arr) {
            callbackArr.length = 0;
            for (var i = 0, len = arr.length; i < len; i++) {
                callbackArr.push(tableMap[arr[i]]);
            }
            tableObj.checkBoxCallBack(callbackArr);
        }

        function init() {
            var $loading = $("<div></div>");
            $loading.addClass("table-body-loading");
            $loading.html("<div> <img src='/online_report/static/tools/images/loading.gif' alt=''/><div>");
            var html = "<div class='table-responsive'    style='width:" + tableObj.containerWidth + "'>" +
                "<div class='table-header-container' style='height:44px;'>"

            +"</div>" +
            "<div class='table-body-container'>" +
            "<div class='table' >" +
            "<div class='tbody' >"

            +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";
            $(mainId).html(html);
            $(mainId + " .table-responsive").append($loading);
            createHeader(tableObj.headerList);
            if (tableObj.jsonReady) {
                jsonReadyTo(tableObj.jsonReady);
            } else {
                loadJson();
            };
            $(window).on("resize", creatList);
        };

        function loadingHidden() {
            $(mainId + " .table-body-loading").css("display", "none");
        };

        function loadingShow() {
            $(mainId + " .table-body-loading").css("display", "block");
        };
        var defauldHeight;
        $("document").ready(function() {
            defauldHeight = tableObj.height;
            init(tableObj);




            $(mainId + ' .tbody').delegate(".tdDong-btn", "click", function() {
                tableObj.callback(tableMap[$(this).attr("alt")], $(this));
            });
            $(mainId + " .tdDong-btn").css("width", tableObj.buttonHeight + "px");
            $(mainId + ' .tbody').delegate(".table-tr", "click", function() {
                $(mainId + ' .tbody .select-tr').removeClass("select-tr");
                $(this).addClass("select-tr");
            })
            if (tableObj.order[0] == "checkBox") {
                $(mainId + ' .tbody').delegate(".icheckbox_square-blue", "ifChecked", function() {
                    if (flagAll) {
                        return;
                    }
                    selectChecked();
                })
                $(mainId + ' .tbody').delegate(".icheckbox_square-blue", "ifUnchecked", function() {
                    if (flagAll) {
                        return;
                    }
                    selectChecked();
                })
                flagAll = false;
                $(mainId).delegate(".selectAllInit", "ifChecked", function() {
                    flagAll = true;
                    $(mainId + ' .tbody  input[type="checkbox"]').iCheck('check');
                    selectChecked(flagAll);
                })
                $(mainId).delegate(".selectAllInit", "ifUnchecked", function() {
                    flagAll = true;
                    $(mainId + ' .tbody  input[type="checkbox"]').iCheck('uncheck');
                    selectChecked(flagAll);
                })
            }

        });

        return object;

    }


    //字符串时间转时间戳用比较大小
    this.dateTool = function(date) {
        date = date.replace(/-/g, '/');
        return timestamp = new Date(date).getTime();
    }

}
var tool = new JSTOOL();

//下拉选择
(function($, window, document, undefined) {
    $.fn.extend({
        select: function(options) {
            var defaults = {
                width: "auto",
                minWidth: "none",
                lineHeight: "17px",
                opacity: true,
                mainBgColor: "",
                searchBgColor: "#fff",
                listBgColor: "#fff",
                listMaxHeight: "200px",
                themeColor: "#00bb9c",
                fontColor: "#000",
                fontFamily: "'Helvetica Neue', arial, sans-serif",
                fontSize: "15px",
                showSearch: false,
                rowHoverColor: "#00bb9c",
                fontHoverColor: "#fff",
                mainContent: "请选择",
                searchContent: "请输入内容",
                callBack: function() {}
            }
            var opts = $.extend(defaults, options);
            $.each(opts, function(index, element) {
                if (typeof(element) == "string")
                    opts[index] = element.toString().replace(/\s/g, "");
            });
            var $this = this;
            if (!$this.attr("state"))
                $this.attr("state", "done");
            else
                return $this;

            function randomString(len) {
                len = len || 32;
                var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
                var maxPos = $chars.length;
                var pwd = '';
                for (i = 0; i < len; i++) {
                    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
                }
                return pwd;
            }

            var randomSign = randomString();
            $this.hide();
            $this.after('\
                    <div class="select_container_nw" sign=' + randomSign + ' tabindex="0" val="" text="" style="z-index:9999;margin-left: 20px;">\
                        <div class="select_main">\
                           <span class="select_content" style="color:#ddd">' + opts.mainContent + '</span>\
                           <span class="select_arrow">\
                              <i class="iconfont" style="font-size:8px;' + opts.themeColor + ';">&#xe654;</i>\
                           </span>\
                           <div class="unable" style="position:absolute;width:100%;height:100%;left:0px;top:0px;z-index:99999;display:none;"></div>\
                        </div>\
                        <div class="select_list">\
                            <div class="select_list_search">\
                               <input type="text" class="select_input" placeholder=' + opts.searchContent + ' />\
                               <i class="iconfont search_svg" style="font-size:0;background:#fafafa;color:' + opts.themeColor + ';">&#xe639;</i>\
                            </div>\
                            <div class="select_list_body">\
                                <ul class="select_list_ul">\
                                        <li class="no_result">没有结果 </li>\
                                </ul>\
                            </div>\
                        </div>\
                    </div>');
            var $This = $this.next();
            $this.find("option").each(function(index, element) {
                var $li = $('<li val=' + $(element).val() + ' title=' + $(element).text() + ' >' + $(element).text() + '</li>');
                if ($(element).prop("selected") && !!$(element).attr("selected")) {
                    $li.addClass("list_current_sign");
                    $This.find(".select_content").text($(element).text());
                    $This.find(".select_content").attr("title", $(element).text());
                    $This.attr({ "val": $(element).val(), "text": $(element).text() });
                }
                $This.find(".no_result").before($li);
            });
            if (opts.width != "" && opts.width != "auto")
                $This.css("width", opts.width);
            if (opts.lineHeight != "" && parseInt(opts.lineHeight) > 17)
                $This.css("line-height", opts.lineHeight);
            if (opts.listMaxHeight != "" && opts.listMaxHeight != "200px")
                $This.find(".select_list_body").css("max-height", opts.listMaxHeight);
            if (typeof(opts.showSearch) == "boolean" && !opts.showSearch)
                $This.find(".select_list_search").hide();
            if (opts.fontColor != "") {
                $This.find(".select_content,.select_input,li").css("color", opts.fontColor);
                $This.find(".select_content").css("color", "#ddd");

                $This.find("li").hover(function() {
                    $(this).css({ "color": opts.fontHoverColor });
                }, function() {
                    $(this).css({ "color": opts.fontColor });
                });
            }
            if (opts.fontFamily != "" && opts.fontFamily != "'Helvetica Neue', arial, sans-serif")
                $This.find(".select_content,.select_input,li").css("font-family", opts.fontFamily);
            if (opts.listBgColor != "" && opts.listBgColor != "#fff") {
                $This.find(".select_list,.select_input").css("background-color", opts.listBgColor);
            }
            if (opts.rowHoverColor != "") {
                $This.find("li").hover(function() {
                    $(this).css({ "background-color": opts.rowHoverColor });
                }, function() {
                    $(this).css({ "background-color": opts.opacity ? "transparent" : opts.listBgColor });
                });
            }
            if (typeof(opts.opacity) == "boolean" && opts.opacity) {
                $This.find(".select_list,.select_input").css("background-color", "transparent");
                $This.find("li").css("background-color", "transparent");
            } else if (typeof(opts.opacity) == "boolean" && !opts.opacity) {
                if (opts.mainBgColor != "")
                    $This.find(".select_main").css("background-color", opts.mainBgColor);
                if (opts.searchBgColor != "#fff")
                    $This.find(".select_input").css("background-color", opts.searchBgColor);
                if (opts.listBgColor != "#fff")
                    $This.find(".select_list_ul li").css("background-color", opts.listBgColor);
            }
            if (opts.fontSize != "" && opts.fontSize != "15px")
                $This.find(".select_content,.select_input,li").css("font-size", opts.fontSize);
            if (opts.width == "auto") {
                $This.css("width", ($This.find(".select_list_ul").width() + 35) + "px");
                if (opts.minWidth != "" && opts != "none" && $This.width() < parseInt(opts.minWidth))
                    $This.css("width", opts.minWidth);
            }
            $This.find(".select_list").hide();
            var gap = 1;
            do {
                $This.find(".select_arrow").find("i").css("font-size", gap + "px");
                gap++;
            }
            while ($This.find(".select_arrow").find("i").height() < $This.find(".select_main").height() - 6);
            $This.find(".select_arrow").css({
                "display": "block",
                "height": $This.find(".select_arrow").find("i").height() + "px",
                "padding": ($This.find(".select_main").height() - $This.find(".select_arrow").find("i").height()) / 2 + "px 0px",
                "line-height": $This.find(".select_arrow").find("i").height() + 2 + "px"
            });
            if (typeof(opts.showSearch) == "boolean" && opts.showSearch) {
                if (opts.width == "auto")
                    $This.find(".select_list_search").css("width", $This.width());
                $This.find(".select_input").css("height", ($This.find(".select_main").height() - 3) + "px");
                $This.find(".search_svg").css({
                    "top": parseInt(($This.find(".select_main").height() - $This.find(".select_arrow").find("i").height()) / 2 - 2) + "px",
                    "font-size": "0px",
                    "line-height": $This.find(".select_input").height() + "px"
                });
            }
            $This.find(".list_current_sign").addClass("list_current");
            var list_height = $This.find(".select_list").height();
            var allowClick = true;

            function Search(self) {
                $This.find(".select_content").css("color", "#333");
                var isAllHide = true;
                $This.find(".select_list_ul li").not(".no_result").each(function(index, element) {
                    if ($(element).text().indexOf($(self).val()) == -1)
                        $(element).hide();
                    //else if ($(element).hasClass("list_current"))
                    //    $(element).hide();
                    else {
                        isAllHide = false;
                        $(element).show();
                    }
                });
                if (isAllHide)
                    $This.find(".select_list_ul .no_result").show();
                else
                    $This.find(".select_list_ul .no_result").hide();
                $This.find(".select_list").css("height", "auto");
                list_height = $This.find(".select_list").height();
            }

            if (opts.width.indexOf("%") != -1) {
                $This.find(".select_main").css("width", "100%");
                $This.find(".select_list").css("width", "100%");
            }
            if (typeof(opts.showSearch) == "boolean" && opts.showSearch)
                $This.find(".select_input").css({ "width": ($This.find(".select_main").width() - 41) + "px" });
            $This.find(".select_arrow,.select_content").click(function() {
                if (allowClick)
                    allowClick = false;
                else
                    return;
                $This.find(".select_arrow").toggleClass("cast_rotate");
                if ($This.find(".select_list").hasClass("list_open")) {
                    $This.find(".select_list").removeClass("list_open").animate({ "height": "0px" }, 200, function() {
                        $This.find(".select_list").hide();
                        allowClick = true;
                    });
                } else
                    $This.find(".select_list").addClass("list_open").css({ "height": "0px" }).show().animate({ "height": list_height + "px" }, 200, function() {
                        allowClick = true;
                    });
            });
            $This.find(".select_content").css({ "width": ($This.width() - 40) + "px" });
            $This.find(".select_list_body").delegate("li", "click", function(event) {
                if ($(this).hasClass("no_result")) {
                    return;
                }
                $This.find(".select_list_body li").removeClass("list_current").show();
                $(this).addClass("list_current").hide();
                Search($This.find(".select_input"));
                $This.find(".select_content").text($(this).text());
                $This.find(".select_content").attr("title", $(this).text());
                $This.attr({ "val": $(this).attr("val") == null ? '' : $(this).attr("val"), "text": $(this).text() });
                $this.val($(this).attr("val"));
                list_height = $This.find(".select_list").height();
                $This.find(".select_content").trigger("click");
                opts.callBack();
                event = event ? event : window.event;
                event.stopPropagation();
            });
            $(document).click(function(event) {
                if ($This.find(".select_list").hasClass("list_open") && ($(event.target).closest(".select_container_nw").length == 0 || $(event.target).closest(".select_container_nw").attr("sign") != randomSign)) {
                    $This.find(".select_content").trigger("click");
                }
            });
            $This.find(".select_input").on("keyup", function(event) {
                Search(this);
                event = event ? event : window.event;
                event.stopPropagation();
            });
            $This.find(".select_input").on("propertychange", function(event) {
                if ($(this).val().length <= 0)
                    Search(this);
                event = event ? event : window.event;
                event.stopPropagation();
            });
            $This.find(".select_list_body").mCustomScrollbar({
                theme: "minimal",
                advanced: { autoExpandHorizontalScroll: true }
            });
            $This.find(".select_list_body .mCSB_dragger_bar").css({ "background-color": "#00bb9c" });
            if (opts.themeColor != "" && opts.themeColor != "#00bb9c") {
                $This.find(".select_main,.select_input,.select_list").css("border-color", opts.themeColor);
                $This.find(".select_list_body .mCSB_dragger_bar").css({ "background-color": "#d8d8d8" });
                $This.find(".select_list_body .mCSB_dragger_bar").css({ "margin-right": "4px" });
            }
            $this.IsOnUse = function(boolParam) {
                if (boolParam)
                    $This.find(".unable").hide();
                else
                    $This.find(".unable").show();
            }
            $this.IsDone = function() {
                return true;
            }
            return $this;
        }
    });
})(jQuery, window, document)