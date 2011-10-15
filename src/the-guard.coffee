# The Guard.js
# https://github.com/dariocravero/the-guard.js
# (c) 2011 Darío Javier Cravero
class TheGuard
  version: '0.0.1.a'
  current_user: null
  _current_user_roles_hash: null
  rules: {}
  constructor: (@rules) -> @
  _can: {}
  can: (action, resource, resource_instance) ->
    return false unless @current_user?
    # Check if the user's roles have changed
    # and reset the cache if they did
    hash = md5(@current_user.roles().toString())
    if @_current_user_roles_hash != hash
      @_current_user_roles_hash = hash
      @_can = {}

    # Determines if the current user can perform an action on a resource
    for role in @current_user.roles()
      # Have we cached the query already?
      query = role + '-' + resource + '-' + action
      # console.log 'Query cached?', _.include(_.keys(@_can), query)
      return @_can[query] if _.include(_.keys(@_can), query)

      # console.log 'Does the role exist in the rules?', role, _.keys(@rules)
      if _.include(_.keys(@rules), role)
        # console.log 'Does the resource exist in the rules for that role?', resource, _.keys(@rules[role])
        if _.include(_.keys(@rules[role]), resource)
          # console.log 'Does the action exist in the rules for that resource?', action, _.keys(@rules[role][resource])
          if _.include(_.keys(@rules[role][resource]), action)
            can = false
            if _.isFunction(@rules[role][resource][action])
              # Don't cache the query for functions
              can = @rules[role][resource][action](resource_instance, @)
            else if _.isBoolean(@rules[role][resource][action])
              can = @rules[role][resource][action]
              # console.log 'Cache the query', can
              @_can[query] = can
            else
              @_can[query] = can
            return can

      # console.log 'Cache the query', false
      # Deny everything by default
      return @_can[query] = false
    false
