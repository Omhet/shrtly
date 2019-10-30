const base='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function encode(num, b = 62) {
  let r = num % b;
  let res = base[r];
  let q = Math.floor(num / b);

  while (q) {
    r = q % b;
    q = Math.floor(q / b);
    res = base[r] + res;
  }

  return res;
}


function decode(num, b = 62) {
  num = String(num);
  
  let limit = num.length;
  let res = base.indexOf(num[0]);

  for(let i = 1; i < limit; i++) {
    res = b * res + base.indexOf(num[i]);
  }

  return res;
}

exports.default = {
  encode,
  decode
};