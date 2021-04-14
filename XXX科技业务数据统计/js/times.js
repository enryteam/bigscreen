var slidint;
    function newTimer() {
      stopit();
      var today;
      today = new Date();
      var str = today.toLocaleDateString();
      str += "  " + week();
      str += "  " + today.toLocaleTimeString();
      var o = document.getElementById("DateTime");
      o.innerHTML = str;
      slidint = setTimeout(newTimer, 1000);
    }
      
    function stopit() {
      clearTimeout(slidint);
    }
      
    function week() {
      var d, day, x, s = " ";
      var x = new Array("星期日", "星期一", "星期二");
      var x = x.concat("星期三", "星期四", "星期五");
      var x = x.concat("星期六");
      d = new Date();
      day = d.getDay();
      return (s += x[day]);
    }
      
    window.onload = function() {
      newTimer();
    }