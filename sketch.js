// A p5.js sketch which:
// Reads serial data of micro:bit (message strings)
// and shows the values big display

//Built on a Tom Igoe Arduino-serial sketch

// Declare a "SerialPort" object
var serial;
let lastMessages = [];
let textSz;
let shouldDrawTimes;
let shouldDrawSerialNumbers;
let shouldDrawBox;
let hasErrors;

// fill in the name of YOUR serial port here:
//var serialPortName = "/dev/cu.usbmodem1412";
var serialPortName = "/dev/cu.usbmodem1A12412";

function setup() {
  textSz = 32;
  lastMessages = [];
  shouldDrawTimes = false;
  shouldDrawBox = true;
  shouldDrawSerialNumbers = true;
  hasErrors = false;

  console.log("serialPortName: " + serialPortName + " This won't work unless you've set that correctly for your micro:bit.");

  createCanvas(displayWidth, displayHeight)

  // make an instance of the SerialPort object
  serial = new p5.SerialPort();

  // Request a list of the available ports. Async, so you 
  // should have a callback defined to see the results. See gotList, below:
  serial.list();

  var options = {
    baudrate: 115200
  };
  // Assuming our micro:bit is connected, open the connection to it
  serial.open(serialPortName, options);
  
  // When you get a list of serial ports that are available, call...
  serial.on('list', gotList);

  // When you some data from the serial port, call...
  serial.on('data', gotData);
  serial.on('connected', gotConnected);

    // When or if we get an error
    serial.on('error', gotError);
}

function gotConnected(info){
console.log("GOT CONNECTED")}
function gotError(er){
  console.error("Serial error", er);
  hasErrors = true;
}
// Got the list of ports
function gotList(thelist) {

  console.log("Got List of Serial Ports:");
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    console.log(i + " " + thelist[i]);
  }
}

function formatTime(date){
  const arr = [date.getHours(), date.getMinutes(), date.getSeconds()]
  return arr.map((x) => x.toString().padStart(2, '0')).join(':')
}

// Called when there is data available from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming data
  trim(currentString);                    // trim off any trailing whitespace
  if (!currentString) return;             // if the incoming string is empty, do no more
  let ts = formatTime(new Date())
  console.log(ts + " " + currentString)
  let [msg, serNo] = split(currentString, "|")
  lastMessages.unshift([ts, msg, serNo])
  lastMessages = lastMessages.slice(0, 20)
}

function mouseDragged(){
  textSz = map(mouseY, 0, displayHeight, 8, 1024)  
}
function keyPressed(){
  console.log('keypressed', key, shouldDrawTimes)
  if (key==='T'){
    shouldDrawTimes = !shouldDrawTimes;
  }
  if (key==='B'){
    shouldDrawBox = !shouldDrawBox;
  }
  if (key==='S'){
    shouldDrawSerialNumbers = !shouldDrawSerialNumbers;
  }
}

function drawHelp(){
  textSize(textSz);
  fill('yellow')
  let h = displayHeight/3;
  text("Mouse drag up/down to change font size", 50, h)
  text("Press T to toggle drawing timestamps", 50,  h+ textSz)
}

function drawMessage(msgData, y, sz, colr){
  textSize(sz)
  fill(colr)
  
  let [time, m, serNo] = msgData
  let txt = ""
  if (shouldDrawTimes){
    txt = time + " "
  }
  txt += m;

  if (shouldDrawSerialNumbers){
    txt += " " + serNo
  }
  text(txt, 20, y);
  
}

function drawBox(){
  fill('gray')
  rectMode(CENTER);
  rect(windowWidth/2, windowHeight/2, windowWidth/2, windowHeight/2)
}

function draw(){
  background(0)
  
  if(shouldDrawBox){
    drawBox()
  }

  lastMessages.forEach((m, ix) => 
    drawMessage(m, 50 + textSz * (1+ix), 
                textSz * (10 - ix) / 10, 
                ix==0 ? 'yellow' : 'white'))

  if(frameCount < 400){
    drawHelp();
  }
  if(hasErrors){
    fill('red')
    rect(20,20, 50,50)
  }

}
