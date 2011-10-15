class User extends Spine.Model
  @configure 'User', 'email', 'roles'
  constructor: ->
    @load(email: 'guest@app.com',
      roles: ['guest'])
  roles: -> @roles
