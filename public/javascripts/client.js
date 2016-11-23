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

  function justGet() {
    showResponse('#get-response');
    $.ajax({
      method: 'GET',
      url: '/api/test', 
      success: function(data) {
        showResponse('#get-response', data.text);
      }
    });
  };


  function setupPoll() {
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

  function setupLongPoll() {
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

  function setupPush() {
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


/*
var hugo = function() {
  function subscribeNavigationLongPoll() {
    $(document).ready(function () {
      var longPoll = function() {
      }
      longPoll();
    });
  };
  subscribeNavigationLongPoll();


  return {
    /*
    setupDataBinding : function(elementName, moduleName, json, updateInterval) {
      let binding = {
        update : function(callback) {
          let viewModel = this.viewModel;
          $.getJSON(this.updateUrl, function(data) {
            try {
              //console.log(data);
              ko.mapping.fromJS(data, viewModel);
              if (callback) {
                callback(viewModel);
              }
            }
            catch (e) {
              console.log(e);
            }
          });
        }
      };

      $(function() {
        binding.updateUrl =  '/' + moduleName + '/api';
        binding.viewModel = ko.mapping.fromJS(json);
        const el = document.getElementById(elementName);
        if (!el) {
          alert("element '" + elementName + "' not found");
        }
        ko.applyBindings(binding.viewModel, el);
        if (updateInterval > 0) {
          setIntervalAndExecute(function () {
            binding.update(null);
          }, updateInterval);
        }
      });
      return binding;
    }
  }
}();
*/