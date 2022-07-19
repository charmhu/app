const {remote, clipboard, ipcRenderer } = require('electron');
var temp_dl=["0","0"];
var temp_es=["0","0"]
var water_deep=0.00;
var alarm_flage=0;
var send_data_udp={"id":"5","DL":"0,0"}


function SixStruct(){};
var sixstruct = new SixStruct();
	sixstruct.fnots=0;
	sixstruct.ms=0;
	sixstruct.feets=0;
	sixstruct.water_track=0;
	sixstruct.fathon=0;
	sixstruct.meter=0;
	sixstruct.feet=0;
	
	

ipcRenderer.on('message-from-main', (event, arg) => {

   console.log("message from main");
   
var obj=JSON.parse(arg);


   if (obj.WH == "100")
   {
   		  window.location.reload();
		temp_dl=["0","0"];
		temp_es=["0","0"]
		water_deep=0.00;
		alarm_flage=0;
		  sixstruct.fnots=0;
		  sixstruct.ms=0;
		  sixstruct.feets=0;
		  sixstruct.water_track=0;
		  sixstruct.fathon=0;
		  sixstruct.meter=0;
		  sixstruct.feet=0;
		  send_data_udp={"id":"5","DL":"0,0"};
		  ipcRenderer.send('megfromwhere', {
		  	 send_data_udp
		  	})
   }
   //故障检测
   
   
sixpanel(obj.DL);
sixpanel2(obj.ES);
	
  })








function sixpanel(str){
var temp_str_dl=str.split(",");

switch (temp_str_dl[0]){
	case "0":$("#left_up").css("background-color", arr4[0]);
	       $("#right_up").css("background-color", arr4[0]);
		break;
	case "1":$("#left_up").css("background-color", arr4[3]);
	       $("#right_up").css("background-color", arr4[0]);
		break;
	case "2":
	$("#left_up").css("background-color", arr4[0]);
	       $("#right_up").css("background-color", arr4[2]);
		break;
}
switch (temp_str_dl[2]){
	case "0":$("#jianyou_up").css("background-color", arr4[0]);
	       $("#jiantou_down").css("background-color", arr4[0]);
		break;
	case "1":$("#jianyou_up").css("background-color", arr4[0]);
	       $("#jiantou_down").css("background-color", arr4[3]);
		break;
	case "2":$("#jianyou_up").css("background-color", arr4[2]);
	       $("#jiantou_down").css("background-color", arr4[0]);
		break;
}
switch (temp_str_dl[4]){
		case "1":$("#left_down").css("background-color", arr4[3]);
	       $("#right_down").css("background-color", arr4[0]);
		break;
	case "2":$("#left_down").css("background-color", arr4[0]);
	       $("#right_down").css("background-color", arr4[2]);
		break;
		 case "0":$("#left_down").css("background-color", arr4[0]);
	       $("#right_down").css("background-color", arr4[0]);
		break;
}

$("#doppler_up").html(temp_str_dl[1]);
$("#doppler_middle").html(temp_str_dl[3]);
$("#doppler_down").html(temp_str_dl[5]);
$("#dist").html(temp_str_dl[6]);
temp_str_dl=[];
	
}
function sixpanel2(str){
$("#echo_up").html(str.split(",")[0]);
$("#echo_down").html(str.split(",")[0]);


if(str.split(",")[1]=="1"){
	
	  $("#es_arm_ack").css("background-color", arr4[3]);
	   //声音取消
	 
	
  }else{
  	
  	  $("#es_arm_ack").css("background-color", arr4[1]);
  }
}

$("#fnots").click(function() {

	
			$("#fnots").css("background-color", arr4[2]);
			$("#ms").css("background-color", arr4[1]);
			$("#feets").css("background-color", arr4[1]);
	temp_dl[1]="0";
	send_data_udp.DL=temp_dl.join(",");
	ipcRenderer.send('megfromwhere', {
		 send_data_udp
		})
	
});
$("#ms").click(function() {

	
			$("#fnots").css("background-color", arr4[1]);
			$("#ms").css("background-color", arr4[2]);
			$("#feets").css("background-color", arr4[1]);
	temp_dl[1]="1";
	send_data_udp.DL=temp_dl.join(",");
	ipcRenderer.send('megfromwhere', {
		 send_data_udp
		})
});
$("#feets").click(function() {

	
			$("#fnots").css("background-color", arr4[1]);
			$("#ms").css("background-color", arr4[1]);
			$("#feets").css("background-color", arr4[2]);
	temp_dl[1]="2";
	send_data_udp.DL=temp_dl.join(",");
	ipcRenderer.send('megfromwhere', {
		 send_data_udp
		})
	
});

