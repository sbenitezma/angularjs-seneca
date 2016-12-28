/**
 *
 * AngularJS Boilerplate
 * @description           Description
 * @author                Jozef Butko // www.jozefbutko.com/resume
 * @url                   www.jozefbutko.com
 * @version               1.1.7
 * @date                  March 2015
 * @license               MIT
 *
 */
;(function () {


    /**
     * Definition of the main app module and its dependencies
     */
    angular
        .module('boilerplate', [
            'ui.router',
            'ui.bootstrap'
        ])
        .config(config);

    // safe dependency injection
    // this prevents minification issues
    config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider', '$compileProvider'];

    /**
     * App routing
     *
     * You can leave it here in the config section or take it out
     * into separate file
     *
     */
    function config($stateProvider, $urlRouterProvider, $httpProvider, $compileProvider) {

        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "views/home.html"
            })
            .state('services', {
                url: "/services",
                templateUrl: "views/services.html",
            })
            .state('products', {
                url: "/products",
                templateUrl: "views/products.html"
            })
            .state('shops', {
                url: "/shops",
                templateUrl: "views/shops.html"
            });

        $httpProvider.interceptors.push('authInterceptor');

    }


    /**
     * You can intercept any request or response inside authInterceptor
     * or handle what should happend on 40x, 50x errors
     *
     */
    angular
        .module('boilerplate')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$rootScope', '$q', 'LocalStorage', '$location'];

    function authInterceptor($rootScope, $q, LocalStorage, $location) {

        return {

            // intercept every request
            request: function (config) {
                config.headers = config.headers || {};
                return config;
            },

            // Catch 404 errors
            responseError: function (response) {
                if (response.status === 404) {
                    $location.path('/');
                    return $q.reject(response);
                } else {
                    return $q.reject(response);
                }
            }
        };
    }


    /**
     * Run block
     */
    angular
        .module('boilerplate')
        .run(run);

    run.$inject = ['$rootScope', '$location'];

    function run($rootScope, $location) {

        // put here everything that you need to run on page load

    }


})();