const {remote, clipboard, ipcRenderer } = require('electron');

var temp_line = -1;
//每个缆绳                   状态    payout
var send_data_udp={"id":"7","LINE":""}; 

//               是否被选中  payout paystop heave  force length
var line_which = [["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"]];
var payoutf=0;// 判断是否可以点击payout
var paystopf=0;
var yes_flage=0;
var flage_ALG_LINE=0;
var temp_data_line=["","","-1"];

var flagstart=0;

function EightStruct(){};
var eightstruct = new EightStruct();
eightstruct.line_1=0;

var paystop=0;
var payout=0;

	function init(){
		 temp_line = -1;
		//每个缆绳                   状态    payout
		 send_data_udp={"id":"7","LINE":""}; 
		
		//               是否被选中  payout paystop heave  force length
		 line_which = [["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"]];
		 payoutf=0;// 判断是否可以点击payout
		 paystopf=0;
		 yes_flage=0;
		 flage_ALG_LINE=0;
		 temp_data_line=["","","-1"];
		
		 flagstart=0;
		
		
		eightstruct.line_1=0;
		
		 paystop=0;
		 payout=0;
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
   
   
var show_line=obj.LINE.split(",");
if(show_line[0]!="99"){
	//賦值
line_which[parseInt(show_line[0])][4]=show_line[1];
line_which[parseInt(show_line[0])][5]=show_line[2];
}

show_line=null;
if(flage_ALG_LINE==1){
line_which = [["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"]];

}
	
  })





$("#line_1").click(function() {

payoutf = 1;
	flage_ALG_LINE=0;	
	yes_flage=1;

	switch (temp_line){
		case -1:
		
		temp_line=1;
		 
	 $("#line_yes").css("background-color", arr4[1]);	
	 $("#line_let_go").css("background-color", arr4[1]);	
	 $("#line_"+temp_line).css("background-color", arr4[2]);
		
		
			break;

		default:
		
		if(line_which[temp_line][0]=="1"){//説明被yes一遍了
			//temp变红
			 $("#line_"+temp_line).css("background-color", arr4[3]);
		}else{
			// temp 黄色
			$("#line_"+temp_line).css("background-color", arr4[1]);
		}
		temp_line=1;
		
          
		
		
		
		
		if(line_which[temp_line][0]=="1"){
		if(line_which[temp_line][1]=="1"){	
		       
	  		  temp_data_line[1]=temp_line;
			 
			  if(line_which[temp_line][3] !="-1"){
				  temp_data_line[0]="PS2";
				  temp_data_line[2]=(line_which[temp_line][3]).charAt(6);
			  }else{
				   temp_data_line[0]="P2";
				   temp_data_line[2]=line_which[temp_line][3];
			  }
	  		  send_data_udp.LINE=temp_data_line.join(",");
			  ipcRenderer.send('megfromwhere', {
			  				 send_data_udp
			  				})
	  		  $("#payout").css("background-color", arr4[2]);
  		  
  		  
			}else{
				
			 $("#payout").css("background-color", arr4[1]);	
				
			}
			if(line_which[temp_line][2]=="1"){
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[1]);
  		    $("#line_let_go").css("background-color", arr4[1]); 
			$("#payout").css("background-color", arr4[1]);
			$("#paystop").css("background-color", arr4[2]);	
			open_line();
			console.log(line_which[temp_line][3]);
			$("#"+line_which[temp_line][3]).css("background-color", arr4[2]);	
			return ;	
			}else{
			
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[0]);
  		    $("#line_let_go").css("background-color", arr4[1]); 	
			$("#paystop").css("background-color", arr4[1]);
			close_line();
			}
			
			
			
		}else{
		
		
		$("#line_"+temp_line).css("background-color", arr4[2]);
		$("#line_yes").css("background-color", arr4[1]);
  		$("#line_let_go").css("background-color", arr4[1]);
  		close_line();
  		$("#payout").css("background-color", arr4[0]);
  		$("#paystop").css("background-color", arr4[0]);
		}
			
			break;
	}
	
});



$("#payout").click(function() {
	if((yes_flage==1)&&(payoutf == 1)){
	if(line_which[temp_line][0]=="1"){
		if(line_which[temp_line][1]=="1"){
			line_which[temp_line][2]="0";
			close_line();
			$("#line_yes").css("background-color", arr4[0]);
			$("#paystop").css("background-color", arr4[1]);
  			$("#payout").css("background-color", arr4[2]);
  			temp_data_line[0]="PO";
			temp_data_line[1]=temp_line;
  			send_data_udp.LINE=temp_data_line.join(",");
  			 ipcRenderer.send('megfromwhere', {
  			 				 send_data_udp
  			 				})
			return;
		}
	line_which[temp_line][1]="1";
  	$("#paystop").css("background-color", arr4[1]);
  	$("#payout").css("background-color", arr4[2]);
  	$("#line_let_go").css("background-color", arr4[1]);
  	$("#line_"+temp_line).css("background-color", arr4[2]);
  	
  	temp_data_line[0]="PO";
	temp_data_line[1]=temp_line;
  send_data_udp.LINE=temp_data_line.join(",");
    ipcRenderer.send('megfromwhere', {
    				 send_data_udp
    				})
	}
	
	}
	
});

$("#paystop").click(function() {
	if(yes_flage==1){
	
if(line_which[temp_line][1]=="1"){
	line_which[temp_line][2]="1";
	$("#paystop").css("background-color", arr4[2]);
	$("#payout").css("background-color", arr4[1]);
	$("#line_yes").css("background-color", arr4[1]);
	open_line();
	  temp_data_line[0]="PS";
	temp_data_line[1]=temp_line;
  	send_data_udp.LINE=temp_data_line.join(",");
  	 ipcRenderer.send('megfromwhere', {
  	 				 send_data_udp
  	 				})
	
}
}
	
	
});


$("#line_yes").click(function() {
 
    if(line_which[temp_line][0]=="0"){
    	
  	line_which[temp_line][0]="1";
  	$("#line_yes").css("background-color", arr4[0]);
  	$("#line_let_go").css("background-color", arr4[0]);
  	$("#line_"+temp_line).css("background-color", arr4[3]);
  	
  	temp_data_line[0]="YES";
  	temp_data_line[1]=temp_line;
	temp_data_line[2]='-1';
  send_data_udp.LINE=temp_data_line.join(",");
  ipcRenderer.send('megfromwhere', {
  				 send_data_udp
  				})
 
  	
  }
    if(line_which[temp_line][2]=="1"){
	    close_line();
	    $("#paystop").css("background-color", arr4[0]);
	    $("#payout").css("background-color", arr4[0]);
	  	$("#line_yes").css("background-color", arr4[0]);
	  	$("#line_let_go").css("background-color", arr4[0]);
	  	$("#line_"+temp_line).css("background-color", arr4[3]);  
	  	  	temp_data_line[0]="FORCE";
  			temp_data_line[1]=temp_line;
			if(line_which[temp_line][3] !="-1"){
							 
							  temp_data_line[2]=(line_which[temp_line][3]).charAt(6);
			}else{
							  
							   temp_data_line[2]=line_which[temp_line][3];
			}
  			send_data_udp.LINE=temp_data_line.join(",");
  			ipcRenderer.send('megfromwhere', {
  							 send_data_udp
  							})
  		
  			
	  	yes_flage=0;
    	}
	payoutf=0;
  });