$("#water_track").click(function() {

	switch(sixstruct.water_track) {
		case 0:
			$("#water_track").css("background-color", arr4[2]);
			$("#dopper_qt").css("background-color", arr4[0]);
			$("#dopper_wt").css("background-color", arr4[2]);
			temp_dl[0]="0";
			sixstruct.water_track=1;
			break;
		case 1:
			$("#water_track").css("background-color", arr4[3]);
			$("#dopper_wt").css("background-color", arr4[0]);
			$("#dopper_qt").css("background-color", arr4[3]);
			sixstruct.water_track=0;
		temp_dl[0]="1";
			break;

	}
	
	send_data_udp.DL=temp_dl.join(",");
	ipcRenderer.send('megfromwhere', {
		 send_data_udp
		})
});
$("#fathom").click(function() {

	
			$("#fathom").css("background-color", arr4[2]);
			$("#meter").css("background-color", arr4[1]);
			$("#feet").css("background-color", arr4[1]);
			temp_es[0]="1";
	send_data_udp.ES=temp_es.join(",");
	ipcRenderer.send('megfromwhere', {
		 send_data_udp
		})
	
});
$("#meter").click(function() {

	
			$("#fathom").css("background-color", arr4[1]);
			$("#meter").css("background-color", arr4[2]);
			$("#feet").css("background-color", arr4[1]);
			temp_es[0]="0";
			send_data_udp.ES=temp_es.join(",");
			ipcRenderer.send('megfromwhere', {
				 send_data_udp
				})
});
$("#feet").click(function() {

	
			$("#fathom").css("background-color", arr4[1]);
			$("#meter").css("background-color", arr4[1]);
			$("#feet").css("background-color", arr4[2]);
			temp_es[0]="2";
			send_data_udp.ES=temp_es.join(",");
			ipcRenderer.send('megfromwhere', {
				 send_data_udp
				})
	
});

//按下之后不闪烁
$("#tug_alarm_ack").click(function() {
alarm_flage=1;

	
	
});


$("#wateradd").click(function() {
	water_deep=water_deep+0.01;
	if(water_deep>=0.00){
		
		water_deep=0.00;
	}
	
	
	$("#alm_lmit").html(water_deep.toFixed(2));
	temp_es[1]=water_deep.toFixed(2);
	send_data_udp.ES=temp_es.join(",");
	ipcRenderer.send('megfromwhere', {
		 send_data_udp
		})
});
$("#waterdece").click(function() {
	water_deep=water_deep-0.01;
	if(water_deep<=-100.00){
		water_deep=-100.00;
	}
	
	
	temp_es[1]=water_deep.toFixed(2);
	send_data_udp.ES=temp_es.join(",");
	ipcRenderer.send('megfromwhere', {
		 send_data_udp
		})
	document.getElementById('alm_lmit').innerText=water_deep.toFixed(2);
	
	
	
	
});
 window.document.getElementById("waterdece").ontouchstart = function(e){
   
 	
        tid = setInterval(function(){
          $("#waterdece").css("background-color", arr3[1]);
        	water_deep=water_deep-0.01;
	if(water_deep<=-100.00){
		water_deep=-100.00;
	}
	
	
	temp_es[1]=water_deep;
	send_data_udp.ES=temp_es.join(",");
	ipcRenderer.send('megfromwhere', {
		 send_data_udp
		})
	document.getElementById('alm_lmit').innerText=water_deep.toFixed(2);

        	   },50);
        };
   window.document.getElementById("waterdece").ontouchend = function(e){
         
        clearInterval(tid);
           $("#waterdece").css("background-color", arr3[0]);
    }
     window.document.getElementById("wateradd").ontouchstart = function(e){
   
 	
        tid = setInterval(function(){
        $("#wateradd").css("background-color", arr3[1]);
     	water_deep=water_deep+0.01;
	if(water_deep>=0.00){
		
		water_deep=0.00;
	}
	
	
	temp_es[1]=water_deep;
	send_data_udp.ES=temp_es.join(",");
	ipcRenderer.send('megfromwhere', {
		 send_data_udp
		})
	document.getElementById('alm_lmit').innerText=water_deep.toFixed(2);

        },50);
        
    };
     window.document.getElementById("wateradd").ontouchend = function(e){
         
        clearInterval(tid);
           $("#wateradd").css("background-color", arr3[0]);
    }