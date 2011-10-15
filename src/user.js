var User;
User = (function() {
  User.prototype._roles = [];
  User.prototype.roles = function() {
    return this._roles;
  };
  User.prototype.id = 0;
  function User(id, _roles) {
    this.id = id;
    this._roles = _roles;
    this;
  }
  return User;
})();