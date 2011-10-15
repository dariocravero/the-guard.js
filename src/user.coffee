class User
  _roles: []
  roles: -> @_roles
  id: 0
  constructor: (@id, @_roles) -> @
