google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart2_n);

function drawChart2_n() {

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Концентрация');
    data.addColumn('number', 'Нормированн');
  

    rows = [];
    for (var i = 0;i< items.length;i++)
        rows[i] = [items[i].b, items[i].p/items[i].size/items[i].size];
    data.addRows(rows);


    var options = {
        title: 'Зависимость длины кратчайшего пути от концентрации',
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

    var chart = new google.visualization.LineChart(document.getElementById('line_top_x2_n'));

    chart.draw(data, options);
}