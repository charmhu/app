const {remote, clipboard, ipcRenderer } = require('electron');
var send_data_udp={"id":"2", "LC":"99","RC":"99"}; //LC 挂的时右侧的车中


//                    面板  in stby run 螺距 值
var temp_data_engine=["1","0","2","0","0","0"];

var temp_data_enginel=["1","0","2","0","0","0"];
var MEF=0;
function SecondStruct(){};
var secondstruct = new SecondStruct();
	secondstruct.c_m=0;
	secondstruct.e_r_s_l=0;//左
	secondstruct.e_r_s_r=0;//右
	secondstruct.e_s_f_l=0;
	secondstruct.e_s_f_r=0;
	secondstruct.c_i_l=0;
	secondstruct.c_i_r=0;

	

function init()
{
	secondstruct.c_m=0;
	secondstruct.e_r_s_l=0;//左
	secondstruct.e_r_s_r=0;//右
	secondstruct.e_s_f_l=0;
	secondstruct.e_s_f_r=0;
	secondstruct.c_i_l=0;
	secondstruct.c_i_r=0;
	 temp_data_engine=["1","0","2","0","0","0"];
	 temp_data_enginel=["1","0","2","0","0","0"];
	 MEF=0;
	 send_data_udp={"id":"2", "LC":"99","RC":"99"}; //LC 挂的时右侧的车中
}

ipcRenderer.on('marh-data', (event, arg) => {

   exchange_eng(arg.RCHE ,arg.LCHE);
  })
ipcRenderer.on('message-from-main', (event, arg) => {
 
   console.log("message from main");
   
var obj=JSON.parse(arg);


 if (obj.WH == "100")
   {
   		  window.location.reload();
		  init();
		  ipcRenderer.send('megfromwhere', {
		  	 send_data_udp
		  	})
		  
		  
		  
   }
   
   if(obj.MEF == "TRUE")
   {
     	MEF = 1;
		$("#control_mode_2").css("background-color", arr4[3]);
   }   
   else
   {
     	MEF = 0;
		$("#control_mode_2").css("background-color", arr3[1]);
   }
   
   
   
   
   
   
   
   
   
var show_data_che=obj.RC.split(",");//右侧
	$("#stbd_ordered").html(show_data_che[0]);
	$("#stbd_rpm").html(show_data_che[1]);
	$("#stbd_notch").html(show_data_che[2]);
	$("#stbd_pitch").html(show_data_che[3]);
	
var show_data_che=obj.LC.split(",");//左车
	$("#port_ordered").html(show_data_che[0]);
	$("#port_rpm").html(show_data_che[1]);
	$("#port_notch").html(show_data_che[2]);
	$("#port_pitch").html(show_data_che[3]);
	showLJ(show_data_che[4]);
show_data=null;
	
  })
function exchange_eng(rche_fromserial,lche_fromserial){
	
	if(MEF == 1)
	{
		rche_fromserial = 0;
		lche_fromserial = 0;
	}
	
	
	
	if(secondstruct.c_m==0)
	{
		
	if((secondstruct.c_i_r==1)&&(secondstruct.e_s_f_r==1))
	{
		temp_data_engine[5]=parseInt(rche_fromserial);
		send_data_udp.RC=temp_data_engine.join(",");
		ipcRenderer.send('megfromwhere', {
			 send_data_udp
			})
	}
    
	if((secondstruct.c_i_l==1)&&(secondstruct.e_s_f_l==1))
	{
		
		temp_data_enginel[5]=parseInt(lche_fromserial);
		
		send_data_udp.LC=temp_data_enginel.join(",");
		ipcRenderer.send('megfromwhere', {
			 send_data_udp
			})
	}
	
	
	}
	

}


