(function() {
  var TheGuard;
  TheGuard = (function() {
    TheGuard.prototype.version = '0.0.1.a';
    TheGuard.prototype.current_user = null;
    TheGuard.prototype._current_user_roles_hash = null;
    TheGuard.prototype.rules = {};
    function TheGuard(rules) {
      this.rules = rules;
      this;
    }
    TheGuard.prototype._can = {};
    TheGuard.prototype.can = function(action, resource, resource_instance) {
      var can, hash, query, role, _i, _len, _ref;
      if (this.current_user == null) {
        return false;
      }
      hash = md5(this.current_user.roles().toString());
      if (this._current_user_roles_hash !== hash) {
        this._current_user_roles_hash = hash;
        this._can = {};
      }
      _ref = this.current_user.roles();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        role = _ref[_i];
        query = role + '-' + resource + '-' + action;
        if (_.include(_.keys(this._can), query)) {
          return this._can[query];
        }
        if (_.include(_.keys(this.rules), role)) {
          if (_.include(_.keys(this.rules[role]), resource)) {
            if (_.include(_.keys(this.rules[role][resource]), action)) {
              can = false;
              if (_.isFunction(this.rules[role][resource][action])) {
                can = this.rules[role][resource][action](resource_instance, this);
              } else if (_.isBoolean(this.rules[role][resource][action])) {
                can = this.rules[role][resource][action];
                this._can[query] = can;
              } else {
                this._can[query] = can;
              }
              return can;
            }
          }
        }
        return this._can[query] = false;
      }
      return false;
    };
    return TheGuard;
  })();
}).call(this);
