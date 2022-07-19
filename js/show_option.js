
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

