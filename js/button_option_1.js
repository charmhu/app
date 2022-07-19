const {remote, clipboard, ipcRenderer } = require('electron');
/*  第一块面板          */
var send_data_udp={"id":"1", "D":"FU,0"}; 



function FirstStruct() {};
var firststruct = new FirstStruct();
	firststruct.c_c=1;
	firststruct.t_c=0;
	firststruct.g_w=0;
	firststruct.a_a=0;
	firststruct.yawing=0;
	firststruct.rudder=0;
	firststruct.c_s=0;
	firststruct.c_r=0;
	firststruct.r_l=0;
	firststruct.o_c=0;
	firststruct.o_t=0;
	firststruct.radius=0;
	firststruct.a_p=0;
	firststruct.p_s=0;
	firststruct.f_u=1;
	firststruct.nfu=0;	
	firststruct.setting=0;





//****************面板切换******************
var lastborad = 1; //假设当前层的z-index是1，具体可根据你的层的初始化的z-index来进行设置
var x = ""; //面板一的旋钮形式参数

var temp_duo=["at","*",0.0];
var fu_duo=["fu","0"];
var nfu_duo=0;

var which_auto_duo="";

var auto_duo_flag=0;
var auto_duo=0;

// 随动舵故障
var SF=0;
// 自动舵故障
var APF = 0;
//舵损坏
var RF =0;


 var tid2 =null;
 var tid3 =null;
 var tidnfu1=null;
 var tidnfu2=null;
 var tidnfu3=null;
 var tidnfu4=null;
 
 
 function init(){
 	
 			
 			firststruct.c_c=1;
 			firststruct.t_c=0;
 			firststruct.g_w=0;
 			firststruct.a_a=0;
 			firststruct.yawing=0;
 			firststruct.rudder=0;
 			firststruct.c_s=0;
 			firststruct.c_r=0;
 			firststruct.r_l=0;
 			firststruct.o_c=0;
 			firststruct.o_t=0;
 			firststruct.radius=0;
 			firststruct.a_p=0;
 			firststruct.p_s=0;
 			firststruct.f_u=1;
 			firststruct.nfu=0;	
 			firststruct.setting=0;
 			
 			lastborad = 1; //假设当前层的z-index是1，具体可根据你的层的初始化的z-index来进行设置
 			x = ""; //面板一的旋钮形式参数
 			
 			temp_duo=["at","*",0.0];
 			fu_duo=["fu","0"];
 			nfu_duo=0;
 			
 			which_auto_duo="";
 			
 			auto_duo_flag=0;
 			auto_duo=0;
 			
 			// 随动舵故障
 			SF=0;
 			// 自动舵故障
 			APF = 0;
			//舵损坏
			RF =0;
			
 			direct=[0.0,0.0,0.0];
 			auto_data=[0.10,0.00,10.00,10.00,10.00,120.0,1000,1000];
 			only_one_flag=0;

 			 tid2 =null;
 			 tid3 =null;
 			 tidnfu1=null;
 			 tidnfu2=null;
 			 tidnfu3=null;
 			 tidnfu4=null;
			send_data_udp={"id":"1", "D":"FU,0"}; 
 
 }
 
//yawing   rud cd ql offc cs offt radius
ipcRenderer.on('marh-data', (event, arg) => {

   exchange_duo(arg.D);
   //仪表盘
   
	
  })
ipcRenderer.on('message-from-main', (event, arg) => {

   console.log("message from main");
 
rece_fromudp(JSON.parse(arg));

	
  })
  
  function rece_fromudp(obj){
	  
	  if (obj.WH == "100")
	  {		  window.location.reload();
		  init();
			 ipcRenderer.send('megfromwhere', {
			 	 send_data_udp
			 	})
			 
	  }
	  //故障检测
	  if ((obj.SF == "TRUE")||(obj.RF == "TRUE")||(obj.RAF == "TRUE")||(obj.APF == "TRUE"))//任何一处有故障  灯红
	  {
		  $("#alarm_ack").css("background-color", arr4[3]);
	  }	
	else
		{
		  $("#alarm_ack").css("background-color", arr3[1]);		
		} 
	
	
	if(obj.RF == "TRUE")//舵
	{
		RF = 1; 
	}
	else{
		RF = 0;
	}	
		
	if (obj.SF == "TRUE")//舵机
	{
		SF = 1;
		
	}else{
		SF = 0;
	}
		
	if(obj.RAF == "TRUE")
	{
		 add_rud(0);
	}   
	else
	{
	     add_rud(parseInt(obj.RUD)*5.4);
	} 
	
	  
	  
	  add_rot(parseInt(obj.ROT)*0.93);	
	  firstpanel(obj.CRS,obj.HEAD,obj.MAG,obj.D);
  }

