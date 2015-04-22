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

.controller('Grafico', function($scope, $cordovaSQLite, GetDadosGrafico){
	$scope.mes = [];
	$scope.valor = [];
	$scope.dados = [];
	cor = ['blue', '#FFFF00', 'green', '#00BFFF', 'pink', 'orange', 'gray', '#FF5A5E', '#FDB45C', '#FFC870', '#5AD3D1', '#FF5A5E' ];

	// $scope.inserir = function(){
	// 	db = $cordovaSQLite.openDB("my.db");
	// 	var query = "INSERT INTO grafico (mes, valor) VALUES ('Janeiro', 25),('Fevereiro', 45),('Março', 70),('Abril', 90),('Maio', 10),"+
	//     "('Junho', 20),('Julho', 50),('Agosto', 80),('Setembro', 85),('Outubro', 100),('Novembro', 75),('Dezembro', 60)";
	//     $cordovaSQLite.execute(db, query).then(function(result) {
	//         return true
	//         console.log("Inserido com sucesso!")
	        
	//     }, function (err) {
	//         console.error(err);
	//         return err;
	//     });
	// }

	GetDadosGrafico.all().then(function(resultado){
		for(var i=0; i < resultado.length; i++){
			var d= {
		        value: resultado[i].valor,
		        color: cor[i],
		        highlight: "#90EE90",
		        label: resultado[i].mes
		    };
		    $scope.dados.push(d);
		    $scope.mes.push(resultado[i].mes);
		    $scope.valor.push(resultado[i].valor);
		}

		$scope.chart = {
		    labels: $scope.mes,
		    datasets : [
		        {
		            fillColor : "rgba(151,187,205,0)",
		            strokeColor : "#e67e22",
		            pointColor : "rgba(151,187,205,0)",
		            pointStrokeColor : "#e67e22",
		            data : $scope.valor
		        }
		    ] 
		};
	});
})

.controller('Highchart', function($scope){
	$scope.teste = "Teste";
	

})

