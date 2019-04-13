const exec = require('child_process').exec;
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const main = require('./main');

const port = new SerialPort('/dev/tty.usbmodem143101', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));

// Read the port data
port.on('open', () => {
  console.log('serial port open');
});

parser.on('data', data => {
  main();
});