$("#control_mode").click(function() {
	switch(secondstruct.c_m) {
		case 0:
			secondstruct.c_m = 1;
				temp_data_engine[0]="1";
				temp_data_enginel[0]="1";
				  send_data_udp.LC=temp_data_enginel.join(",");
	              send_data_udp.RC=temp_data_engine.join(",");
				  ipcRenderer.send('megfromwhere', {
				  	 send_data_udp
				  	})
			$("#control_mode").css("background-color", arr4[2]);
			chelingchezhongqiehuan(1);
			break;
		case 1:
			secondstruct.c_m = 0;
			temp_data_engine[0]="0";
			temp_data_enginel[0]="0";
				 send_data_udp.LC=temp_data_enginel.join(",");
	              send_data_udp.RC=temp_data_engine.join(",");
				  ipcRenderer.send('megfromwhere', {
				  	 send_data_udp
				  	})
			$("#control_mode").css("background-color", arr4[1]);
			chelingchezhongqiehuan(0);
			break;
	}

});

//开启/关闭 速度按钮
function chelingchezhongqiehuan(i) {
	$("#full_1").css("background-color", arr4[i]);
	$("#half_1").css("background-color", arr4[i]);
	$("#slow_1").css("background-color", arr4[i]);
	$("#dead_slow_1").css("background-color", arr4[i]);
	$("#half_low_1").css("background-color", arr4[i]);
	$("#dead_slow_low_1").css("background-color", arr4[i]);
	$("#stop_1").css("background-color", arr4[i]);
	$("#full_low_1").css("background-color", arr4[i]);
	$("#slow_low_1").css("background-color", arr4[i]);
	$("#full_2").css("background-color", arr4[i]);
	$("#half_2").css("background-color", arr4[i]);
	$("#slow_2").css("background-color", arr4[i]);
	$("#dead_slow_2").css("background-color", arr4[i]);
	$("#half_low_2").css("background-color", arr4[i]);
	$("#dead_slow_low_2").css("background-color", arr4[i]);
	$("#stop_2").css("background-color", arr4[i]);
	$("#full_low_2").css("background-color", arr4[i]);
	$("#slow_low_2").css("background-color", arr4[i]);
}

$("#emerg_run_2").click(function() {

switch(secondstruct.e_r_s_r){
	case 0:{
		$("#emerg_run_2").css("background-color", arr4[2]);
		secondstruct.e_r_s_r=1;//启动车钟
		
		temp_data_engine[3]="1";
			send_data_udp.RC=temp_data_engine.join(",");
			ipcRenderer.send('megfromwhere', {
				 send_data_udp
				})
		break;
	}
	
	case 1:{
		$("#emerg_run_2").css("background-color", arr4[3]);
		secondstruct.e_r_s_r=2;//关闭车钟
		temp_data_engine[3]="2";
			send_data_udp.RC=temp_data_engine.join(",");
			ipcRenderer.send('megfromwhere', {
				 send_data_udp
				})
		break;
	}
	case 2:{
		$("#emerg_run_2").css("background-color", arr4[1]);
		secondstruct.e_r_s_r=0;//关闭车钟
		temp_data_engine[3]="0";
			send_data_udp.RC=temp_data_engine.join(",");
			ipcRenderer.send('megfromwhere', {
				 send_data_udp
				})
		break;
	}
	
}

});

$("#engine_stby_2").click(function() {

switch(secondstruct.e_s_f_r){
	case 0:{
		$("#engine_stby_2").css("background-color", arr4[2]);
		secondstruct.e_s_f_r=1;//备车
		temp_data_engine[2]="1";
			send_data_udp.RC=temp_data_engine.join(",");
			ipcRenderer.send('megfromwhere', {
				 send_data_udp
				})
		break;
	}
	
	case 1:{
		$("#engine_stby_2").css("background-color", arr4[3]);
		secondstruct.e_s_f_r=2;//完车
		temp_data_engine[2]="0";
			send_data_udp.RC=temp_data_engine.join(",");
			ipcRenderer.send('megfromwhere', {
				 send_data_udp
				})
		break;
	}
	case 2:{
		$("#engine_stby_2").css("background-color", arr4[1]);
		secondstruct.e_s_f_r=0;//完车
		temp_data_engine[2]="2";
			send_data_udp.RC=temp_data_engine.join(",");
			ipcRenderer.send('megfromwhere', {
				 send_data_udp
				})
		break;
	}
	
}

});

