$(function () {
   /*轮播图*/
   banner();
   /*初始页签*/
   initTabs();
   /*初始化工具提示*/
    $('[data-toggle="tooltip"]').tooltip();
});
var banner = function () {
    /*
     * 1.准备数据    图片地址数据  [{pc:'',m:''},{},{},{}]
     * 2.判断当前设备    根据窗口的宽度   768px  移动端
     * 3.根据设备和数据 生成html格式的代码
     * 4.把html格式的代码  追加到对应的容器   渲染
     *
     * 5.为了去测试  当页面尺寸发生改变  重新渲染页面
     *
     * 6.移动端  手势切换  调用插件方法 上一张 下一张
     * */

    /*1.准备数据    图片地址数据  [{pc:'',m:''},{},{},{}]*/
    var data = [
        {
            pcUrl:'images/slide_01_2000x410.jpg',
            mUrl:'images/slide_01_640x340.jpg'
        },
        {
            pcUrl:'images/slide_02_2000x410.jpg',
            mUrl:'images/slide_02_640x340.jpg'
        },
        {
            pcUrl:'images/slide_03_2000x410.jpg',
            mUrl:'images/slide_03_640x340.jpg'
        },
        {
            pcUrl:'images/slide_04_2000x410.jpg',
            mUrl:'images/slide_04_640x340.jpg'
        }
    ]

    var render = function () {
        /*2.判断当前设备    根据窗口的宽度   768px  移动端*/
        /*var width = $(window).width();
         var isMobile = false;
         if(width < 768){
         isMobile = true;
         }*/
        var isMobile = $(window).width() < 768 ? true :false;
        /*3.根据设备和数据 生成html格式的代码*/
        /*分析需要动态渲染的内容  点容器  图片容器 */
        var pointHtml = '';
        var imageHtml = '';
        /*数组 对象 jquery对象   $('xxx').each(); jquery对象 调用*/
        $.each(data,function (i,item) {
            pointHtml += ' <li '+(i==0?'class="active"':'')+' data-target="#carousel-example-generic" data-slide-to="'+i+'"></li>';
            imageHtml += '<div class="item '+(i==0?'active':'')+'" >';
            /*按需加载*/
            if(isMobile){
                imageHtml += '<a href="#" class="m_imgBox"><img src="'+item.mUrl+'"></a>';
            } else {
                imageHtml += '<a href="#" class="pc_imgBox" style="background-image: url('+item.pcUrl+')"></a>';
            }
            imageHtml += '</div>';
        });
        //console.log(pointHtml);
        //console.log(imageHtml);
        /*4.把html格式的代码  追加到对应的容器   渲染*/
        $('.carousel-indicators').html(pointHtml);
        $('.carousel-inner').html(imageHtml);
    }
    /*render();*/

    /*5.为了去测试  当页面尺寸发生改变  重新渲染页面*/
    $(window).on('resize',function () {
        render();
        /*trigger('事件')  主动触发某一个事件 */
    }).trigger('resize');

    /*6.移动端  手势切换  调用插件方法 上一张 下一张*/
    var startX = 0;
    var distance = 0;
    var isMove = false;
    $('.wjs_banner').on('touchstart',function (e) {
        /*注意：jquery  originalEvent 记录 原生js事件对象 */
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove',function (e) {
        var moveX = e.originalEvent.touches[0].clientX;
        distance = moveX - startX;
        isMove = true;
    }).on('touchend',function (e) {
        if(isMove && Math.abs(distance) > 50){
            /*手势*/
            if(distance > 0){
                /*右滑  上一张*/
                console.log('prev');
                $('.carousel').carousel('prev');
            }
            else {
                /*左滑  下一张*/
                console.log('next');
                $('.carousel').carousel('next');
            }
        }
    });
};

var initTabs = function () {
    /*
    * 1.保证区域滚动结构
    * 2.保证能放下所有标签  获取所有的标签li的宽度之后给ul父容器
    * 3.初始化区域滚动
    * */
    /*这是一个jquery对象*/
    var $parent = $('.nav-tabs-parent');
    var $child = $parent.children('ul');
    var $lis = $child.find('li');

    var width = 0;
    $lis.each(function (i,item) {
        /*
        * width()   获取宽度   内容
        * innerWidth() 获取宽度   内容+内边距
        * outerWidth() 获取宽度  内容+内边距+边框
        * outerWidth(true)获取宽度  内容+内边距+边框+外边距
        * */
        width += $(item).outerWidth(true);
    });
    $child.width(width);

    /*使用iscroll插件*/
    new IScroll('.nav-tabs-parent',{
        scrollX:true,
        scrollY:false
    });

}