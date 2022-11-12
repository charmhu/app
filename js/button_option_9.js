const {remote, clipboard, ipcRenderer } = require('electron');

var arrled1 =["#First_full_4","#First_full_3","#First_full_2","#First_full_1","#First_stop_0","#First_slow_1","#First_slow_2","#First_slow_3","#First_slow_4"];
var arrled2 =["#Second_full_4","#Second_full_3","#Second_full_2","#Second_full_1","#Second_stop_0","#Second_slow_1","#Second_slow_2","#Second_slow_3","#Second_slow_4"];
var power1flage=0;


var power2flage=0;

//只给两个力度 一前一后  power开不开 你都不用管
var send_data_udp={"id":"9","THR1":"0","THR2":"0"}; 
function init()
{
		send_data_udp={"id":"9","THR":"0,0"}
		ALARM_ACK
	$("#ALARM_ACK").css("background-color", arr4[1]);
	$("#First_power").css("background-color", arr4[1]);
	$("#Second_power").css("background-color", arr4[1]);
	for(var i=0;i<9;i++){
	$(arrled1[i]).css("background-color", arr4[0]);
	}
	for(var i=0;i<9;i++){
	$(arrled2[i]).css("background-color", arr4[0]);
	}
}
	

window.onload =init;
	
	ipcRenderer.on('marh-data', (event, arg) => {
	//从串口得到侧推得数据
	   console.log(arg.FrontT);
	   console.log(arg.BackT);
	   
	   if(ifpower1flage == 0)
	   {
		   //赋值（硬件）
	   send_data_udp.THR1=arg.FrontT.join(",");
	   send_data_udp.THR2=arg.BackT.join(",");
	   	//发送	
	   	ipcRenderer.send('megfromwhere', {
	   		 send_data_udp
	   })
		}
	  }) 
// panel 1 2 value 4 3 2 1 0 -1 -2 -3 -4
function buttonClick(panel,value){
	
	if(power1flage ==1)
	{
		if(panel == "1")
		{
		send_data_udp.FrontT=value.join(",");
			//发送	
			ipcRenderer.send('megfromwhere', {
			send_data_udp 
			})
		}
		if(panel == "2")
		{
		send_data_udp.BackT=value.join(",");
			//发送	
			ipcRenderer.send('megfromwhere', {
			send_data_udp 
			})
		}
	if(panel == "1")
	{
		if()
		
		$("#First_full_4").css("background-color", arr4[2]);	
		$("#First_full_3").css("background-color", arr4[1]);
		$("#First_full_2").css("background-color", arr4[1]);
		$("#First_full_1").css("background-color", arr4[1]);
		$("#First_stop_0").css("background-color", arr4[1]);
		$("#First_slow_1").css("background-color", arr4[1]);
		$("#First_slow_2").css("background-color", arr4[1]);
		$("#First_slow_3").css("background-color", arr4[1]);
		$("#First_slow_4").css("background-color", arr4[1]);
	}
	
	if(panel == "2")
	{
		if()
		
		$("#First_full_4").css("background-color", arr4[2]);	
		$("#First_full_3").css("background-color", arr4[1]);
		$("#First_full_2").css("background-color", arr4[1]);
		$("#First_full_1").css("background-color", arr4[1]);
		$("#First_stop_0").css("background-color", arr4[1]);
		$("#First_slow_1").css("background-color", arr4[1]);
		$("#First_slow_2").css("background-color", arr4[1]);
		$("#First_slow_3").css("background-color", arr4[1]);
		$("#First_slow_4").css("background-color", arr4[1]);
	}
	
	}
}
	  

	  
	  
	  
function power1(){
/* 	i++;
	if(i>=100){
		i=100;
	}
	add_bow(i); */

	if(power1flage==0){
		power1flage=1;
		$("#First_power").css("background-color", arr4[2]);
		for(var i=0;i<9;i++){
		$(arrled1[i]).css("background-color", arr4[1]);
		}
		return;
	}
	if(power1flage==1){
		power1flage=0;
		$("#First_power").css("background-color", arr4[1]);
		for(var i=0;i<9;i++){
		$(arrled1[i]).css("background-color", arr4[0]);
		}
		return;
	}
	
}

function power2(){
/* 	i--;
	if(i<=-100){
		i=-100;
	}
	add_bow(i); */

	if(power2flage==0){
		power2flage=1;
		$("#Second_power").css("background-color", arr4[2]);
		for(var i=0;i<9;i++){
		$(arrled2[i]).css("background-color", arr4[1]);
		}
		return;
	}
	if(power2flage==1){
		power2flage=0;
		$("#Second_power").css("background-color", arr4[1]);
		
		for(var i=0;i<9;i++){
		$(arrled2[i]).css("background-color", arr4[0]);
		}
		return;
	}
	
	
}