$("#line_let_go").click(function() {
	if(payoutf == 1 ){
		 $("#line_"+temp_line).css("background-color", arr4[1]);
	     line_which[temp_line]=["0","0","0","-1","0.00","0.00"];
         $("#paystop").css("background-color", arr4[0]);
	    $("#payout").css("background-color", arr4[0]);
	  	$("#line_yes").css("background-color", arr4[0]);
	  	$("#line_let_go").css("background-color", arr4[0]);
	      close_line();
	    
	     
	      temp_data_line[0]="LG";
  		  temp_data_line[1]=temp_line;
  		  send_data_udp.LINE=temp_data_line.join(",");
  			ipcRenderer.send('megfromwhere', {
  							 send_data_udp
  							})
	}
		payoutf=0;
});
$("#line_let_all").click(function() {
	 $("#line_0").css("background-color", arr4[1]);
	 $("#line_1").css("background-color", arr4[1]);
	 $("#line_2").css("background-color", arr4[1]);
	 $("#line_3").css("background-color", arr4[1]);
	 $("#line_4").css("background-color", arr4[1]);
	 $("#line_5").css("background-color", arr4[1]);
	 $("#line_6").css("background-color", arr4[1]);
	 $("#line_7").css("background-color", arr4[1]);
	 $("#line_8").css("background-color", arr4[1]);
	 $("#line_9").css("background-color", arr4[1]);
	 $("#line_10").css("background-color", arr4[1]);
	 $("#line_11").css("background-color", arr4[1]);
	 $("#line_12").css("background-color", arr4[1]);
	 $("#line_13").css("background-color", arr4[1]);
	 $("#line_14").css("background-color", arr4[1]);
	 $("#line_15").css("background-color", arr4[1]);
	 $("#line_16").css("background-color", arr4[1]);
	 $("#line_17").css("background-color", arr4[1]);
	 
	 
	 
	 
	     line_which = [["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"],["0","0","0","-1","0.00","0.00"]];
         $("#paystop").css("background-color", arr4[0]);
	    $("#payout").css("background-color", arr4[0]);
	  	$("#line_yes").css("background-color", arr4[0]);
	  	$("#line_let_go").css("background-color", arr4[0]);
	      close_line();
  			send_data_udp.LINE="ALG";
			ipcRenderer.send('megfromwhere', {
							 send_data_udp
							})
	      flage_ALG_LINE=1;
	    payoutf=0;
		
});


function open_line(){
	   
  		  
	    $("#heave_0").css("background-color", arr4[1]);
		$("#heave_1").css("background-color", arr4[1]);
		$("#heave_2").css("background-color", arr4[1]);
		$("#stops_3").css("background-color", arr4[1]);
		$("#slack_4").css("background-color", arr4[1]);
		$("#slack_5").css("background-color", arr4[1]);
		$("#slack_6").css("background-color", arr4[1]);
		
		
		
	
	
}
function close_line(){
	   
	    $("#heave_0").css("background-color", arr4[0]);
		$("#heave_1").css("background-color", arr4[0]);
		$("#heave_2").css("background-color", arr4[0]);
		$("#stops_3").css("background-color", arr4[0]);
		$("#slack_4").css("background-color", arr4[0]);
		$("#slack_5").css("background-color", arr4[0]);
		$("#slack_6").css("background-color", arr4[0]);
	
	
}

$("#line_0").click(function() {


		payoutf = 1;
	flage_ALG_LINE=0;
yes_flage=1;
	switch (temp_line){
		case -1:
		
		temp_line=0;
		 
	 $("#line_yes").css("background-color", arr4[1]);	
	 $("#line_let_go").css("background-color", arr4[1]);	
	 $("#line_"+temp_line).css("background-color", arr4[2]);
		
		
			break;

		default:
		
		if(line_which[temp_line][0]=="1"){//説明被yes一遍了
			//temp变红
			 $("#line_"+temp_line).css("background-color", arr4[3]);
		}else{
			// temp 黄色
			$("#line_"+temp_line).css("background-color", arr4[1]);
		}
		temp_line=0;
		
		  
		if(line_which[temp_line][0]=="1"){
		if(line_which[temp_line][1]=="1"){
	   
  		  temp_data_line[1]=temp_line;
		 if(line_which[temp_line][3] !="-1"){
		  				  temp_data_line[0]="PS2";
		  				  temp_data_line[2]=(line_which[temp_line][3]).charAt(6);
		  }else{
		  				   temp_data_line[0]="P2";
		  				   temp_data_line[2]=line_which[temp_line][3];
		  }
  		  send_data_udp.LINE=temp_data_line.join(",");
		  ipcRenderer.send('megfromwhere', {
		  				 send_data_udp
		  				})
  		  $("#payout").css("background-color", arr4[2]);
  		  
  		  
			}else{
				 $("#payout").css("background-color", arr4[1]);
			}
			if(line_which[temp_line][2]=="1"){
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[1]);
  		    $("#line_let_go").css("background-color", arr4[1]); 
			$("#payout").css("background-color", arr4[1]);
			$("#paystop").css("background-color", arr4[2]);	
			open_line();
			
			$("#"+line_which[temp_line][3]).css("background-color", arr4[2]);	
			return ;	
			}else{
			
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[0]);
  		    $("#line_let_go").css("background-color", arr4[1]); 	
			$("#paystop").css("background-color", arr4[1]);
			close_line();
			}
			
			
		}else{
		
		//没有被第一遍yes
		$("#line_"+temp_line).css("background-color", arr4[2]);
		$("#line_yes").css("background-color", arr4[1]);
  		$("#line_let_go").css("background-color", arr4[1]);
  		close_line();
  		$("#payout").css("background-color", arr4[0]);
  		$("#paystop").css("background-color", arr4[0]);
		}
		
		

			
			break;
	}
	
});




$("#heave_0").click(function() {
if(yes_flage==1){
if(line_which[temp_line][2]=="1"){
		$("#heave_0").css("background-color", arr4[2]);
		$("#heave_1").css("background-color", arr4[1]);
		$("#heave_2").css("background-color", arr4[1]);
		$("#stops_3").css("background-color", arr4[1]);
		$("#slack_4").css("background-color", arr4[1]);
		$("#slack_5").css("background-color", arr4[1]);
		$("#slack_6").css("background-color", arr4[1]);
	line_which[temp_line][3]="heave_0";
	
  			temp_data_line[2]="0";
  			
}
}
});
$("#heave_1").click(function() {
if(line_which[temp_line][2]=="1"){
	if(yes_flage==1){
		$("#heave_0").css("background-color", arr4[1]);
		$("#heave_1").css("background-color", arr4[2]);
		$("#heave_2").css("background-color", arr4[1]);
		$("#stops_3").css("background-color", arr4[1]);
		$("#slack_4").css("background-color", arr4[1]);
		$("#slack_5").css("background-color", arr4[1]);
		$("#slack_6").css("background-color", arr4[1]);
			line_which[temp_line][3]="heave_1";
			temp_data_line[2]="1";
}
}
});
$("#heave_2").click(function() {
if(line_which[temp_line][2]=="1"){
		if(yes_flage==1){
		$("#heave_0").css("background-color", arr4[1]);
		$("#heave_1").css("background-color", arr4[1]);
		$("#heave_2").css("background-color", arr4[2]);
		$("#stops_3").css("background-color", arr4[1]);
		$("#slack_4").css("background-color", arr4[1]);
		$("#slack_5").css("background-color", arr4[1]);
		$("#slack_6").css("background-color", arr4[1]);
			line_which[temp_line][3]="heave_2";
			temp_data_line[2]="2";
}
}
});

