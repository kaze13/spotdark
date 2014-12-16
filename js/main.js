var mainApp = angular.module('mainApp', []);

mainApp.controller('mainCtrl', function($scope) {

	$scope.keypress = function(event) {
		if (event.keyCode === 13) {
			console.log('enter pressed;');
			$scope.searchFile($scope.keyword);
		}
	}

	$scope.searchFile = function(keyword) {
		console.warn(keyword);
		var child_process = require('child_process');
		var child = child_process.execFile('/etc/alternatives/locate', [keyword, '-l', '10'], {}, function(err, stdout, stderr) {
			if (err) {
				throw err;
			} else {
				var result = stdout.split('\n');
				$scope.searchResult = result;
				console.log('$scope.searchResult:' + $scope.searchResult);
			}
		})

		// child.stdout.once('data', function(data) {
		// 	var result = data.split('\n');
		// 	$scope.searchResult = result;
		// 	console.log('result array:' + $scope.searchResult);
		// });
	}


})