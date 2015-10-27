angular.module('braintree-angular', [])

.factory('braintreeService', function($http) {
    var that = {};

    that.clientToken = null;

    that.gettingClientToken = function() {
        return $http.get('/client-token');
    };

    that.generateDropin = function(options) {
        that.gettingClientToken()
            .then(function(token) {
                braintree.setup(token, 'dropin', options);
            }, function() {
                console.error('BraintreeAngularDiretive: error fetching client token');
            });
    };

    return that;
})

.directive('braintreeDropin', function(braintreeService) {
    return {
        restrict: 'E',
        scope: {
            options: '='
        },
        template: '<div></div>',
        link: function(scope, attrs, element) {
            var options = scope.options || {};
            options.container = element;

            braintreeService.generateDropin(options);
        }
    };
})
;
