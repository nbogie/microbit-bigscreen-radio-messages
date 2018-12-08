# Getting BBC microbit radio messages onto a big screen

At microbit workshops it's common to use a microbit or two programmed to listen to the radio channels and report messages.  This code extends that idea so that the latest messages are shown on a big screen on a connected computer (in a p5.js sketch on a web browser, so fancier visualisation would be possible).

Uses the p5.serialport library for p5.js, and p5 Serial Control executable.

# Pre-requisites

* a computer running chrome or firefox, and with a usb port with which it will  talk to a micro:bit.
* [Shawn Van Every's p5 SerialControl executable][p5 serialcontrol link]
* two BBC micro:bits*
* one usb lead to connect a microbit to your computer (capable of data, not only power)
* a battery pack for the other of the microbits

# Installation

1) If you trust it, install [Shawn Van Every's p5 SerialControl executable][p5 serialcontrol link].
2) Run the "p5 Serial Control" executable
3) Download this repo and unzip it if necessary
4) install [the microbit test sender][microbit-test-sender hex link] onto one or more test micro:bits
5) install [the microbit relay onto your "relay" micro:bit][microbit-relay hex link]
7) power your "test sender" micro:bits with battery packs.
8) plug in your "relay" micro:bit via usb.
10) Look in the p5 SerialControl GUI to see the name of the serial port for the connected micro:bit.

![p5 serialcontrol gui screenshot](docs/screenshots/p5_SerialControl_gui.png)

11) Edit your local copy of `sketch.js` to change the variable `serialPortName` to reflect the name of the "serial port" being used by your plugged-in micro:bit.  (You could alternatively use browser dev tools to edit this code in place if your example is not local.)
You can see the available ports listed in the p5.SerialControl gui.  In my case, the port is something like `/dev/cu.usbmodem1412` so *my* code would look as follows:
```
// fill in the name of YOUR serial port here:
var serialPortName = "/dev/cu.usbmodem1412";
```
12) start a webserver to serve your local copy of the repo with the corrected serialPortName in `sketch1.js` (or host it on github pages, or wherever) e.g. from the root dir of the repo: `python -m SimpleHTTPServer 8080`

# Usage

* visit `index.html` from your served copy.
* press B on any test sender microbits to send on group 1.
* You should see on the browser details of the received radio message.
* You can change radio group being sniffed by pressing a or b on the relay microbit.
* On the browser, press t to toggle display of message timestamps
* On the browser, press s to toggle display of microbit serialNumbers (if they've been enabled on the sender)
* You're done!  Or rather, you're just getting started!  Fork this example repo and do something cool with it.  How about using a particle system to have the messages fly around the screen!

# Troubleshooting: 

* Ensure that the relay's display is changing while you press the test sender's button B.  If it's not, the relay isn't receiving any radio messages.  Consider range, and if you've changed the micro:bit programs, consider radio group, and radio message format (it should send a string, not a number)
* Check the browser console for error messages.
* ensure p5 SerialControl executable is running.
* ensure your micro:bit is being detected by the OS and offered as a "serial port".  One way is to check it is listed in p5 SerialControl executable's GUI.
* If you loaded the web components before you edited the serialPortName variable in sketch1.js, then clear the browser cache of these files and reload them.
* Follow the [micro:bit documentation for monitoring the serial communication from your micro:bit on your computer][microbit serial comms link].  For example, on OSX, `screen /dev/cu.usbmodem1412 115200`.  Guess what, again be careful to use the correct serial port name.  Be careful to end this `screen` session with Ctrl-A Ctrl-D.  Be aware that only one program can have the serial port open at any one time, so it can't be open simultaneously by both screen and  by the browser / p5-SerialControl combo.

# Expected serial communication protocol

The various components of this project are set to report and expect this message format:
```text of message|serialNumber```

[makecode-test-sender link]: https://makecode.microbit.org/_bPDfdWX0y2Hv

[makecode-relay link]: https://makecode.microbit.org/_fjt6gWUH75Ub

[microbit-test-sender hex link]: microbit_components/hexes/microbit-test-sender.hex

[microbit-relay hex link]: microbit_components/hexes/radio-sniffer-serial-bridge.hex

[p5 serialcontrol link]: https://github.com/vanevery/p5.serialcontrol/releases

[microbit serial comms link]: https://www.microbit.co.uk/td/serial-library
