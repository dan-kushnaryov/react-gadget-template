var spawn = require('child_process').spawn;

var TestPlayer = function() {
  this.port = 8879;
};

TestPlayer.prototype.visit = function(client) {
  return client
    .url('http://127.0.0.1:' + this.port)
    .frame(0)
};

TestPlayer.prototype.start = function(callback) {
  callback();
  // this.preview = spawn('versal', ['preview', '--port', this.port]);
  // this.preview.stdout.on('data', function(data) {
  //   if (data.toString().indexOf('http://localhost:'+this.port) >= 0) {
  //     var args = ('-jar BrowserStackTunnel.jar -force ' + process.env.BROWSERSTACK_KEY + ' 127.0.0.1,' + this.port + ',0').split(' ');
  //     console.log(args);
  //     this.tunnel = spawn('java', args);
  //     this.tunnel.stdout.on('data', function(data) {
  //       if (data.toString().indexOf('You can now access your local server') >= 0) {
  //         setTimeout(function() {callback();}, 10000);
  //       }
  //     }.bind(this));
  //     this.tunnel.stdout.pipe(process.stdout);
  //     this.tunnel.stderr.pipe(process.stderr);
  //   }
  // }.bind(this));
  // this.preview.stdout.pipe(process.stdout);
  // this.preview.stderr.pipe(process.stderr);
};

TestPlayer.prototype.stop = function(callback) {
  callback();
  // this.preview.on('exit', function() {
  //   this.tunnel.on('exit', callback);
  //   this.tunnel.kill('SIGINT');
  // }.bind(this));
  // this.preview.kill('SIGINT');
};

module.exports = TestPlayer;
