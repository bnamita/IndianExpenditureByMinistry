google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(draw_piechart);

var ministry_data = [
    ["Department","Expenditure (2016-17)","Sub"],
    ["Ministry of Finance",723461,[finance_data]],
    ["Ministry of Defence",340922,[defence_data]],
    ["Ministry of Consumer Affairs, Food and Public Distribution",141392,[consumer_affairs_data]],
    ["Ministry of Chemicals and Fertilizers",70453,[chemicals_data]],
    ["Ministry of Rural Development",87765,[rural_development_data]],
    ["Ministry of Human Resource Development",72394,[hrd_data]],
    ["Ministry of Home Affairs",77383,[home_affairs_data]],
    ["Ministry of Road Transport and Highways",57976,[road_transport_data]],
    ["Ministry of Railways",45000.00,[railway_data]],
    ["Ministry of Health and Family Welfare",38206,[health_data]],
    //["Ministry of Petroleum and Natural Gas",30125.55,[petroleum_data]],
    //["Ministry of Agriculture and Farmers Welfare",24909.78,[agriculture_data]],
    //["Ministry of Communications and Information Technology",23243.30,[it_data]],
    //["Ministry of Urban Development",19216.87,[urban_dev_data]],
    //["Ministry of External Affairs",14966.83,[external_affairs_data]],
    ["Other Ministries",323108,[others_data]]
];



function draw_piechart(){

    var all_data = google.visualization.arrayToDataTable(ministry_data);


    var pie_options = {
        title: 'Expenditure by Ministries (2016-17) (in crores of Rupees) \nTotal : Rs.1978060',
        'subtitle': 'Total : 1978060'
    };

    var piechart = new google.visualization.PieChart(document.getElementById('piechart_div'));

    // on select event
    // 1. Highlight selected
    // 2. Draw sub piechart
    // The select handler. Call the chart's getSelection() method
    function selectHandler(e) {
        var selectedItem = piechart.getSelection()[0];
        if (selectedItem) {

           // this.style("background-color","#fff")
            draw_subchart(selectedItem);
        }

    }

    function draw_subchart(item){
        var subData = all_data.getValue(item.row, 2);
        if(subData.length > 0) {
            var sub_piechart_data = google.visualization.arrayToDataTable(subData[0]);
            var pie_options = {
                title: 'Expenditure for '+all_data.getValue(item.row, 0) + " \nTotal: Rs." + all_data.getValue(item.row, 1),
                chart: {
                    subTitle: 'Total : '+all_data.getValue(item.row, 1)
                }
            };
            $("#sub_piechart_div").css("display", "block");
            var sub_piechart = new google.visualization.PieChart(document.getElementById('sub_piechart_div'));
            if (all_data.getValue(item.row, 0) === "Others") {
                //pie_options.width = "500";
                //pie_options.height = "1200";
                //$("#sub_piechart_div").css("height", "800px");
                sub_piechart.draw(sub_piechart_data, pie_options);
            } else {
                //pie_options.width = "400";
                //pie_options.height = "1000";
                //$("#sub_piechart_div").css("height", "500px");
                sub_piechart.draw(sub_piechart_data, pie_options);
            }

        } else {
            $("#sub_piechart_div").css("display", "none");
        }

    }

    // Listen for the 'select' event, and call my function selectHandler() when
    // the user selects something on the chart.
    google.visualization.events.addListener(piechart, 'select', selectHandler);
    piechart.draw(all_data, pie_options);

}

