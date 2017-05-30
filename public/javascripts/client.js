'use strict';

(function() {  
  function showResponse(element, text) {
    if (!text) {
      text = '.... waiting';
    }
    else {
      text = new Date().toLocaleTimeString() + ' >> ' + text;
    }
    $(element).text(text);
  }

  function justGet(event) {
    event.preventDefault();
    showResponse('#get-response');
    $.ajax({
      method: 'GET',
      url: '/api/test', 
      success: function(data) {
        showResponse('#get-response', data.text);
      }
    });
  };


  function setupPoll(event) {
    event.preventDefault();
    showResponse('#poll-response');
    setInterval(function() {
      $.ajax({
        method: 'GET',
        url: '/api/poll', 
        success: function(data) {
          showResponse('#poll-response', data.text);
        }
      });
    },
    5000);
  };

  function setupLongPoll(event) {
    event.preventDefault();
    showResponse('#longpoll-response');
    var longPoll = function() {
      $.ajax({
        method: 'GET',
        url: '/api/longpoll', 
        success: function(data) {
          showResponse('#longpoll-response', data.text);
        },
        complete: function() {
          longPoll();
        },
        timeout: 1000 * 60
      });
    };
    longPoll();
  };

  function setupPush(event) {
    event.preventDefault();
    showResponse('#push-response');
    var xhr = new XMLHttpRequest()
    var pos = 0;
    xhr.open("GET", "/api/push", true)
    xhr.onprogress = function () {
      var chunk = xhr.response.substring(pos);
      pos += chunk.length; 
      showResponse('#push-response', chunk);
    }
    xhr.send();
  };

  $(function() {
    $("#btn-poll").click(setupPoll);
    $("#btn-longpoll").click(setupLongPoll);
    $("#btn-push").click(setupPush);
    $("#btn-get").click(justGet);
  });

})();
