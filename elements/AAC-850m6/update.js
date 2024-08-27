function(instance, properties, context) {

    var height = properties.bubble.height();
    var font_size = properties.bubble.font_size();
    var font_alignment = properties.bubble.font_alignment();
    var font_color = properties.bubble.font_color();
    var font_face = properties.bubble.font_face();
        
    var title = properties.title;
    var title_align = properties.title_alignment;
    var xaxis_values =
      properties.xaxis_values?.get(0, properties.xaxis_values.length()) || [];
    var no_data_text = properties.no_data_text;
    var dark_mode = properties.dark_mode;
    var tooltip_enabled = properties.tooltip_enabled;
    var downloading_enabled = properties.downloading_enabled;
    var distributed = properties.distributed;
    
    var series_1_name = properties.series_1_name || "";
    var series_1_data =
      properties.series_1_data?.get(0, properties.series_1_data.length()) || [];
    
    var colors = properties.colors?.get(0, properties.colors.length()) || [];
    
    var style = { fontSize: font_size, fontFamily: font_face, colors: font_color }  

    var options = {
      series: [
        ... series_1_data.length > 0 ? [{
          name: series_1_name,
          data: series_1_data,
        }]: [],
      ],
      chart: {
        type: 'bar',
        height: height,
        fontFamily: font_face,
        toolbar: {
            tools: {
               download: downloading_enabled
            }
        },
      },
      plotOptions: {
          bar: {
      		borderRadius: 0,
            horizontal: true,
            barHeight: '80%',
            isFunnel: true,
            distributed: distributed
          }
       },
      dataLabels: {
        enabled: true,
      },
      colors: colors,
      title: {
        text: title || "",
        align: title_align,
      },
      xaxis: {
        categories: xaxis_values,
        labels: { style: style }
      },
      yaxis: {
        labels: { style: style } 
      },
      legend: {
        show: false
      },
      noData: {
      	text: no_data_text
      },
      theme: {
        mode: dark_mode ? 'dark': 'light'
      },
      tooltip: {
      	enabled: tooltip_enabled
      }
    };

    instance.data.container = document.createElement("div");
    instance.canvas.append(instance.data.container);

    var apexChart = new ApexCharts(instance.data.container, options);
    apexChart.render();

}