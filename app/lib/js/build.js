/**
 * @class Calculator
 */
var Calculator = /** @class */ (function () {
    function Calculator() {
        this.chosenTime = [];
        this.selects = document.querySelectorAll('select');
        this.send = document.querySelector('button');
        this.cycles = {
            best: {
                hours: 9,
                minutes: 0
            },
            better: {
                hours: 7,
                minutes: 30
            },
            middle: {
                hours: 6,
                minutes: 0
            },
            bad: {
                hours: 4,
                minutes: 30
            }
        };
        this.bestTimes = [];
    }
    Calculator.prototype.retrieveEachValue = function () {
        var _this = this;
        this.chosenTime = [];
        this.selects.forEach(function (el) { return _this.chosenTime.push(parseInt(el.value)); });
    };
    Calculator.prototype.insertAfter = function (newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    };
    Calculator.prototype.times = function (h, m) {
        var hours = this.chosenTime[0];
        var minutes = this.chosenTime[1];
        var mm = moment();
        var times = (mm.hours(hours), mm.minute(minutes));
        var time = (times.subtract(h, 'hour'), times.subtract(m, 'minute'));
        time = time.format('HH:mm');
        this.bestTimes.push(time);
    };
    Calculator.prototype.calc = function () {
        var _this = this;
        this.send.addEventListener('click', function () {
            _this.retrieveEachValue();
            _this.bestTimes = [];
            _this.times(_this.cycles.best.hours, _this.cycles.best.minutes);
            _this.times(_this.cycles.better.hours, _this.cycles.better.minutes);
            _this.times(_this.cycles.middle.hours, _this.cycles.middle.minutes);
            _this.times(_this.cycles.bad.hours, _this.cycles.bad.minutes);
            console.log(_this.bestTimes);
            var form = document.querySelector('.form');
            var ul = document.createElement('ul');
            for (var i = 0; i < _this.bestTimes.length; i++) {
                var li = document.createElement('li');
                li.innerHTML = _this.bestTimes[i];
                ul.append(li);
            }
            _this.insertAfter(ul, form);
        });
    };
    return Calculator;
}());
var test = new Calculator();
test.calc();
//# sourceMappingURL=build.js.map