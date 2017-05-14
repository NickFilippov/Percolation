google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawAntChart1);

function drawAntChart1() {

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Концентрация');
    data.addColumn('number', 'Дийкстра');
    data.addColumn('number', 'Муравьиный');

    rows = [];
    for (var i = 0;i< items.length;i++)
        rows[i] = [items[i].b, items[i].rD, items[i].rA];
    data.addRows(rows);


    var options = {
        chart: {
            title: 'Зависимость количества красных точкек от концентрации',
            curveType: 'function'
            //subtitle: 'не нормированн'
        },
        width: 900,
        height: 500,
        //curveType: 'function',
        animation:{
            duration: 1000,
            
            startup: true,
        },

        axes: {
            x: {
                //0: {side: 'top'}
            }
        },
        curveType: 'function'
    };

    var chart = new google.visualization.LineChart(document.getElementById('line_top_x'));

    chart.draw(data, options);
}

function statistic(iter, sizeGrid, antcnt) {
//iter - кол-во итерации, sizeGrid- размер матрицы, fun - функция заполнения, k - концентрация
    items = [];
    var items_i=0;
    
    for(var b =0.05;b<=0.96;b+=0.05) {

        var redCntD = 0;
        var redCntAnt = 0;
        /*
        var stLenPath = 0;
        var stRedElm = 0;
        var valOfHole = 0;
        var numberOfClusters = 0;
        var averSizeCl = 0;*/
        for (var a = 0; a < iter; a++) {
            

            grid = generateRandomGrid(sizeGrid, b);
            //if (b==0.1 && a==0) makeTable(grid);
            grid1 = ArClone(grid);
            grid11 = ArClone(grid);
            grid2 = ArClone(grid);

            //grid2 = HoshenKopelman(grid);
            //document.write("<p></p>");
            //makeTable(grid2);
            /**/

            for (var i = 0; i < grid[0].length; i++) {
                for (var j = 0; j < grid[0].length; j++) {
                    if (grid1[i][j] == 0) grid1[i][j] = grid[0].length * grid[0].length + 1;
                }
            }

            var map = getMap(grid1);
            graph = new Graph(map);

            
            var ar = graph.findShortestPath('0', "" + grid[0].length - 1 + "_0");
            
            //console.log(ar.length - 1);
            //console.log(typeof (parseInt("0_11".split("_")[1], 10)) + parseInt("0_11".split("_")[1], 10) );
            var hole =0, prev_h=1;
            var kol = 0;
            for (var k = 1; k < ar.length; k++) {
                var ii = parseInt(ar[k].split("_")[0], 10),
                    jj = parseInt(ar[k].split("_")[1], 10);

                if (grid11[ii][jj] == 0) {
                    if (!(prev_h===0)) {
                        hole++;
                        prev_h=0;
                    }
                    kol++;
                    grid11[ii][jj] = 2;      
                }
                if (grid11[ii][jj] == 1) {
                    prev_h=1;
                    grid11[ii][jj] = 3;
                }

            }

            //stLenPath += ar.length - 1;
            redCntD += kol;

            antgrid = buildCellGrid(grid);
            colony=new Colony(antcnt,1,antgrid,2,5,6,0.1);
            colony.initialise();
            colony.sendOutAnts();

            redCntAnt+=colony.getBestCellsCount();

        }


        items[items_i] = {
            "b": b,
            "rD": redCntD/iter,
            "rA": redCntAnt/iter,
            "size": grid[0].length/*,
            
            "s": (stRedElm / iter),
            "p": (stLenPath / iter),
            "h": (valOfHole/iter),
            "numberOfClust": (numberOfClusters/ iter),
            "averSizeCluster": (averSizeCl/iter)*/
            

        };
        items_i++;

        console.log(".");
    }
    console.log(items);
}
/*
function timeStat(antcnt,maxsz){
    items = [];
    var items_i=0;
    for (var sz=20; sz < maxsz; sz++){

        grid=generateRandomGrid(sz,0.5);
        grid1 = ArClone(grid);
        antgrid = buildCellGrid(grid);
        for (var i = 0; i < grid[0].length; i++) {
                for (var j = 0; j < grid[0].length; j++) {
                    if (grid1[i][j] == 0) grid1[i][j] = grid[0].length * grid[0].length + 1;
                }
            }

        var map = getMap(grid1);
        graph = new Graph(map);

        timeD1= Date.now();
        var ar = graph.findShortestPath('0', "" + grid[0].length - 1 + "_0");
        timeD = Date.now() - timeD1;
        
        timeA1 = Date.now();
        colony=new Colony(antcnt,1,antgrid,2,5,6,0.1);
        colony.initialise();
        colony.sendOutAnts();
        timeA = Date.now() - timeA1;

        items[items_i]={
            "sz":sz,
            "D":timeD,
            "A":timeA
        };
        items_i++;
    }
}

function drawAntChart2() {

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Размер');
    data.addColumn('number', '');
    data.addColumn('number', '');

    rows = [];
    for (var i = 0;i< items.length;i++)
        rows[i] = [items[i].sz, items[i].D, items[i].A];
    data.addRows(rows);


    var options = {
        chart: {
            title: 'Зависимость времени выполнения от размера матрицы',
            curveType: 'function'
            //subtitle: 'не нормированн'
        },
        width: 900,
        height: 500,
        //curveType: 'function',
        animation:{
            duration: 1000,
            
            startup: true,
        },

        axes: {
            x: {
                //0: {side: 'top'}
            }
        },
        curveType: 'function'
    };

    var chart = new google.visualization.LineChart(document.getElementById('line_top_x2'));

    chart.draw(data, options);
}*/