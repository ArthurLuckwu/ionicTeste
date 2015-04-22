angular.module('starter.services', [])

.factory('Factory', function(){
	info = [
	{
		id: 1,
		nome: 'Cicrano',
		sobrenome: 'de Tal'
	},
	{
		id: 2,
		nome: 'Fulano',
		sobrenome: 'de Sei lá'

	},
	{
		id: 3,
		nome: 'Beltrando',
		sobrenome: 'de não Sei.'

	}];

	return{
		all: function(){
			return info;
		},
		remove: function(id){
			info.splice(info.indexOf(id), 1)
		},
		get: function(id){
			for(var i = 0; info.length; i++)
			{
				if(info(i).id === parseInt(infoId)){
					return info[i]
				}
			}
			return null;
		}
	}
})

.factory('Banco', function($cordovaSQLite){
	return{
		insert: function(dados){
			db = $cordovaSQLite.openDB("my.db");
		    var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
		    $cordovaSQLite.execute(db, query, [dados.firstname, dados.lastname]).then(function(result) {
		        return true
		        // console.log("INSERT ID -> " + result.insertId)
		        
		    }, function (err) {
		        console.error(err);
		        return err;
		    });
		    // return null;
		}
	}
})

.factory('GetDadosGrafico', function($cordovaSQLite){
	return{
		all: function(){
			db = $cordovaSQLite.openDB("my.db");
		    var query = "SELECT mes, valor FROM grafico";
		    return $cordovaSQLite.execute(db, query).then(function(result) {
		    	resultado = [];	
		    	if(result.rows.length > 0) {
		        	for(var i = 0; i < result.rows.length; i++){
		        		var r = {};
		        		r.mes = result.rows.item(i).mes;
		        		r.valor = result.rows.item(i).valor;
		        		// $scope.mes.push(result.rows.item(i).mes);
		        		// $scope.valor.push(result.rows.item(i).valor);
		        		resultado.push(r);
					}	
		        }else{
		            console.log("No results found");
		            return null;
		        }
		        return resultado;
		    }, function (err) {
		        console.error(err);
		    });
		    // return null;
		}
	}
})



// .factory('Lista', function($cordovaSQLite){
// 	db = $cordovaSQLite.openDB("my.db");
//         var query = "SELECT firstname, lastname FROM people";
//         $cordovaSQLite.execute(db, query).then(function(result) {
//         	console.log('----RESULTADOS ----');
//             if(result.rows.length > 0) {
//             	// $scope.resultado = [];

//             	for(var i = 0; i < result.rows.length; i++){
//             		$scope.resultado.push(result.rows.item(i));
//             	}	

//             	console.log("SELECTED -> " + result.rows.item(0).firstname + " " + result.rows.item(0).lastname);
//             }else{
//                 console.log("No results found");
//             }
//         }, function (err) {
//             console.error(err);
//         });

// })