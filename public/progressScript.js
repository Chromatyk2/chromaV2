const progressBars = document.querySelectorAll('.progress-container');

const animateValue = (selector, start, end, duration) => {
    var obj = selector;
    var range = end - start;

    // no timer shorter than 50ms (not really visible any way)
    var minTimer = 50;

    // calc step time to show all interediate values
    var stepTime = Math.abs(Math.floor(duration / range));

    // never go below minTimer
    stepTime = Math.max(stepTime, minTimer);

    // get current time and calculate desired end time
    var startTime = new Date().getTime();
    var endTime = startTime + duration;
    var timer;

    function run() {
        var now = new Date().getTime();
        var remaining = Math.max((endTime - now) / duration, 0);
        var value = Math.round(end - remaining * range);
        obj.innerHTML = value + "%";
        if (value == end) {
            clearInterval(timer);
        }
    }

    var timer = setInterval(run, stepTime);
    run();
}

const progress = (value) => {
    var progress = value / 100;
    var dashoffset = circumference * (1 - progress);

    progressValue.style.strokeDashoffset = dashoffset;
}

// Iterate over each progress bar
for (var el of progressBars) {
    var dataValue = el.getAttribute('data-value');
    var progressValue = el.querySelector('.progress-value');
    var valueContainer = el.querySelector('span');

    var radius = progressValue.getAttribute("r");

    var circumference = 2 * Math.PI * radius;

    progressValue.style.strokeDasharray = circumference;
    progress(dataValue);
}