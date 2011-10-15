class User extends Backbone.Model
  defaults:
    email: 'guest@app.com'
    roles: ['guest']
  roles: -> @get('roles')
