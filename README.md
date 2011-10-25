# The Guard.js

*The Guard.js* is a simple super-tiny (< 50 LoC in CoffeeScript) yet powerful [ACL](http://en.wikipedia.org/wiki/Access_control_list) library for JavaScript with no external dependencies at all. It's heavily inspired in [Declarative Authorization](https://github.com/stffn/declarative_authorization) for Ruby.

It's in a super-alpha state, so any contributions/suggestions/comments are more than welcome. It's all about making it better!.. :)

## Why would I want this?

*In short, it allows you to tell which user can access which resource, in JavaScript.*

## How to use it?

Include the-guard.js and its dependencies:

* **An MD5 library.** [There's one](http://www.myersdaily.org/joseph/javascript/md5-text.html) in the vendor folder you can use. ~~I got it a while ago, minified it and can't remember where I took it from so if you can tell the author/src please tell me!~~ Thanks [lindsayevans](https://github.com/lindsayevans) for the tip on the author!.. :) 
* **A user object.** There's a libray agnostic user object, and [Backbone](http://documentcloud.github.com/backbone) and [Spine](http://spinejs.com) sample models. All you really need is a roles method that returns an array of strings which are your roles.

Then you need to provide some rules. Here's an example of how your rules may look like:

    // Define your rules
    var rules = {
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
    
     
    // Make sure we have a user...
    var user = new User(2, ["user"]);
     
    // Create a guard
    var the_guard = new TheGuard(rules);
    the_guard.current_user = user;
     
    // Ask for something! ;)
    the_guard.can('read', 'users', user)


## TODO

* Implement context evaluation on functions. 
* Implement Backbone/Spine/put-your-framework-here helpers to provide out-of-the-box permission checking on any Models, Controllers/Routers and Views.
* Improve security?
* Provide a way to connect with a backend to do the permission checking instead.
* Improve the docs. Write proper examples.
* Write more tests.

## Want to help?

Great! :) Just clone the repo, make your own branch and make a pull-request!.. All changes are welcome. :)
