/******************************初始化变量**************************/




/*   旋转按钮变量*/
var g_knobImgFlag=-1;
var g_knobArr = ['img/but_1.bmp','img/but_2.bmp','img/but_3.bmp','img/but_4.bmp'];
//按钮的两种颜色  蓝色 红色
var arr3 = new Array("transparent","#fd7b24de");
var but_color_bule="#1723c9";
//按钮的两种颜色  蓝色  黄色  绿色 红色
var arr4 = new Array("transparent","#fd7b24de","#2dc309","#ec0a0ac9");

/******************************初始化函数**************************/

/* 禁止右键菜单*/
 document.oncontextmenu = function(){
     event.returnValue = false;
 }
 //禁止F12
document.addEventListener('keydown', function(event){
    return !(
        112 == event.keyCode || //F1
        123 == event.keyCode || //F12
		122 == event.keyCode ||
        event.ctrlKey && 82 == event.keyCode || //ctrl + R
        event.ctrlKey && 78 == event.keyCode || //ctrl + N
        event.shiftKey && 121 == event.keyCode || //shift + F10
        event.altKey && 115 == event.keyCode || //alt + F4
        "A" == event.srcElement.tagName && event.shiftKey //shift + 点击a标签
    ) || (event.returnValue = false)
});
