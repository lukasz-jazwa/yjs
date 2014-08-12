(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var createIwcConnector;

createIwcConnector = function(callback) {
  var IwcConnector, duiClient, get_HB_intent, init, iwcHandler, received_HB;
  iwcHandler = {};
  duiClient = new DUIClient();
  duiClient.connect(function(intent) {
    var _ref;
    return (_ref = iwcHandler[intent.action]) != null ? _ref.map(function(f) {
      return setTimeout(function() {
        return f(intent);
      }, 0);
    }) : void 0;
  });
  duiClient.initOK();
  received_HB = null;
  IwcConnector = (function() {
    function IwcConnector(engine, HB, execution_listener, yatta) {
      var receive_, sendHistoryBuffer, send_;
      this.engine = engine;
      this.HB = HB;
      this.execution_listener = execution_listener;
      this.yatta = yatta;
      this.duiClient = duiClient;
      this.iwcHandler = iwcHandler;
      send_ = (function(_this) {
        return function(o) {
          return _this.send(o);
        };
      })(this);
      this.execution_listener.push(send_);
      receive_ = (function(_this) {
        return function(intent) {
          var o;
          o = intent.extras;
          return _this.receive(o);
        };
      })(this);
      this.iwcHandler["Yatta_new_operation"] = [receive_];
      if (received_HB != null) {
        this.engine.applyOpsCheckDouble(received_HB);
      }
      sendHistoryBuffer = (function(_this) {
        return function() {
          var json;
          json = {
            HB: _this.yatta.getHistoryBuffer()._encode()
          };
          return _this.sendIwcIntent("Yatta_push_HB_element", json);
        };
      })(this);
      this.iwcHandler["Yatta_get_HB_element"] = [sendHistoryBuffer];
    }

    IwcConnector.prototype.send = function(o) {
      if (o.uid.creator === this.HB.getUserId() && (typeof o.uid.op_number !== "string")) {
        return this.sendIwcIntent("Yatta_new_operation", o);
      }
    };

    IwcConnector.prototype.receive = function(o) {
      if (o.uid.creator !== this.HB.getUserId()) {
        return this.engine.applyOp(o);
      }
    };

    IwcConnector.prototype.sendIwcIntent = function(action_name, content) {
      var intent;
      intent = {
        action: action_name,
        component: "",
        data: "",
        dataType: "",
        extras: content
      };
      return this.duiClient.sendIntent(intent);
    };

    return IwcConnector;

  })();
  get_HB_intent = {
    action: "Yatta_get_HB_element",
    component: "",
    data: "",
    dataType: "",
    extras: {}
  };
  init = function() {
    var is_initialized, receiveHB;
    duiClient.sendIntent(get_HB_intent);
    is_initialized = false;
    receiveHB = function(json) {
      var proposed_user_id;
      proposed_user_id = duiClient.getIwcClient()._componentName;
      received_HB = json != null ? json.extras.HB : void 0;
      if (!is_initialized) {
        is_initialized = true;
        return callback(IwcConnector, proposed_user_id);
      }
    };
    iwcHandler["Yatta_push_HB_element"] = [receiveHB];
    return setTimeout(receiveHB, 0);
  };
  setTimeout(init, Math.random() * 0);
  return void 0;
};

module.exports = createIwcConnector;

if (typeof window !== "undefined" && window !== null) {
  window.createConnector = createIwcConnector;
}


},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2Rtb25hZC9Ecm9wYm94L1lhdHRhIS9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9kbW9uYWQvRHJvcGJveC9ZYXR0YSEvbGliL0Nvbm5lY3RvcnMvSXdjQ29ubmVjdG9yLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0lBLElBQUEsa0JBQUE7O0FBQUEsa0JBQUEsR0FBcUIsU0FBQyxRQUFELEdBQUE7QUFDbkIsTUFBQSxxRUFBQTtBQUFBLEVBQUEsVUFBQSxHQUFhLEVBQWIsQ0FBQTtBQUFBLEVBQ0EsU0FBQSxHQUFnQixJQUFBLFNBQUEsQ0FBQSxDQURoQixDQUFBO0FBQUEsRUFHQSxTQUFTLENBQUMsT0FBVixDQUFrQixTQUFDLE1BQUQsR0FBQTtBQUdoQixRQUFBLElBQUE7NERBQXlCLENBQUUsR0FBM0IsQ0FBK0IsU0FBQyxDQUFELEdBQUE7YUFDN0IsVUFBQSxDQUFXLFNBQUEsR0FBQTtlQUNULENBQUEsQ0FBRSxNQUFGLEVBRFM7TUFBQSxDQUFYLEVBRUUsQ0FGRixFQUQ2QjtJQUFBLENBQS9CLFdBSGdCO0VBQUEsQ0FBbEIsQ0FIQSxDQUFBO0FBQUEsRUFXQSxTQUFTLENBQUMsTUFBVixDQUFBLENBWEEsQ0FBQTtBQUFBLEVBYUEsV0FBQSxHQUFjLElBYmQsQ0FBQTtBQUFBLEVBb0JNO0FBUVMsSUFBQSxzQkFBRSxNQUFGLEVBQVcsRUFBWCxFQUFnQixrQkFBaEIsRUFBcUMsS0FBckMsR0FBQTtBQUNYLFVBQUEsa0NBQUE7QUFBQSxNQURZLElBQUMsQ0FBQSxTQUFBLE1BQ2IsQ0FBQTtBQUFBLE1BRHFCLElBQUMsQ0FBQSxLQUFBLEVBQ3RCLENBQUE7QUFBQSxNQUQwQixJQUFDLENBQUEscUJBQUEsa0JBQzNCLENBQUE7QUFBQSxNQUQrQyxJQUFDLENBQUEsUUFBQSxLQUNoRCxD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QURYO0FBQUEsSUFFQSxJQUFBLEVBQU0sRUFGTjtBQUFBLElBR0EsUUFBQSxFQUFVLEVBSFY7QUFBQSxJQUlBLE1BQUEsRUFBUSxFQUpSO0dBbEZGLENBQUE7QUFBQSxFQXdGQSxJQUFBLEdBQU8sU0FBQSxHQUFBO0FBQ0wsUUFBQSx5QkFBQTtBQUFBLElBQUEsU0FBUyxDQUFDLFVBQVYsQ0FBcUIsYUFBckIsQ0FBQSxDQUFBO0FBQUEsSUFFQSxjQUFBLEdBQWlCLEtBRmpCLENBQUE7QUFBQSxJQUdBLFNBQUEsR0FBWSxTQUFDLElBQUQsR0FBQTtBQUNWLFVBQUEsZ0JBQUE7QUFBQSxNQUFBLGdCQUFBLEdBQW1CLFNBQVMsQ0FBQyxZQUFWLENBQUEsQ0FBd0IsQ0FBQyxjQUE1QyxDQUFBO0FBQUEsTUFDQSxXQUFBLGtCQUFjLElBQUksQ0FBRSxNQUFNLENBQUMsV0FEM0IsQ0FBQTtBQUVBLE1BQUEsSUFBRyxDQUFBLGNBQUg7QUFDRSxRQUFBLGNBQUEsR0FBaUIsSUFBakIsQ0FBQTtlQUNBLFFBQUEsQ0FBUyxZQUFULEVBQXVCLGdCQUF2QixFQUZGO09BSFU7SUFBQSxDQUhaLENBQUE7QUFBQSxJQVNBLFVBQVcsQ0FBQSx1QkFBQSxDQUFYLEdBQXNDLENBQUMsU0FBRCxDQVR0QyxDQUFBO1dBVUEsVUFBQSxDQUFXLFNBQVgsRUFBc0IsQ0FBdEIsRUFYSztFQUFBLENBeEZQLENBQUE7QUFBQSxFQXFHQSxVQUFBLENBQVcsSUFBWCxFQUFrQixJQUFJLENBQUMsTUFBTCxDQUFBLENBQUEsR0FBYyxDQUFoQyxDQXJHQSxDQUFBO1NBdUdBLE9BeEdtQjtBQUFBLENBQXJCLENBQUE7O0FBQUEsTUF5R00sQ0FBQyxPQUFQLEdBQWlCLGtCQXpHakIsQ0FBQTs7O0VBMEdBLE1BQU0sQ0FBRSxlQUFSLEdBQTBCO0NBMUcxQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbiNcbiMgQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIGlzIGNhbGxlZCB3aGVuIHRoZSBjb25uZWN0b3IgaXMgaW5pdGlhbGl6ZWQuXG4jXG5jcmVhdGVJd2NDb25uZWN0b3IgPSAoY2FsbGJhY2spLT5cbiAgaXdjSGFuZGxlciA9IHt9XG4gIGR1aUNsaWVudCA9IG5ldyBEVUlDbGllbnQoKVxuICAjQGR1aUNsaWVudCA9IG5ldyBpd2MuQ2xpZW50KClcbiAgZHVpQ2xpZW50LmNvbm5lY3QgKGludGVudCktPlxuICAgICNjb25zb2xlLmxvZyBcImludGVudCByZWNlaXZlZCBpd2M6ICN7SlNPTi5zdHJpbmdpZnkoaW50ZW50KX1cIlxuICAgICNjb25zb2xlLmxvZyBcIiN7SlNPTi5zdHJpbmdpZnkoQGl3Y0hhbmRsZXIpfVwiXG4gICAgaXdjSGFuZGxlcltpbnRlbnQuYWN0aW9uXT8ubWFwIChmKS0+XG4gICAgICBzZXRUaW1lb3V0ICgpLT5cbiAgICAgICAgZiBpbnRlbnRcbiAgICAgICwgMFxuXG4gIGR1aUNsaWVudC5pbml0T0soKVxuXG4gIHJlY2VpdmVkX0hCID0gbnVsbFxuXG4gICNcbiAgIyBUaGUgSXdjIENvbm5lY3RvciBhZGRzIHN1cHBvcnQgZm9yIHRoZSBJbnRlci1XaWRnZXQtQ29tbXVuaWNhdGlvbiBwcm90b2NvbCB0aGF0IGlzIHVzZWQgaW4gdGhlIFJvbGUtU0RLLlxuICAjIEBzZWUgaHR0cDovL2RiaXMucnd0aC1hYWNoZW4uZGUvY21zL3Byb2plY3RzL3RoZS14bXBwLWV4cGVyaWVuY2UjaW50ZXJ3aWRnZXQtY29tbXVuaWNhdGlvblxuICAjIEBzZWUgaHR0cDovL2RiaXMucnd0aC1hYWNoZW4uZGUvY21zL3Byb2plY3RzL1JPTEVcbiAgI1xuICBjbGFzcyBJd2NDb25uZWN0b3JcblxuICAgICNcbiAgICAjIEBwYXJhbSB7RW5naW5lfSBlbmdpbmUgVGhlIHRyYW5zZm9ybWF0aW9uIGVuZ2luZVxuICAgICMgQHBhcmFtIHtIaXN0b3J5QnVmZmVyfSBIQlxuICAgICMgQHBhcmFtIHtBcnJheTxGdW5jdGlvbj59IGV4ZWN1dGlvbl9saXN0ZW5lciBZb3UgbXVzdCBlbnN1cmUgdGhhdCB3aGVuZXZlciBhbiBvcGVyYXRpb24gaXMgZXhlY3V0ZWQsIGV2ZXJ5IGZ1bmN0aW9uIGluIHRoaXMgQXJyYXkgaXMgY2FsbGVkLlxuICAgICMgQHBhcmFtIHtZYXR0YX0geWF0dGEgVGhlIFlhdHRhIGZyYW1ld29yay5cbiAgICAjXG4gICAgY29uc3RydWN0b3I6IChAZW5naW5lLCBASEIsIEBleGVjdXRpb25fbGlzdGVuZXIsIEB5YXR0YSktPlxuICAgICAgQGR1aUNsaWVudCA9IGR1aUNsaWVudFxuICAgICAgQGl3Y0hhbmRsZXIgPSBpd2NIYW5kbGVyXG5cbiAgICAgIHNlbmRfID0gKG8pPT5cbiAgICAgICAgQHNlbmQgb1xuICAgICAgQGV4ZWN1dGlvbl9saXN0ZW5lci5wdXNoIHNlbmRfXG5cbiAgICAgIHJlY2VpdmVfID0gKGludGVudCk9PlxuICAgICAgICBvID0gaW50ZW50LmV4dHJhc1xuICAgICAgICBAcmVjZWl2ZSBvXG4gICAgICBAaXdjSGFuZGxlcltcIllhdHRhX25ld19vcGVyYXRpb25cIl0gPSBbcmVjZWl2ZV9dXG5cbiAgICAgIGlmIHJlY2VpdmVkX0hCP1xuICAgICAgICBAZW5naW5lLmFwcGx5T3BzQ2hlY2tEb3VibGUgcmVjZWl2ZWRfSEJcblxuICAgICAgc2VuZEhpc3RvcnlCdWZmZXIgPSAoKT0+XG4gICAgICAgIGpzb24gPVxuICAgICAgICAgIEhCIDogQHlhdHRhLmdldEhpc3RvcnlCdWZmZXIoKS5fZW5jb2RlKClcbiAgICAgICAgQHNlbmRJd2NJbnRlbnQgXCJZYXR0YV9wdXNoX0hCX2VsZW1lbnRcIiwganNvblxuICAgICAgQGl3Y0hhbmRsZXJbXCJZYXR0YV9nZXRfSEJfZWxlbWVudFwiXSA9IFtzZW5kSGlzdG9yeUJ1ZmZlcl1cblxuICAgICNcbiAgICAjIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW5ldmVyIGFuIG9wZXJhdGlvbiB3YXMgZXhlY3V0ZWQuXG4gICAgIyBAcGFyYW0ge09wZXJhdGlvbn0gbyBUaGUgb3BlcmF0aW9uIHRoYXQgd2FzIGV4ZWN1dGVkLlxuICAgICNcbiAgICBzZW5kOiAobyktPlxuICAgICAgaWYgby51aWQuY3JlYXRvciBpcyBASEIuZ2V0VXNlcklkKCkgYW5kICh0eXBlb2Ygby51aWQub3BfbnVtYmVyIGlzbnQgXCJzdHJpbmdcIilcbiAgICAgICAgQHNlbmRJd2NJbnRlbnQgXCJZYXR0YV9uZXdfb3BlcmF0aW9uXCIsIG9cblxuICAgICNcbiAgICAjIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW5ldmVyIGFuIG9wZXJhdGlvbiB3YXMgcmVjZWl2ZWQgZnJvbSBhbm90aGVyIHBlZXIuXG4gICAgIyBAcGFyYW0ge09wZXJhdGlvbn0gbyBUaGUgb3BlcmF0aW9uIHRoYXQgd2FzIHJlY2VpdmVkLlxuICAgICNcbiAgICByZWNlaXZlOiAobyktPlxuICAgICAgaWYgby51aWQuY3JlYXRvciBpc250IEBIQi5nZXRVc2VySWQoKVxuICAgICAgICBAZW5naW5lLmFwcGx5T3Agb1xuXG4gICAgI1xuICAgICMgSGVscGVyIGZvciBzZW5kaW5nIGl3YyBpbnRlbnRzLlxuICAgICMgQHBhcmFtIHtTdHJpbmd9IGFjdGlvbl9uYW1lIFRoZSBuYW1lIG9mIHRoZSBhY3Rpb24gdGhhdCBpcyBnb2luZyB0byBiZSBzZW5kLlxuICAgICMgQHBhcmFtIHtTdHJpbmd9IGNvbnRlbnQgVGhlIGNvbnRlbnQgdGhhdCBpcyBhdHRlY2hlZCB0byB0aGUgaW50ZW50LlxuICAgICNcbiAgICBzZW5kSXdjSW50ZW50OiAoYWN0aW9uX25hbWUsIGNvbnRlbnQpLT5cbiAgICAgIGludGVudCA9XG4gICAgICAgIGFjdGlvbjogYWN0aW9uX25hbWVcbiAgICAgICAgY29tcG9uZW50OiBcIlwiXG4gICAgICAgIGRhdGE6IFwiXCJcbiAgICAgICAgZGF0YVR5cGU6IFwiXCJcbiAgICAgICAgZXh0cmFzOiBjb250ZW50XG5cbiAgICAgIEBkdWlDbGllbnQuc2VuZEludGVudChpbnRlbnQpXG5cbiAgZ2V0X0hCX2ludGVudCA9XG4gICAgYWN0aW9uOiBcIllhdHRhX2dldF9IQl9lbGVtZW50XCJcbiAgICBjb21wb25lbnQ6IFwiXCJcbiAgICBkYXRhOiBcIlwiXG4gICAgZGF0YVR5cGU6IFwiXCJcbiAgICBleHRyYXM6IHt9XG5cbiAgaW5pdCA9ICgpLT5cbiAgICBkdWlDbGllbnQuc2VuZEludGVudChnZXRfSEJfaW50ZW50KVxuXG4gICAgaXNfaW5pdGlhbGl6ZWQgPSBmYWxzZVxuICAgIHJlY2VpdmVIQiA9IChqc29uKS0+XG4gICAgICBwcm9wb3NlZF91c2VyX2lkID0gZHVpQ2xpZW50LmdldEl3Y0NsaWVudCgpLl9jb21wb25lbnROYW1lXG4gICAgICByZWNlaXZlZF9IQiA9IGpzb24/LmV4dHJhcy5IQlxuICAgICAgaWYgbm90IGlzX2luaXRpYWxpemVkXG4gICAgICAgIGlzX2luaXRpYWxpemVkID0gdHJ1ZVxuICAgICAgICBjYWxsYmFjayBJd2NDb25uZWN0b3IsIHByb3Bvc2VkX3VzZXJfaWRcbiAgICBpd2NIYW5kbGVyW1wiWWF0dGFfcHVzaF9IQl9lbGVtZW50XCJdID0gW3JlY2VpdmVIQl1cbiAgICBzZXRUaW1lb3V0IHJlY2VpdmVIQiwgMFxuXG4gIHNldFRpbWVvdXQgaW5pdCwgKE1hdGgucmFuZG9tKCkqMClcblxuICB1bmRlZmluZWRcbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlSXdjQ29ubmVjdG9yXG53aW5kb3c/LmNyZWF0ZUNvbm5lY3RvciA9IGNyZWF0ZUl3Y0Nvbm5lY3RvclxuXG4iXX0=