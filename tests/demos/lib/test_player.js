var spawn = require('child_process').spawn;

var TestPlayer = function() {
  this.port = 8879;
};

TestPlayer.prototype.visit = function(client) {
  return client
    .url('http://127.0.0.1:' + this.port)
    .frame(0)
};

TestPlayer.prototype.start = function() {
  this.preview = spawn('versal', ['preview', '--port', this.port]);
  this.preview.stdout.pipe(process.stdout);
  this.preview.stderr.pipe(process.stderr);
};

TestPlayer.prototype.stop = function(callback) {
  this.preview.on('exit', callback);
  this.preview.kill('SIGINT');
};

module.exports = TestPlayer;
