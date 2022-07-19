const {remote, clipboard, ipcRenderer } = require('electron');
/******************* 第3面板************************/
var temp_aotu_horn=["AT","99","99"];
var temp_headle=["HE","0"];

var send_data_udp={"id":"3", "AC":"P,NO,S,NO","SS":""}; 







var a_a=0;
var r_l_g=0;
var r_s=0;
var h_a=0;
var which_w=99;//记录哪一个雾号类型
var which_time;//记录雾号时间
var h_one=0;
var h_two=0;
var h_thr=0;
var h_fo=0;
var h_fi=0;
var h_si=0;
var h_sev=0;
var h_eig=0;

var start_wu=null;
var start_luo=null;
var start_ling=null;
/*三个定时器*/
var tid_wu;
var tid_ling;
var tid_luo;



function init()
{
	
		 temp_aotu_horn=["AT","99","99"];
		 temp_headle=["HE","0"];
		 a_a=0; 
		 r_l_g=0;
		 r_s=0;
		 h_a=0;
		 which_w=99;//记录哪一个雾号类型
		 which_time;//记录雾号时间
		 h_one=0;
		 h_two=0;
		 h_thr=0;
		 h_fo=0;
		 h_fi=0;
		 h_si=0;
		 h_sev=0;
		 h_eig=0;
		 start_wu=null;
		 start_luo=null;
		 start_ling=null;
		send_data_udp={"id":"3", "AC":"P,NO,S,NO","SS":""}; 
			


}
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
   
   
   
var show_AC=obj.AC.split(",");//锚机数组
$("#pspd").html(show_AC[1]);
$("#pdir").html(show_AC[2]);
$("#pten").html(show_AC[3]);
$("#pleng").html(show_AC[4]);
$("#sspd").html(show_AC[6]);
$("#sdir").html(show_AC[7]);
$("#sten").html(show_AC[8]);
$("#sleng").html(show_AC[9]);
show_AC=null;

	
  })


$("#left_heave").click(function() {
var temp_str=send_data_udp.AC.split(',');
	
			$("#left_heave").css("background-color", arr4[2]);
			$("#left_slack").css("background-color", arr3[1]);
			$("#left_letgo").css("background-color", arr3[1]);
			$("#left_hold").css("background-color", arr3[1]);
		
			temp_str[1]="HE";
			send_data_udp.AC=temp_str.join(',');
			 ipcRenderer.send('megfromwhere', {
				 send_data_udp
				})
	

});
$("#left_hold").click(function() {
var temp_str=send_data_udp.AC.split(',');
	
			$("#left_hold").css("background-color", arr4[2]);
			
			$("#left_slack").css("background-color", arr3[1]);
			$("#left_letgo").css("background-color", arr3[1]);
			$("#left_heave").css("background-color", arr3[1]);
				temp_str[1]="ST";
			send_data_udp.AC=temp_str.join(',');

			ipcRenderer.send('megfromwhere', {
							 send_data_udp
							})
			





});
$("#left_letgo").click(function() {
var temp_str=send_data_udp.AC.split(',');
	
			$("#left_letgo").css("background-color", arr4[2]);
		
			$("#left_slack").css("background-color", arr3[1]);
			$("#left_hold").css("background-color", arr3[1]);
			$("#left_heave").css("background-color", arr3[1]);
			temp_str[1]="LG";
			send_data_udp.AC=temp_str.join(',');
 
	ipcRenderer.send('megfromwhere', {
					 send_data_udp
					})
	

	



});
$("#left_slack").click(function() {
var temp_str=send_data_udp.AC.split(',');

			$("#left_slack").css("background-color", arr4[2]);
		
			$("#left_letgo").css("background-color", arr3[1]);
			$("#left_hold").css("background-color", arr3[1]);
			$("#left_heave").css("background-color", arr3[1]);
	
temp_str[1]="SL";
			send_data_udp.AC=temp_str.join(',');
  
			 ipcRenderer.send('megfromwhere', {
				 send_data_udp
				})


	

});
$("#alarm_ack").click(function() {

	switch(a_a) {
		case 0:
			$("#alarm_ack").css("background-color", arr3[1]);
			a_a = 1;
			break;
		case 1:
			$("#alarm_ack").css("background-color", arr3[0]);
			a_a = 0;
			break;

	}



});
$("#right_heave").click(function() {
var temp_str=send_data_udp.AC.split(',');
	
	
			$("#right_heave").css("background-color", arr4[2]);
		
			$("#right_slack").css("background-color", arr3[1]);
			$("#right_letgo").css("background-color", arr3[1]);
			$("#right_hold").css("background-color", arr3[1]);
			temp_str[3]="HE";
			send_data_udp.AC=temp_str.join(',');
 
		ipcRenderer.send('megfromwhere', {
						 send_data_udp
						})
		





});
$("#right_hold").click(function() {
var temp_str=send_data_udp.AC.split(',');
	
			$("#right_hold").css("background-color", arr4[2]);
			
			$("#right_slack").css("background-color", arr3[1]);
			$("#right_letgo").css("background-color", arr3[1]);
			$("#right_heave").css("background-color", arr3[1]);
		
	temp_str[3]="ST";
			send_data_udp.AC=temp_str.join(',');
 
			 ipcRenderer.send('megfromwhere', {
				 send_data_udp
				})




});
$("#right_letgo").click(function() {
var temp_str=send_data_udp.AC.split(',');
	
			$("#right_letgo").css("background-color", arr4[2]);
			r_l_g = 1;
			$("#right_slack").css("background-color", arr3[1]);
			$("#right_hold").css("background-color", arr3[1]);
			$("#right_heave").css("background-color", arr3[1]);
			temp_str[3]="LG";
			send_data_udp.AC=temp_str.join(',');
		ipcRenderer.send('megfromwhere', {
						 send_data_udp
						})
		
		





});