$("#clutch_in_2").click(function() {


		$("#clutch_in_2").css("background-color", arr4[2]);
		$("#clutch_out_2").css("background-color", arr4[1]);
		secondstruct.c_i_r=1;
		temp_data_engine[1]="1";
	send_data_udp.RC=temp_data_engine.join(",");
	ipcRenderer.send('megfromwhere', {
		 send_data_udp
		})


});
$("#clutch_out_2").click(function() {


		$("#clutch_in_2").css("background-color", arr4[1]);
		$("#clutch_out_2").css("background-color", arr4[3]);
		secondstruct.c_i_r=0;
			temp_data_engine[1]="0";
	send_data_udp.RC=temp_data_engine.join(",");
	ipcRenderer.send('megfromwhere', {
		 send_data_udp
		})
		

});

$("#emerg_run_1").click(function() {
switch(secondstruct.e_r_s_l){
	case 0:{
		$("#emerg_run_1").css("background-color", arr4[2]);
		secondstruct.e_r_s_l=1;//启动车钟
		temp_data_enginel[3]="1";
			send_data_udp.LC=temp_data_enginel.join(",");
			ipcRenderer.send('megfromwhere', {
				 send_data_udp
				})
		break;
	}
	
	case 1:{
		$("#emerg_run_1").css("background-color", arr4[3]);
		secondstruct.e_r_s_l=2;//关闭车钟
	temp_data_enginel[3]="2";
		send_data_udp.LC=temp_data_enginel.join(",");
		ipcRenderer.send('megfromwhere', {
			 send_data_udp
			})
		break;
	}
	case 2:{
		$("#emerg_run_1").css("background-color", arr4[1]);
		secondstruct.e_r_s_l=0;//关闭车钟
		temp_data_enginel[3]="0";
			send_data_udp.LC=temp_data_enginel.join(",");
			ipcRenderer.send('megfromwhere', {
				 send_data_udp
				})
		break;
	}
	
}

});

$("#engine_stby_1").click(function() {

switch(secondstruct.e_s_f_l){
	case 0:{
		$("#engine_stby_1").css("background-color", arr4[2]);
		secondstruct.e_s_f_l=1;//备车
		temp_data_enginel[2]="1";
			send_data_udp.LC=temp_data_enginel.join(",");
			ipcRenderer.send('megfromwhere', {
				 send_data_udp
				})
		break;
	}
	
	case 1:{
		$("#engine_stby_1").css("background-color", arr4[3]);
		secondstruct.e_s_f_l=2;//完车
		temp_data_enginel[2]="0";
			send_data_udp.LC=temp_data_enginel.join(",");
			ipcRenderer.send('megfromwhere', {
				 send_data_udp
				})
		break;
	}
	case 2:{
		$("#engine_stby_1").css("background-color", arr4[1]);
		secondstruct.e_s_f_l=0;//完车
		temp_data_enginel[2]="2";
			send_data_udp.LC=temp_data_enginel.join(",");
			ipcRenderer.send('megfromwhere', {
				 send_data_udp
				})
		break;
	}
	
}

});

$("#clutch_in_1").click(function() {


		$("#clutch_in_1").css("background-color", arr4[2]);
		$("#clutch_out_1").css("background-color", arr4[1]);
	
		secondstruct.c_i_l=1;
		temp_data_enginel[1]="1";
	send_data_udp.LC=temp_data_enginel.join(",");
	ipcRenderer.send('megfromwhere', {
		 send_data_udp
		})
       

});
$("#clutch_out_1").click(function() {


		$("#clutch_in_1").css("background-color", arr4[1]);
		$("#clutch_out_1").css("background-color", arr4[3]);
	secondstruct.c_i_l=0;
		temp_data_enginel[1]="0";
	send_data_udp.LC=temp_data_enginel.join(",");
	ipcRenderer.send('megfromwhere', {
		 send_data_udp
		})

});



