google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawAntChart1);



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
    data.addColumn('number', 'Дийкстра');
    data.addColumn('number', 'Муравьиный');

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
}