$("#right_slack").click(function() {

var temp_str=send_data_udp.AC.split(',');	
			$("#right_slack").css("background-color", arr4[2]);
			r_s = 1;
			$("#right_letgo").css("background-color", arr3[1]);
			$("#right_hold").css("background-color", arr3[1]);
			$("#right_heave").css("background-color", arr3[1]);
	
temp_str[3]="SL";
			send_data_udp.AC=temp_str.join(',');
			ipcRenderer.send('megfromwhere', {
  				 send_data_udp
  				})
  
	
});

/*                 ************雾号*******/

$("#horn_auto").click(function() {

	switch(h_a) {
		case 0: h_a=1;
				$("#horn_auto").css("background-color", arr4[2]);
				 $("#horn_one").css("background-color", arr3[1]);
				 $("#horn_two").css("background-color", arr3[1]);
				 $("#horn_three").css("background-color", arr3[1]);
				 $("#horn_four").css("background-color", arr3[1]);
				 $("#horn_five").css("background-color", arr3[1]);
				 $("#horn_six").css("background-color", arr3[1]);
				 $("#horn_seven").css("background-color", arr3[1]);
				 $("#horn_eight").css("background-color", arr3[1]);
				 $("#60").css("background-color", arr3[1]);
				$("#90").css("background-color", arr3[1]);
				$("#120").css("background-color", arr3[1]);  
				$("#start_ling").css("background-color",arr4[0]);					
				$("#start_luo").css("background-color",arr4[0]);
				$("#start_wu").css("background-color",arr4[0]);	
				
				
							break;
		case 1: h_a=0;  
		        $("#horn_auto").css("background-color", arr4[1]);
                $("#horn_one").css("background-color", arr3[0]);
				$("#horn_two").css("background-color", arr3[0]);
				$("#horn_three").css("background-color", arr3[0]);
				$("#horn_four").css("background-color", arr3[0]);
				$("#horn_five").css("background-color", arr3[0]);
				$("#horn_six").css("background-color", arr3[0]);
				$("#horn_seven").css("background-color", arr3[0]);
				$("#horn_eight").css("background-color", arr3[0]);
				$("#60").css("background-color", arr3[0]);
			    $("#90").css("background-color", arr3[0]);
				$("#120").css("background-color", arr3[0]);
				$("#start_ling").css("background-color",arr4[1]);					
				$("#start_luo").css("background-color",arr4[1]);
				$("#start_wu").css("background-color",arr4[1]);	
		        which_w=99;
		        temp_aotu_horn[1]="99";
		         temp_aotu_horn[2]="99";
		       send_data_udp.SS=temp_aotu_horn.join(',');
		        ipcRenderer.send('megfromwhere', {
		        				 send_data_udp
		        				})
		        
			break;

	

	}

//手动状态

});