function showLJ(str){
	
	switch(str){
		case "0":{
			$("#fixed_pitch").css("background-color", arr4[3]);
			$("#combi").css("background-color", arr4[1]);
		    $("#var_pitch").css("background-color", arr4[1]);
			
			
			break;
		}
		
		case "1":{
			$("#fixed_pitch").css("background-color", arr4[1]);
			$("#combi").css("background-color", arr4[3]);
			$("#var_pitch").css("background-color", arr4[1]);
			break;
		}
		case "2":{
			$("#fixed_pitch").css("background-color", arr4[1]);
			$("#combi").css("background-color", arr4[1]);
			$("#var_pitch").css("background-color", arr4[3]);
			break;
		}
		
	}
	
}







$("#full_1").click(function() {
	
	if(secondstruct.c_m ==1){
		temp_data_enginel[5]="4";
			send_data_udp.LC=temp_data_enginel.join(",");
			
		ipcRenderer.send('megfromwhere', {
			 send_data_udp
	})
	$("#full_1").css("background-color", arr4[2]);	
	$("#half_1").css("background-color", arr4[1]);
	$("#slow_1").css("background-color", arr4[1]);
	$("#dead_slow_1").css("background-color", arr4[1]);
	$("#half_low_1").css("background-color", arr4[1]);
	$("#dead_slow_low_1").css("background-color", arr4[1]);
	$("#stop_1").css("background-color", arr4[1]);
	$("#full_low_1").css("background-color", arr4[1]);
	$("#slow_low_1").css("background-color", arr4[1]);
	}
});
$("#half_1").click(function() {
	if(secondstruct.c_m ==1){
	
	temp_data_enginel[5]="3";
		send_data_udp.LC=temp_data_enginel.join(",");
		
	ipcRenderer.send('megfromwhere', {
		 send_data_udp
		 })
	$("#full_1").css("background-color", arr4[1]);	
	$("#half_1").css("background-color", arr4[2]);
	$("#slow_1").css("background-color", arr4[1]);
	$("#dead_slow_1").css("background-color", arr4[1]);
	$("#half_low_1").css("background-color", arr4[1]);
	$("#dead_slow_low_1").css("background-color", arr4[1]);
	$("#stop_1").css("background-color", arr4[1]);
	$("#full_low_1").css("background-color", arr4[1]);
	$("#slow_low_1").css("background-color", arr4[1]);
	}
});
$("#slow_1").click(function() {
	if(secondstruct.c_m ==1){
		temp_data_enginel[5]="2";
			send_data_udp.LC=temp_data_enginel.join(",");
			
		ipcRenderer.send('megfromwhere', {
			 send_data_udp
			 })
	$("#full_1").css("background-color", arr4[1]);	
	$("#half_1").css("background-color", arr4[1]);
	$("#slow_1").css("background-color", arr4[2]);
	$("#dead_slow_1").css("background-color", arr4[1]);
	$("#half_low_1").css("background-color", arr4[1]);
	$("#dead_slow_low_1").css("background-color", arr4[1]);
	$("#stop_1").css("background-color", arr4[1]);
	$("#full_low_1").css("background-color", arr4[1]);
	$("#slow_low_1").css("background-color", arr4[1]);
	}
});
$("#dead_slow_1").click(function() {
	if(secondstruct.c_m ==1){
		temp_data_enginel[5]="1";
			send_data_udp.LC=temp_data_enginel.join(",");
			
		ipcRenderer.send('megfromwhere', {
			 send_data_udp
			 })
	$("#full_1").css("background-color", arr4[1]);	
	$("#half_1").css("background-color", arr4[1]);
	$("#slow_1").css("background-color", arr4[1]);
	$("#dead_slow_1").css("background-color", arr4[2]);
	$("#half_low_1").css("background-color", arr4[1]);
	$("#dead_slow_low_1").css("background-color", arr4[1]);
	$("#stop_1").css("background-color", arr4[1]);
	$("#full_low_1").css("background-color", arr4[1]);
	$("#slow_low_1").css("background-color", arr4[1]);
	}
});

