
// Code assumes these have det(U) = +-1
var ports = {
  X: new Port("[0, 1; 1, 0]"),
  Y: new Port("[0, -i; i, 0]"),
  Z: new Port("[1, 0; 0, -1]"),
  H: new Port("1/sqrt(2)*[1, 1; 1, -1]"),
  S: new Port("[1, 0; 0, 1i]"),
  T: new Port("[1, 0; 0, exp(1i*pi/4)]"),
};

function Port(expr) {
  this.mat = math.evaluate(expr);
  this.eigenvector = eigenvec(this.mat);
  console.log(math.format(this.eigenvector));
  [this.to_eigenbasis, this.from_eigenbasis] = eigenbasis(this.eigenvector);
  var v = [[1/math.sqrt(2)], [1/math.sqrt(2)]];
  v = math.multiply(this.from_eigenbasis, this.mat, this.to_eigenbasis, v);
  var [[a], [z]] = v._data;
  z = math.divide(z, a);
  this.rotation = math.arg(z);
  console.log(this.rotation);
  
  // 0 <= t <= 1
  this.animatedRotation = function(v, t) {
    v = math.multiply(this.from_eigenbasis, v);
    v._data[1][0] = math.multiply(v._data[1][0], math.complex({r: 1, phi: t*this.rotation}));
    v = math.multiply(this.to_eigenbasis, v);
    return v;
  }
}


