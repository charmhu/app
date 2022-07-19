
 const {remote, clipboard, ipcRenderer } = require('electron');
 ipcRenderer.on('message-from-main', (event, arg) => {

  console.log("message from main");
  //
   needinit(JSON.parse(arg));
   rece_fromudp(JSON.parse(arg));
 
   })
  
  
  var hours = 0;
   var minutes = 0;
   var seconds = -1;
  var flage = 0;
  var timeId;
  
  
  function needinit(str)
  {
 if (str.WH == "100")
	 {
	 	window.clearInterval(timeId);
	 	hours = 0;
    	seconds = -1;
	 	flage = 0;
	 	drawScene();
	 }
	 else
	 {
	 	if(flage == 0)//这个时时钟的进入函数  比较特殊  只进入一次
	 	{
	 		hours=parseInt(str.WH);
	 		timeId = setInterval("drawScene()", 1000);
	 		flage=1;
	 	 }
	 }
	

	  
   }
  
  
  
  function rpm(str ,str1,str2){// 左  右 故
  
  
  console.log(str);
  	if((Number(str)<200)&&(Number(str)>-200))
	{
  		$("#rpm_1").css("z-index", 1);
		$("#rpm_2").css("z-index", -1);
  	if(str2 == "TRUE")//故障
  		{
  			document.gauges.get('radial-two').value='0';
  		}else{
  			console.log(str);
			document.gauges.get('radial-two').value=str;
  		}
  	}
	else{//换表
		$("#rpm_1").css("z-index", -1);
  		$("#rpm_2").css("z-index", 1);
  			if(str2 == "TRUE")
  				{
  					document.gauges.get('radial-two_2').value='0';
  				}else{
  					document.gauges.get('radial-two_2').value=str;
  				}
  			
  		
  	}
	console.log(str1);
	if((Number(str1)<200)&&(Number(str1)>-200))
	{
		$("#rpm_3").css("z-index", 1);
		$("#rpm_4").css("z-index", -1);
	if(str2 == "TRUE")//故障
		{
			document.gauges.get('radial-three').value='0';
		}else{
			console.log(str1);
			document.gauges.get('radial-three').value=str1;
		}
	}
	else{//换表
		$("#rpm_3").css("z-index", -1);
		$("#rpm_4").css("z-index", 1);
		
			if(str2 == "TRUE")
				{
					document.gauges.get('radial-three_2').value='0';
				}else{
					document.gauges.get('radial-three_2').value=str1;
				}
			
		
	}
  }
  function rece_fromudp(obj){
	  
	  //  //故障检测
	   
	   if((obj.WDF == "TRUE")||(obj.RAF == "TRUE")||(obj.SSF== "TRUE")||(obj.RPMF=="TRUE")){
		   document.body.style.backgroundColor="#380000";
		   
	   }
	   else
	   {
		   
		    document.body.style.backgroundColor="#000000";
	   }
	   
	   
	 if(obj.WDF == "TRUE"){//风向故障
		 
		 document.gauges.get('radial-one').value='0';
	
	 }
	 else{
		
		  document.gauges.get('radial-one').value=obj.WD;
	 }
	   		


 if(obj.RAF == "TRUE")
	{
	   		drawWord(0);
	}   
	else
	{
		drawWord(parseInt(obj.RUD));
	} 
			

 
  rpm(obj.LRPM, obj.RPM ,obj.RPMF);
  
  
if(obj.SSF== "TRUE")
	{
		document.gauges.get('radial-four').value='0';	
	}
	else
	{
		document.gauges.get('radial-four').value=obj.SPD;	
	}
  		
 
  
  
  document.gauges.get('radial-five').value=obj.WS;
  
  
	  if(obj.ROT > 200)
	  {
		  obj.ROT=200;
		
	  }
	  if(obj.ROT < -200)
	  {
		obj.ROT = -200;
	  }
	  document.gauges.get('radial-six').value=obj.ROT;
 
 
  }
  
  // inner variables
  var canvas, ctx;
  var clockRadius = 230;
  var clockImage;
  
  // draw functions :
  function clear() { // clear canvas function
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  
  function drawScene() { // main drawScene function
  
   console.log("8888");
      clear(); // clear canvas
  
      // get current time
      
     
      seconds = seconds + 1;
      hours = hours > 12 ? hours - 12 : hours;
      var hour = hours + minutes / 60;
      var minute = minutes + seconds / 60;
  
      // save current context
      ctx.save();
  
     
	
  
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.beginPath();
  
      // draw numbers
      ctx.font = '40px Arial';
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (var n = 1; n <= 12; n++) {
          var theta = (n - 3) * (Math.PI * 2) / 12;
          var x = clockRadius * 0.6 * Math.cos(theta);
          var y = clockRadius * 0.6 * Math.sin(theta);
          ctx.fillText(n, x, y);
      }
  
      // draw hour
      ctx.save();
      var theta = (hour - 3) * 2 * Math.PI / 12;
      ctx.rotate(theta);
      ctx.beginPath();
      ctx.moveTo(-15, -5);
      ctx.lineTo(-15, 5);
      ctx.lineTo(clockRadius * 0.5, 1);
      ctx.lineTo(clockRadius * 0.5, -1);
      ctx.fill();
      ctx.restore();
  
      // draw minute
      ctx.save();
      var theta = (minute - 15) * 2 * Math.PI / 60;
      ctx.rotate(theta);
      ctx.beginPath();
      ctx.moveTo(-15, -4);
      ctx.lineTo(-15, 4);
      ctx.lineTo(clockRadius * 0.6, 1);
      ctx.lineTo(clockRadius * 0.6, -1);
      ctx.fill();
      ctx.restore();
  
      // draw second
      ctx.save();
      var theta = (seconds - 15) * 2 * Math.PI / 60;
      ctx.rotate(theta);
      ctx.beginPath();
      ctx.moveTo(-15, -3);
      ctx.lineTo(-15, 3);
      ctx.lineTo(clockRadius * 0.75, 1);
      ctx.lineTo(clockRadius * 0.75, -1);
      ctx.fillStyle = '#042d6d';
      ctx.fill();
      ctx.restore();
  
      ctx.restore();
  }
  
  // initialization
  $(function(){
      canvas = document.getElementById('canvas');
      ctx = canvas.getContext('2d');

  drawScene();
 //setTimeout("drawScene()",1000);
 


  });
  
 
  

	 //添加文字方法   更换图片的方法
  		  function drawWord(text){
			  var color;
  			if(text>0)
  			{
  			  		if(text>=35) text=35;		
  			  				document.getElementById('rudshow').innerText=PrefixZero(text, 2);
							document.getElementById("rudshow").style.color = "#00ff00";
							
							if((0<text)&&(text<5))
							  {
								$("#rudimg").css('background-image',"url(img/rud/0.png)");  
							  }
							  else if((5<=text)&&(text<10))
							  {
								  $("#rudimg").css('background-image',"url(img/rud/g5.png)");
							  }
							  else if ((10<=text)&&(text<15))
							  {
								  $("#rudimg").css('background-image',"url(img/rud/g10.png)");
							  }
							  else if ((15<=text)&&(text<20))
							  {
								 $("#rudimg").css('background-image',"url(img/rud/g15.png)"); 
							  }
							 else if ((20<=text)&&(text<25))
							 {
								 $("#rudimg").css('background-image',"url(img/rud/g20.png)");
							 }
							else if ((25<=text)&&(text<30))
							{
								$("#rudimg").css('background-image',"url(img/rud/g25.png)");
							} 
							else if ((30<=text)&&(text<35))
							{
								$("#rudimg").css('background-image',"url(img/rud/g30.png)");
							}
							else if (text==35)
							{
								$("#rudimg").css('background-image',"url(img/rud/g35.png)");
							}
							
									
  			  				 
  			}
  			else if (text < 0){
				if(text<=-35) text=-35;
  			  				 text =- text;
  			  				
							document.getElementById('rudshow').innerText=PrefixZero(text, 2);
							document.getElementById("rudshow").style.color = "#ff0000";
  			  				if((0<text)&&(text<5))
  			  				  {
								$("#rudimg").css('background-image',"url(img/rud/0.png)");  
							  }
  			  				  else if((5<=text)&&(text<10))
  			  				  {
								  $("#rudimg").css('background-image',"url(img/rud/r5.png)");
							  }
  			  				  else if ((10<=text)&&(text<15))
  			  				  {
								  $("#rudimg").css('background-image',"url(img/rud/r10.png)");
							  }
  			  				  else if ((15<=text)&&(text<20))
							  {
								 $("#rudimg").css('background-image',"url(img/rud/r15.png)"); 
							  }
  			  				 else if ((20<=text)&&(text<25))
							 {
								 $("#rudimg").css('background-image',"url(img/rud/r20.png)");
							 }
  			  				else if ((25<=text)&&(text<30))
							{
								$("#rudimg").css('background-image',"url(img/rud/r25.png)");
							} 
  			  				else if ((30<=text)&&(text<35))
							{
								$("#rudimg").css('background-image',"url(img/rud/r30.png)");
							}
  			  				else if (35==text)
							{
								$("#rudimg").css('background-image',"url(img/rud/r35.png)");
							}
  			  				 
  			  				
  			  							
  			  						 
  			}  
			
			else if (text == 0){
			  				
			  				
							document.getElementById('rudshow').innerText=PrefixZero(text, 2);
							document.getElementById("rudshow").style.color = "#FFFFFF";
			  				$("#rudimg").css('background-image',"url(img/rud/0.png)");
			}  


 }
		 
function PrefixZero(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}



		 
