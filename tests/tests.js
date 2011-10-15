(function() {
  var rules;
  rules = {
    guest: {
      users: {
        create: true
      }
    },
    user: {
      users: {
        create: true,
        read: function(user, the_guard) {
          if (user == null) {
            return false;
          }
          return the_guard.current_user.id === user.id;
        },
        update: function(user, the_guard) {
          if (user == null) {
            return false;
          }
          return the_guard.current_user.id === user.id;
        }
      }
    },
    admin: {
      users: {
        create: true,
        read: true,
        update: true,
        "delete": true
      },
      another_resource: {
        create: true,
        read: true,
        update: true,
        "delete": true
      }
    }
  };
  $(function() {
    var admin, guest, user;
    guest = new User(1, ['guest']);
    user = new User(2, ['user']);
    admin = new User(3, ['admin']);
    module('Can');
    test('it should tell if a user can perform an action on a resource', function() {
      var the_guard;
      the_guard = new TheGuard(rules);
      the_guard.current_user = user;
      expect(2);
      ok(the_guard.can('read', 'users', user));
      return equal(the_guard.can('delete', 'users', user), false);
    });
    test('it should tell if a user can perform an action on a resource taking the most predominant role into account', function() {
      return '';
    });
    module('Cache');
    test('it should cache a query if the rule is boolean', function() {
      var the_guard;
      the_guard = new TheGuard(rules);
      the_guard.current_user = user;
      expect(2);
      equal(_.keys(the_guard._can).length, 0);
      the_guard.can('create', 'users', user);
      return equal(_.keys(the_guard._can).length, 1);
    });
    test("it shouldn't cache a query if the rule is a function", function() {
      var the_guard;
      the_guard = new TheGuard(rules);
      the_guard.current_user = user;
      expect(2);
      equal(_.keys(the_guard._can).length, 0);
      the_guard.can('read', 'users', user);
      return equal(_.keys(the_guard._can).length, 0);
    });
    test('it should reset the cache when the user changes', function() {
      var the_guard;
      expect(4);
      the_guard = new TheGuard(rules);
      the_guard.current_user = user;
      equal(_.keys(the_guard._can).length, 0);
      the_guard.can('create', 'users', user);
      equal(_.keys(the_guard._can).length, 1);
      the_guard.current_user = admin;
      equal(_.keys(the_guard._can).length, 1);
      the_guard.can('create', 'users', user);
      return equal(_.keys(the_guard._can).length, 1);
    });
    test('it should reset the cache when the user roles change', function() {
      var the_guard;
      expect(4);
      the_guard = new TheGuard(rules);
      the_guard.current_user = user;
      equal(_.keys(the_guard._can).length, 0);
      the_guard.can('create', 'users', user);
      equal(_.keys(the_guard._can).length, 1);
      user._roles = ['guest'];
      equal(_.keys(the_guard._can).length, 1);
      the_guard.can('create', 'users', user);
      return equal(_.keys(the_guard._can).length, 1);
    });
    module('Backbone integration');
    test('it should work on routes', function() {
      return '';
    });
    test('it should work on models', function() {
      return '';
    });
    test('it should work on views', function() {
      return '';
    });
    module('Spine integration');
    test('it should work on routes', function() {
      return '';
    });
    test('it should work on models', function() {
      return '';
    });
    return test('it should work on views', function() {
      return '';
    });
  });
}).call(this);
