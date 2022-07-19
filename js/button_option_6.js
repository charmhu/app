const {remote, clipboard, ipcRenderer } = require('electron');

var send_data_udp={"id":"6","TUG":"*,*,*,*,*"}; 
//创建一个数组 用来记录哪个方向的拖轮正在被使用,名字 马力 速度 方向 数值 是否被yes过
var tug_which=[[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"]];
var temp_tug=-1;
//当2号拖轮工作 其他不允许操作
var tug_option=0;
var tug_image=new Array('url(img/seven/tug90-red.png)','url(img/seven/tug75-red.png)','url(img/seven/tug60-red.png)','url(img/seven/tug45-red.png)','url(img/seven/tug30-red.png)','url(img/seven/tug15-red.png)','url(img/seven/tug01.png)','url(img/seven/tug15-green.png)','url(img/seven/tug30-green.png)','url(img/seven/tug45-green.png)','url(img/seven/tug60-green.png)','url(img/seven/tug75-green.png)','url(img/seven/tug90-green.png)');
 var tug_image_data=6;
var flage_tug=-1;
var flage_ALG=0;
var diroperation = 0;


function SevenStruct(){};
var sevenstruct = new SevenStruct();
   sevenstruct.tug_1=0;
   sevenstruct.tug_3=0;
	sevenstruct.tug_2=0;
	sevenstruct.force=0000;
	sevenstruct.hp_flag=0;
	sevenstruct.tug_4=0;


	function init(){
		send_data_udp={"id":"6","TUG":"*,*,*,*,*"}; 
		sevenstruct.tug_1=0;
		sevenstruct.tug_3=0;
			sevenstruct.tug_2=0;
			sevenstruct.force=0000;
			sevenstruct.hp_flag=0;
			sevenstruct.tug_4=0;
			
			tug_which=[[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"]];
			temp_tug=-1;
			//当2号拖轮工作 其他不允许操作
			tug_option=0;
			tug_image=new Array('url(img/seven/tug90-red.png)','url(img/seven/tug75-red.png)','url(img/seven/tug60-red.png)','url(img/seven/tug45-red.png)','url(img/seven/tug30-red.png)','url(img/seven/tug15-red.png)','url(img/seven/tug01.png)','url(img/seven/tug15-green.png)','url(img/seven/tug30-green.png)','url(img/seven/tug45-green.png)','url(img/seven/tug60-green.png)','url(img/seven/tug75-green.png)','url(img/seven/tug90-green.png)');
			tug_image_data=6;
			flage_tug=-1;
			flage_ALG=0;
			diroperation=0;
	}
	
ipcRenderer.on('message-from-main', (event, arg) => {
		
   console.log("message from main");
   
   
   
var obj=JSON.parse(arg);


 if (obj.WH == "100")
   {
   		  window.location.reload();
		  init();
		  send_data_udp.TUG=temp_str;
		  ipcRenderer.send('megfromwhere', {
		  	 send_data_udp
		  	})
   }
   
   
var show_tug=obj.Tug.split(",");
if(show_tug[0]!="99"){
tug_which[parseInt(show_tug[0])][4]=show_tug[1];
}

show_tug=null;
if(flage_ALG==1){
tug_which=[[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"]];
}
	
  })








$("#tug_0").click(function() {
flage_ALG=0;
	flage_tug=1;
	switch(temp_tug) {
		case -1:
		
			$("#tug_0").css("background-color", arr4[2]);
			allopen(1);
			 $("#hp1800").css("background-color", arr4[2]);
			  $("#tug_stop").css("background-color", arr4[3]);
			 temp_tug=0;
		      tug_which[0][0]="0";
			checkdir();
			
			break;
		default:
		    		if(tug_which[temp_tug][5]=="1"){
				$("#tug_"+temp_tug).css("background-color", arr4[3]);
				}else if(tug_which[temp_tug][5]=="0"){
				$("#tug_"+temp_tug).css("background-color", arr4[1]);	
				}
			temp_tug=0;
			checkdir();
		$("#tug_"+temp_tug).css("background-color", arr4[2]);	
			//且需要将显示信息显示上去
			allopen(1);
			 tug_which[0][0]="0";
			show_tug(temp_tug);
			break;
	}

});
$("#tug_1").click(function() {
flage_tug=1;
	flage_ALG=0;
	switch(temp_tug) {
		case -1:
		
			$("#tug_1").css("background-color", arr4[2]);
			allopen(1);
			 $("#hp1800").css("background-color", arr4[2]);
			  $("#tug_stop").css("background-color", arr4[3]);
			 temp_tug=1;
		tug_which[1][0]="1";
			checkdir();
			
			break;
		default:
		    		if(tug_which[temp_tug][5]=="1"){
				$("#tug_"+temp_tug).css("background-color", arr4[3]);
				}else if(tug_which[temp_tug][5]=="0"){
				$("#tug_"+temp_tug).css("background-color", arr4[1]);	
				}
			temp_tug=1;
		$("#tug_"+temp_tug).css("background-color", arr4[2]);	
			//且需要将显示信息显示上去
			checkdir();
			allopen(1);
			 tug_which[1][0]="1";
			show_tug(temp_tug);
			break;
	}

});
$("#tug_2").click(function() {
flage_ALG=0;
	flage_tug=1;
	switch(temp_tug) {
		case -1:
		
			$("#tug_2").css("background-color", arr4[2]);
			allopen(1);
			 $("#hp1800").css("background-color", arr4[2]);
			 $("#tug_stop").css("background-color", arr4[3]);
			 temp_tug=2;
		tug_which[2][0]="2";
			
			checkdir();
			break;
		default:
		    		if(tug_which[temp_tug][5]=="1"){
				$("#tug_"+temp_tug).css("background-color", arr4[3]);
				}else if(tug_which[temp_tug][5]=="0"){
				$("#tug_"+temp_tug).css("background-color", arr4[1]);	
				}
			temp_tug=2;
		$("#tug_"+temp_tug).css("background-color", arr4[2]);	
		checkdir();
			//且需要将显示信息显示上去
			allopen(1);
			 tug_which[2][0]="2";
			show_tug(temp_tug);
			break;
	}

});
$("#tug_3").click(function() {
flage_tug=1;
	flage_ALG=0;
	switch(temp_tug) {
		case -1:
		
			$("#tug_3").css("background-color", arr4[2]);
			allopen(1);
			 $("#hp1800").css("background-color", arr4[2]);
			  $("#tug_stop").css("background-color", arr4[3]);
			 temp_tug=3;
		 tug_which[3][0]="3";
			checkdir();
			
			break;
		default:
		    		if(tug_which[temp_tug][5]=="1"){
				$("#tug_"+temp_tug).css("background-color", arr4[3]);
				}else if(tug_which[temp_tug][5]=="0"){
				$("#tug_"+temp_tug).css("background-color", arr4[1]);	
				}
			temp_tug=3;
		$("#tug_"+temp_tug).css("background-color", arr4[2]);	
		checkdir();
			//且需要将显示信息显示上去
			allopen(1);
			 tug_which[3][0]="3";
			show_tug(temp_tug);
			break;
	}

});

$("#tug_4").click(function() {
flage_tug=1;
	flage_ALG=0;
	switch(temp_tug) {
		case -1:
		
			$("#tug_4").css("background-color", arr4[2]);
			allopen(1);
			 $("#hp1800").css("background-color", arr4[2]);
			  $("#tug_stop").css("background-color", arr4[3]);
			 temp_tug=4;
		 tug_which[4][0]="4";
			checkdir();
			
			break;
		default:
		    		if(tug_which[temp_tug][5]=="1"){
				$("#tug_"+temp_tug).css("background-color", arr4[3]);
				}else if(tug_which[temp_tug][5]=="0"){
				$("#tug_"+temp_tug).css("background-color", arr4[1]);	
				}
			temp_tug=4;
		$("#tug_"+temp_tug).css("background-color", arr4[2]);	
		checkdir();
			//且需要将显示信息显示上去
			allopen(1);
			 tug_which[4][0]="4";
			show_tug(temp_tug);
			break;
	}

});



$("#tug_5").click(function() {
flage_ALG=0;
	flage_tug=1;
	switch(temp_tug) {
		case -1:
		
			$("#tug_5").css("background-color", arr4[2]);
			allopen(1);
			 $("#hp1800").css("background-color", arr4[2]);
			 $("#tug_stop").css("background-color", arr4[3]);
			 temp_tug=5;
		tug_which[5][0]="5";
			checkdir();
			
			break;
		default:
		    		if(tug_which[temp_tug][5]=="1"){
				$("#tug_"+temp_tug).css("background-color", arr4[3]);
				}else if(tug_which[temp_tug][5]=="0"){
				$("#tug_"+temp_tug).css("background-color", arr4[1]);	
				}
			temp_tug=5;
		$("#tug_"+temp_tug).css("background-color", arr4[2]);	
		checkdir();
			//且需要将显示信息显示上去
			allopen(1);
			 tug_which[5][0]="5";
			show_tug(temp_tug);
			break;
	}

});
$("#tug_6").click(function() {
flage_ALG=0;
	flage_tug=1;
	switch(temp_tug) {
		case -1:
		
			$("#tug_6").css("background-color", arr4[2]);
			allopen(1);
			 $("#hp1800").css("background-color", arr4[2]);
			  $("#tug_stop").css("background-color", arr4[3]);
			 temp_tug=6;
		 tug_which[6][0]="6";
			
			checkdir();
			break;
		default:
		    		if(tug_which[temp_tug][5]=="1"){
				$("#tug_"+temp_tug).css("background-color", arr4[3]);
				}else if(tug_which[temp_tug][5]=="0"){
				$("#tug_"+temp_tug).css("background-color", arr4[1]);	
				}
			temp_tug=6;
		$("#tug_"+temp_tug).css("background-color", arr4[2]);	
		checkdir();
			//且需要将显示信息显示上去
			allopen(1);
			 tug_which[6][0]="6";
			show_tug(temp_tug);
			break;
	}

});
$("#tug_7").click(function() {
flage_tug=1;
	flage_ALG=0;
	switch(temp_tug) {
		case -1:
		
			$("#tug_7").css("background-color", arr4[2]);
			allopen(1);
			 $("#hp1800").css("background-color", arr4[2]);
			  $("#tug_stop").css("background-color", arr4[3]);
			 temp_tug=7;
		
			 tug_which[7][0]="7";
			checkdir();
			break;
		default:
		    		if(tug_which[temp_tug][5]=="1"){
				$("#tug_"+temp_tug).css("background-color", arr4[3]);
				}else if(tug_which[temp_tug][5]=="0"){
				$("#tug_"+temp_tug).css("background-color", arr4[1]);	
				}
			temp_tug=7;
		$("#tug_"+temp_tug).css("background-color", arr4[2]);	
		checkdir();
			//且需要将显示信息显示上去
			allopen(1);
			 tug_which[7][0]="7";
			show_tug(temp_tug);
			break;
	}

});
$("#tug_8").click(function() {
flage_ALG=0;
	flage_tug=1;
	switch(temp_tug) {
		case -1:
		
			$("#tug_8").css("background-color", arr4[2]);
			allopen(1);
			 $("#hp1800").css("background-color", arr4[2]);
			 $("#tug_stop").css("background-color", arr4[3]);
			 temp_tug=8;
		 tug_which[8][0]="8";
			checkdir();
			
			break;
		default:
		    		if(tug_which[temp_tug][5]=="1"){
				$("#tug_"+temp_tug).css("background-color", arr4[3]);
				}else if(tug_which[temp_tug][5]=="0"){
				$("#tug_"+temp_tug).css("background-color", arr4[1]);	
				}
			temp_tug=8;
		$("#tug_"+temp_tug).css("background-color", arr4[2]);	
		checkdir();
			//且需要将显示信息显示上去
			allopen(1);
			 tug_which[8][0]="8";
			show_tug(temp_tug);
			break;
	}

});
$("#tug_9").click(function() {
flage_ALG=0;
	flage_tug=1;
	switch(temp_tug) {
		case -1:
		
			$("#tug_9").css("background-color", arr4[2]);
			allopen(1);
			 $("#hp1800").css("background-color", arr4[2]);
			  $("#tug_stop").css("background-color", arr4[3]);
			 temp_tug=9;
		tug_which[9][0]="9";
			checkdir();
			
			break;
		default:
		    		if(tug_which[temp_tug][5]=="1"){
				$("#tug_"+temp_tug).css("background-color", arr4[3]);
				}else if(tug_which[temp_tug][5]=="0"){
				$("#tug_"+temp_tug).css("background-color", arr4[1]);	
				}
			temp_tug=9;
		$("#tug_"+temp_tug).css("background-color", arr4[2]);	
		checkdir();
			//且需要将显示信息显示上去
			allopen(1);
			 tug_which[9][0]="9";
			show_tug(temp_tug);
			break;
	}

});
$("#tug_10").click(function() {

flage_tug=1;
	flage_ALG=0;
	switch(temp_tug) {
		case -1:
	
			$("#tug_10").css("background-color", arr4[2]);
			allopen(1);
			$("#hp1800").css("background-color", arr4[2]);
				
			 $("#tug_stop").css("background-color", arr4[3]);
			
		temp_tug=10;
		tug_which[10][0]="10";
		checkdir();
			break;
		
		default:
		if(tug_which[temp_tug][5]=="1"){
				$("#tug_"+temp_tug).css("background-color", arr4[3]);
				}else if(tug_which[temp_tug][5]=="0"){
				$("#tug_"+temp_tug).css("background-color", arr4[1]);	
				}
			
			//且需要将显示信息显示上去
			temp_tug=10;
			checkdir();
		$("#tug_"+temp_tug).css("background-color", arr4[2]);
			allopen(1);
			 tug_which[10][0]="10";
			show_tug(temp_tug);
			break;
	}

});
$("#tug_11").click(function() {
	
flage_tug=1;
	flage_ALG=0;
	switch(temp_tug) {
		case -1:
	
			$("#tug_11").css("background-color", arr4[2]);
			allopen(1);
			$("#hp1800").css("background-color", arr4[2]);
			  $("#tug_stop").css("background-color", arr4[3]);
			
		temp_tug=11;
		tug_which[11][0]="11";
		checkdir();
			break;
		
		default:
		if(tug_which[temp_tug][5]=="1"){
				$("#tug_"+temp_tug).css("background-color", arr4[3]);
				}else if(tug_which[temp_tug][5]=="0"){
				$("#tug_"+temp_tug).css("background-color", arr4[1]);	
				}
			
			//且需要将显示信息显示上去
			temp_tug=11;
			checkdir();
		$("#tug_"+temp_tug).css("background-color", arr4[2]);
			allopen(1);
			 tug_which[11][0]="11";
			show_tug(temp_tug);
			break;
	}

});
$("#tug_12").click(function() {
flage_ALG=0;
	flage_tug=1;
	switch(temp_tug) {
		case -1:
			
			$("#tug_12").css("background-color", arr4[2]);
			allopen(1);
			 $("#hp1800").css("background-color", arr4[2]);
			   $("#tug_stop").css("background-color", arr4[3]);
			   tug_which[12][0]="12";
			 temp_tug=12;
			
		checkdir();
			break;
		default:
		
		if(tug_which[temp_tug][5]=="1"){
				$("#tug_"+temp_tug).css("background-color", arr4[3]);
				}else if(tug_which[temp_tug][5]=="0"){
				$("#tug_"+temp_tug).css("background-color", arr4[1]);	
				}
			$("#tug_12").css("background-color", arr4[2]);
			//且需要将显示信息显示上去
			temp_tug=12;
			
			checkdir();
		$("#tug_"+temp_tug).css("background-color", arr4[2]);	
		   allopen(1);
		    tug_which[12][0]="12";
			show_tug(temp_tug);
			break;
	}

});
$("#tug_13").click(function() {
	
flage_ALG=0;
	flage_tug=1;
	switch(temp_tug) {
		case -1:
		
			$("#tug_13").css("background-color", arr4[2]);
			allopen(1);
			 $("#hp1800").css("background-color", arr4[2]);
			 $("#tug_stop").css("background-color", arr4[3]);
			 temp_tug=13;
		 tug_which[13][0]="13";
			checkdir();
			
			break;
		default:
		    		if(tug_which[temp_tug][5]=="1"){  //切换到别的tug  上一个的tug颜色选择
				$("#tug_"+temp_tug).css("background-color", arr4[3]);
				}else if(tug_which[temp_tug][5]=="0"){
				$("#tug_"+temp_tug).css("background-color", arr4[1]);	
				}
			temp_tug=13;
			//方向是否亮起的检测
			checkdir();
		$("#tug_"+temp_tug).css("background-color", arr4[2]);	
			//且需要将显示信息显示上去
			allopen(1);
			 tug_which[13][0]="13";
			show_tug(temp_tug);
			break;
	}

});

function checkdir(){
	if(tug_which[temp_tug][5]=="1"){
		diroperation=1;
		$("#tug_left").css("background-color", arr3[1]);
		$("#tug_right").css("background-color", arr3[1]);
		$("#tug_dir").css('background-image',tug_image[6]);
	}else{
		diroperation=0;
		$("#tug_left").css("background-color", arr3[0]);
		$("#tug_right").css("background-color", arr3[0]);
		$("#tug_dir").css('background-image','url(img/seven/duo.png)');
	}
}

function allopen(i){
$("#hp7000").css("background-color", arr3[i]);
 $("#hp4800").css("background-color", arr3[i]);
 $("#hp3000").css("background-color", arr3[i]);
 $("#hp1800").css("background-color", arr4[i]);
 $("#tug_full").css("background-color", arr3[i]);
 $("#tug_half").css("background-color", arr3[i]);
 $("#tug_slow").css("background-color", arr3[i]);
 $("#tug_stop").css("background-color", arr4[i]);
 $("#tug_slow_low").css("background-color", arr3[i]);
 $("#tug_half_low").css("background-color", arr3[i]);
 $("#tug_full_low").css("background-color", arr3[i]);
 $("#tug_yes").css("background-color", arr3[i]);
 $("#tug_let_go").css("background-color", arr3[i]);
 


 
 
 
 document.getElementById('tug_force').innerText=sevenstruct.force;
}

//拖轮点击选择角度

$("#tug_left").click(function() {
	
	if((flage_tug!=-1)&&(diroperation==1)){
		var temp="DIR";
		tug_image_data=(90+parseInt(tug_which[temp_tug][3]))/15;
	tug_image_data--;
	
	if(tug_image_data<=0){
		tug_image_data=0;
		
	}

 $("#tug_dir").css('background-image',tug_image[tug_image_data]);	
	
tug_which[temp_tug][3]=-90+(tug_image_data*15);
temp=temp+","+temp_tug+","+tug_which[temp_tug][3]+","+"-1";

send_data_udp.TUG=temp;
 ipcRenderer.send('megfromwhere', {
		  	 send_data_udp
		  	})
	}
});

$("#tug_right").click(function() {
	if((flage_tug!=-1)&&(diroperation==1)){
		var temp="DIR";
		tug_image_data=(90+parseInt(tug_which[temp_tug][3]))/15;
		tug_image_data++;
	if(tug_image_data>=12){
		tug_image_data=12;
		
	}

 $("#tug_dir").css('background-image',tug_image[tug_image_data]);	
	
tug_which[temp_tug][3]=-90+(tug_image_data*15);

temp=temp+","+temp_tug+","+tug_which[temp_tug][3]+","+"1";
send_data_udp.TUG=temp;
	ipcRenderer.send('megfromwhere', {
		 send_data_udp
		})
}	
	
});

$("#hp7000").click(function() {
	if(flage_tug!=-1){
	tug_which[temp_tug][1]="7000";
	$("#hp7000").css("background-color", arr4[2]);
	$("#hp4800").css("background-color", arr4[1]);
	$("#hp3000").css("background-color", arr4[1]);
	$("#hp1800").css("background-color", arr4[1]);
	sevenstruct.hp_flag=1;
}


});
$("#hp4800").click(function() {
		if(flage_tug!=-1){
tug_which[temp_tug][1]="4800";
$("#hp7000").css("background-color", arr4[1]);
$("#hp4800").css("background-color", arr4[2]);
$("#hp3000").css("background-color", arr4[1]);
$("#hp1800").css("background-color", arr4[1]);
sevenstruct.hp_flag=1;
}
});
$("#hp3000").click(function() {
		if(flage_tug!=-1){
tug_which[temp_tug][1]="3000";
$("#hp7000").css("background-color", arr4[1]);
$("#hp4800").css("background-color", arr4[1]);
$("#hp3000").css("background-color", arr4[2]);
$("#hp1800").css("background-color", arr4[1]);
sevenstruct.hp_flag=1;
}
});
$("#hp1800").click(function() {
		if(flage_tug!=-1){
tug_which[temp_tug][1]="1800";
$("#hp7000").css("background-color", arr4[1]);
$("#hp4800").css("background-color", arr4[1]);
$("#hp3000").css("background-color", arr4[1]);
$("#hp1800").css("background-color", arr4[2]);
sevenstruct.hp_flag=1;
}
});
















function show_tug(i){
$("#hp"+tug_which[i][1]).css("background-color", arr4[2]);
if((tug_which[i][2]=="full")||(tug_which[i][2]=="half")||(tug_which[i][2]=="slow")){
	$("#tug_"+tug_which[i][2]).css("background-color", arr4[2]);
}else{
	$("#tug_"+tug_which[i][2]).css("background-color", arr4[3]);
}



if(tug_which[temp_tug][5]=="1"){
	$("#tug_right").css("background-color", arr4[1]);
	$("#tug_left").css("background-color", arr4[1]);
	var temp_tug_image=(90+parseInt(tug_which[i][3]))/15;
	$("#tug_dir").css('background-image',tug_image[temp_tug_image]);	
}
else{
	$("#tug_left").css("background-color", arr3[0]);
	$("#tug_right").css("background-color", arr3[0]);
	$("#tug_dir").css('background-image','url(img/seven/duo.png)');
	
}

$("#tug_force").text(tug_which[i][4]);


}







$("#tug_yes").click(function() {
	var temp_str="YES";
	
			$("#hp7000").css("background-color", arr4[0]);
			$("#hp4800").css("background-color", arr4[0]);
			$("#hp3000").css("background-color", arr4[0]);
			$("#hp1800").css("background-color", arr4[0]);
			$("#tug_full").css("background-color", arr4[0]);
			$("#tug_half").css("background-color", arr4[0]);
			$("#tug_slow").css("background-color", arr4[0]);
			$("#tug_stop").css("background-color", arr4[0]);
			$("#tug_slow_low").css("background-color", arr4[0]);
			$("#tug_half_low").css("background-color", arr4[0]);
			$("#tug_full_low").css("background-color", arr4[0]);
			$("#tug_yes").css("background-color", arr4[0]);
			$("#tug_let_go").css("background-color", arr4[0]);
			 $("#tug_left").css("background-color", arr4[0]);
 			$("#tug_right").css("background-color", arr4[0]);
 			$("#tug_dir").css('background-image','url(img/seven/duo.png)');
 			$("#tug_force").text(0);		 
			
			$("#tug_"+temp_tug).css("background-color", arr4[3]);
			
			for(var i=0;i<4;i++){
				
				if(i==1){
					
					switch (tug_which[temp_tug][i]){
						
						case "7000":temp_str+=",3";
							break;
							case "4800":temp_str+=",2";
							break;
							case "3000":temp_str+=",1";
							break;
							case "1800":temp_str+=",0";
							break;
						
					}
					
				}
				 if(i==2){
					
				switch (tug_which[temp_tug][i]){
					
					case "full":temp_str+=",0";
						break;
						case "half":temp_str+=",1";
						break;
						case "slow":temp_str+=",2";
						break;
						case "stop":temp_str+=",3";
						break;
						case "slow_low":temp_str+=",4";
						break;
						case "half_low":temp_str+=",5";
						break;
						case "full_low":temp_str+=",6";
						break;
					
				}
				
				}
				if(i==0)
				{
					temp_str+=","+tug_which[temp_tug][i];
				}
				
			}
          tug_which[temp_tug][5]="1";
			send_data_udp.TUG=temp_str;
			ipcRenderer.send('megfromwhere', {
				 send_data_udp
				})
			temp_str="";
			
			flage_tug=-1;
			sevenstruct.hp_flag=0;
		
});


$("#tug_let_go").click(function() {
	var temp_str="LG";

			$("#hp7000").css("background-color", arr4[0]);
			$("#hp4800").css("background-color", arr4[0]);
			$("#hp3000").css("background-color", arr4[0]);
			$("#hp1800").css("background-color", arr4[0]);
			$("#tug_full").css("background-color", arr4[0]);
			$("#tug_half").css("background-color", arr4[0]);
			$("#tug_slow").css("background-color", arr4[0]);
			$("#tug_stop").css("background-color", arr4[0]);
			$("#tug_slow_low").css("background-color", arr4[0]);
			$("#tug_half_low").css("background-color", arr4[0]);
			$("#tug_full_low").css("background-color", arr4[0]);
			$("#tug_yes").css("background-color", arr4[0]);
			$("#tug_let_go").css("background-color", arr4[0]);
			 $("#tug_left").css("background-color", arr4[0]);
 			$("#tug_right").css("background-color", arr4[0]);
 			$("#tug_dir").css('background-image','url(img/seven/duo.png)');
 			$("#tug_force").text(0);
 			temp_str=temp_str+","+tug_which[temp_tug][0];
 				$("#tug_"+temp_tug).css("background-color", arr4[1]);
				tug_which[temp_tug]=[" ","1800","stop","0","0","0"];
			
				
			
			send_data_udp.TUG=temp_str;
			ipcRenderer.send('megfromwhere', {
				 send_data_udp
				})
			
			
			temp_tug=-1;
			temp_str="";
			flage_tug=-1;
			sevenstruct.hp_flag=0;
});

$("#tug_let_all").click(function() {
	var temp_str="ALG";
            flage_ALG=1;
			$("#hp7000").css("background-color", arr4[0]);
			$("#hp4800").css("background-color", arr4[0]);
			$("#hp3000").css("background-color", arr4[0]);
			$("#hp1800").css("background-color", arr4[0]);
			$("#tug_full").css("background-color", arr4[0]);
			$("#tug_half").css("background-color", arr4[0]);
			$("#tug_slow").css("background-color", arr4[0]);
			$("#tug_stop").css("background-color", arr4[0]);
			$("#tug_slow_low").css("background-color", arr4[0]);
			$("#tug_half_low").css("background-color", arr4[0]);
			$("#tug_full_low").css("background-color", arr4[0]);
			$("#tug_yes").css("background-color", arr4[0]);
			$("#tug_let_go").css("background-color", arr4[0]);
			 $("#tug_left").css("background-color", arr4[0]);
 			$("#tug_right").css("background-color", arr4[0]);
 			$("#tug_dir").css('background-image','url(img/seven/duo.png)');
 			$("#tug_force").text(0);
 			//改变颜色按钮
 				for(var i = 0; i < 14; i++) {
				if(tug_which[i][0] != " ") {
					$("#tug_"+tug_which[i][0]).css("background-color", arr4[1]);
				} 
			}
			//数组清空初始化
			send_data_udp.TUG=temp_str;
			ipcRenderer.send('megfromwhere', {
				 send_data_udp
				})
				
tug_which=[[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"],[" ","1800","stop","0","0","0"]];
			temp_tug=-1;
			temp_str="";
			flage_tug=-1;
			sevenstruct.hp_flag=0;
		
});









$("#tug_full").click(function() {
	
	
	tug_which[temp_tug][2]="full";
	$("#tug_full").css("background-color", arr4[2]);	
	$("#tug_half").css("background-color", arr4[1]);
	$("#tug_slow").css("background-color", arr4[1]);
	$("#tug_stop").css("background-color", arr4[1]);
	$("#tug_slow_low").css("background-color", arr4[1]);
	$("#tug_half_low").css("background-color", arr4[1]);
	$("#tug_full_low").css("background-color", arr4[1]);
	
	
});
$("#tug_half").click(function() {
	
		tug_which[temp_tug][2]="half";
	$("#tug_full").css("background-color", arr4[1]);	
	$("#tug_half").css("background-color", arr4[2]);
	$("#tug_slow").css("background-color", arr4[1]);
	$("#tug_stop").css("background-color", arr4[1]);
	$("#tug_slow_low").css("background-color", arr4[1]);
	$("#tug_half_low").css("background-color", arr4[1]);
	$("#tug_full_low").css("background-color", arr4[1]);
		
		
	
});
$("#tug_slow").click(function() {
	
		tug_which[temp_tug][2]="slow";
	$("#tug_full").css("background-color", arr4[1]);	
	$("#tug_half").css("background-color", arr4[1]);
	$("#tug_slow").css("background-color", arr4[2]);
	$("#tug_stop").css("background-color", arr4[1]);
	$("#tug_slow_low").css("background-color", arr4[1]);
	$("#tug_half_low").css("background-color", arr4[1]);
	$("#tug_full_low").css("background-color", arr4[1]);
	
	
});
$("#tug_stop").click(function() {
	
		tug_which[temp_tug][2]="stop";
	$("#tug_full").css("background-color", arr4[1]);	
	$("#tug_half").css("background-color", arr4[1]);
	$("#tug_slow").css("background-color", arr4[1]);
	$("#tug_stop").css("background-color", arr4[3]);
	$("#tug_slow_low").css("background-color", arr4[1]);
	$("#tug_half_low").css("background-color", arr4[1]);
	$("#tug_full_low").css("background-color", arr4[1]);
	
	
});
$("#tug_slow_low").click(function() {
	
	tug_which[temp_tug][2]="slow_low";
	$("#tug_full").css("background-color", arr4[1]);	
	$("#tug_half").css("background-color", arr4[1]);
	$("#tug_slow").css("background-color", arr4[1]);
	$("#tug_stop").css("background-color", arr4[1]);
	$("#tug_slow_low").css("background-color", arr4[3]);
	$("#tug_half_low").css("background-color", arr4[1]);
	$("#tug_full_low").css("background-color", arr4[1]);
	
	
});
$("#tug_half_low").click(function() {
	
		tug_which[temp_tug][2]="half_low";
	$("#tug_full").css("background-color", arr4[1]);	
	$("#tug_half").css("background-color", arr4[1]);
	$("#tug_slow").css("background-color", arr4[1]);
	$("#tug_stop").css("background-color", arr4[1]);
	$("#tug_slow_low").css("background-color", arr4[1]);
	$("#tug_half_low").css("background-color", arr4[3]);
	$("#tug_full_low").css("background-color", arr4[1]);
	
	
});
$("#tug_full_low").click(function() {
	
		tug_which[temp_tug][2]="full_low";
	$("#tug_full").css("background-color", arr4[1]);	
	$("#tug_half").css("background-color", arr4[1]);
	$("#tug_slow").css("background-color", arr4[1]);
	$("#tug_stop").css("background-color", arr4[1]);
	$("#tug_slow_low").css("background-color", arr4[1]);
	$("#tug_half_low").css("background-color", arr4[1]);
	$("#tug_full_low").css("background-color", arr4[3]);
	
	
});

