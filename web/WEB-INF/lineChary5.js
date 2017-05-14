google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart5);

function drawChart5() {

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Концентрация');
    data.addColumn('number', 'Не нормирован');
  

    rows = [];
    for (var i = 0;i< items.length;i++)
        rows[i] = [items[i].b, items[i].averSizeCluster];
    data.addRows(rows);


    var options = {
        title: 'Зависимость среднего размера кластеров в матрице от концентрации',
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

    var chart = new google.visualization.LineChart(document.getElementById('line_top_x5'));

    chart.draw(data, options);
}