//车钟跟舵轮数据 
function exchange_duo(duo_fromserial) {
	if(-50<duo_fromserial<50){
		
		//隐藏串口弹框
		 var box=document.getElementById("serialwarning");
	     box.style.display="none";
		
	}
	else{
		 box.style.display="block";
	}

	if(duo_fromserial > 35)
	{
		duo_fromserial = 35;
	}if(duo_fromserial < -35
	){
		duo_fromserial = -35;
	}
	 //随动舵跟 随动车钟
	if(firststruct.f_u == 1)
		{
			fu_duo[0]="FU";
			fu_duo[1]=duo_fromserial;
			if((RF == 1)||(SF == 1))
			{
				fu_duo[1]=0;
			}
			add_helm(duo_fromserial*5.4);

			send_data_udp.D=fu_duo.join(",");
			ipcRenderer.send('megfromwhere', {
				 send_data_udp
				})
		 
		}
	else if(firststruct.a_p==1)
		{
			add_helm(duo_fromserial*5.4);
		   
		}

}


/******************* 第一面板************************/
$("#course_control").click(function() {

  if(firststruct.a_p ==1){
	
			$("#course_control").css("background-color", arr4[2]);
			$("#track_control").css("background-color", arr4[1]);
			$("#rudder_limit").css("background-color", arr3[1]);
			$("#cdunter_rudder").css("background-color", arr3[1]);
			$("#rudder").css("background-color", arr3[1]);
			$("#yawing").css("background-color", arr3[1]);
			$("#course_set").css("background-color", arr3[1]);
			$("#off_course").css("background-color", arr3[1]);
			$("#off_track").css("background-color", arr3[0]);
			$("#radius").css("background-color", arr3[0]);
			//继续对其他五个按键操作

			firststruct.t_c = 0;
			firststruct.c_c = 1;

}


});

$("#track_control").click(function() {

if(firststruct.a_p ==1){
	
			$("#track_control").css("background-color", arr4[2]);
			$("#course_control").css("background-color", arr4[1]);
			$("#rudder_limit").css("background-color", arr3[0]);
			$("#cdunter_rudder").css("background-color", arr3[0]);
			$("#rudder").css("background-color", arr3[0]);
			$("#yawing").css("background-color", arr3[0]);
			$("#course_set").css("background-color", arr3[0]);
			$("#off_course").css("background-color", arr3[0]);
			$("#off_track").css("background-color", arr3[1]);
			$("#radius").css("background-color", arr3[1]);
			//继续对off——track  radius操作			
			firststruct.t_c = 1;
			firststruct.c_c = 0;
			
	
}

});



    //自动航行数值增减

