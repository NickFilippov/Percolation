var table = "";
var mT = 0;
var colors=["#ffffff","#000000"];


function find(x,labels){
    if(labels[x] == x){
        return x;
    }
    else{
        return find(labels[x],labels);
    }
}

function union(x,y,labels){
    trueX=find(x,labels);
    trueY=find(y,labels);
    max=Math.max(trueX,trueY);
    min=Math.min(trueX,trueY);
    for(var i=0;i<labels.length;i++){
        if(labels[i] == max || labels[i] == min){
            labels[i] = min;
        }
    }
    return min;
}

function relabel(grid,labels){
    tempGrid=grid;
    N=grid[0].length;
    for(var i=0;i<N;i++){
        for(var j=0;j<N;j++){
            tempGrid[i][j]=labels[grid[i][j]];
        }
    }
    return tempGrid;
}

function HoshenKopelman(grid){
    var label = grid;
    largestLabel=1;
    N=grid[0].length;
    var labels = [0,1];
    for(var i=0;i<N;i++){
        for(var j=0;j<N;j++){
            if(grid[i][j]){
                left=((i == 0) ? 0 : label[i-1][j]);
                above=((j == 0) ? 0 : label[i][j-1]);
                if(left==0 && above==0){
                    largestLabel++;
                    labels.push(largestLabel);
                    label[i][j]=largestLabel;
                    if(largestLabel>1){
                        colors.push(getRandomColor());
                    }
                }
                else if(left !=0 && above == 0){
                    label[i][j]=find(left,labels);
                }
                else if(left == 0 && above !=0){
                    label[i][j]=find(above,labels);
                }
                else{
                    label[i][j]=union(left,above,labels);
                }
            }
        }
    }
    return relabel(label,labels);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
client_height = document.documentElement.clientHeight-100;
function makeTable(grid) {
    mT = grid[0].length;
    tdSize=Math.floor((client_height/mT))+"px";
    td = "<td style = 'background-color:#ffffff; width:" + tdSize + "; height:" + tdSize + "'></td>";
    tHeader = "<table id = 'table' style = 'background-color:#cccccc'; border = 0.5px";
    document.write(tHeader);
    for (i = 0; i < mT; i++) {
        document.write("<tr>");
        for (j = 0; j < mT; j++) {
            td = "<td style = 'background-color:"+colors[grid[i][j]]+"; width:" + tdSize + "; height:" + tdSize + "'></td>";
            document.write(td);
        }
        document.write("</tr>");
    }
    document.write("</table>");
    table = document.getElementById("table");
}

function makeTableRed(grid) {
    var colors=["#ffffff","#A6A6A6", "#ff0000", "#000000"];
    mT = grid[0].length;
    tdSize=Math.floor((client_height/mT))+"px";
    td = "<td style = 'background-color:#ffffff; width:" + tdSize + "; height:" + tdSize + "'></td>";
    tHeader = "<table id = 'table' style = 'background-color:#cccccc'; border = 0.5px";
    document.write(tHeader);
    for (i = 0; i < mT; i++) {
        document.write("<tr>");
        for (j = 0; j < mT; j++) {
            td = "<td style = 'background-color:"+colors[grid[i][j]]+"; width:" + tdSize + "; height:" + tdSize + "'></td>";
            document.write(td);
        }
        document.write("</tr>");
    }
    document.write("</table>");
    table = document.getElementById("table");
}

function ArClone(grid) {
    tempGrid=new Array(grid[0].length);
    for(i=0;i<grid[0].length;i++){
        tempGrid[i]=new Array(grid[0].length);
        for(j=0;j<grid[0].length;j++){
            tempGrid[i][j]=grid[i][j];
        }
    }
    return tempGrid;
}

function getMap(grid) {
    var map = {};
    for (var i=0;i<grid[0].length;i++){
        map[""+i]={};
        map[""+i]["0"+"_"+i]=grid[0][i];
        for (var j=0;j<grid[0].length;j++){
            map[""+i+"_"+j]={};

            if ( i-1>=0 && i-1<grid[0].length ) {
                var r=i-1;
                map[""+i+"_"+j][""+r+"_"+j] = grid[i-1][j];
            }
            if (i+1>=0 && i+1<grid[0].length) {
                var r=i+1;
                map[""+i+"_"+j][""+r+"_"+j] = grid[i+1][j];
            }
            if (j-1>=0 && j-1<grid[0].length) {
                var r=j-1;
                map[""+i+"_"+j][""+i+"_"+r] = grid[i][j-1];
            }
            if (j+1>=0 && j+1<grid[0].length) {
                var r=j+1;
                map[""+i+"_"+j][""+i+"_"+r] = grid[i][j+1];
            }
        }
    }
    return map;
}

var Graph = (function (undefined) {

    var extractKeys = function (obj) {
        var keys = [], key;
        for (key in obj) {
            Object.prototype.hasOwnProperty.call(obj,key) && keys.push(key);
        }
        return keys;
    }

    var sorter = function (a, b) {
        return parseFloat (a) - parseFloat (b);
    }

    var findPaths = function (map, start, end, infinity) {
        infinity = infinity || Infinity;

        var costs = {},
            open = {'0': [start]},
            predecessors = {},
            keys;

        var addToOpen = function (cost, vertex) {
            var key = "" + cost;
            if (!open[key]) open[key] = [];
            open[key].push(vertex);
        }

        costs[start] = 0;

        while (open) {
            if(!(keys = extractKeys(open)).length) break;

            keys.sort(sorter);

            var key = keys[0],
                bucket = open[key],
                node = bucket.shift(),
                currentCost = parseFloat(key),
                adjacentNodes = map[node] || {};

            if (!bucket.length) delete open[key];

            for (var vertex in adjacentNodes) {
                if (Object.prototype.hasOwnProperty.call(adjacentNodes, vertex)) {
                    var cost = adjacentNodes[vertex],
                        totalCost = cost + currentCost,
                        vertexCost = costs[vertex];

                    if ((vertexCost === undefined) || (vertexCost > totalCost)) {
                        costs[vertex] = totalCost;
                        addToOpen(totalCost, vertex);
                        predecessors[vertex] = node;
                    }
                }
            }
        }

        if (costs[end] === undefined) {
            return null;
        } else {
            return predecessors;
        }

    }

    var extractShortest = function (predecessors, end) {
        var nodes = [],
            u = end;

        while (u) {
            nodes.push(u);
            u = predecessors[u];
        }

        nodes.reverse();
        return nodes;
    }

    var findShortestPath = function (map, nodes) {
        var start = nodes.shift(),
            end,
            predecessors,
            path = [],
            shortest;

        while (nodes.length) {
            end = nodes.shift();
            predecessors = findPaths(map, start, end);

            if (predecessors) {
                shortest = extractShortest(predecessors, end);
                if (nodes.length) {
                    path.push.apply(path, shortest.slice(0, -1));
                } else {
                    return path.concat(shortest);
                }
            } else {
                return null;
            }

            start = end;
        }
    }

    var toArray = function (list, offset) {
        try {
            return Array.prototype.slice.call(list, offset);
        } catch (e) {
            var a = [];
            for (var i = offset || 0, l = list.length; i < l; ++i) {
                a.push(list[i]);
            }
            return a;
        }
    }

    var Graph = function (map) {
        this.map = map;
    }

    Graph.prototype.findShortestPath = function (start, end) {
        if (Object.prototype.toString.call(start) === '[object Array]') {
            return findShortestPath(this.map, start);
        } else if (arguments.length === 2) {
            return findShortestPath(this.map, [start, end]);
        } else {
            return findShortestPath(this.map, toArray(arguments));
        }
    }

    Graph.findShortestPath = function (map, start, end) {
        if (Object.prototype.toString.call(start) === '[object Array]') {
            return findShortestPath(map, start);
        } else if (arguments.length === 3) {
            return findShortestPath(map, [start, end]);
        } else {
            return findShortestPath(map, toArray(arguments, 1));
        }
    }

    return Graph;

})();
