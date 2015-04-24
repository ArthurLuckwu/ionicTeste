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


	DadosJson.all().then(function(data){
		bebida = [];
		consumo = [];
		$scope.json = data.data;

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
.controller('ConfigCtrl', function($scope,$rootScope,$timeout) {
	$scope.title = "Configuração";

	$scope.data = {
    isLoading: false
  	};

	var serverArray = $rootScope.urlServer.split(':');
	
	$scope.serverIp = serverArray[0];
	$scope.serverPort = serverArray[1];
	

	$scope.saveConfig = function(serverIp,serverPort) {
		$rootScope.urlServer = serverIp+':'+serverPort;
		$scope.data = { isLoading: true};
		$timeout(function() {
			$scope.data = { isLoading: false};
		}, 2000);
	}
})
.controller('Highchart', function($scope, GetDadosGrafico, DadosJson){
	$scope.teste = "Teste";
	$scope.mes = [];
	$scope.valor = [];

    DadosJson.all().then(function(data){
		bebida = [];
		consumo = [];
		$scope.json = data.data;

		for(var i = 0; i < data.data.length; i++){
			bebida.push(data.data[i].bebida)
			consumo.push(data.data[i].consumo)
		}

		$scope.optionsColumn = {
			options: {
		    	type: 'bar',
		  	}

		};

    	$scope.chartConfig={
    		  chart:{
    		  	type: 'bar',
		          options3d: {
		              enabled: false,
		              alpha: 20,
		              beta: 0,
		              depth: 90
            	  }
            	},	
			  title: {
			    text: "Consumo de Bebidas"
			  },
			  subtitle: {
			    text: "Gráfico de Teste"
			  },
			  credits: {
	            enabled: false
    	      },
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
			  tooltip: {
			  	style: {
		              padding: 10,
		              fontWeight: 'bold'
		      }},
			  plotOptions: {
			    area: {
			      pointStart: 1940,
			      marker: {
			        enabled: false,
			        symbol: "circle",
			        radius: 2,
			        states: {
			          hover: {
			            enabled: true
			          }
			        }
			      }
			    }
			  },
			  series: [
				{
				  	name: 'Consumo',
				    data: consumo,
				    // colorByPoint: true
			  	}
		    ]
	    	}
    })

	

})

