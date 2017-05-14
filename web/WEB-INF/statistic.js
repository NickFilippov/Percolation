function statistic(iter, sizeGrid) {
//iter - кол-во итерации, sizeGrid- размер матрицы, fun - функция заполнения, k - концентрация
    items = []
    var items_i=0;
    
    for(var b =0.05;b<=0.96;b+=0.05) {

        var stLenPath = 0;
        var stRedElm = 0;
        var valOfHole = 0;
        var numberOfClusters = 0;
        var averSizeCl = 0;
        for (var a = 0; a < iter; a++) {
            

            grid = generateRandomGrid(sizeGrid, b);
            //if (b==0.1 && a==0) makeTable(grid);
            grid1 = ArClone(grid);
            grid11 = ArClone(grid);
            grid2 = ArClone(grid);
            HoshenKopelman(grid2);
            var numbOfClusters = countClusters(grid2);
            var rasm_cl =0;
            for(var i=0;i<ar_clus.length;i++)
                if ( ar_clus[i] != undefined ) 
                    rasm_cl+=ar_clus[i];
            rasm_cl /=numbOfClusters;

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

            stLenPath += ar.length - 1;
            stRedElm += kol;
            valOfHole +=hole;
            numberOfClusters += numbOfClusters;
            averSizeCl += rasm_cl;
        }


        items[items_i] = {
            "b": b,
            "size": grid[0].length,
            "s": (stRedElm / iter),
            "p": (stLenPath / iter),
            "h": (valOfHole/iter),
            "numberOfClust": (numberOfClusters/ iter),
            "averSizeCluster": (averSizeCl/iter)
            

        };
        items_i++;

        console.log(".");
    }
    console.log(items);
}

function countClusters(grid){
    ar_clus = [];
    for (var i = 0; i < grid[0].length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            if ( ar_clus.indexOf( grid[i][j] ) == -1 ) 
                ar_clus[grid[i][j]] = 0;
        }
    }

    for (var i = 0; i < grid[0].length; i++) {
        for (var j = 0; j < grid[0].length; j++) {
            if ( ar_clus[grid[i][j] ] >=0 ) 
                ar_clus[grid[i][j]] ++;
        }
    }
    delete ar_clus[0];

    num_cl = 0;
    for (var i =0; i <ar_clus.length;i++)
        if ( ar_clus[i] != undefined ) 
            num_cl++;

    return num_cl;

}
