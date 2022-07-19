const {remote, clipboard, ipcRenderer } = require('electron');
ipcRenderer.on('message-from-main', (event, arg) => {

   console.log("message from main");
 
luojing_show2(JSON.parse(arg).CRS); 
  })
  
  
  function luojing_show2(str){
  	var strluojing=-parseInt(str);
  	$("#showluojing").delay(400).css("-webkit-transform","rotate("+strluojing+"deg)");
  	var strluojing=-(str-parseInt(str))*360;
  	$("#showluojing2").delay(400).css("-webkit-transform","rotate("+strluojing+"deg)");
  	
  	
  }