function getURLQueryStringParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/* used for deep cloning of various arrays/objects */
function cloneObject(obj) {
  var newObj = (obj instanceof Array) ? [] : {};
  for (var i in obj) {
    if (i == 'clone') continue;
    if (obj[i] && typeof obj[i] == "object") {
      newObj[i] = cloneObject(obj[i]);
    } else newObj[i] = obj[i]
  } return newObj;
}

/* used to check if two states are the same */
function arraysEqual(a,b) {
	if (a instanceof Array && b instanceof Array) {
		if (a.length != b.length) {
			return false;
		} else {
			for (var i = 0; i < a.length; i++) {
				/* if this is a multi-dimensional array, check equality at the next level */
				if (a[i] instanceof Array || b[i] instanceof Array) {
					var tmp = arraysEqual(a[i],b[i]);
					if (!tmp) {
						return false;
					}
				} else if (a[i] != b[i]) {
					return false;
				}
			}
		}
	} else {
		return false;
	}
	return true;
}

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
}

if (!Array.prototype.getIndexCyclic){
    Array.prototype.getIndexCyclic = function(i){
    	return this[i % this.length];
    };
}

if (!Array.prototype.getNextCyclic){
    Array.prototype.getNextCyclic = function(i){
    	i = i % this.length;
        if (this.length - 1 == i) {
        	return this[0];
        } else {
        	return this[i+1];
        }
    };
}

if (!Array.prototype.getPreviousCyclic){
    Array.prototype.getPreviousCyclic = function(i){
        i = i % this.length;
        if (i == 0) {
        	return this[this.length-1];
        } else {
        	return this[i-1];
        }
    };
}

function cross(a,b) {
	return {
		x: a.y*b.z - a.z*b.y,
		y: a.z*b.x - a.x*b.z,
		z: a.x*b.y - a.y*b.x
	}
}

function dot(a,b) {
	return a.x*b.x + a.y*b.y + a.z*b.z;
}

function magnitude(a) {
	return Math.sqrt(a.x*a.x + a.y*a.y + a.z*a.z);
}

function normalize(a) {
	var mag = magnitude(a);
	a.x = a.x/mag;
	a.y = a.y/mag;
	a.z = a.z/mag;
	return a;
}

function multiply(a,b) {
	a.x *= b;
	a.y *= b;
	a.z *= b;
	return a;
}

function add(a,b) {
	a.x += b.x;
	a.y += b.y;
	a.z += b.z;
	return a;
}

function sub(a,b) {
	a.x -= b.x;
	a.y -= b.y;
	a.z -= b.z;
	return a;
}

function negate(a) {
	multiply(a,-1);
	return a;
}

/* used for testing if a siteswap sequence is valid */
function permutation_test(sequence) {
  var p = sequence.length;
  // boolean array to keep track of which remainders are hit
  var to_hit = Array(p).fill(false);
  var term;
  for (var i=0; i<p; i++) {
    term = (sequence[i]+i) % p;
    to_hit[term] = true;
  }
  for (var i=0; i<p; i++) {
    if (!to_hit[i]) {
      return false;
    }
  }
  return true;
}


function expand_sequence(sequence, len, objects) {
  var p = sequence.length;
  var seq = sequence.map(x=>parseInt(x));
  var pattern = Array(len).fill(undefined);
  if (typeof(objects) == 'undefined') {
    objects = Array.from(Array(len).keys());
  }
  var obj_ptr = 0, seq_ptr = 0;
  for (var i=0; i<len; i++) {
    if (typeof(pattern[i]) == 'undefined' && seq[seq_ptr] > 0) {
      pattern[i] = objects[obj_ptr];
      obj_ptr++;
    }
    if (i + seq[seq_ptr] < len) {
      pattern[i + seq[seq_ptr]] = pattern[i];
    }
    seq_ptr = (seq_ptr + 1) % p;
  }
  return pattern;
}

/* global vars */
window.randomColors = ['red','blue','green','black','yellow','purple'];