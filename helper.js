var cols = 30;
var rows = 30;
var grid = new Array(cols);
var openSet = [];
var closedSet = [];
var start;
var end;
var w , h;
var path = [];
var noSolution = false;
var startClicked = false;
var cnv;

function removefromArray(arr, elt) {
    for( var i = arr.length - 1; i >= 0; i--) {
        if(arr[i] == elt) {
            arr.splice(i, 1);
        }
    }
}

function heuristic(a, b) {
    var d = abs(a.i - b.i) + abs(a.j - b.j);
    return d;
}