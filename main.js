const { app, BrowserWindow,ipcMain} = require('electron')
const electron = require('electron')
const path = require('path')
const SerialPort = require('serialport');
const ReadlineParser = require('@serialport/parser-readline')
const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const udp_server = dgram.createSocket('udp4');
let regedit = require('regedit');
const {dialog} = require('electron');
var fs = require("fs");
 app.commandLine.appendSwitch('touch-events','enabled');  //app是我的electron创建的实例对象名

let flage=true;
var iptxt="127.0.0.1";
var dataflag =0;
var serialflage=0;

udp_server.bind(8000);

 //从李明月接受的数据
 var strmsg="";
 //发送给李明月数据
 var messageAll = {"D":"FU,0","LC":"99","RC":"99","TUG":"*,*,*,*,*","AC":"P,NO,S,NO","SS":"","DL":"0,0","ES":"0,0","LINE":""}; 
 let newWindow0;
 let newWindow1;
 let newWindow2;
 let newWindow3;
 let newWindow4;
 let newWindow5;
 let newWindow6;
 let newWindow7;


function createWindow () {
 /* const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
    win.loadFile('index.html')*/
  let displays = electron.screen.getAllDisplays()
    if(displays.length<7){
		
		flage=false;
	}
   console.log(displays);
// 演示五秒 等待 8个窗口初始化



 	   for(var i = 0;i < displays.length-1;i++) 
 	   {
       for(var j = 0;j < displays.length-i-1;j++)
 			 {
 			// 	//>把大的数字放到后面       < 把小的数字放在后面
                if(displays[j].bounds.x > displays[j+1].bounds.x)
 			 	{
                   var str = displays[j];
                    displays[j] = displays[j+1];
                    displays[j+1] = str;
                }
            }
        }

         newWindow0 = new BrowserWindow({
             　　fullscreen:true,
         		frame: true,
				
            　　 x: displays[0].bounds.x,
             　　y: displays[0].bounds.y,
		 	    
         	 webPreferences:{
         	         nodeIntegration: true,
         	         contextIsolation: false
        	     }
         　　})
		 newWindow0.loadFile('index8.html')
    
		 newWindow1 = new BrowserWindow({
		    　　fullscreen:true,
				frame: false,
		   　　 x: displays[1].bounds.x,
		    　　y: displays[1].bounds.y,
		
			 webPreferences:{
			         nodeIntegration: true,
			         contextIsolation: false
			     }
		　　})
	
			newWindow1.loadFile('index1.html')
			
			
			 newWindow2 = new BrowserWindow({
			    　　fullscreen:true,
					frame: false,
			   　　 x: displays[2].bounds.x,
			    　　y: displays[2].bounds.y,
				 webPreferences:{
				         nodeIntegration: true,
				         contextIsolation: false
				     }
			　　})
			
				newWindow2.loadFile('index2.html')
	    
		 newWindow3 = new BrowserWindow({
		    　　fullscreen:true,
				frame: false,
		   　　 x: displays[3].bounds.x,
		    　　y: displays[3].bounds.y,
			 webPreferences:{
			         nodeIntegration: true,
			         contextIsolation: false
			     }
		　　})
		
			newWindow3.loadFile('index3.html')
		
		 newWindow4 = new BrowserWindow({
		    　　fullscreen:true,
				frame: false,
		   　　 x: displays[4].bounds.x,
		    　　y: displays[4].bounds.y,
			 webPreferences:{
			         nodeIntegration: true,
			         contextIsolation: false
			     }
		　　})
		newWindow4.loadFile('index4.html')
		    
		 newWindow5 = new BrowserWindow({
		    　　fullscreen:true,
				frame: false,
		   　　 x: displays[5].bounds.x,
		    　　y: displays[5].bounds.y,
			 webPreferences:{
			         nodeIntegration: true,
			         contextIsolation: false
			     }
		　　})
		
			newWindow5.loadFile('index5.html')
			
			
			 newWindow6 = new BrowserWindow({
			    　　fullscreen:true,
					frame: false,
			   　　 x: displays[6].bounds.x,
			    　　y: displays[6].bounds.y,
				 webPreferences:{
				         nodeIntegration: true,
				         contextIsolation: false
				     }
			　　})
		
				newWindow6.loadFile('index6.html')
		
		 newWindow7 = new BrowserWindow({
		    　　fullscreen:true,
				frame: false,
		   　　 x: displays[7].bounds.x,
		    　　y: displays[7].bounds.y,
			 webPreferences:{
			         nodeIntegration: true,
			         contextIsolation: false
			     }
		　　})
		 　　 newWindow7.loadFile('index7.html') 
	
		createSerialPort(newWindow1)
 
}



app.whenReady().then(() => {
  createWindow();
  console.log(" start udp");
  
 fs.readFile("D://ip.txt", 'utf-8', (err, dataaa) => {
     if (err) throw err;
     console.log(dataaa)
  iptxt=dataaa;
 });
  udpclient();
  udpserver();
   
  //接受所有页面的消息
  ipcMain.on('megfromwhere', (event, message) => {
       dealdata(message);
	 //需要改一下 每一个子线程更新自己的数据；
  })


})

