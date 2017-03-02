const ava = require('ava');

const IPv4 = require('../index').IPv4;
const Cidr = require('../index').Cidr;

ava('72.21.196.65', test => {
  let ip = new IPv4('72.21.196.65');
  test.is(ip.asString, '72.21.196.65');
  test.is(ip.asInt, 1209386049);
  test.is(ip.asCidr, '72.21.196.65/32');
  test.is(ip.asHex, '4815c441');
  test.is(ip.reverse, '65.196.21.72.in-addr.arpa');
});

ava('1209386049', test => {
  let ip = new IPv4(1209386049);
  test.is(ip.asString, '72.21.196.65');
  test.is(ip.asInt, 1209386049);
  test.is(ip.asCidr, '72.21.196.65/32');
  test.is(ip.asHex, '4815c441');
  test.is(ip.reverse, '65.196.21.72.in-addr.arpa');
  test.is(ip.asBinary, '01001000.00010101.11000100.01000001');
});

ava('10.0.255.255', test => {
  let ip = new IPv4('10.0.255.255');
  test.is(ip.asString, '10.0.255.255');
  test.is(ip.asInt, 167837695);
  test.is(ip.asCidr, '10.0.255.255/32');
  test.is(ip.asHex, 'a00ffff');
  test.is(ip.reverse, '255.255.0.10.in-addr.arpa');
  test.is(ip.asBinary, '00001010.00000000.11111111.11111111');
});

ava('10.0.0.0/16', test => {
  let cidr = new Cidr('10.0.0.0/16');
  test.is(cidr.subnets('/16').length, 1);
  test.is(cidr.subnets('/18').length, 4);
  test.is(cidr.subnets('/24').length, 256);
  test.is(cidr.subnets('/30').length, 16384);
  test.is(cidr.count, 65536);
  test.is(cidr.netmask, '255.255.0.0');
  test.deepEqual(cidr.max, new IPv4('10.0.255.255'));
  test.deepEqual(cidr.range, [new IPv4('10.0.0.0'), new IPv4('10.0.255.255')]);
});

ava('10.0.0.0/17', test => {
  let cidr = new Cidr('10.0.0.0/17');
  test.is(cidr.subnets('/18').length, 2);
  test.is(cidr.subnets('/24').length, 128);
  test.is(cidr.subnets('/30').length, 8192);
  test.is(cidr.count, 32768);
  test.is(cidr.netmask, '255.255.128.0');
  test.deepEqual(cidr.max, new IPv4('10.0.127.255'));
  test.deepEqual(cidr.range, [new IPv4('10.0.0.0'), new IPv4('10.0.127.255')]);
});