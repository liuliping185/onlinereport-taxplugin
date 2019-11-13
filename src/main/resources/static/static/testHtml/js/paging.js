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
            var totalNum = Math.ceil(me.options.totalPage/me.options.pageNo);
            if (current == 1) {
                content += "<a class='prePage1'><</a>";
            }else{
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
            }else{
                content += "<a class='nextPage'>></a>";
            }
         //   content += "<a class='nextPage'>></a>";
            content += "<span class='totalPages'> 共<span>" + total + "</span>页 </span>";
            content += "<span class='pageTo'>到第</span>" + "<input type='text' class='searchPage'/>"+ "<span> 页 </span>";
            content += "<button class='pageSure'>确定</button>";
            //content += "<span class='totalSize'> 共<span>" + totalNum + "</span>条记录 </span>";
            me.element.html(content);
        },
        bindEvent: function() {
            var me = this;
            me.element.off('click', 'a');
            me.element.off('click', 'button');
            me.element.on('click', 'a', function(e) {
                    if($(this).hasClass("prePage1")){
                        return;
                    }
                    if($(this).hasClass("nextPage1")){
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
                    }else{
                        me.element.find(".prePage1").removeClass("prePage1").addClass("prePage");
                    }
                    if (me.options.pageNo ==  me.options.totalPage) {
                        me.element.find(".nextPage").removeClass("nextPage").addClass("nextPage1");
                    }else{
                        me.element.find(".nextPage1").removeClass("nextPage1").addClass("nextPage");
                    }

                if (me.options.callback) {
                        me.options.callback(me.options.pageNo);
                    }
                });
            me.element.on('click', 'button', function() {
                $searchPage =  $(me.element).find(".searchPage");
                var val =   $searchPage.val();
                try{
                    val = parseInt(val);
                    if(!val){
                        $searchPage.val("");
                       return;
                    }
                }catch(e){
                    $searchPage.val("");
                          return;
                };
                if(val > me.options.totalPage){
                   val = me.options.totalPage;
                }
                if(val<= 0){
                    val = 1;
                }
                me.options.pageNo = val;
                me.creatHtml();
                if (me.options.pageNo == 1) {
                    me.element.find(".prePage").removeClass("prePage").addClass("prePage1");
                }else{
                    me.element.find(".prePage1").removeClass("prePage1").addClass("prePage");
                }
                if (me.options.pageNo ==  me.options.totalPage) {
                    me.element.find(".nextPage").removeClass("nextPage").addClass("nextPage1");
                }else{
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