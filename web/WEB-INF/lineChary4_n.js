google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart4_n);

function drawChart4_n() {

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Концентрация');
    data.addColumn('number', 'Нормирован');
  

    rows = [];
    for (var i = 0;i< items.length;i++)
        rows[i] = [items[i].b, items[i].numberOfClust/items[i].size/items[i].size];
    data.addRows(rows);


    var options = {
        title: 'Зависимость количества кластеров в матрице от концентрации',
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

    var chart = new google.visualization.LineChart(document.getElementById('line_top_x4_n'));

    chart.draw(data, options);
}