function dealdata(message){
	
	var data=message.send_data_udp;
	 switch(data.id){
		case "1": messageAll.D = data.D; break;
		case "2": messageAll.LC = data.LC; messageAll.RC = data.RC;break;
		case "3": messageAll.AC = data.AC; messageAll.SS = data.SS; break;
		case "4": break; //罗经
		case "5": messageAll.DL = data.DL; messageAll.ES = data.ES;break;
		case "6": messageAll.TUG = data.TUG; break;
		case "7": messageAll.LINE = data.LINE; break;
		 		 
	 }

}


function showalldata(str){
	
	 // 主进程向渲染进程触发事件 四处分发数据
	 console.log("hello");
	 sendWindowMessage(newWindow0, 'message-from-main', str)
	 sendWindowMessage(newWindow1, 'message-from-main', str) 
	 sendWindowMessage(newWindow2, 'message-from-main', str)
	 sendWindowMessage(newWindow3, 'message-from-main', str)
	 sendWindowMessage(newWindow4, 'message-from-main', str)
	 sendWindowMessage(newWindow5, 'message-from-main', str)
	 sendWindowMessage(newWindow6, 'message-from-main', str)
	 sendWindowMessage(newWindow7, 'message-from-main', str) 
	 
		//strmsg = "";
}


app.on('ready', async () => {


 })






app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function sendWindowMessage(targetWindow, message, payload) {
  if (typeof targetWindow === 'undefined') {
    console.log('Target window does not exist')
    return
  }
  targetWindow.webContents.send(message, payload)
}

 
   

function createSerialPort(mainWindow){
  //开启串口，并发送到渲染线程中
   SerialPort.list().then(ports => {
       ports.forEach(port => {
		   
		   
		  
	 var serialport = new SerialPort(port.path, {
	         baudRate: 115200,
	         autoOpen: false
	     });
		   
		serialport.open(err => {
		       console.log('IsOpen: ', serialport.isOpen);
		       console.log('Err: ', err);
		       if (err) {
				
		       }
		   });
	const parser = serialport.pipe(new ReadlineParser({ delimiter: '\r\n' }))

	
	parser.on('data',function(data){
	  let strData = data+'';
		if(typeof(strData) == "undefined") {
			console.log("11111");
			return;
		}
		if((strData.substr(0, 1) != '{')&&(strData.substr(-1) != '}') ) {

			return;
		}
					serialflage=1;
		//舵轮发送
	  mainWindow.webContents.send("marh-data",JSON.parse(strData));
	  //主机发送
	  newWindow2.webContents.send("marh-data",JSON.parse(strData));
		
	});
	
	
	
	
	
       });
   })
 
}

		
		
function udpclient(){

	client.on('close',()=>{
	    console.log('socket已关闭');
	});
	client.on('error',(err)=>{
	    console.log(err);
	});
//var dataaa="127.0.0.1";
	setInterval(function(){	
		client.send(JSON.stringify(messageAll),"8888",iptxt);	
		
	},500);
}

function udpserver(){
	
	udp_server.on('message', function (msg, rinfo) {
    strmsg = msg.toString();
	
 
		dataflag=dataflag+1;
		try{
			var a=JSON.parse(strmsg);
			showalldata(strmsg);
		}
		catch{
			
			
		}
		
	
		
	});
	
	}


//做一个定时器   检测李明月的数据，如果没有，则


	
var t2= setInterval(function(){	

		if(dataflag < 10){
			var tempdata = {"WD":"0.00","WS":"0.00","WH":"100","RPM":"0","SPD":"0.00","XSPD":"0.00","ROT":"0.00","CRS":"0.00","RUD":"0.00","HEAD":"0.00","MAG":"0.00","D":"0.50,0.50,5.00,20.00,10.00,0.00,1000.00,1000.00","Tug":"99,0","AC":" P,0.00,0.00, 0.00, 0.00,S ,0.00,0.00, 0.00, 0.00","DL":"2,0.00,0,0.00,2,0.00,0.00","ES":"0.00,0.00","LC":"0.00,0.00,0.00,0.00","LINE":"99,0.0,0.0","LG":"0","SF":"FALSE","RF":"FALSE","WDF":"FALSE","SSF":"FALSE","RAF":"FALSE","RPMF":"FALSE","APF":"FALSE","MEF":"FALSE","RC":"0.00,0.00,0.00,0.00","LRPM":"0"};
			tempdata = JSON.stringify(tempdata);
			showalldata(tempdata);
		}
		dataflag=0;
		

 },20000);	

	
 var t1= setInterval(function(){	
if(serialflage==1){
	//正常
	console.log("serial true");
}
	else{
			createSerialPort(newWindow1);
		}
		
	serialflage=0;	
		

 },5000);	

	
	
	