$("#papa_set").click(function() {
 		if((auto_duo_flag == 1)&&(firststruct.a_p==1)){
 			
        
  
  		
  		temp_duo[0]="AT"
  	   switch (which_auto_duo){
  		case "yawing":temp_duo[1]="YA";temp_duo[2]=auto_data[0].toFixed(3);
  			break;
  		case "rudder":temp_duo[1]="RU";temp_duo[2]=auto_data[1].toFixed(3);
  		break;
  		case "cdunter_rudder":temp_duo[1]="CR";temp_duo[2]=auto_data[2].toFixed(2);
  		break;
  		case "rudder_limit":temp_duo[1]="RL";temp_duo[2]=auto_data[3].toFixed(2);
  		break;
  		case "off_course":temp_duo[1]="OC";temp_duo[2]=auto_data[4].toFixed(2);
  		break;
  		case "course_set":temp_duo[1]="CS";temp_duo[2]=auto_data[5].toFixed(1);
  		break;
  		case "off_track":temp_duo[1]="OT";temp_duo[2]=auto_data[6].toFixed(1);
  		break;
  		case "radius":temp_duo[1]="RA";temp_duo[2]=auto_data[7].toFixed(1);
  		break;
  		
  		
  		default:
  			break;
  	}
  $("#papa_set").css("background-color", arr4[2]);
		send_data_udp.D= temp_duo.join(",");
		ipcRenderer.send('megfromwhere', {
			 send_data_udp
			})
	
      $("#papa_set").css("background-color", arr4[1]);
    
    document.getElementById('setting').innerText = "";
    		if(firststruct.c_c == 1) {
			 $("#course_set").css("background-color", arr3[1]);
			$("#rudder_limit").css("background-color", arr3[1]);
			$("#cdunter_rudder").css("background-color", arr3[1]);
			$("#rudder").css("background-color", arr3[1]);
			$("#yawing").css("background-color", arr3[1]);
			$("#off_course").css("background-color", arr3[1]);
		} if(firststruct.t_c == 1){
			$("#off_track").css("background-color", arr3[1]);
			$("#radius").css("background-color", arr3[1]);
		} 



        
       }
 });









 window.document.getElementById("hangxingadd").ontouchstart = function(e){
     if((auto_duo_flag == 1)&&(firststruct.a_p==1)){
 	
        tid2 = setInterval(function(){
           $("#hangxingadd").css("background-color", arr3[1]);
	  	switch (which_auto_duo){
  		case "yawing":auto_data[0]=auto_data[0]+0.001;
  					  if(auto_data[0]>=1)
  			{auto_data[0]=1;}
  		
  		              document.getElementById('setting').innerText=auto_data[0].toFixed(3);
  			break;
  		case "rudder":
  		auto_data[1]=auto_data[1]+0.001;
  		if(auto_data[1]>=1)
  			{auto_data[1]=1;}
  		
  		document.getElementById('setting').innerText=auto_data[1].toFixed(3);
  		break;
  		case "cdunter_rudder":
  		auto_data[2]=auto_data[2]+0.1;
  		if(auto_data[2]>=10)
  			{auto_data[2]=10;}
  		
  		document.getElementById('setting').innerText=auto_data[2].toFixed(1);
  		break;
  		case "rudder_limit":
  		auto_data[3]=auto_data[3]+0.1;
  		if(auto_data[3]>=35)
  		{auto_data[3]=35;}
  		
  		document.getElementById('setting').innerText=auto_data[3].toFixed(1);
  		break;
  		case "off_course":
  		auto_data[4]=auto_data[4]+0.1;
  		if(auto_data[4]>=20)
  			{auto_data[4]=20;}
  		
  		document.getElementById('setting').innerText=auto_data[4].toFixed(1);

  		break;
  		case "course_set":
  	
  		auto_data[5]=auto_data[5]+1;
  		if(auto_data[5]>=360)
  			{auto_data[5]=360;}
  		
  		document.getElementById('setting').innerText=auto_data[5].toFixed(1);

  		break;
  		case "off_track":
  	
  		auto_data[6]++;
  		if(auto_data[6]>=2000)
  			{auto_data[6]=2000;}
  			console.log(auto_data[6]);
  		document.getElementById('setting').innerText=auto_data[6];

  		break;
  		case "radius":
  		auto_data[7]++;
  		if(auto_data[7]>=2000)
  		{	auto_data[7]=2000;}
  		
  		document.getElementById('setting').innerText=auto_data[7];

  		break;
  		default:
  			break;
  	}

            
        },50);
        }
    };

 window.document.getElementById("hangxingadd").ontouchend = function(e){
         
        clearInterval(tid2);
           $("#hangxingadd").css("background-color", arr3[0]);
    }
 window.document.getElementById("hangxingdece").ontouchstart = function(e){
 			if((auto_duo_flag == 1)&&(firststruct.a_p==1)){
        tid3 = setInterval(function(){
             
         $("#hangxingdece").css("background-color", arr3[1]);
	  	switch (which_auto_duo){
  		case "yawing":auto_data[0]=auto_data[0]-0.001;
  					   if(auto_data[0]<=-1)
  			{auto_data[0]=-1;}
  		
  		              document.getElementById('setting').innerText=auto_data[0].toFixed(3);
  			break;
  		case "rudder":
  		auto_data[1]=auto_data[1]-0.001;
  		if(auto_data[1]<=-1)
  		{	auto_data[1]=-1;}
  		
  		document.getElementById('setting').innerText=auto_data[1].toFixed(3);
  		break;
  		case "cdunter_rudder":
  		auto_data[2]=auto_data[2]-0.1;
  		if(auto_data[2]<=-10)
  		{	auto_data[2]=-10;}
  		
  		document.getElementById('setting').innerText=auto_data[2].toFixed(1);
  		break;
  		case "rudder_limit":
  		auto_data[3]=auto_data[3]-0.1;
  		if(auto_data[3]<=-35)
  		{	auto_data[3]=-35;}
  		
  		document.getElementById('setting').innerText=auto_data[3].toFixed(1);
  		break;
  		case "off_course":
  		auto_data[4]=auto_data[4]-0.1;
  		if(auto_data[4]<=-20)
  			{auto_data[4]=-20;}
  		
  		document.getElementById('setting').innerText=auto_data[4].toFixed(1);

  		break;
  		case "course_set":
  		auto_data[5]=auto_data[5]-1;
  		if(auto_data[5]<=0)
  		{	auto_data[5]=0;}
  		
  		document.getElementById('setting').innerText=auto_data[5].toFixed(1);

  		break;
  		case "off_track":
  		auto_data[6]--;
  		if(auto_data[6]<=0)
  		{	auto_data[6]=0;
  		}
  		document.getElementById('setting').innerText=auto_data[6];

  		break;
  		case "radius":
  		auto_data[7]--;
  		if(auto_data[7]<=0)
  			{auto_data[7]=0;
  		}
  		document.getElementById('setting').innerText=auto_data[7];

  		break;
  		default:
  			break;
  	}
	//延时一会 变颜色
	setTimeout(function() {
		$("#hangxingdece").css("background-color", arr3[0]);
	}, 100);

            
        },50);
        }
    };

 window.document.getElementById("hangxingdece").ontouchend = function(e){
       
        clearInterval(tid3);
         $("#hangxingdece").css("background-color", arr3[0]);
    }









