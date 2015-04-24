// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var db = null;

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'angles', "highcharts-ng", 'starter.directives'])

.run(function($ionicPlatform, $rootScope, $cordovaSQLite) {

  $rootScope.urlServer = 'localhost:3000';

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
    // db = $cordovaSQLite.openDB("my.db");
    // //db = window.openDatabase ("my.db", "1.0", "Cordova Demo", 200000);
    // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
    // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS grafico (id integer primary key, mes text, valor integer)");

    });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html"
    // controller: 'AppCtrl'
  })     
  // .state('app.home', {
  //   url: '/home',
  //   views: {
  //     'menuContent': {
  //       templateUrl: "index.html",
  //       controller: 'Teste'
  //     }
  //   }
        
  // })

  // .state('app.inserir', {
  //   url: '/inserir',
  //   views: {
  //     'menuContent': {
  //       templateUrl: "templates/inserir.html",
  //       controller: 'FactoryInsert'
  //     }
  //   }           
  // })

  // .state('app.info', {
  //   url: '/info',
  //   views: {
  //     'menuContent': {
  //       templateUrl: "templates/info.html",
  //       controller: 'InfoCtrl'
  //     }
  //   }  
  // })

  .state('app.grafico', {
    url: '/grafico',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/grafico.html",
        controller: 'Grafico'
      }
    }           
  })

  .state('app.highchart', {
    url: '/highchart',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/highchart.html",
        controller: 'Highchart'
      }
    }           
  })
.state('app.configuration', {
    url: '/configuration',
    views: {
      'menuContent': {
        templateUrl: "templates/configuration.html",
        controller: 'ConfigCtrl'
      }
    }           
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/configuration');

});