$("#stop_1").click(function() {
	if(secondstruct.c_m ==1){
		temp_data_enginel[5]="0";
			send_data_udp.LC=temp_data_enginel.join(",");
			
		ipcRenderer.send('megfromwhere', {
			 send_data_udp
			 })
	$("#full_1").css("background-color", arr4[1]);	
	$("#half_1").css("background-color", arr4[1]);
	$("#slow_1").css("background-color", arr4[1]);
	$("#dead_slow_1").css("background-color", arr4[1]);
	$("#half_low_1").css("background-color", arr4[1]);
	$("#dead_slow_low_1").css("background-color", arr4[1]);
	$("#stop_1").css("background-color", arr4[3]);
	$("#full_low_1").css("background-color", arr4[1]);
	$("#slow_low_1").css("background-color", arr4[1]);
	}
});
$("#dead_slow_low_1").click(function() {
	if(secondstruct.c_m ==1){
	temp_data_enginel[5]="-1";
		send_data_udp.LC=temp_data_enginel.join(",");
		
	ipcRenderer.send('megfromwhere', {
		 send_data_udp
		 })
	$("#full_1").css("background-color", arr4[1]);	
	$("#half_1").css("background-color", arr4[1]);
	$("#slow_1").css("background-color", arr4[1]);
	$("#dead_slow_1").css("background-color", arr4[1]);
	$("#half_low_1").css("background-color", arr4[1]);
	$("#dead_slow_low_1").css("background-color", arr4[3]);
	$("#stop_1").css("background-color", arr4[1]);
	$("#full_low_1").css("background-color", arr4[1]);
	$("#slow_low_1").css("background-color", arr4[1]);
	}
});

$("#slow_low_1").click(function() {
	if(secondstruct.c_m ==1){
temp_data_enginel[5]="-2";	
		send_data_udp.LC=temp_data_enginel.join(",");
		
	ipcRenderer.send('megfromwhere', {
		 send_data_udp
		 })
	$("#full_1").css("background-color", arr4[1]);	
	$("#half_1").css("background-color", arr4[1]);
	$("#slow_1").css("background-color", arr4[1]);
	$("#dead_slow_1").css("background-color", arr4[1]);
	$("#half_low_1").css("background-color", arr4[1]);
	$("#dead_slow_low_1").css("background-color", arr4[1]);
	$("#stop_1").css("background-color", arr4[1]);
	$("#full_low_1").css("background-color", arr4[1]);
	$("#slow_low_1").css("background-color", arr4[3]);
	}
});
$("#half_low_1").click(function() {
	if(secondstruct.c_m ==1){
	temp_data_enginel[5]="-3";
		send_data_udp.LC=temp_data_enginel.join(",");
		
	ipcRenderer.send('megfromwhere', {
		 send_data_udp
		 })
	$("#full_1").css("background-color", arr4[1]);	
	$("#half_1").css("background-color", arr4[1]);
	$("#slow_1").css("background-color", arr4[1]);
	$("#dead_slow_1").css("background-color", arr4[1]);
	$("#half_low_1").css("background-color", arr4[3]);
	$("#dead_slow_low_1").css("background-color", arr4[1]);
	$("#stop_1").css("background-color", arr4[1]);
	$("#full_low_1").css("background-color", arr4[1]);
	$("#slow_low_1").css("background-color", arr4[1]);
	}
});

