var mainApp = angular.module('mainApp', []);

mainApp.controller('mainCtrl', function($scope) {
    this.limit_ = 10;
    var $resultBox_ = document.querySelector('#result-box').focus();
    var $searchInput_ = document.querySelector('#search-input').focus();
    $scope.selectedIndex = null;
    $scope.inputKeyup = function(event) {
        console.log("key pressed at input:" + event.keyCode);

        if (event.keyCode >= 48 && event.keyCode <= 90) {
            $scope.searchFile($scope.keyword);

        }
        // enter
        if (event.keyCode === 13) {
            $scope.searchFile($scope.keyword);
        }
        // down arrow
        if (event.keyCode === 40) {
            $resultBox_.focus();
            selectSearchResult(0);
        }
    }

    $scope.searchResultKeypress = function(event) {
        console.log("key pressed at result box:" + event.keyCode);

        if (event.keyCode === 13) {
            openFile();
        }
        if (event.keyCode === 40) {
            moveSelectCursorDown();
        }
        if (event.keyCode === 38) {
            moveSelectCursorUp();
        }
        if (event.keyCode === 27) {
            $searchInput_.focus();

        }
    }



    $scope.searchFile = function(keyword) {
        console.warn(keyword);
        var child_process = require('child_process');
        var child = child_process.exec('locate ' + keyword + ' -l 10', {}, function(err, stdout, stderr) {
            $scope.$apply(function() {
                if (err) {
                    $scope.searchResult = [];
                    throw err;
                }
                if (stderr) {
                    $scope.searchResult = [];
                    console.error(stderr);
                }
                if (stdout) {
                    var result = stdout.split('\n').filter(function(item) {
                        return item.length !== 0
                    });
                    $scope.searchResult = result;
                    console.log('$scope.searchResult:' + $scope.searchResult);

                }
            })
        })
    }

    function openFile() {

    }

    function moveSelectCursorDown() {
        if ($scope.selectedIndex === $scope.searchResult.length - 1) {
            $scope.selectedIndex = 0;
        } else {
            $scope.selectedIndex = $scope.selectedIndex + 1;
        }
        selectSearchResult($scope.selectedIndex);
    }

    function moveSelectCursorUp() {
        if ($scope.selectedIndex === 0) {
            $scope.selectedIndex = $scope.searchResult.length - 1;
        } else {
            $scope.selectedIndex = $scope.selectedIndex - 1;
        }
        selectSearchResult($scope.selectedIndex);
    }

    function selectSearchResult(index) {
        if (!$scope.searchResult || $scope.searchResult.length === 0) {
            return;
        }
        $scope.selectedIndex = index;
        $scope.selectedItem = $scope.searchResult[index];
        console.log("item:" + $scope.searchResult[index] + " selected at index: " + index);
    }


})