$("#yawing").click(function() {
	
if((firststruct.a_p ==1)&&(firststruct.c_c == 1)){
	        which_auto_duo="yawing";
	         document.getElementById('setting').innerText=auto_data[0].toFixed(3);
			$("#yawing").css("background-color", arr4[2]);
			 $("#course_set").css("background-color", arr3[1]);
			$("#rudder_limit").css("background-color", arr3[1]);
			$("#cdunter_rudder").css("background-color", arr3[1]);
			$("#rudder").css("background-color", arr3[1]);
		
			$("#off_course").css("background-color", arr3[1]);
			firststruct.yawing = 1;
		
              auto_duo_flag=1;//表示按鍵按下了  才可以自增自減操作
			

}
	

});
$("#rudder").click(function() {
if((firststruct.a_p ==1)&&(firststruct.c_c ==1)){
	which_auto_duo="rudder";

	     document.getElementById('setting').innerText=auto_data[1].toFixed(3);
			$("#course_set").css("background-color", arr3[1]);
			$("#rudder").css("background-color", arr4[2]);
			$("#yawing").css("background-color", arr3[1]);
			$("#rudder_limit").css("background-color", arr3[1]);
			$("#cdunter_rudder").css("background-color", arr3[1]);
			$("#off_course").css("background-color", arr3[1]);
			firststruct.rudder = 1;
			    auto_duo_flag=1;//表示按鍵按下了  才可以自增自減操作
	 		
}
	

});
$("#cdunter_rudder").click(function() {
if((firststruct.a_p ==1)&&(firststruct.c_c == 1)){
		which_auto_duo="cdunter_rudder";

	     document.getElementById('setting').innerText=auto_data[2].toFixed(1);
			 $("#course_set").css("background-color", arr3[1]);
			$("#rudder").css("background-color", arr3[1]);
			$("#yawing").css("background-color", arr3[1]);
			$("#rudder_limit").css("background-color", arr3[1]);
			$("#cdunter_rudder").css("background-color", arr4[2]);
			$("#off_course").css("background-color", arr3[1]);
			firststruct.c_r = 1;		
			    auto_duo_flag=1;//表示按鍵按下了  才可以自增自減操作
}


});
$("#rudder_limit").click(function() {
if((firststruct.a_p ==1)&&(firststruct.c_c == 1)){
		which_auto_duo="rudder_limit";

	     document.getElementById('setting').innerText=auto_data[3].toFixed(1);
	 $("#course_set").css("background-color", arr3[1]);
			$("#rudder").css("background-color", arr3[1]);
			$("#yawing").css("background-color", arr3[1]);
			$("#rudder_limit").css("background-color", arr4[2]);
			$("#cdunter_rudder").css("background-color", arr3[1]);
			$("#off_course").css("background-color", arr3[1]);
			    auto_duo_flag=1;//表示按鍵按下了  才可以自增自減操作
	}
	
});
$("#off_course").click(function() {
		
if((firststruct.a_p ==1)&&(firststruct.c_c == 1)){
	which_auto_duo="off_course";

	     document.getElementById('setting').innerText=auto_data[4].toFixed(1);
	 $("#course_set").css("background-color", arr3[1]);
			$("#rudder").css("background-color", arr3[1]);
			$("#yawing").css("background-color", arr3[1]);
			$("#rudder_limit").css("background-color", arr3[1]);
			$("#cdunter_rudder").css("background-color", arr3[1]);
			$("#off_course").css("background-color", arr4[2]);
		    auto_duo_flag=1;//表示按鍵按下了  才可以自增自減操作
	}

	

});

