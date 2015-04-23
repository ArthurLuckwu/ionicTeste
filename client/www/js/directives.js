angular.module('starter.directives', ['starter.controllers'])

.directive('hichart', function () {

  return {
    restrict: 'E',
    transclude: true,
    controller: Highchart,
    template: '<div></div>',

    replace: true,
    link: function (scope, element, attrs) {
     
        var chart1 = new Highcharts.Chart({
          chart: {
            renderTo: attrs.id,
            type: attrs.charttype,
            height: attrs.chartheight,
            animation: false
          },
          xAxis: {
            categories: scope.chartCategories,
            labels: {
              step: scope.chartStep

            }
          },
          yAxis: {
            title: {
              text: ''
            }
          },
          series: [{
            data: scope.chartData,
            name: attrs.chartname
          }]

        });
      
    }
  };
})