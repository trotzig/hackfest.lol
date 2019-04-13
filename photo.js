const exec = require('child_process').exec;
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const port = new SerialPort('/dev/tty.usbmodem14111', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));

// Read the port data
port.on('open', () => {
  console.log('serial port open');
});

parser.on('data', data => {
  port.write('taking photo\n');
  exec('imagesnap -w 1.00', (error, stdout, stderr) => {
    port.write('photo done!\n');
    exec('open snapshot.jpg');
  });
});
