
// Finds one eigenvector for a given 2x2 unitary with determinant +-1
function eigenvec(mat) {
  var [[a, b], [c, d]] = mat._data;
  var s = {a: a, b: b, c: c, d: d};
  if (math.abs(math.subtract(1, a)) > 0.01) {
    return math.evaluate("[b/(1-a); 1]/norm([b/(1-a), 1])", s);
  } else {
    return math.evaluate("[1; c/(1-d)]/norm([1, c/(1-d)])", s);
  }
}

// Computes change of basis matrices for the eigenbasis of given 2x2 unitary
// (is that the right term here?)
function eigenbasis(eig) {
  var [[x], [y]] = eig._data;
  var b1 = math.matrix([[x, -math.conj(y)], [y, math.conj(x)]]);
  return [b1, math.ctranspose(b1)];
}


function stateToBloch(state) {
  var [[a], [b]] = state._data;
  var ac = math.conj(a), bc = math.conj(b);
  // returns <s|X|s>, <s|Y|s>, <s|Z|s>, i.e. state's coordinates on the bloch sphere
  return [
    math.re(math.add(math.multiply(ac, b), math.multiply(a, bc))),
    math.re(math.add(math.multiply(math.complex(0, -1), ac, b), math.multiply(math.complex(0, 1), a, bc))),
    math.re(math.subtract(math.multiply(a, ac), math.multiply(b, bc))),
  ];
}

function RxMat(theta) {
  var a = math.cos(theta/2), b = math.complex(0, -math.sin(theta/2));
  return math.matrix([[a, b], [b, a]]);
}