$("#course_set").click(function() {

if((firststruct.a_p ==1)&&(firststruct.c_c == 1)){
		which_auto_duo="course_set";

	     document.getElementById('setting').innerText=auto_data[5].toFixed(1);
	        $("#course_set").css("background-color", arr4[2]);
	
			$("#yawing").css("background-color", arr3[1]);
			$("#rudder_limit").css("background-color", arr3[1]);
			$("#cdunter_rudder").css("background-color", arr3[1]);
			$("#rudder").css("background-color", arr3[1]);
		
			$("#off_course").css("background-color", arr3[1]);
			firststruct.c_s = 1;
			    auto_duo_flag=1;//表示按鍵按下了  才可以自增自減操作
			

}

});
$("#off_track").click(function() {
if((firststruct.a_p ==1)&&(firststruct.t_c == 1)){
	which_auto_duo="off_track";
	$("#radius").css("background-color", arr3[1]);
	$("#off_track").css("background-color", arr4[2]);
	
	 document.getElementById('setting').innerText=auto_data[6];
	
	    auto_duo_flag=1;//表示按鍵按下了  才可以自增自減操作
}
	

});
$("#radius").click(function() {
if((firststruct.a_p ==1)&&(firststruct.t_c ==1)){
	which_auto_duo="radius";
	 document.getElementById('setting').innerText=auto_data[7];
	$("#radius").css("background-color", arr4[2]);
	$("#off_track").css("background-color", arr3[1]);
	    auto_duo_flag=1;//表示按鍵按下了  才可以自增自減操作
}
	

});
//改变颜色亮度
$("#dimmer_add").click(function() {

	$("#dimmer_add").css("background-color", arr3[0]);
	//延时一会 变颜色
	setTimeout(function() {
		$("#dimmer_add").css("background-color", arr3[1]);
	}, 100);
	//增加亮度函数

});

$("#dimmer_decrease").click(function() {

	$("#dimmer_decrease").css("background-color", arr3[0]);
	//延时一会 变颜色
	setTimeout(function() {
		$("#dimmer_decrease").css("background-color", arr3[1]);
	}, 100);
	//减少亮度函数

});






var direct=[0.0,0.0,0.0];
var auto_data=[0.10,0.00,10.00,10.00,10.00,120.0,1000,1000];
var only_one_flag=0;
function firstpanel(crs,head,mag,auto){
	
var i=0;
direct[0]=crs;
direct[1]=head;
direct[2]=mag;	
if(only_one_flag==1){
//只初始化一遍
var dataStrArr=auto.split(',');

 for(i=0;i<dataStrArr.length;i++){
 auto_data[i]=parseFloat(dataStrArr[i]);
	only_one_flag=0;
}
}
document.getElementById('heading').innerText=direct[1];

switch (firststruct.g_w){
	case 0:
	document.getElementById('byro').innerText=direct[0];
	document.getElementById('maghtg').innerText=direct[2];
	
		break;
		case 1:
	document.getElementById('maghtg').innerText="";
	document.getElementById('byro').innerText=direct[0];
		break;
		case 2:
	document.getElementById('byro').innerText="";	
	document.getElementById('maghtg').innerText=direct[2];
		break;
	default:
		break;
}

}


