google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawChart1);

function drawChart1() {

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Концентрация');
    data.addColumn('number', '');

    rows = [];
    for (var i = 0;i< items.length;i++)
        rows[i] = [items[i].b, items[i].s];
    data.addRows(rows);


    var options = {
        chart: {
            title: 'Зависимость количества красных точкек в кратчайшем пути от концентрации',
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

    var chart = new google.charts.Line(document.getElementById('line_top_x'));

    chart.draw(data, options);
}