$("#stops_3").click(function() {
if(yes_flage==1){
	if(line_which[temp_line][2]=="1"){
		$("#heave_0").css("background-color", arr4[1]);
		$("#heave_1").css("background-color", arr4[1]);
		$("#heave_2").css("background-color", arr4[1]);
		$("#stops_3").css("background-color", arr4[3]);
		$("#slack_4").css("background-color", arr4[1]);
		$("#slack_5").css("background-color", arr4[1]);
		$("#slack_6").css("background-color", arr4[1]);
			line_which[temp_line][3]="stops_3";
			temp_data_line[2]="3";
	}
}
});

$("#slack_4").click(function() {
if(yes_flage==1){
	if(line_which[temp_line][2]=="1"){
		$("#heave_0").css("background-color", arr4[1]);
		$("#heave_1").css("background-color", arr4[1]);
		$("#heave_2").css("background-color", arr4[1]);
		$("#stops_3").css("background-color", arr4[1]);
		$("#slack_4").css("background-color", arr4[3]);
		$("#slack_5").css("background-color", arr4[1]);
		$("#slack_6").css("background-color", arr4[1]);
			line_which[temp_line][3]="slack_4";
			temp_data_line[2]="4";
	}
}
});
$("#slack_5").click(function() {
if(yes_flage==1){
		if(line_which[temp_line][2]=="1"){
		$("#heave_0").css("background-color", arr4[1]);
		$("#heave_1").css("background-color", arr4[1]);
		$("#heave_2").css("background-color", arr4[1]);
		$("#stops_3").css("background-color", arr4[1]);
		$("#slack_4").css("background-color", arr4[1]);
		$("#slack_5").css("background-color", arr4[3]);
		$("#slack_6").css("background-color", arr4[1]);
		line_which[temp_line][3]="slack_5";
		temp_data_line[2]="5";
	}
}
});
$("#slack_6").click(function() {
	if(yes_flage==1){
if(line_which[temp_line][2]=="1"){
	
		$("#heave_0").css("background-color", arr4[1]);
		$("#heave_1").css("background-color", arr4[1]);
		$("#heave_2").css("background-color", arr4[1]);
		$("#stops_3").css("background-color", arr4[1]);
		$("#slack_4").css("background-color", arr4[1]);
		$("#slack_5").css("background-color", arr4[1]);
		$("#slack_6").css("background-color", arr4[3]);
		line_which[temp_line][3]="slack_6";
		temp_data_line[2]="6";
	
}
}
});
$("#line_8").click(function() {
flage_ALG_LINE=0;
	yes_flage=1;	
		payoutf = 1;
	

	switch (temp_line){
		case -1:
		
		temp_line=8;//、、
		 
	 $("#line_yes").css("background-color", arr4[1]);	
	 $("#line_let_go").css("background-color", arr4[1]);	
	 $("#line_"+temp_line).css("background-color", arr4[2]);
		
		
			break;

		default:
		
		if(line_which[temp_line][0]=="1"){//説明被yes一遍了
			//temp变红
			 $("#line_"+temp_line).css("background-color", arr4[3]);
		}else{
			// temp 黄色
			$("#line_"+temp_line).css("background-color", arr4[1]);
		}
		temp_line=8;
	
		if(line_which[temp_line][0]=="1"){	
			if(line_which[temp_line][1]=="1"){	
		      
	  		  temp_data_line[1]=temp_line;
			 if(line_which[temp_line][3] !="-1"){
			  				  temp_data_line[0]="PS2";
			  				  temp_data_line[2]=(line_which[temp_line][3]).charAt(6);
			  }else{
			  				   temp_data_line[0]="P2";
			  				   temp_data_line[2]=line_which[temp_line][3];
			  }
	  		  send_data_udp.LINE=temp_data_line.join(",");
			  ipcRenderer.send('megfromwhere', {
			  				 send_data_udp
			  				})
	  		  $("#payout").css("background-color", arr4[2]);
  		  
  		  
			}else{
				
			 $("#payout").css("background-color", arr4[1]);	
				
			}
			if(line_which[temp_line][2]=="1"){
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[1]);
  		    $("#line_let_go").css("background-color", arr4[1]); 
			$("#payout").css("background-color", arr4[1]);
			$("#paystop").css("background-color", arr4[2]);	
			open_line();
			
			$("#"+line_which[temp_line][3]).css("background-color", arr4[2]);	
			return ;	
			}else{
			
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[0]);
  		    $("#line_let_go").css("background-color", arr4[1]); 	
			$("#paystop").css("background-color", arr4[1]);
			close_line();
			}
			
			
		}else{
		
		//没有被第一遍yes
		$("#line_"+temp_line).css("background-color", arr4[2]);
		$("#line_yes").css("background-color", arr4[1]);
  		$("#line_let_go").css("background-color", arr4[1]);
  		close_line();
  		$("#payout").css("background-color", arr4[0]);
  		$("#paystop").css("background-color", arr4[0]);
		}
		
		

			
			break;
	}
	
});
$("#line_7").click(function() {//、、、、
flage_ALG_LINE=0;
		payoutf = 1;
		yes_flage=1;
	

	switch (temp_line){
		case -1:
		
		temp_line=7;//、、
		 
	 $("#line_yes").css("background-color", arr4[1]);	
	 $("#line_let_go").css("background-color", arr4[1]);	
	 $("#line_"+temp_line).css("background-color", arr4[2]);
		
		
			break;

		default:
		
		if(line_which[temp_line][0]=="1"){//説明被yes一遍了
			//temp变红
			 $("#line_"+temp_line).css("background-color", arr4[3]);
		}else{
			// temp 黄色
			$("#line_"+temp_line).css("background-color", arr4[1]);
		}
		temp_line=7;
		
	
		if(line_which[temp_line][0]=="1"){
		if(line_which[temp_line][1]=="1"){	
		       temp_data_line[1]=temp_line;
		       if(line_which[temp_line][3] !="-1"){
		        				  temp_data_line[0]="PS2";
		        				  temp_data_line[2]=(line_which[temp_line][3]).charAt(6);
		        }else{
		        				   temp_data_line[0]="P2";
		        				   temp_data_line[2]=line_which[temp_line][3];
		        }
	  		  send_data_udp.LINE=temp_data_line.join(",");
			  ipcRenderer.send('megfromwhere', {
			  				 send_data_udp
			  				})
	  		  $("#payout").css("background-color", arr4[2]);
  		  
  		  
			}else{
				
			 $("#payout").css("background-color", arr4[1]);	
				
			}
			if(line_which[temp_line][2]=="1"){
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[1]);
  		    $("#line_let_go").css("background-color", arr4[1]); 
			$("#payout").css("background-color", arr4[1]);
			$("#paystop").css("background-color", arr4[2]);	
			open_line();
			
			$("#"+line_which[temp_line][3]).css("background-color", arr4[2]);	
			return ;	
			}else{
			
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[0]);
  		    $("#line_let_go").css("background-color", arr4[1]); 	
			$("#paystop").css("background-color", arr4[1]);
			close_line();
			}
			
			
		}else{
		
		//没有被第一遍yes
		$("#line_"+temp_line).css("background-color", arr4[2]);
		$("#line_yes").css("background-color", arr4[1]);
  		$("#line_let_go").css("background-color", arr4[1]);
  		close_line();
  		$("#payout").css("background-color", arr4[0]);
  		$("#paystop").css("background-color", arr4[0]);
		}
		
		

			
			break;
	}
	
});
$("#line_9").click(function() {//、、、、
flage_ALG_LINE=0;
		
		payoutf = 1;
	yes_flage=1;

	switch (temp_line){
		case -1:
		
		temp_line=9;//、、
		 
	 $("#line_yes").css("background-color", arr4[1]);	
	 $("#line_let_go").css("background-color", arr4[1]);	
	 $("#line_"+temp_line).css("background-color", arr4[2]);
		
		
			break;

		default:
		
		if(line_which[temp_line][0]=="1"){//説明被yes一遍了
			//temp变红
			 $("#line_"+temp_line).css("background-color", arr4[3]);
		}else{
			// temp 黄色
			$("#line_"+temp_line).css("background-color", arr4[1]);
		}
		temp_line=9;
		
		if(line_which[temp_line][0]=="1"){
			if(line_which[temp_line][1]=="1"){	
		       temp_data_line[1]=temp_line;
		       if(line_which[temp_line][3] !="-1"){
		        				  temp_data_line[0]="PS2";
		        				  temp_data_line[2]=(line_which[temp_line][3]).charAt(6);
		        }else{
		        				   temp_data_line[0]="P2";
		        				   temp_data_line[2]=line_which[temp_line][3];
		        }
	  		  send_data_udp.LINE=temp_data_line.join(",");
			  ipcRenderer.send('megfromwhere', {
			  				 send_data_udp
			  				})
	  		  $("#payout").css("background-color", arr4[2]);
  		  
  		  
			}else{
				
			 $("#payout").css("background-color", arr4[1]);	
				
			}
			if(line_which[temp_line][2]=="1"){
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[1]);
  		    $("#line_let_go").css("background-color", arr4[1]); 
			$("#payout").css("background-color", arr4[1]);
			$("#paystop").css("background-color", arr4[2]);	
			open_line();
			
			$("#"+line_which[temp_line][3]).css("background-color", arr4[2]);	
			return ;	
			}else{
			
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[0]);
  		    $("#line_let_go").css("background-color", arr4[1]); 	
			$("#paystop").css("background-color", arr4[1]);
			close_line();
			}
			
			
		}else{
		
		//没有被第一遍yes
		$("#line_"+temp_line).css("background-color", arr4[2]);
		$("#line_yes").css("background-color", arr4[1]);
  		$("#line_let_go").css("background-color", arr4[1]);
  		close_line();
  		$("#payout").css("background-color", arr4[0]);
  		$("#paystop").css("background-color", arr4[0]);
		}
		
		

			
			break;
	}
	
});
$("#line_6").click(function() {//、、、、
flage_ALG_LINE=0;
		payoutf = 1;
		yes_flage=1;
	

	switch (temp_line){
		case -1:
		
		temp_line=6;//、、
		 
	 $("#line_yes").css("background-color", arr4[1]);	
	 $("#line_let_go").css("background-color", arr4[1]);	
	 $("#line_"+temp_line).css("background-color", arr4[2]);
		
		
			break;

		default:
		
		if(line_which[temp_line][0]=="1"){//説明被yes一遍了
			//temp变红
			 $("#line_"+temp_line).css("background-color", arr4[3]);
		}else{
			// temp 黄色
			$("#line_"+temp_line).css("background-color", arr4[1]);
		}
		temp_line=6;
		
		
		if(line_which[temp_line][0]=="1"){
		if(line_which[temp_line][1]=="1"){	
		       temp_data_line[1]=temp_line;
		       if(line_which[temp_line][3] !="-1"){
		        				  temp_data_line[0]="PS2";
		        				  temp_data_line[2]=(line_which[temp_line][3]).charAt(6);
		        }else{
		        				   temp_data_line[0]="P2";
		        				   temp_data_line[2]=line_which[temp_line][3];
		        }
	  		  send_data_udp.LINE=temp_data_line.join(",");
			  ipcRenderer.send('megfromwhere', {
			  				 send_data_udp
			  				})
	  		  $("#payout").css("background-color", arr4[2]);
  		  
  		  
			}else{
				
			 $("#payout").css("background-color", arr4[1]);	
				
			}
			if(line_which[temp_line][2]=="1"){
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[1]);
  		    $("#line_let_go").css("background-color", arr4[1]); 
			$("#payout").css("background-color", arr4[1]);
			$("#paystop").css("background-color", arr4[2]);	
			open_line();
			
			$("#"+line_which[temp_line][3]).css("background-color", arr4[2]);	
			return ;	
			}else{
			
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[0]);
  		    $("#line_let_go").css("background-color", arr4[1]); 	
			$("#paystop").css("background-color", arr4[1]);
			close_line();
			}
			
			
		}else{
		
		//没有被第一遍yes
		$("#line_"+temp_line).css("background-color", arr4[2]);
		$("#line_yes").css("background-color", arr4[1]);
  		$("#line_let_go").css("background-color", arr4[1]);
  		close_line();
  		$("#payout").css("background-color", arr4[0]);
  		$("#paystop").css("background-color", arr4[0]);
		}
		
		

			
			break;
	}
	
});
$("#line_5").click(function() {//、、、、
flage_ALG_LINE=0;
		payoutf = 1;
	yes_flage=1;	
	

	switch (temp_line){
		case -1:
		
		temp_line=5;//、、
		 
	 $("#line_yes").css("background-color", arr4[1]);	
	 $("#line_let_go").css("background-color", arr4[1]);	
	 $("#line_"+temp_line).css("background-color", arr4[2]);
		
		
			break;

		default:
		
		if(line_which[temp_line][0]=="1"){//説明被yes一遍了
			//temp变红
			 $("#line_"+temp_line).css("background-color", arr4[3]);
		}else{
			// temp 黄色
			$("#line_"+temp_line).css("background-color", arr4[1]);
		}
		temp_line=5;
		
		if(line_which[temp_line][0]=="1"){
			if(line_which[temp_line][1]=="1"){	
		       temp_data_line[1]=temp_line;
		       if(line_which[temp_line][3] !="-1"){
		        				  temp_data_line[0]="PS2";
		        				  temp_data_line[2]=(line_which[temp_line][3]).charAt(6);
		        }else{
		        				   temp_data_line[0]="P2";
		        				   temp_data_line[2]=line_which[temp_line][3];
		        }
	  		  send_data_udp.LINE=temp_data_line.join(",");
			  ipcRenderer.send('megfromwhere', {
			  				 send_data_udp
			  				})
	  		  $("#payout").css("background-color", arr4[2]);
  		  
  		  
			}else{
				
			 $("#payout").css("background-color", arr4[1]);	
				
			}
			if(line_which[temp_line][2]=="1"){
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[1]);
  		    $("#line_let_go").css("background-color", arr4[1]); 
			$("#payout").css("background-color", arr4[1]);
			$("#paystop").css("background-color", arr4[2]);	
			open_line();
			
			$("#"+line_which[temp_line][3]).css("background-color", arr4[2]);	
			return ;	
			}else{
			
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[0]);
  		    $("#line_let_go").css("background-color", arr4[1]); 	
			$("#paystop").css("background-color", arr4[1]);
			close_line();
			}
			
			
			
		}else{
		
		//没有被第一遍yes
		$("#line_"+temp_line).css("background-color", arr4[2]);
		$("#line_yes").css("background-color", arr4[1]);
  		$("#line_let_go").css("background-color", arr4[1]);
  		close_line();
  		$("#payout").css("background-color", arr4[0]);
  		$("#paystop").css("background-color", arr4[0]);
		}
		
		

			
			break;
	}
	
});
$("#line_4").click(function() {//、、、、
payoutf = 1;
	flage_ALG_LINE=0;	
		
	yes_flage=1;

	switch (temp_line){
		case -1:
		
		temp_line=4;//、、
		 
	 $("#line_yes").css("background-color", arr4[1]);	
	 $("#line_let_go").css("background-color", arr4[1]);	
	 $("#line_"+temp_line).css("background-color", arr4[2]);
		
		
			break;

		default:
		
		if(line_which[temp_line][0]=="1"){//説明被yes一遍了
			//temp变红
			 $("#line_"+temp_line).css("background-color", arr4[3]);
		}else{
			// temp 黄色
			$("#line_"+temp_line).css("background-color", arr4[1]);
		}
		temp_line=4;
		
		
		if(line_which[temp_line][0]=="1"){
			if(line_which[temp_line][1]=="1"){	
		       temp_data_line[1]=temp_line;
		       if(line_which[temp_line][3] !="-1"){
		        				  temp_data_line[0]="PS2";
		        				  temp_data_line[2]=(line_which[temp_line][3]).charAt(6);
		        }else{
		        				   temp_data_line[0]="P2";
		        				   temp_data_line[2]=line_which[temp_line][3];
		        }
	  		  send_data_udp.LINE=temp_data_line.join(",");
			  ipcRenderer.send('megfromwhere', {
			  				 send_data_udp
			  				})
	  		  $("#payout").css("background-color", arr4[2]);
  		  
  		  
			}else{
				
			 $("#payout").css("background-color", arr4[1]);	
				
			}
			if(line_which[temp_line][2]=="1"){
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[1]);
  		    $("#line_let_go").css("background-color", arr4[1]); 
			$("#payout").css("background-color", arr4[1]);
			$("#paystop").css("background-color", arr4[2]);	
			open_line();
			
			$("#"+line_which[temp_line][3]).css("background-color", arr4[2]);	
			return ;	
			}else{
			
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[0]);
  		    $("#line_let_go").css("background-color", arr4[1]); 	
			$("#paystop").css("background-color", arr4[1]);
			close_line();
			}
			
			
			
		}else{
		
		//没有被第一遍yes
		$("#line_"+temp_line).css("background-color", arr4[2]);
		$("#line_yes").css("background-color", arr4[1]);
  		$("#line_let_go").css("background-color", arr4[1]);
  		close_line();
  		$("#payout").css("background-color", arr4[0]);
  		$("#paystop").css("background-color", arr4[0]);
		}
		
		

			
			break;
	}
	
});
$("#line_3").click(function() {//、、、、

	flage_ALG_LINE=0;	
		payoutf = 1;
	yes_flage=1;

	switch (temp_line){
		case -1:
		
		temp_line=3;//、、
		 
	 $("#line_yes").css("background-color", arr4[1]);	
	 $("#line_let_go").css("background-color", arr4[1]);	
	 $("#line_"+temp_line).css("background-color", arr4[2]);
		
		
			break;

		default:
		
		if(line_which[temp_line][0]=="1"){//説明被yes一遍了
			//temp变红
			 $("#line_"+temp_line).css("background-color", arr4[3]);
		}else{
			// temp 黄色
			$("#line_"+temp_line).css("background-color", arr4[1]);
		}
		temp_line=3;
		
	
		if(line_which[temp_line][0]=="1"){
			if(line_which[temp_line][1]=="1"){	
		       temp_data_line[1]=temp_line;
		       if(line_which[temp_line][3] !="-1"){
		        				  temp_data_line[0]="PS2";
		        				  temp_data_line[2]=(line_which[temp_line][3]).charAt(6);
		        }else{
		        				   temp_data_line[0]="P2";
		        				   temp_data_line[2]=line_which[temp_line][3];
		        }
	  		  send_data_udp.LINE=temp_data_line.join(",");
			  ipcRenderer.send('megfromwhere', {
			  				 send_data_udp
			  				})
	  		  $("#payout").css("background-color", arr4[2]);
  		  
  		  
			}else{
				
			 $("#payout").css("background-color", arr4[1]);	
				
			}
			if(line_which[temp_line][2]=="1"){
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[1]);
  		    $("#line_let_go").css("background-color", arr4[1]); 
			$("#payout").css("background-color", arr4[1]);
			$("#paystop").css("background-color", arr4[2]);	
			open_line();
			
			$("#"+line_which[temp_line][3]).css("background-color", arr4[2]);	
			return ;	
			}else{
			
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[0]);
  		    $("#line_let_go").css("background-color", arr4[1]); 	
			$("#paystop").css("background-color", arr4[1]);
			close_line();
			}
			
			
			
		}else{
		
		//没有被第一遍yes
		$("#line_"+temp_line).css("background-color", arr4[2]);
		$("#line_yes").css("background-color", arr4[1]);
  		$("#line_let_go").css("background-color", arr4[1]);
  		close_line();
  		$("#payout").css("background-color", arr4[0]);
  		$("#paystop").css("background-color", arr4[0]);
		}
		
		

			
			break;
	}
	
});
$("#line_2").click(function() {//、、、、

	flage_ALG_LINE=0;	
	yes_flage=1;	
	payoutf = 1;

	switch (temp_line){
		case -1:
		
		temp_line=2;//、、
		 
	 $("#line_yes").css("background-color", arr4[1]);	
	 $("#line_let_go").css("background-color", arr4[1]);	
	 $("#line_"+temp_line).css("background-color", arr4[2]);
		
		
			break;

		default:
		
		if(line_which[temp_line][0]=="1"){//説明被yes一遍了
			//temp变红
			 $("#line_"+temp_line).css("background-color", arr4[3]);
		}else{
			// temp 黄色
			$("#line_"+temp_line).css("background-color", arr4[1]);
		}
		temp_line=2;
		
		if(line_which[temp_line][0]=="1"){
			if(line_which[temp_line][1]=="1"){	
		       temp_data_line[1]=temp_line;
		       if(line_which[temp_line][3] !="-1"){
		        				  temp_data_line[0]="PS2";
		        				  temp_data_line[2]=(line_which[temp_line][3]).charAt(6);
		        }else{
		        				   temp_data_line[0]="P2";
		        				   temp_data_line[2]=line_which[temp_line][3];
		        }
	  		  send_data_udp.LINE=temp_data_line.join(",");
			  ipcRenderer.send('megfromwhere', {
			  				 send_data_udp
			  				})
	  		  $("#payout").css("background-color", arr4[2]);
  		  
  		  
			}else{
				
			 $("#payout").css("background-color", arr4[1]);	
				
			}
			if(line_which[temp_line][2]=="1"){
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[1]);
  		    $("#line_let_go").css("background-color", arr4[1]); 
			$("#payout").css("background-color", arr4[1]);
			$("#paystop").css("background-color", arr4[2]);	
			open_line();
			
			$("#"+line_which[temp_line][3]).css("background-color", arr4[2]);	
			return ;	
			}else{
			
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[0]);
  		    $("#line_let_go").css("background-color", arr4[1]); 	
			$("#paystop").css("background-color", arr4[1]);
			close_line();
			}
			
			
			
		}else{
		
		//没有被第一遍yes
		$("#line_"+temp_line).css("background-color", arr4[2]);
		$("#line_yes").css("background-color", arr4[1]);
  		$("#line_let_go").css("background-color", arr4[1]);
  		close_line();
  		$("#payout").css("background-color", arr4[0]);
  		$("#paystop").css("background-color", arr4[0]);
		}
		
		

			
			break;
	}
	
});
$("#line_10").click(function() {//、、、、
flage_ALG_LINE=0;
	yes_flage=1;	
		
	payoutf = 1;

	switch (temp_line){
		case -1:
		
		temp_line=10;//、、
		 
	 $("#line_yes").css("background-color", arr4[1]);	
	 $("#line_let_go").css("background-color", arr4[1]);	
	 $("#line_"+temp_line).css("background-color", arr4[2]);
		
		
			break;

		default:
		
		if(line_which[temp_line][0]=="1"){//説明被yes一遍了
			//temp变红
			 $("#line_"+temp_line).css("background-color", arr4[3]);
		}else{
			// temp 黄色
			$("#line_"+temp_line).css("background-color", arr4[1]);
		}
		temp_line=10;
		
		
		if(line_which[temp_line][0]=="1"){
		if(line_which[temp_line][1]=="1"){	
		       temp_data_line[1]=temp_line;
		       if(line_which[temp_line][3] !="-1"){
		        				  temp_data_line[0]="PS2";
		        				  temp_data_line[2]=(line_which[temp_line][3]).charAt(6);
		        }else{
		        				   temp_data_line[0]="P2";
		        				   temp_data_line[2]=line_which[temp_line][3];
		        }
	  		  send_data_udp.LINE=temp_data_line.join(",");
			  
			  ipcRenderer.send('megfromwhere', {
			  				 send_data_udp
			  				})
	  		  $("#payout").css("background-color", arr4[2]);
  		  
  		  
			}else{
				
			 $("#payout").css("background-color", arr4[1]);	
				
			}
			if(line_which[temp_line][2]=="1"){
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[1]);
  		    $("#line_let_go").css("background-color", arr4[1]); 
			$("#payout").css("background-color", arr4[1]);
			$("#paystop").css("background-color", arr4[2]);	
			open_line();
			
			$("#"+line_which[temp_line][3]).css("background-color", arr4[2]);	
			return ;	
			}else{
			
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[0]);
  		    $("#line_let_go").css("background-color", arr4[1]); 	
			$("#paystop").css("background-color", arr4[1]);
			close_line();
			}
			
			
			
		}else{
		
		//没有被第一遍yes
		$("#line_"+temp_line).css("background-color", arr4[2]);
		$("#line_yes").css("background-color", arr4[1]);
  		$("#line_let_go").css("background-color", arr4[1]);
  		close_line();
  		$("#payout").css("background-color", arr4[0]);
  		$("#paystop").css("background-color", arr4[0]);
		}
		
		

			
			break;
	}
	
});
$("#line_11").click(function() {//、、、、
flage_ALG_LINE=0;
	yes_flage=1;	
		
	payoutf = 1;

	switch (temp_line){
		case -1:
		
		temp_line=11;//、、
		 
	 $("#line_yes").css("background-color", arr4[1]);	
	 $("#line_let_go").css("background-color", arr4[1]);	
	 $("#line_"+temp_line).css("background-color", arr4[2]);
		
		
			break;

		default:
		
		if(line_which[temp_line][0]=="1"){//説明被yes一遍了
			//temp变红
			 $("#line_"+temp_line).css("background-color", arr4[3]);
		}else{
			// temp 黄色
			$("#line_"+temp_line).css("background-color", arr4[1]);
		}
		temp_line=11;
		
		if(line_which[temp_line][0]=="1"){
		if(line_which[temp_line][1]=="1"){	
		       temp_data_line[1]=temp_line;
		       if(line_which[temp_line][3] !="-1"){
		        				  temp_data_line[0]="PS2";
		        				  temp_data_line[2]=(line_which[temp_line][3]).charAt(6);
		        }else{
		        				   temp_data_line[0]="P2";
		        				   temp_data_line[2]=line_which[temp_line][3];
		        }
	  		  send_data_udp.LINE=temp_data_line.join(",");
			  
			  ipcRenderer.send('megfromwhere', {
			  				 send_data_udp
			  				})
	  		  $("#payout").css("background-color", arr4[2]);
  		  
  		  
			}else{
				
			 $("#payout").css("background-color", arr4[1]);	
				
			}
			if(line_which[temp_line][2]=="1"){
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[1]);
  		    $("#line_let_go").css("background-color", arr4[1]); 
			$("#payout").css("background-color", arr4[1]);
			$("#paystop").css("background-color", arr4[2]);	
			open_line();
			
			$("#"+line_which[temp_line][3]).css("background-color", arr4[2]);	
			return ;	
			}else{
			
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[0]);
  		    $("#line_let_go").css("background-color", arr4[1]); 	
			$("#paystop").css("background-color", arr4[1]);
			close_line();
			}
			
			
			
		}else{
		
		//没有被第一遍yes
		$("#line_"+temp_line).css("background-color", arr4[2]);
		$("#line_yes").css("background-color", arr4[1]);
  		$("#line_let_go").css("background-color", arr4[1]);
  		close_line();
  		$("#payout").css("background-color", arr4[0]);
  		$("#paystop").css("background-color", arr4[0]);
		}
		
		

			
			break;
	}
	
});
$("#line_12").click(function() {//、、、、

		flage_ALG_LINE=0;
		
	payoutf = 1;
yes_flage=1;
	switch (temp_line){
		case -1:
		
		temp_line=12;//、、
		 
	 $("#line_yes").css("background-color", arr4[1]);	
	 $("#line_let_go").css("background-color", arr4[1]);	
	 $("#line_"+temp_line).css("background-color", arr4[2]);
		
		
			break;

		default:
		
		if(line_which[temp_line][0]=="1"){//説明被yes一遍了
			//temp变红
			 $("#line_"+temp_line).css("background-color", arr4[3]);
		}else{
			// temp 黄色
			$("#line_"+temp_line).css("background-color", arr4[1]);
		}
		temp_line=12;
		
	
		if(line_which[temp_line][0]=="1"){
		if(line_which[temp_line][1]=="1"){	
		       temp_data_line[1]=temp_line;
		       if(line_which[temp_line][3] !="-1"){
		        				  temp_data_line[0]="PS2";
		        				  temp_data_line[2]=(line_which[temp_line][3]).charAt(6);
		        }else{
		        				   temp_data_line[0]="P2";
		        				   temp_data_line[2]=line_which[temp_line][3];
		        }
	  		  send_data_udp.LINE=temp_data_line.join(",");
			  ipcRenderer.send('megfromwhere', {
			  				 send_data_udp
			  				})
	  		  $("#payout").css("background-color", arr4[2]);
  		  
  		  
			}else{
				
			 $("#payout").css("background-color", arr4[1]);	
				
			}
			if(line_which[temp_line][2]=="1"){
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[1]);
  		    $("#line_let_go").css("background-color", arr4[1]); 
			$("#payout").css("background-color", arr4[1]);
			$("#paystop").css("background-color", arr4[2]);	
			open_line();
			
			$("#"+line_which[temp_line][3]).css("background-color", arr4[2]);	
			return ;	
			}else{
			
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[0]);
  		    $("#line_let_go").css("background-color", arr4[1]); 	
			$("#paystop").css("background-color", arr4[1]);
			close_line();
			}
			
			
			
		}else{
		
		//没有被第一遍yes
		$("#line_"+temp_line).css("background-color", arr4[2]);
		$("#line_yes").css("background-color", arr4[1]);
  		$("#line_let_go").css("background-color", arr4[1]);
  		close_line();
  		$("#payout").css("background-color", arr4[0]);
  		$("#paystop").css("background-color", arr4[0]);
		}
		
		

			
			break;
	}
	
});
$("#line_13").click(function() {//、、、、

		flage_ALG_LINE=0;
		yes_flage=1;
	payoutf = 1;

	switch (temp_line){
		case -1:
		
		temp_line=13;//、、
		 
	 $("#line_yes").css("background-color", arr4[1]);	
	 $("#line_let_go").css("background-color", arr4[1]);	
	 $("#line_"+temp_line).css("background-color", arr4[2]);
		
		
			break;

		default:
		
		if(line_which[temp_line][0]=="1"){//説明被yes一遍了
			//temp变红
			 $("#line_"+temp_line).css("background-color", arr4[3]);
		}else{
			// temp 黄色
			$("#line_"+temp_line).css("background-color", arr4[1]);
		}
		temp_line=13;
		
	
		if(line_which[temp_line][0]=="1"){
			if(line_which[temp_line][1]=="1"){	
		       temp_data_line[1]=temp_line;
		       if(line_which[temp_line][3] !="-1"){
		        				  temp_data_line[0]="PS2";
		        				  temp_data_line[2]=(line_which[temp_line][3]).charAt(6);
		        }else{
		        				   temp_data_line[0]="P2";
		        				   temp_data_line[2]=line_which[temp_line][3];
		        }
	  		  send_data_udp.LINE=temp_data_line.join(",");
			  ipcRenderer.send('megfromwhere', {
			  				 send_data_udp
			  				})
	  		  $("#payout").css("background-color", arr4[2]);
  		  
  		  
			}else{
				
			 $("#payout").css("background-color", arr4[1]);	
				
			}
			if(line_which[temp_line][2]=="1"){
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[1]);
  		    $("#line_let_go").css("background-color", arr4[1]); 
			$("#payout").css("background-color", arr4[1]);
			$("#paystop").css("background-color", arr4[2]);	
			open_line();
			
			$("#"+line_which[temp_line][3]).css("background-color", arr4[2]);	
			return ;	
			}else{
			
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[0]);
  		    $("#line_let_go").css("background-color", arr4[1]); 	
			$("#paystop").css("background-color", arr4[1]);
			close_line();
			}
			
			
			
		}else{
		
		//没有被第一遍yes
		$("#line_"+temp_line).css("background-color", arr4[2]);
		$("#line_yes").css("background-color", arr4[1]);
  		$("#line_let_go").css("background-color", arr4[1]);
  		close_line();
  		$("#payout").css("background-color", arr4[0]);
  		$("#paystop").css("background-color", arr4[0]);
		}
		
		

			
			break;
	}
	
});
$("#line_14").click(function() {//、、、、

		flage_ALG_LINE=0;
		payoutf = 1;
	yes_flage=1;

	switch (temp_line){
		case -1:
		
		temp_line=14;//、、
		 
	 $("#line_yes").css("background-color", arr4[1]);	
	 $("#line_let_go").css("background-color", arr4[1]);	
	 $("#line_"+temp_line).css("background-color", arr4[2]);
		
		
			break;

		default:
		
		if(line_which[temp_line][0]=="1"){//説明被yes一遍了
			//temp变红
			 $("#line_"+temp_line).css("background-color", arr4[3]);
		}else{
			// temp 黄色
			$("#line_"+temp_line).css("background-color", arr4[1]);
		}
		temp_line=14;
		
		if(line_which[temp_line][0]=="1"){
			if(line_which[temp_line][1]=="1"){	
		       temp_data_line[1]=temp_line;
		       if(line_which[temp_line][3] !="-1"){
		        				  temp_data_line[0]="PS2";
		        				  temp_data_line[2]=(line_which[temp_line][3]).charAt(6);
		        }else{
		        				   temp_data_line[0]="P2";
		        				   temp_data_line[2]=line_which[temp_line][3];
		        }
	  		  send_data_udp.LINE=temp_data_line.join(",");
			  ipcRenderer.send('megfromwhere', {
			  				 send_data_udp
			  				})
	  		  $("#payout").css("background-color", arr4[2]);
  		  
  		  
			}else{
				
			 $("#payout").css("background-color", arr4[1]);	
				
			}
			if(line_which[temp_line][2]=="1"){
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[1]);
  		    $("#line_let_go").css("background-color", arr4[1]); 
			$("#payout").css("background-color", arr4[1]);
			$("#paystop").css("background-color", arr4[2]);	
			open_line();
			
			$("#"+line_which[temp_line][3]).css("background-color", arr4[2]);	
			return ;	
			}else{
			
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[0]);
  		    $("#line_let_go").css("background-color", arr4[1]); 	
			$("#paystop").css("background-color", arr4[1]);
			close_line();
			}
			
			
			
		}else{
		
		//没有被第一遍yes
		$("#line_"+temp_line).css("background-color", arr4[2]);
		$("#line_yes").css("background-color", arr4[1]);
  		$("#line_let_go").css("background-color", arr4[1]);
  		close_line();
  		$("#payout").css("background-color", arr4[0]);
  		$("#paystop").css("background-color", arr4[0]);
		}
		
		

			
			break;
	}
	
});
$("#line_15").click(function() {//、、、、

	flage_ALG_LINE=0;	
		payoutf = 1;
	yes_flage=1;

	switch (temp_line){
		case -1:
		
		temp_line=15;//、、
		 
	 $("#line_yes").css("background-color", arr4[1]);	
	 $("#line_let_go").css("background-color", arr4[1]);	
	 $("#line_"+temp_line).css("background-color", arr4[2]);
		
		
			break;

		default:
		
		if(line_which[temp_line][0]=="1"){//説明被yes一遍了
			//temp变红
			 $("#line_"+temp_line).css("background-color", arr4[3]);
		}else{
			// temp 黄色
			$("#line_"+temp_line).css("background-color", arr4[1]);
		}
		temp_line=15;
	
		if(line_which[temp_line][0]=="1"){
			if(line_which[temp_line][1]=="1"){	
		      temp_data_line[1]=temp_line;
		      if(line_which[temp_line][3] !="-1"){
		       				  temp_data_line[0]="PS2";
		       				  temp_data_line[2]=(line_which[temp_line][3]).charAt(6);
		       }else{
		       				   temp_data_line[0]="P2";
		       				   temp_data_line[2]=line_which[temp_line][3];
		       }
	  		  send_data_udp.LINE=temp_data_line.join(",");
			  ipcRenderer.send('megfromwhere', {
			  				 send_data_udp
			  				})
	  		  $("#payout").css("background-color", arr4[2]);
  		  
  		  
			}else{
				
			 $("#payout").css("background-color", arr4[1]);	
				
			}
			if(line_which[temp_line][2]=="1"){
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[1]);
  		    $("#line_let_go").css("background-color", arr4[1]); 
			$("#payout").css("background-color", arr4[1]);
			$("#paystop").css("background-color", arr4[2]);	
			open_line();
			
			$("#"+line_which[temp_line][3]).css("background-color", arr4[2]);	
			return ;	
			}else{
			
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[0]);
  		    $("#line_let_go").css("background-color", arr4[1]); 	
			$("#paystop").css("background-color", arr4[1]);
			close_line();
			}
			
			
			
		}else{
		
		//没有被第一遍yes
		$("#line_"+temp_line).css("background-color", arr4[2]);
		$("#line_yes").css("background-color", arr4[1]);
  		$("#line_let_go").css("background-color", arr4[1]);
  		close_line();
  		$("#payout").css("background-color", arr4[0]);
  		$("#paystop").css("background-color", arr4[0]);
		}
		
		

			
			break;
	}
	
});
$("#line_16").click(function() {//、、、、
flage_ALG_LINE=0;
		yes_flage=1;
		
	payoutf = 1;

	switch (temp_line){
		case -1:
		
		temp_line=16;//、、
		 
	 $("#line_yes").css("background-color", arr4[1]);	
	 $("#line_let_go").css("background-color", arr4[1]);	
	 $("#line_"+temp_line).css("background-color", arr4[2]);
		
		
			break;

		default:
		
		if(line_which[temp_line][0]=="1"){//説明被yes一遍了
			//temp变红
			 $("#line_"+temp_line).css("background-color", arr4[3]);
		}else{
			// temp 黄色
			$("#line_"+temp_line).css("background-color", arr4[1]);
		}
		temp_line=16;
		
	
		if(line_which[temp_line][0]=="1"){
		if(line_which[temp_line][1]=="1"){	
		      temp_data_line[1]=temp_line;
		      if(line_which[temp_line][3] !="-1"){
		       				  temp_data_line[0]="PS2";
		       				  temp_data_line[2]=(line_which[temp_line][3]).charAt(6);
		       }else{
		       				   temp_data_line[0]="P2";
		       				   temp_data_line[2]=line_which[temp_line][3];
		       }
	  		  send_data_udp.LINE=temp_data_line.join(",");
			  ipcRenderer.send('megfromwhere', {
			  				 send_data_udp
			  				})
	  		  $("#payout").css("background-color", arr4[2]);
  		  
  		  
			}else{
				
			 $("#payout").css("background-color", arr4[1]);	
				
			}
			if(line_which[temp_line][2]=="1"){
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[1]);
  		    $("#line_let_go").css("background-color", arr4[1]); 
			$("#payout").css("background-color", arr4[1]);
			$("#paystop").css("background-color", arr4[2]);	
			open_line();
			
			$("#"+line_which[temp_line][3]).css("background-color", arr4[2]);	
			return ;	
			}else{
			
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[0]);
  		    $("#line_let_go").css("background-color", arr4[1]); 	
			$("#paystop").css("background-color", arr4[1]);
			close_line();
			}
			
			
			
		}else{
		
		//没有被第一遍yes
		$("#line_"+temp_line).css("background-color", arr4[2]);
		$("#line_yes").css("background-color", arr4[1]);
  		$("#line_let_go").css("background-color", arr4[1]);
  		close_line();
  		$("#payout").css("background-color", arr4[0]);
  		$("#paystop").css("background-color", arr4[0]);
		}
		
		

			
			break;
	}
	
});
$("#line_17").click(function() {//、、、、
payoutf = 1;
		flage_ALG_LINE=0;
		
	yes_flage=1;

	switch (temp_line){
		case -1:
		
		temp_line=17;//、、
		 
	 $("#line_yes").css("background-color", arr4[1]);	
	 $("#line_let_go").css("background-color", arr4[1]);	
	 $("#line_"+temp_line).css("background-color", arr4[2]);
		
		
			break;

		default:
		
		if(line_which[temp_line][0]=="1"){//説明被yes一遍了
			//temp变红
			 $("#line_"+temp_line).css("background-color", arr4[3]);
		}else{
			// temp 黄色
			$("#line_"+temp_line).css("background-color", arr4[1]);
		}
		temp_line=17;
		
		
		if(line_which[temp_line][0]=="1"){
			if(line_which[temp_line][1]=="1"){	
		       temp_data_line[1]=temp_line;
		       if(line_which[temp_line][3] !="-1"){
		        				  temp_data_line[0]="PS2";
		        				  temp_data_line[2]=(line_which[temp_line][3]).charAt(6);
		        }else{
		        				   temp_data_line[0]="P2";
		        				   temp_data_line[2]=line_which[temp_line][3];
		        }
	  		  send_data_udp.LINE=temp_data_line.join(",");
			  ipcRenderer.send('megfromwhere', {
			  				 send_data_udp
			  				})
	  		  $("#payout").css("background-color", arr4[2]);
  		  
  		  
			}else{
				
			 $("#payout").css("background-color", arr4[1]);	
				
			}
			if(line_which[temp_line][2]=="1"){
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[1]);
  		    $("#line_let_go").css("background-color", arr4[1]); 
			$("#payout").css("background-color", arr4[1]);
			$("#paystop").css("background-color", arr4[2]);	
			open_line();
			
			$("#"+line_which[temp_line][3]).css("background-color", arr4[2]);	
			return ;	
			}else{
			
			$("#line_"+temp_line).css("background-color", arr4[2]);
		    $("#line_yes").css("background-color", arr4[0]);
  		    $("#line_let_go").css("background-color", arr4[1]); 	
			$("#paystop").css("background-color", arr4[1]);
			close_line();
			}
			
			
		}else{
		
		//没有被第一遍yes
		$("#line_"+temp_line).css("background-color", arr4[2]);
		$("#line_yes").css("background-color", arr4[1]);
  		$("#line_let_go").css("background-color", arr4[1]);
  		close_line();
  		$("#payout").css("background-color", arr4[0]);
  		$("#paystop").css("background-color", arr4[0]);
		}
		
		

			
			break;
	}
	
});

//定时器显示

function clock(){
	
if(temp_line=="-1"){
$("#line_length").html("0.00");
$("#line_force").html("0.00");
}else{
	        if(yes_flage==0){
			$("#line_length").html("0.00");
            $("#line_force").html("0.00");
	        }else
	           {
		
			$("#line_length").html(line_which[parseInt(temp_line)][5]);
		     $("#line_force").html(line_which[parseInt(temp_line)][4]);
			}
	 
}
	

}
var int=self.setInterval("clock()",100);