$("#gyrd_wagin").click(function() {

	switch(firststruct.g_w) {
		case 0:
			$("#gyrd_wagin").css("background-color", arr4[3]);
		
			firststruct.g_w = 1;
			break;
		case 1:
			$("#gyrd_wagin").css("background-color", arr4[2]);
		
			firststruct.g_w = 2;
			break;
		case 2:
			$("#gyrd_wagin").css("background-color", arr4[1]);
			
			firststruct.g_w = 0;
			break;
	}

});

$("#alarm_ack").click(function() {

	
			//$("#alarm_ack").css("background-color", arr3[1]);
			
	

	

});

$("#auto_pilot").click(function() {
	
	document.getElementById('setting').innerText="";
	$("#follow_up").css("background-color", arr3[1]);
	$("#nfu").css("background-color", arr3[1]);
	$("#auto_pilot").css("background-color", arr4[2]);
	auto_pilot_start_close(1);
	$("#course_control").css("background-color", arr4[2]);
	$("#radius").css("background-color", arr3[0]);
	$("#off_track").css("background-color", arr3[0]);
			
	firststruct.a_p = 1;
	firststruct.c_c = 1;
	firststruct.f_u = 0;
	firststruct.nfu = 0;
	firststruct.t_c=0;

});

function auto_pilot_start_close(i){
	      
			$("#rudder_limit").css("background-color", arr3[i]);
			$("#cdunter_rudder").css("background-color", arr3[i]);
			$("#rudder").css("background-color", arr3[i]);
			$("#yawing").css("background-color", arr3[i]);
			$("#track_control").css("background-color", arr3[i]);
			 $("#course_set").css("background-color", arr3[i]);
			$("#off_course").css("background-color", arr3[i]);
			
	
}




    
$("#follow_up").click(function() {
document.getElementById('setting').innerText="";
			$("#follow_up").css("background-color", arr4[2]);
			$("#auto_pilot").css("background-color", arr3[1]);
			$("#nfu").css("background-color", arr3[1]);
			firststruct.a_p = 0;
			firststruct.f_u=1;
			firststruct.nfu=0;
			auto_pilot_start_close(0);
			$("#off_track").css("background-color", arr3[0]);
			$("#radius").css("background-color", arr3[0]);
			$("#course_control").css("background-color", arr3[0]);

});

$("#nfu").click(function() {
	document.getElementById('setting').innerText = "";
            fu_duo[1]=0;
	        nfu_duo=fu_duo[1];
	        add_helm(nfu_duo);
	      //  document.gauges.get('radial-three').value=nfu_duo;
			$("#nfu").css("background-color", arr4[2]);
			$("#follow_up").css("background-color", arr3[1]);
			$("#auto_pilot").css("background-color", arr3[1]);
			auto_pilot_start_close(0);
			$("#course_control").css("background-color", arr3[0]);
			firststruct.a_p = 0;
			firststruct.f_u=0;
			firststruct.nfu=1;
			
			
			
});

