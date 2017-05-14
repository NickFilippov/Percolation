google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChartPerc);

function drawChartPerc() {

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Концентрация');
    data.addColumn('number', 'Перколяции');
  

    rows = [];
    for (var i = 0;i< items.length;i++)
        rows[i] = [items[i].b, items[i].percolation];
    data.addRows(rows);


    var options = {
        title: 'Зависимость порога перколяции от концентрации',
        width: 1200,
        height: 600,
        //curveType: 'function',
        animation:{
            duration: 2000,
            
            startup: true,
        },

        axes: {
            x: {
                //0: {side: 'top'}
            }
        },
        curveType: 'none'
    };

    var chart = new google.visualization.LineChart(document.getElementById('line_top_perc'));

    chart.draw(data, options);
}