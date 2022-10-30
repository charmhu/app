
var progressView = document.getElementById('helm_first');
 function add_helm(progress){
    
 	if(progress<0){
 		progressView.setAttribute('fill' ,'#ff0000' );
    		progressView.setAttribute('x' , (191+progress));   
    		progressView.setAttribute('width' , Math.abs(progress));   
 		
 	}
 	else{
 	progressView.setAttribute('fill' ,'#2dc309' );
 	progressView.setAttribute('x' , '191');
    progressView.setAttribute('width' , progress); 
 	}
   
 
 
 }



//从udp接受回来之后进行显示
var progressView1 = document.getElementById('rot_first');

 function add_rot(progress){

 	if(progress<0){
 		progressView1.setAttribute('fill' ,'#ff0000' );
    		progressView1.setAttribute('x' , (191+progress));   
    		progressView1.setAttribute('width' , Math.abs(progress));   
 		
 	}
 	else{
 	progressView1.setAttribute('fill' ,'#2dc309' );
 	progressView1.setAttribute('x' , '191');
    progressView1.setAttribute('width' , progress); 
 	}
   
 
 
 }
 var progressView2 = document.getElementById('rud_first');
//从udp接受回来之后进行显示
 function add_rud(progress){

 	if(progress<0){
 		console.log("hello");
 		progressView2.setAttribute('fill' ,'#ff0000' );
    		progressView2.setAttribute('x' , (191+progress));   
    		progressView2.setAttribute('width' , Math.abs(progress));   
 		
 	}
 	else{
 	progressView2.setAttribute('fill' ,'#2dc309' );
 	progressView2.setAttribute('x' , '191');
    progressView2.setAttribute('width' , progress); 
 	}
   
 
 
 }

// ************************************第9个面板进度条

//从udp接受回来之后进行显示
var progressView3 = document.getElementById('first_show');

 function add_bow(progress){

 	if(progress<0){
 		progressView3.setAttribute('fill' ,'#ff0000' );
    		progressView3.setAttribute('x' , (251+progress));   
    		progressView3.setAttribute('width' , Math.abs(progress));   
 		
 	}
 	else{
 	progressView3.setAttribute('fill' ,'#2dc309' );
 	progressView3.setAttribute('x' , '251');
    progressView3.setAttribute('width' , progress); 
 	}
   
 
 
 }
 var progressView4 = document.getElementById('second_show');
//从udp接受回来之后进行显示
 function add_stren(progress){

 	if(progress<0){
 		
 		progressView4.setAttribute('fill' ,'#ff0000' );
    		progressView4.setAttribute('x' , (251+progress));   
    		progressView4.setAttribute('width' , Math.abs(progress));   
 		
 	}
 	else{
 	progressView4.setAttribute('fill' ,'#2dc309' );
 	progressView4.setAttribute('x' , '251');
    progressView4.setAttribute('width' , progress); 
 	}
   
 
 
 }