/* 应急舵轮*/


 window.document.getElementById("left_conrtol_add").ontouchstart = function(e){
 	if(firststruct.nfu==1){
        tidnfu1 = setInterval(function(){
        $("#rotate_1").css("transform", "rotate(-45deg)");
	    $("#port_1").css("background-color", "red");
		   
		nfu_duo-- ; 
			
		if(nfu_duo<=-35){
			nfu_duo=-35;
		}
		add_helm(nfu_duo*5.4);
	    fu_duo[0]="NFU";		
		fu_duo[1]=nfu_duo;
		
		if(RF == 1){
			
			fu_duo[1]=0;
		}
        //document.gauges.get('radial-three').value=nfu_duo;
		send_data_udp.D=fu_duo.join(",");
		  ipcRenderer.send('megfromwhere', {
		  	 send_data_udp
		  	}) 
          
        },200);
        }else{
        	
        	  tidnfu1= setInterval(function(){
        $("#rotate_1").css("transform", "rotate(-45deg)");
	    $("#port_1").css("background-color", "red");
	      },200);
        }
    };

 window.document.getElementById("left_conrtol_add").ontouchend = function(e){
         
        clearInterval( tidnfu1);
         $("#rotate_1").css("transform", "rotate(0)");
	    $("#port_1").css("background-color", "transparent"); 
    }

 window.document.getElementById("left_conrtol_down").ontouchstart = function(e){
 	if(firststruct.nfu==1){
         tidnfu2 = setInterval(function(){
           
 		$("#rotate_1").css("transform", "rotate(45deg)");
	    $("#stbd_1").css("background-color", "#2dc309");
		nfu_duo++;  
		
		if(nfu_duo>=35){
			nfu_duo=35;
		}
		fu_duo[0]="NFU";		
		fu_duo[1]=nfu_duo;
		add_helm(nfu_duo*5.4);
		if(RF == 1){
			fu_duo[1]=0;
		}
        //document.gauges.get('radial-three').value=nfu_duo;
		send_data_udp.D=fu_duo.join(",");
		ipcRenderer.send('megfromwhere', {
			 send_data_udp
			})
        },200);
        }else{
        	   tidnfu2 = setInterval(function(){
           
 		$("#rotate_1").css("transform", "rotate(45deg)");
	    $("#stbd_1").css("background-color", "#2dc309");
        	
        },200);	
        }
    };

 window.document.getElementById("left_conrtol_down").ontouchend = function(e){
         
        clearInterval( tidnfu2);
         $("#rotate_1").css("transform", "rotate(0)");
	    $("#stbd_1").css("background-color", "transparent"); 
    }
 
 
  
 window.document.getElementById("right_conrtol_add").ontouchstart = function(e){
 	if(firststruct.nfu==1){
         tidnfu3 = setInterval(function(){
           
        $("#rotate_2").css("transform", "rotate(-45deg)");
	    $("#port_2").css("background-color", "red");
		nfu_duo-- ; 
		if(nfu_duo<=-35){
			nfu_duo=-35;
		}
		fu_duo[0]="NFU";
		fu_duo[1]=nfu_duo;
		add_helm(nfu_duo*5.4);
       if(RF == 1){
       	fu_duo[1]=0;
       }
		send_data_udp.D=fu_duo.join(",");
		ipcRenderer.send('megfromwhere', {
			 send_data_udp
			})
        },200);
        }else{
        	 tidnfu3 = setInterval(function(){
           
        $("#rotate_2").css("transform", "rotate(-45deg)");
	    $("#port_2").css("background-color", "red");
         },200);	
        	
        }
    };

 window.document.getElementById("right_conrtol_add").ontouchend = function(e){
         
        clearInterval( tidnfu3);
         $("#rotate_2").css("transform", "rotate(0)");
	    $("#port_2").css("background-color", "transparent"); 
    }

 
 
 
 window.document.getElementById("right_conrtol_down").ontouchstart = function(e){
 	if(firststruct.nfu==1){
         tidnfu4 = setInterval(function(){
           
        $("#rotate_2").css("transform", "rotate(45deg)");
	    $("#stbd_2").css("background-color", "#2dc309");
		nfu_duo++ ; 
		if(nfu_duo>=35){
			nfu_duo=35;
		}
		fu_duo[0]="NFU";
		fu_duo[1]=nfu_duo;
		add_helm(nfu_duo*5.4);
        if(RF == 1){
        	fu_duo[1]=0;
        }
		send_data_udp.D=fu_duo.join(",");
		 ipcRenderer.send('megfromwhere', {
		 	 send_data_udp
		 	})
        },200);
        }else{
        	  tidnfu4 = setInterval(function(){
        	  $("#rotate_2").css("transform", "rotate(45deg)");
	    $("#stbd_2").css("background-color", "#2dc309");
		
        },200);
        	
        }
    };

 window.document.getElementById("right_conrtol_down").ontouchend = function(e){
         
        clearInterval( tidnfu4);
         $("#rotate_2").css("transform", "rotate(0)");
	    $("#stbd_2").css("background-color", "transparent"); 
    }

