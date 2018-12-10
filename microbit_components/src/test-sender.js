let list: string[] = []
let msg = ""
let ix = 0

input.onButtonPressed(Button.A, function () {
    ix = (ix + 1) % list.length
    msg = list[ix]
    basic.showString("" + msg, 40)
})

input.onButtonPressed(Button.B, function () {
    radio.sendString(msg)
    led.toggle(4, 0)
})

radio.setGroup(1)
radio.setTransmitSerialNumber(true)
list = ["trooper", "scout", "the reaper", "hay man", "skull trooper", "dj yonder"]
ix = 0
msg = list[ix]
basic.showLeds(`
    . # # # .
    # . . . .
    . # # . .
    . . . # .
    # # # . .
    `)
