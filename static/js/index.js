/**
 * Created by Administrator on 2017/8/9.
 */
  // 轮播图
  $(function(){ //页面加载完毕才执行
    //=========设置参数==========
    //图片统一高度：
    var images_height = '420px';
    //图片路径/链接(数组形式):
    var images_url = [
      '../image/banner1.jpg',
      '../image/banner2.jpg',
      '../image/banner3.jpg'
    ];
    var images_count = images_url.length;
    //创建节点
    //图片列表节点
    for(var j=0;j<images_count+1;j++){
      $('.full-banner ul').append('<li></li>')
    }
    //轮播圆点按钮节点
    for(var j=0;j<images_count;j++){
      if(j==0){
        $('.full-banner ol').append('<li class="current"></li>')
      }else{
        $('.full-banner ol').append('<li></li>')
      }
    }
    //载入图片
    $('.full-banner ul li').css('background-image','url('+images_url[0]+')');
    $.each(images_url,function(key,value){
      $('.full-banner ul li').eq(key).css('background-image','url('+value+')');
    });

    $('.full-banner').css('height',images_height);

    $('.full-banner ul').css('width',(images_count+1)*100+'%');

    $('.full-banner ol').css('width',images_count*27+'px');
    $('.full-banner ol').css('margin-left',-images_count*20*0.5-10+'px');
    var num = 0;
    //获取窗口宽度
    var window_width = $(window).width();
    $(window).resize(function(){
      window_width = $(window).width();
      $('.full-banner ul li').css({width:window_width});
      clearInterval(timer);
      nextPlay();
      timer = setInterval(nextPlay,2000);
    });
    $('.full-banner ul li').width(window_width);
    //轮播圆点
    $('.full-banner ol li').mouseover(function(){//用hover的话会有两个事件(鼠标进入和离开)
      $(this).addClass('current').siblings().removeClass('current');
      //获取当前编号
      var i = $(this).index();
      $('.full-banner ul').stop().animate({left:-i*window_width},500);
      num = i;
    });
    //自动播放
    var timer = null;
    function prevPlay(){
      num--;
      if(num<0){
        //悄悄把图片跳到最后一张图(复制页,与第一张图相同),然后做出图片播放动画，left参数是定位而不是移动的长度
        $('.full-banner ul').css({left:-window_width*images_count}).stop().animate({left:-window_width*(images_count-1)},3000);
        num=images_count-1;
      }else{
        $('.full-banner ul').stop().animate({left:-num*window_width},500);
      }
      if(num==images_count-1){
        $('.full-banner ol li').eq(images_count-1).addClass('current').siblings().removeClass('current');
      }else{
        $('.full-banner ol li').eq(num).addClass('current').siblings().removeClass('current');
      }
    }
    function nextPlay(){
      num++;
      if(num>images_count){
        //播放到最后一张(复制页)后,悄悄地把图片跳到第一张,因为和第一张相同,所以难以发觉,
        $('.full-banner ul').css({left:0}).stop().animate({left:-window_width},500);
        //css({left:0})是直接悄悄改变位置，animate({left:-window_width},500)是做出移动动画
        //随后要把指针指向第二张图片,表示已经播放至第二张了。
        num=1;
      }else{
        //在最后面加入一张和第一张相同的图片，如果播放到最后一张，继续往下播，悄悄回到第一张(肉眼看不见)，从第一张播放到第二张
        $('.full-banner ul').stop().animate({left:-num*window_width},500);
      }
      if(num==images_count){
        $('.full-banner ol li').eq(0).addClass('current').siblings().removeClass('current');
      }else{
        $('.full-banner ol li').eq(num).addClass('current').siblings().removeClass('current');
      }
    }
    timer = setInterval(nextPlay,2000);
    //鼠标经过banner，停止定时器,离开则继续播放
    $('.full-banner').mouseenter(function(){
      clearInterval(timer);
    }).mouseleave(function(){
      timer = setInterval(nextPlay,2000);
    });
    //播放下一张
    $('.full-banner .right').click(function(){
      nextPlay();
    });
    //返回上一张
    $('.full-banner .left').click(function(){
      prevPlay();
    });
  });
