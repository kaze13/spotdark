var mainApp = angular.module('mainApp', []);

mainApp.controller('mainCtrl', function($scope) {
    this.limit_ = 10;
    $scope.selectedIndex = null;
    $scope.inputKeypress = function(event) {
        // enter
        if (event.keyCode === 13) {
            $scope.searchFile($scope.keyword);
        }
        // down arrow
        if (event.keyCode === 40) {
        	console.log("arrow down pressed in input");
            selectSearchResult(0);
        }
    }

    $scope.searchResultKeypress = function(event) {
        if (event.keyCode === 13) {
            openFile();
        }
        if (event.keyCode === 40) {
            moveSelectCursorDown();
        }
        if (event.keyCode === 38) {
            moveSelectCursorUp();
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

    function openFile() {

    }

    function moveSelectCursorDown() {
        if ($scope.selectedIndex === this.limit_ - 1) {
            $scope.selectedIndex = 0;
        } else {
            $scope.selectedIndex = $scope.selectedIndex + 1;
        }
    }

    function moveSelectCursorUp() {
        if ($scope.selectedIndex === 0) {
            $scope.selectedIndex = this.limit_ - 1;
        } else {
            $scope.selectedIndex = $scope.selectedIndex - 1;
        }
    }

    function selectSearchResult(index) {
        $scope.selectedIndex = index;
        $scope.selectedItem = {
            index: $scope.searchResult[index]
        }
    }


})
