angular.module('me-timer', [])
.directive('timer', [
  '$interval',
  function($interval){

    return {
      restrict: 'AE',
      scope: true,
      link: function($scope, $elem, $attrs){

        var intervalId;

        var timeFormatFull = 'full';
        var timeFormatDefault = timeFormatFull;
        var timeFormat = $attrs.timeFormat || timeFormatDefault;
        var timeFormatObserve = $attrs.$observe('timeFormat', function(_timeFormat_){
          timeFormat = _timeFormat_;
        });

        var timeIntervalDefault = 1000;
        var timeInterval = $attrs.timeInterval ? parseInt($attrs.timeInterval) : timeIntervalDefault;
        var timeIntervalObserve = $attrs.$observe('timeInterval', function(_timeInterval_){
          timeInterval = _timeInterval_ ? parseInt(_timeInterval_) : timeIntervalDefault;

          stopIntervalFunc();
          startIntervalFunc();
        });

        var timeStart = $attrs.timeStart || (new Date());
        var timeStartObserve = $attrs.$observe('timeStart', function(_timeStart_){
          timeStart = _timeStart_;

          stopIntervalFunc();
          startIntervalFunc();
        });

        var timeEnd = $attrs.timeEnd;
        var timeEndObserve = $attrs.$observe('timeEnd', function(_timeEnd_){
          timeEnd = _timeEnd_;

          stopIntervalFunc();
          startIntervalFunc();
        });

        $scope.counter = $attrs.timeCountdown;
        var timeCountdownObserve = $attrs.$observe('timeCountdown', function(_timeCountdown_){
          $scope.counter = _timeCountdown_;

          stopIntervalFunc();
          startIntervalFunc();
        });

        var endCallback = $attrs.endCallback ? $scope.$eval($attrs.endCallback) : function(){};
        var endCallbackObserve = $attrs.$observe('endCallback', function(_endCallback_){
          endCallback = _endCallback_ ? $scope.$eval(_endCallback_) : function(){};
        });


        startIntervalFunc();

        $scope.$on('$destroy', function(){

          timeFormatObserve();
          timeIntervalObserve();
          timeStartObserve();
          timeEndObserve();
          timeCountdownObserve();
          endCallbackObserve();

          stopIntervalFunc();
        });

        function stopIntervalFunc(){
          if(intervalId){
            $interval.cancel(intervalId);
            intervalId = undefined;
          }
        }

        function startIntervalFunc(){
          if(!intervalId){
            intervalId = $interval(intervalFunc, timeInterval);
          }
          intervalFunc();
        }

        function intervalFunc(){
          if($scope.counter){
            $scope.counter -= 1;
            if($scope.counter === 0){
              stopIntervalFunc();
              endCallback();
            }
          }else{
            if(timeEnd){
              var startTime = +new Date();
              var endTime = +new Date(timeEnd);
            }else{
              var startTime = +new Date(timeStart);
              var endTime = +new Date();
            }

            var second = 1000; // 每秒钟1000毫秒
            var minute = second * 60; // 每分钟60秒
            var hour = minute * 60; // 每小时60分钟
            var day = hour * 24; // 每天24小时

            var offset, tmp, ref;
            var days, hours, minutes, seconds;

            // days获取
            offset = endTime - startTime;
            offset = offset >= 0 ? offset : 0;
            days = offset >= day ? parseInt(offset / day) : 0;
            $scope.days = days;

            // hours获取
            offset = offset - day * days;
            offset = offset >= 0 ? offset : 0;
            hours = offset >= hour ? parseInt(offset / hour) : 0;
            ref = hours > 9 ? (hours + '') : ('0' + hours);
            tmp = ref.split('');
            $scope.hours = hours;
            $scope.uHours = tmp[1];
            $scope.dHours = (hours > 9 || timeFormat === timeFormatFull) ? tmp[0] : '';

            // minutes获取
            offset = offset - hour * hours;
            offset = offset >= 0 ? offset : 0;
            minutes = offset >= minute ? parseInt(offset / minute) : 0;
            ref = minutes > 9 ? (minutes + '') : ('0' + minutes);
            tmp = ref.split('');
            $scope.minutes = minutes;
            $scope.uMinutes = tmp[1];
            $scope.dMinutes = (minutes > 9 || timeFormat === timeFormatFull) ? tmp[0] : '';

            // seconds获取
            offset = offset - minute * minutes;
            offset = offset >= 0 ? offset : 0;
            seconds = offset >= second ? parseInt(offset / second) : 0;
            ref = seconds > 9 ? (seconds + '') : ('0' + seconds);
            tmp = ref.split('');
            $scope.seconds = seconds;
            $scope.uSeconds = tmp[1];
            $scope.dSeconds = (seconds > 9 || timeFormat === timeFormatFull) ? tmp[0] : '';

            if(timeEnd && hours === 0 && minutes === 0 && seconds === 0){
              stopIntervalFunc();
              endCallback();
            }
          }
        }
      }
    };
  }
]);