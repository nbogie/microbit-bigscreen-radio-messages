let dataCount = 0
function wrapGroup() {
    if (group > 255) {
        group = 1
    }
    if (group < 1) {
        group = 255
    }
}
input.onButtonPressed(Button.A, function () {
    incrementGroup(-1)
})
input.onButtonPressed(Button.B, function () {
    incrementGroup(1)
})
radio.onReceivedString(function (receivedString) {
    serial.writeLine("" + receivedString + "|" + radio.receivedPacket(RadioPacketProperty.SerialNumber))
    led.toggle(0, 0)
})
let group = 0
dataCount = 0
function incrementGroup(inc: number) {
    group += inc
    wrapGroup()
    radio.setGroup(group)
    basic.showNumber(group, 40)
}
group = 1
radio.setGroup(group)