function whichwu(element) {
	which_w = element.id;
	

	if(h_a == 1) {
		switch(which_w) {
			case 'horn_one': h_one=1;
			    temp_aotu_horn[1]="0"; 
			$("#horn_one").css("background-color", arr4[2]);
				$("#horn_two").css("background-color", arr4[1]);
				$("#horn_three").css("background-color", arr4[1]);
				$("#horn_four").css("background-color", arr4[1]);
				$("#horn_five").css("background-color", arr4[1]);
				$("#horn_six").css("background-color", arr4[1]);
				$("#horn_seven").css("background-color", arr4[1]);
				$("#horn_eight").css("background-color", arr4[1]);
				break;
			case 'horn_two':h_two=1;
			temp_aotu_horn[1]="1"; 
					$("#horn_two").css("background-color", arr4[2]);
				$("#horn_one").css("background-color", arr4[1]);
				$("#horn_three").css("background-color", arr4[1]);
				$("#horn_four").css("background-color", arr4[1]);
				$("#horn_five").css("background-color", arr4[1]);
				$("#horn_six").css("background-color", arr4[1]);
				$("#horn_seven").css("background-color", arr4[1]);
				$("#horn_eight").css("background-color", arr4[1]);
				break;
			case "horn_three":h_thr=1;
			temp_aotu_horn[1]="2"; 
				$("#horn_three").css("background-color", arr4[2]);
				$("#horn_one").css("background-color", arr4[1]);
				$("#horn_two").css("background-color", arr4[1]);
				$("#horn_four").css("background-color", arr4[1]);
				$("#horn_five").css("background-color", arr4[1]);
				$("#horn_six").css("background-color", arr4[1]);
				$("#horn_seven").css("background-color", arr4[1]);
				$("#horn_eight").css("background-color", arr4[1]);
				break;
			case 'horn_four':h_fo=1;
			temp_aotu_horn[1]="3"; 
				$("#horn_one").css("background-color", arr4[1]);
				$("#horn_two").css("background-color", arr4[1]);
				$("#horn_three").css("background-color", arr4[1]);
				$("#horn_four").css("background-color", arr4[2]);
				$("#horn_five").css("background-color", arr4[1]);
				$("#horn_six").css("background-color", arr4[1]);
				$("#horn_seven").css("background-color", arr4[1]);
				$("#horn_eight").css("background-color", arr4[1]);
				break;
			case 'horn_five':h_fi=1;
			temp_aotu_horn[1]="4"; 
				$("#horn_two").css("background-color", arr4[1]);
				$("#horn_one").css("background-color", arr4[1]);
				$("#horn_three").css("background-color", arr4[1]);
				$("#horn_four").css("background-color", arr4[1]);
				$("#horn_five").css("background-color", arr4[2]);
				$("#horn_six").css("background-color", arr4[1]);
				$("#horn_seven").css("background-color", arr4[1]);
				$("#horn_eight").css("background-color", arr4[1]);
				break;
			case "horn_six":h_si=1
			temp_aotu_horn[1]="5"; 
				$("#horn_three").css("background-color", arr4[1]);
				$("#horn_one").css("background-color", arr4[1]);
				$("#horn_two").css("background-color", arr4[1]);
				$("#horn_four").css("background-color", arr4[1]);
				$("#horn_five").css("background-color", arr4[1]);
				$("#horn_six").css("background-color", arr4[2]);
				$("#horn_seven").css("background-color", arr4[1]);
				$("#horn_eight").css("background-color", arr4[1]);
				break;
			case 'horn_seven':h_sev=1;
			temp_aotu_horn[1]="6"; 
				$("#horn_one").css("background-color", arr4[1]);
				$("#horn_two").css("background-color", arr4[1]);
				$("#horn_three").css("background-color", arr4[1]);
				$("#horn_four").css("background-color", arr4[1]);
				$("#horn_five").css("background-color", arr4[1]);
				$("#horn_six").css("background-color", arr4[1]);
				$("#horn_seven").css("background-color", arr4[2]);
				$("#horn_eight").css("background-color", arr4[1]);
				break;
			case 'horn_eight':h_eig=1;
			temp_aotu_horn[1]="7"; 
				$("#horn_two").css("background-color", arr4[1]);
				$("#horn_one").css("background-color", arr4[1]);
				$("#horn_three").css("background-color", arr4[1]);
				$("#horn_four").css("background-color", arr4[1]);
				$("#horn_five").css("background-color", arr4[1]);
				$("#horn_six").css("background-color", arr4[1]);
				$("#horn_seven").css("background-color", arr4[1]);
				$("#horn_eight").css("background-color", arr4[2]);
				break;
		
		}
		
			send_data_udp.SS=temp_aotu_horn.join(",");
			ipcRenderer.send('megfromwhere', {
			    				 send_data_udp
			    				})
		
		

	}

}

