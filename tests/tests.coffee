rules =
  guest:
    users:
      create: true
  user:
    users:
      create: true
      read: (user, the_guard) ->
        return false unless user?
        the_guard.current_user.id == user.id
      update: (user, the_guard) ->
        return false unless user?
        the_guard.current_user.id == user.id
  admin:
    users:
      create: true
      read: true
      update: true
      delete: true
    another_resource:
      create: true
      read: true
      update: true
      delete: true

$(->
  guest = new User(1, ['guest'])
  user = new User(2, ['user'])
  admin = new User(3, ['admin'])

  module 'Can'

  test 'it should tell if a user can perform an action on a resource', ->
    the_guard = new TheGuard(rules)
    the_guard.current_user = user

    expect(2)
    ok(the_guard.can('read', 'users', user))
    equal(the_guard.can('delete', 'users', user), false)

  test 'it should tell if a user can perform an action on a resource taking the most predominant role into account', -> ''

  module 'Cache'

  test 'it should cache a query if the rule is boolean', ->
    the_guard = new TheGuard(rules)
    the_guard.current_user = user

    expect(2)
    equal(_.keys(the_guard._can).length, 0)
    the_guard.can('create', 'users', user)
    equal(_.keys(the_guard._can).length, 1)

  test "it shouldn't cache a query if the rule is a function", ->
    the_guard = new TheGuard(rules)
    the_guard.current_user = user

    expect(2)
    equal(_.keys(the_guard._can).length, 0)
    the_guard.can('read', 'users', user)
    equal(_.keys(the_guard._can).length, 0)

  test 'it should reset the cache when the user changes', ->
    expect(4)
    the_guard = new TheGuard(rules)
    the_guard.current_user = user

    equal(_.keys(the_guard._can).length, 0)
    the_guard.can('create', 'users', user)
    equal(_.keys(the_guard._can).length, 1)

    the_guard.current_user = admin
    equal(_.keys(the_guard._can).length, 1)
    the_guard.can('create', 'users', user)
    equal(_.keys(the_guard._can).length, 1)

  test 'it should reset the cache when the user roles change', ->
    expect(4)
    the_guard = new TheGuard(rules)
    the_guard.current_user = user

    equal(_.keys(the_guard._can).length, 0)
    the_guard.can('create', 'users', user)
    equal(_.keys(the_guard._can).length, 1)

    user._roles = ['guest']
    equal(_.keys(the_guard._can).length, 1)
    the_guard.can('create', 'users', user)
    equal(_.keys(the_guard._can).length, 1)


  module 'Backbone integration'
  test 'it should work on routes', -> ''
  test 'it should work on models', -> ''
  test 'it should work on views', -> ''

  module 'Spine integration'
  test 'it should work on routes', -> ''
  test 'it should work on models', -> ''
  test 'it should work on views', -> ''
)
