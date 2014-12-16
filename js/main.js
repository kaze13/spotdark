var mainApp = angular.module('mainApp', []);

mainApp.controller('mainCtrl', function($scope) {
    $scope.inputKeypress = function(event) {
        // enter
        if (event.keyCode === 13) {
            $scope.searchFile($scope.keyword);
        }
        // down arrow
        if (event.keyCode === 40) {
            $scope.selectSearchResult(0);
        }
    }

    $scope.searchFile = function(keyword) {
        console.warn(keyword);
        var child_process = require('child_process');
        var child = child_process.exec('locate ' + keyword + ' -l 10', {}, function(err, stdout, stderr) {
            $scope.$apply(function() {
                if (err) {
                    throw err;
                } else {
                    var result = stdout.split('\n');
                    $scope.searchResult = result;
                    console.log('$scope.searchResult:' + $scope.searchResult);

                }
            })
        })
    }

    $scope.selectSearchResult = function(index) {
        $scope.selected = {
            index: $scope.searchResult[index]
        }
    }


})