function whichtime(element){
	which_time = element.id;
	if(h_a == 1) {
		switch(which_time){
			case '60':temp_aotu_horn[2]="6"; 
			$("#60").css("background-color", arr4[2]);
			          $("#90").css("background-color", arr4[1]);
				 	  $("#120").css("background-color", arr4[1]);break;
		
			case '90':
			temp_aotu_horn[2]="9"; $("#90").css("background-color", arr4[2]);
			          $("#60").css("background-color", arr4[1]);
				 	  $("#120").css("background-color", arr4[1]);break;
		
			case '120':
			temp_aotu_horn[2]="12"; $("#120").css("background-color", arr4[2]);
			          $("#60").css("background-color", arr4[1]);
				 	  $("#90").css("background-color", arr4[1]);break;
		}		
	
	}

send_data_udp.SS=temp_aotu_horn.join(",");
ipcRenderer.send('megfromwhere', {
		        				 send_data_udp
		        				})

}


start_wu = window.document.getElementById("start_wu");

start_wu.ontouchstart = function(e){
	
        tid_wu = setInterval(function(){
         if(h_a == 0){
         	temp_headle[0]="WU";
        temp_headle[1]="1";
        $("#start_wu").css("background-color", arr4[2]);   
          send_data_udp.SS=temp_headle.join(",");
         ipcRenderer.send('megfromwhere', {
         				 send_data_udp
         				})
           }
        },50);
      
        
      };

start_wu.ontouchend = function(e){
         
        clearInterval(tid_wu);
         if(h_a == 0){
         	temp_headle[0]="WU";
         	temp_headle[1]="0";
        $("#start_wu").css("background-color", arr3[1]);  
          send_data_udp.SS=temp_headle.join(",");
		  
		  ipcRenderer.send('megfromwhere', {
		  				 send_data_udp
		  				})
        }
         
         
      };



 window.document.getElementById("start_ling").ontouchstart = function(e){
        tid = setInterval(function(){
           if(h_a == 0){
           	temp_headle[0]="LING";
         	temp_headle[1]="1";
        $("#start_ling").css("background-color", arr4[2]);   
           send_data_udp.SS=temp_headle.join(",");
		   ipcRenderer.send('megfromwhere', {
		   				 send_data_udp
		   				})
           
           }
        },50);
       
    };

 window.document.getElementById("start_ling").ontouchend = function(e){
         
        clearInterval(tid);
        if(h_a == 0){
        	temp_headle[0]="LING";
         	temp_headle[1]="0";
        	 $("#start_ling").css("background-color", arr3[1]);   
        	 send_data_udp.SS=temp_headle.join(",");
			 ipcRenderer.send('megfromwhere', {
			 				 send_data_udp
			 				})
        }
       
   };


window.document.getElementById("start_luo").ontouchstart = function(e){
       tid = setInterval(function(){
           if(h_a == 0){
           	temp_headle[0]="LOU";
         	temp_headle[1]="1";
        $("#start_luo").css("background-color", arr4[2]);
       console.log(temp_headle);
           send_data_udp.SS=temp_headle.join(",");
		   ipcRenderer.send('megfromwhere', {
		   				 send_data_udp
		   				})
           
           }
        },50);
       
    };

 window.document.getElementById("start_luo").ontouchend = function(e){
         
        clearInterval(tid);
        if(h_a == 0){
        	temp_headle[0]="LOU";
         	temp_headle[1]="0";
        	 $("#start_luo").css("background-color", arr3[1]);   
        	 send_data_udp.SS=temp_headle.join(",");
			 ipcRenderer.send('megfromwhere', {
			 				 send_data_udp
			 				})
        	  
        }
       
   };



