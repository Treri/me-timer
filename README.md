## me-timer

timer and countdown directive for angular

### Usage
1. include `me-timer` as angular dependence
    ```js
    var app = angular.module('myApp', ['me-timer']);
    ```

2. write `timer` element or attr.
    ```html
    <div
      timer
      [time-format="normal"]
      [time-interval="1000"]
      [time-start="{{timeStart}}"]
      [time-end="{{timeEnd}}"]
      [time-countdown="{{countdown}}"]
      [end-callback="endCallback"]
    >
      {{days}} {{hours}}:{{minutes}}:{{seconds}}

      {{dHours}}{{uHours}}:{{dMinutes}}{{uMinutes}}:{{dSeconds}}{{uSeconds}}

      {{counter}}
    </div>
    ```

### Option
- timeFormat => default to `full`. you can set to `normal`. when `normal`, hours, minutes and seconds will have no leading zero if they are less than 10.
- timeInterval => default to `1000`(as 1s)
- timeStart => default to `Date.now`
- timeEnd => when stop the timer
- timeCountdown => how many number to count to stop the timer
- endCallback => what to excute when the timer stops

### What's in $scope
- `days`, `hours`, `minutes`, `seconds` => these variables will be available if you set `timeStart` or `timeEnd`
- `dHours`, `uHours`, `dMinutes`, `uMinutes`, `dSeconds` and `uSeconds` => will be __tens digit__ and __units digit__ of `hours`, `minutes` and `seconds`
- `counter` => how many number to stop timer when you set `timeCountdown`

### License
MIT