$("#full_low_1").click(function() {
	if(secondstruct.c_m ==1){
	temp_data_enginel[5]="-4";
		send_data_udp.LC=temp_data_enginel.join(",");
		
	ipcRenderer.send('megfromwhere', {
		 send_data_udp	
		 })
	$("#full_1").css("background-color", arr4[1]);	
	$("#half_1").css("background-color", arr4[1]);
	$("#slow_1").css("background-color", arr4[1]);
	$("#dead_slow_1").css("background-color", arr4[1]);
	$("#half_low_1").css("background-color", arr4[1]);
	$("#dead_slow_low_1").css("background-color", arr4[1]);
	$("#stop_1").css("background-color", arr4[1]);
	$("#full_low_1").css("background-color", arr4[3]);
	$("#slow_low_1").css("background-color", arr4[1]);
	}
});







$("#full_2").click(function() {
	
	if(secondstruct.c_m ==1){
		
		temp_data_engine[5]="4";	
		send_data_udp.RC=temp_data_engine.join(",");
		
	ipcRenderer.send('megfromwhere', {
		 send_data_udp
		})
	$("#full_2").css("background-color", arr4[2]);	
	$("#half_2").css("background-color", arr4[1]);
	$("#slow_2").css("background-color", arr4[1]);
	$("#dead_slow_2").css("background-color", arr4[1]);
	$("#half_low_2").css("background-color", arr4[1]);
	$("#dead_slow_low_2").css("background-color", arr4[1]);
	$("#stop_2").css("background-color", arr4[1]);
	$("#full_low_2").css("background-color", arr4[1]);
	$("#slow_low_2").css("background-color", arr4[1]);
	}
});
$("#half_2").click(function() {
	if(secondstruct.c_m ==1){
		
		temp_data_engine[5]="3";	
		send_data_udp.RC=temp_data_engine.join(",");
		ipcRenderer.send('megfromwhere', {
			 send_data_udp
			})
		
	$("#full_2").css("background-color", arr4[1]);	
	$("#half_2").css("background-color", arr4[2]);
	$("#slow_2").css("background-color", arr4[1]);
	$("#dead_slow_2").css("background-color", arr4[1]);
	$("#half_low_2").css("background-color", arr4[1]);
	$("#dead_slow_low_2").css("background-color", arr4[1]);
	$("#stop_2").css("background-color", arr4[1]);
	$("#full_low_2").css("background-color", arr4[1]);
	$("#slow_low_2").css("background-color", arr4[1]);
	}
});
$("#slow_2").click(function() {
	if(secondstruct.c_m ==1){
		
		temp_data_engine[5]="2";
		send_data_udp.RC=temp_data_engine.join(",");
		ipcRenderer.send('megfromwhere', {
			 send_data_udp
			})
		
		
	$("#full_2").css("background-color", arr4[1]);	
	$("#half_2").css("background-color", arr4[1]);
	$("#slow_2").css("background-color", arr4[2]);
	$("#dead_slow_2").css("background-color", arr4[1]);
	$("#half_low_2").css("background-color", arr4[1]);
	$("#dead_slow_low_2").css("background-color", arr4[1]);
	$("#stop_2").css("background-color", arr4[1]);
	$("#full_low_2").css("background-color", arr4[1]);
	$("#slow_low_2").css("background-color", arr4[1]);
	}
});
$("#dead_slow_2").click(function() {
	if(secondstruct.c_m ==1){
		
		temp_data_engine[5]="1";
		send_data_udp.RC=temp_data_engine.join(",");
		ipcRenderer.send('megfromwhere', {
			 send_data_udp
			})
	$("#full_2").css("background-color", arr4[1]);	
	$("#half_2").css("background-color", arr4[1]);
	$("#slow_2").css("background-color", arr4[1]);
	$("#dead_slow_2").css("background-color", arr4[2]);
	$("#half_low_2").css("background-color", arr4[1]);
	$("#dead_slow_low_2").css("background-color", arr4[1]);
	$("#stop_2").css("background-color", arr4[1]);
	$("#full_low_2").css("background-color", arr4[1]);
	$("#slow_low_2").css("background-color", arr4[1]);
	}
});

