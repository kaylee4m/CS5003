function averageSpeed(startTime, endTime, distance) {
    var startT = new Date(startTime);
    var endT = new Date(endTime);
    var hourdiff = endT.getHours() - startT.getHours();
    var minDiff = endT.getMinutes() - startT.getMinutes();
    var secondDiff = endT.getSeconds() - startT.getSeconds();
    var daysDiff = endT.getDate() - startT.getDate();

    // convert everything to hours
    var secsToHours =  secondDiff * 0.000277778;
    var minsToHours = minDiff * 0.0166667;
    var daysToHours = daysDiff * 24;

    // Average speed
    var time = secsToHours + minsToHours + hourdiff + daysToHours;
    var avgSpeed = Math.round( (distance / time) * 10 ) / 10;;
    return avgSpeed; 
  }

  module.exports = averageSpeed;