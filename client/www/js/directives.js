'use strict';

angular.module('starter.directives', []).directive('chart', function() {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            chartData: "=value",
            chartObj: "=?"
        },
        transclude: true,
        replace: true,
        link: function($scope, $element, $attrs) {

            //Update when charts data changes
            $scope.$watch('chartData', function(value) {
                if (!value)
                    return;

                // Initiate the chartData.chart if it doesn't exist yet
                $scope.chartData.chart = $scope.chartData.chart || {};

                // use default values if nothing is specified in the given settings
                $scope.chartData.chart.renderTo = $attrs.id
                if ($attrs.type)
                    $scope.chartData.chart.type = $attrs.type;
                if ($attrs.height)
                    $scope.chartData.chart.height = $scope.chartData.chart.height || $attrs.height;
                if ($attrs.width)
                    $scope.chartData.chart.width = $scope.chartData.chart.type || $attrs.width;
                if ($attrs.tridim)
                    $scope.chartData.chart.options3d.enabled = $attrs.tridim;


                console.log($scope.chartData)
                
                $scope.chartObj = new Highcharts.Chart($scope.chartData);
                
                
            });
        }
    };

});