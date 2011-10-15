(function() {
  var User;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  User = (function() {
    __extends(User, Spine.Model);
    User.configure('User', 'email', 'roles');
    function User() {
      this.load({
        email: 'guest@app.com'
      }, {
        roles: ['guest']
      });
    }
    User.prototype.roles = function() {
      return this.roles;
    };
    return User;
  })();
}).call(this);