$("#stop_2").click(function() {
	if(secondstruct.c_m ==1){
	
		temp_data_engine[5]="0";
		send_data_udp.RC=temp_data_engine.join(",");
		ipcRenderer.send('megfromwhere', {
			 send_data_udp
			})
	$("#full_2").css("background-color", arr4[1]);	
	$("#half_2").css("background-color", arr4[1]);
	$("#slow_2").css("background-color", arr4[1]);
	$("#dead_slow_2").css("background-color", arr4[1]);
	$("#half_low_2").css("background-color", arr4[1]);
	$("#dead_slow_low_2").css("background-color", arr4[1]);
	$("#stop_2").css("background-color", arr4[3]);
	$("#full_low_2").css("background-color", arr4[1]);
	$("#slow_low_2").css("background-color", arr4[1]);
	}
});
$("#dead_slow_low_2").click(function() {
	if(secondstruct.c_m ==1){
		
		temp_data_engine[5]="-1";	
		send_data_udp.RC=temp_data_engine.join(",");
		ipcRenderer.send('megfromwhere', {
			 send_data_udp
			})
	$("#full_2").css("background-color", arr4[1]);	
	$("#half_2").css("background-color", arr4[1]);
	$("#slow_2").css("background-color", arr4[1]);
	$("#dead_slow_2").css("background-color", arr4[1]);
	$("#half_low_2").css("background-color", arr4[1]);
	$("#dead_slow_low_2").css("background-color", arr4[3]);
	$("#stop_2").css("background-color", arr4[1]);
	$("#full_low_2").css("background-color", arr4[1]);
	$("#slow_low_2").css("background-color", arr4[1]);
	}
});


$("#slow_low_2").click(function() {
	if(secondstruct.c_m ==1){
		
		temp_data_engine[5]="-2";	
		send_data_udp.RC=temp_data_engine.join(",");
		ipcRenderer.send('megfromwhere', {
			 send_data_udp
			})
	$("#full_2").css("background-color", arr4[1]);	
	$("#half_2").css("background-color", arr4[1]);
	$("#slow_2").css("background-color", arr4[1]);
	$("#dead_slow_2").css("background-color", arr4[1]);
	$("#half_low_2").css("background-color", arr4[1]);
	$("#dead_slow_low_2").css("background-color", arr4[1]);
	$("#stop_2").css("background-color", arr4[1]);
	$("#full_low_2").css("background-color", arr4[1]);
	$("#slow_low_2").css("background-color", arr4[3]);
	}
})
$("#half_low_2").click(function() {
	if(secondstruct.c_m ==1){
		
		temp_data_engine[5]="-3";
		send_data_udp.RC=temp_data_engine.join(",");
		ipcRenderer.send('megfromwhere', {
			 send_data_udp
			})
	$("#full_2").css("background-color", arr4[1]);	
	$("#half_2").css("background-color", arr4[1]);
	$("#slow_2").css("background-color", arr4[1]);
	$("#dead_slow_2").css("background-color", arr4[1]);
	$("#half_low_2").css("background-color", arr4[3]);
	$("#dead_slow_low_2").css("background-color", arr4[1]);
	$("#stop_2").css("background-color", arr4[1]);
	$("#full_low_2").css("background-color", arr4[1]);
	$("#slow_low_2").css("background-color", arr4[1]);
	}
});
$("#full_low_2").click(function() {
	if(secondstruct.c_m ==1){
		
		temp_data_engine[5]="-4";
		send_data_udp.RC=temp_data_engine.join(",");
		ipcRenderer.send('megfromwhere', {
			 send_data_udp
			})
	$("#full_2").css("background-color", arr4[1]);	
	$("#half_2").css("background-color", arr4[1]);
	$("#slow_2").css("background-color", arr4[1]);
	$("#dead_slow_2").css("background-color", arr4[1]);
	$("#half_low_2").css("background-color", arr4[1]);
	$("#dead_slow_low_2").css("background-color", arr4[1]);
	$("#stop_2").css("background-color", arr4[1]);
	$("#full_low_2").css("background-color", arr4[3]);
	$("#slow_low_2").css("background-color", arr4[1]);
	}
});