angular.module('starter.controllers', [])

.controller('Teste', function($scope, $cordovaSQLite){
	$scope.texto = "testando";
	$scope.resultado = [];

	$scope.clicando = function(){

		alert('Clicou!');
	};

	$scope.dados = [
		{
			firstname: {}
		},
		{
			lastname: {}
		}
	]

	// $scope.formulario = function(dados){
	// 	nome = dados.nome	
	// 	alert(dados.nome);
	// 	alert(dados.cpf);
	// }

	$scope.insert = function(dados) {
		db = $cordovaSQLite.openDB("my.db");
        var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [dados.firstname, dados.lastname]).then(function(result) {
            console.log("INSERT ID -> " + result.insertId);
        }, function (err) {
            console.error(err);
        });

    }

    $scope.select = function(lastname) {
    	db = $cordovaSQLite.openDB("my.db");
        var query = "SELECT firstname, lastname FROM people WHERE lastname = ?";
        $cordovaSQLite.execute(db, query, [lastname]).then(function(result) {
            if(result.rows.length > 0) {

                console.log("SELECTED -> " + result.rows.item(0).firstname + " " + result.rows.item(0).lastname);
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    }

    $scope.selectAll = function() {
    	db = $cordovaSQLite.openDB("my.db");
        var query = "SELECT firstname, lastname FROM people";
        $cordovaSQLite.execute(db, query).then(function(result) {
        	console.log('----RESULTADOS ----');
            if(result.rows.length > 0) {
            	// $scope.resultado = [];
            	$scope.resultado = []
            	for(var i = 0; i < result.rows.length; i++){
            		$scope.resultado.push(result.rows.item(i));
            	}	

            	console.log("SELECTED -> " + result.rows.item(0).firstname + " " + result.rows.item(0).lastname);
            }else{
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    }

})

.controller('InfoCtrl', function($scope, $stateParams, Factory){
	$scope.infos = Factory.all();

})

.controller('FactoryInsert', function($scope, Banco, $cordovaSQLite){
	$scope.retorno = {}

	$scope.dados = [
		{
			firstname: {}
		},
		{
			lastname: {}
		}
	]

	// var cordovaSQLite = $cordovaSQLite

	$scope.insert = function(dados){
		$scope.retorno = Banco.insert(dados)
	}

	

	// if($scope.dados != null){
	// 	// $scope.inserir = Insert(dados);
	// 	// alert($scope.inserir);
	// }
})

.controller('Grafico', function($scope, $cordovaSQLite, DadosJson){
	$scope.mes = [];
	$scope.valor = [];
	$scope.dados = [];
	cor = ['blue', '#FFFF00', 'green', '#00BFFF', 'pink', 'orange', 'gray', '#FF5A5E', '#FDB45C', '#FFC870', '#5AD3D1', '#FF5A5E' ];

	$scope.inserir = function(){
		db = $cordovaSQLite.openDB("my.db");
		var query = "INSERT INTO grafico (mes, valor) VALUES ('Janeiro', 25),('Fevereiro', 45),('Março', 70),('Abril', 90),('Maio', 10),"+
	    "('Junho', 20),('Julho', 50),('Agosto', 80),('Setembro', 85),('Outubro', 100),('Novembro', 75),('Dezembro', 60)";
	    $cordovaSQLite.execute(db, query).then(function(result) {
	        return true
	        console.log("Inserido com sucesso!")
	        
	    }, function (err) {
	        console.error(err);
	        return err;
	    });
	}

	// GetDadosGrafico.all().then(function(resultado){
	// 	for(var i=0; i < resultado.length; i++){
	// 		var d= {
	// 	        value: resultado[i].valor,
	// 	        color: cor[i],
	// 	        highlight: "#90EE90",
	// 	        label: resultado[i].mes
	// 	    };
	// 	    $scope.dados.push(d);
	// 	    $scope.mes.push(resultado[i].mes);
	// 	    $scope.valor.push(resultado[i].valor);
	// 	}

	// 	$scope.chart = {
	// 	    labels: $scope.mes,
	// 	    datasets : [
	// 	        {
	// 	            fillColor : "rgba(151,187,205,0)",
	// 	            strokeColor : "#e67e22",
	// 	            pointColor : "rgba(151,187,205,0)",
	// 	            pointStrokeColor : "#e67e22",
	// 	            data : $scope.valor
	// 	        }
	// 	    ] 
	// 	};
	// });

	DadosJson.all().then(function(data){
		bebida = [];
		consumo = [];
		$scope.json = data.data;
		// console.log(data.data[0].bebida)

		for(var i = 0; i < data.data.length; i++){
			bebida.push(data.data[i].bebida)
			consumo.push(data.data[i].consumo)

			var d= {
		        value: data.data[i].consumo,
		        color: cor[i],
		        highlight: "#90EE90",
		        label: data.data[i].bebida
		    };

		    $scope.dados.push(d);
		    
		    // $scope.mes.push(resultado[i].mes);
		    // $scope.valor.push(resultado[i].valor);

		}

		console.log($scope.dados)

		$scope.dadoss = [
		    {
		        value: 300,
		        color:"#F7464A",
		        highlight: "#FF5A5E",
		        label: "Red"
		    },
		    {
		        value: 50,
		        color: "#46BFBD",
		        highlight: "#5AD3D1",
		        label: "Green"
		    },
		    {
		        value: 100,
		        color: "#FDB45C",
		        highlight: "#FFC870",
		        label: "Yellow"
		    },
		    {
		        value: 40,
		        color: "#949FB1",
		        highlight: "#A8B3C5",
		        label: "Grey"
		    },
		    {
		        value: 120,
		        color: "#4D5360",
		        highlight: "#616774",
		        label: "Dark Grey"
		    }

		];
		

		$scope.chart = {
		    labels: bebida,
		    datasets : [
		        {
		            fillColor : "rgba(151,187,205,0)",
		            strokeColor : "#e67e22",
		            pointColor : "rgba(151,187,205,0)",
		            pointStrokeColor : "#e67e22",
		            data :consumo
		        }
		    ] 
		};
	});

})

.controller('Highchart', function($scope, GetDadosGrafico, DadosJson){
	$scope.teste = "Teste";
	$scope.mes = [];
	$scope.valor = [];

	// GetDadosGrafico.all().then(function(resultado){
	// 	for(var i=0; i < resultado.length; i++){
	// 	    $scope.mes.push(resultado[i].mes);
	// 	    $scope.valor.push(resultado[i].valor);
	// 	}

	// 	$scope.chartConfig = {
        
	// 	  options: {
	// 	      //This is the Main Highcharts chart config. Any Highchart options are valid here.
	// 	      //will be overriden by values specified below.
	// 	      chart: {
	// 	          type: 'column',
	// 	          // options3d: {
	// 	          //     enabled: true,
	// 	          //     alpha: 10,
	// 	          //     beta: 25,
	// 	          //     depth: 70
 //            // 	  }
	// 	      },
	// 	      tooltip: {
	// 	          style: {
	// 	              padding: 10,
	// 	              fontWeight: 'bold'
	// 	          }
	// 	      }
	// 	  },

	// 	  //The below properties are watched separately for changes.

	// 	  //Series object (optional) - a list of series using normal highcharts series options.
	// 	  series: [{
	// 	     data: $scope.valor
	// 	  }],
	// 	  //Title configuration (optional)
	// 	  title: {
	// 	     text: 'Hello'
	// 	  },
	// 	  //Boolean to control showng loading status on chart (optional)
	// 	  //Could be a string if you want to show specific loading text.
	// 	  loading: false,
	// 	  //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
	// 	  //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
	// 	  xAxis: {
 //            categories: $scope.mes
 //          },
	// 	  //Whether to use HighStocks instead of HighCharts (optional). Defaults to false.
	// 	  useHighStocks: false,
	// 	  //size (optional) if left out the chart will default to size of the div or something sensible.
	// 	  // size: {
	// 	  //  width: 900,
	// 	  //  height: 500
	// 	  // },
	// 	  //function (optional)
	// 	  func: function (chart) {
	// 	   //setup some logic for the chart
	// 	  }
 //    	}
		

				
	// });

	// mes = ['Janeiro','Fevereiro','Março','Abril'];
	// valor = [40, 70, 30, 90];

	// $scope.chartConfig = {
        
	// 	  options: {
	// 	      //This is the Main Highcharts chart config. Any Highchart options are valid here.
	// 	      //will be overriden by values specified below.
	// 	      chart: {
	// 	          type: 'column',
	// 	          options3d: {
	// 	              enabled: true,
	// 	              alpha: 0,
	// 	              beta: 0,
	// 	              depth: 90
 //            	  }
	// 	      },
	// 	      tooltip: {
	// 	          style: {
	// 	              padding: 10,
	// 	              fontWeight: 'bold'
	// 	          }
	// 	      }
	// 	  },

	// 	  //The below properties are watched separately for changes.

	// 	  //Series object (optional) - a list of series using normal highcharts series options.
	// 	  series: [{
	// 	  	name: 'Meses',
	// 	    data: valor,
	// 	    colorByPoint: true
	// 	  }],
	// 	  // drilldown: {
 //    //         series: drilldownSeries
 //    //       },
	// 	  //Title configuration (optional)
	// 	  title: {
	// 	     text: 'Hello'
	// 	  },
	// 	  //Boolean to control showng loading status on chart (optional)
	// 	  //Could be a string if you want to show specific loading text.
	// 	  loading: false,
	// 	  //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
	// 	  //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
	// 	  xAxis: {
 //            categories: mes
 //          },
	// 	  //Whether to use HighStocks instead of HighCharts (optional). Defaults to false.
	// 	  useHighStocks: false,
	// 	  //size (optional) if left out the chart will default to size of the div or something sensible.
	// 	  // size: {
	// 	  //  width: 900,
	// 	  //  height: 500
	// 	  // },
	// 	  //function (optional)
	// 	  func: function (chart) {
	// 	   //setup some logic for the chart
	// 	  }
 //    }

    DadosJson.all().then(function(data){
		bebida = [];
		consumo = [];
		$scope.json = data.data;
		// console.log(data.data[0].bebida)

		for(var i = 0; i < data.data.length; i++){
			bebida.push(data.data[i].bebida)
			consumo.push(data.data[i].consumo)
		}

		$scope.optionsColumn = {
			options: {
		    	type: 'bar',
		  	}

		};


		$scope.chartConfig = {
		    options: {
		      chart: {
		          // type: 'bar',
		          options3d: {
		              enabled: true,
		              alpha: 10,
		              beta: 0,
		              depth: 90
            	  }
		      },
		      tooltip: {
		          style: {
		              padding: 10,
		              fontWeight: 'bold'
		          }
		      }
		    },
		  credits: {
            enabled: false
          },
		  series: [{
		  	name: 'Consumo',
		    data: consumo,
		    // colorByPoint: true
		  }],
		  // drilldown: {
    //         series: drilldownSeries
    //       },
		  title: {
		     text: 'Consumo de Bebidas'
		  },
		  loading: false,
		  xAxis: {
            categories: bebida,
            title: {
          		text:'Bebida'
          	}
            
          },
          yAxis:{
          	title: {
          		text:'Consumo'
          	}
          },
		  useHighStocks: false,
		  func: function (chart) {
		   //setup some logic for the chart
		  }
    }

    })

})

