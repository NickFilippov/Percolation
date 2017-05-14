function perc(iter, sizeGrid) {
//iter - кол-во итерации, sizeGrid- размер матрицы, fun - функция заполнения, k - концентрация
    items = []
    var items_i=0;
    
    for(var b =0.05;b<=0.96;b+=0.05) {
        var p = 1;
        var percol = 0;
        for (var a = 0; a < iter; a++) {
            grid = generateRandomGrid(sizeGrid, b);

            grid1 = ArClone(grid);
            grid11 = ArClone(grid);
    
            for (var i = 0; i < grid[0].length; i++) {
                for (var j = 0; j < grid[0].length; j++) {
                    if (grid1[i][j] == 0) grid1[i][j] = grid[0].length * grid[0].length + 10000;
                }
            }

            var map = getMap(grid1);
            graph = new Graph(map);


            var kr_best = grid1[0].length*grid1[0].length; 
    //ar_best;
    for (var j = 0; j < grid1[0].length; j++) {
     
    //var ar ;//=graph.findShortestPath(Math.round(grid1[0].length/2), "" + grid1[0].length - 1 + "_0");
    var k_best = grid1[0].length;
    var l_best = grid1[0].length * grid1[0].length;

      for (var i = 0; i < grid1[0].length - 1; i++) {

          var k_min = 0, l_min = 0;
          var v = graph.findShortestPath(j, "" + grid1[0].length - 1 + "_"+i);
          while ( v[v.length-2].split("_")[0]==grid1[0].length-1 )
                v.length = v.length-1;

          l_min=v.length;

          var k = 1;
          if (v[0] === "0_0") k =0;
          for (; k < v.length; k++) {
                  var ii = parseInt(v[k].split("_")[0], 10),
                      jj = parseInt(v[k].split("_")[1], 10);

                  if (grid11[ii][jj] == 0) k_min++;
          }
          if (k_min<=k_best) {
            if (k_min<k_best){
              ar = graph.findShortestPath(j, "" + grid1[0].length - 1 + "_"+i);
              while ( ar[ar.length-2].split("_")[0]==grid1[0].length-1 )
                ar.length = ar.length-1;
                //delete ar[ar.length-1];
                //ar[ar.length-1]=unde

              k_best=k_min;
              l_best=l_min;
            }
            if (k_min=k_best && l_best>l_min){
              ar = v;// graph.findShortestPath(Math.round(grid1[0].length/2), "" + grid1[0].length - 1 + "_"+i);
              k_best=k_min;
              l_best=l_min;
            }
          }
        }
//console.log('.');
          var kr =0;
          var i = 1;
          if (ar[0] === "0_0") i =0;
          for (;i<ar.length;i++){
            var ii = parseInt(ar[i].split("_")[0], 10),
                jj = parseInt(ar[i].split("_")[1], 10);

            if (grid11[ii][jj] == 0)
              kr++;
          }
          if (kr<kr_best){
            ar_best = ar;
            kr_best = kr;
          }

        }
    ar = ar_best;



    //console.log(ar);
    
    var v = 1;
    if (ar[0] === "0_0") v =0;
    for (;v<ar.length;v++){
        var ii = parseInt(ar[v].split("_")[0], 10),
            jj = parseInt(ar[v].split("_")[1], 10);
        if (grid[ii][jj] == 0) {
            p=0;
          }
    }
            percol += p;

            //console.log(ar);
            //console.log(grid);
        }
    


        items[items_i] = {
            "percolation": (percol /iter),
            "b": b,
            "size": grid[0].length
        };
        items_i++;

        console.log(".");
    }
    console.log(items);
}