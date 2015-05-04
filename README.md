name
http://forum.ionicframework.com/t/renaming-android-build-apk-from-cordovaapp-to-your-app-name/15416


cordova plugin rm org.apache.cordova.console &&
cordova build --release android && 
keytool -genkey -v -keystore mascoteros.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000 &&
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore mascoteros.keystore mascoteros.apk mascoteros &&
zipalign -v 4 mascoteros.apk mascoteros-release.apk

Ionic App Base
=====================

A starting project for Ionic that optionally supports using custom SCSS.

## Using this project

We recommend using the [Ionic CLI](https://github.com/driftyco/ionic-cli) to create new Ionic projects that are based on this project but use a ready-made starter template.

For example, to start a new Ionic project with the default tabs interface, make sure the `ionic` utility is installed:

```bash
$ npm install -g ionic
```

Then run:

```bash
$ ionic start myProject tabs
```

More info on this can be found on the Ionic [Getting Started](http://ionicframework.com/getting-started) page and the [Ionic CLI](https://github.com/driftyco/ionic-cli) repo.

## Issues
Issues have been disabled on this repo, if you do find an issue or have a question consider posting it on the [Ionic Forum](http://forum.ionicframework.com/).  Or else if there is truly an error, follow our guidelines for [submitting an issue](http://ionicframework.com/submit-issue/) to the main Ionic repository.


--------------------------------------

### Application Session Management With OAuth
###### Fun with AngularJS & Ionic

---

I don't know about other developers -- but one of the most frustrating things in my mind to get going when starting a new hybrid application is session/authorization management. Do you use OAuth 1, OAuth 2, generic email login, facebook...even thinking about it stresses me out. Unfortunately, no good hybrid (or mobile for that matter) application can escape the need for good authorization (unless it is a stateless app, like a calculator, or something easy). 

Personally -- I have come to love the OAuth 2 standard for its simplicity, and standards of operation. It takes some of the stress out of the decision making process when coming up with how to manage application state flow -- something which is especially necessary in [most] mobile (or native) applications. This article is going to focus on one of those pain points -- hybrid mobile app state management, and how to solve it with regards to the marriage of AngularJS & Ionic Frameworks.

##### Setup

In order to accomplish a lot of the objectives in this article -- we are going to focus on a certain select number of tools. The disclaimer here is that there are a huge number of ways to accomplish the same goal -- this is just the easiest __in my mind__.

1. AngularJS (https://angularjs.org/)
2. Ionic Framework (http://ionicframework.com/)
3. MomentJS (for timestamps) (http://momentjs.com)

The assumption here is that you know how to set up an angular application, manage dependencies and do all that jazz. If you are not familiar with this -- then I suggest you take a look at the guides available on the different sites.

##### Local Storage Primer

Repeat after me.... window.localStorage is for web __and__ phone persistence. What this means is that you can actually use a mobile hybrid application on the web using the same fundamental auth/state system if you so choose -- no changes needed. What this also means is that localStorage __is__ the persistence layer for the application. You should not need to use a fancy in-memory database, to make the application persistent on a phone. Same goes for the good ol' web.

The bad news is Ionic does not come with a local storage service built in -- so we have to roll our own. Below is a simple example of what this looks like,

```js
// storage.service.js

(function() {
  'use strict';
  
  /**
   * @ngdoc module
   * @name LocalStorage
   *
   * @description
   * The module declaration for this service object.
   */
  angular
    .module('[applicationModuleName]')
    .factory('LocalStorage', [
      '$window',
      LocalStorageService
    ]);
   
  /**
   * @name LocalStorageService
   * @description
   * This service will act as an access layer between the local storage,
   *  and the phone/web browser.
   *
   * @param {!angular.$window} $window
   *
   * @example
   * 
   * // Set a value -- string
   * LocalStorage.set('myKey', 'myValue');
   * 
   * // Set a value -- object
   * LocalStorage.set('myKey', { id: 'myValue' }); 
   *
   * // Get a value
   * LocalStorage.get('myKey');
   */
  function LocalStorageService($window) {
    // Expose the service object
    return {
      set: set,
      get: get
    };
    
    /**
     * @name set
     * @description
     * Set a key value pair into the local storage for persistence.
     * 
     * @param {string} key - the index at which the value will be set
     * @param {mixed} value - the value to set at the given index
     */
    function set(key, value) {
      // If we are trying to set an object in here then we need
      //  to make sure it is a string, so we json encode it.
      if (angular.isArray(value) || angular.isObject(value)) {
        value = JSON.stringify(value);  
      }
      
      $window.localStorage[key] = value;
    }
    
    /**
     * @name get
     * @description
     * Return a value in local storage at a specific key.
     *
     * @param {string} key - the index at which to return the stored value in
     *                       in local storage
     * 
     * @return {mixed} - the value stored at the given key in local storage
     */
    function get(key) {
      // If we have a null at the index then we want to return
      //  the null value, otherwise we JSON.parse the return value
      //  to handle all other types (strings, numbers, objects, arrays)
      return $window.localStorage[key] === null ?
        null : JSON.parse($window.localStorage[key];
    }
  }
})();
```

So what did I just give you -- A thin wrapper to access the local storage on a phone / web browser which allows persistence of data. This will drive your persistence layer for state management on the application.

__** WARNING **__ 

This wrapper can be abused. Don't be stupid and put a bajillion things into the phones local storage. It will make for a bad time. It will also be a nightmare to manage, bloat the application, and probably make it run a lot slower than it needs to. Keep in mind that __local storage on a phone does not expire unless the developer expires it__. This means its there FOREVERRRRRRRRR unless you say so.

##### Authentication w/ OAuth

So the next topic to cover is how the heck to actually authenticate username / password logins for an applicaton...right? Well it turns out we can write another service to handle this...and really take the stress of ourselves.

__** WARNING **__

This assumes you have a centralized auth server -- or some way to actually interact with an OAuth system. I will not be covering how to set this up as it is out of scope with what I am trying to cover.

So all that being said -- lets write a simple wrapper for a service which handles application authentication.

```js

// authentication.service.js

(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name Authentication
   *
   * @description
   * The module declaration for this service object.
   */
  angular
    .module('[applicationModuleName]')
    .factory('Authentication', [
      '$http',
      'LocalStorage',
      AuthenticationService
    ]);
    
  /**
   * @name AuthenticationService
   * @description
   * This service will act as a wrapper for handling all authentication
   *  for an application.
   *
   * @param {!angular.$http} $http
   * @param {!LocalStorage} LocalStorage
   */
  function AuthenticationService($http, LocalStorage) {
    // Expose the service object
    return {
      authenticate: authenticate,
      resetOAuthTokens: resetOAuthTokens,
      refreshToken: refreshToken
    };
    
    /**
     * @name authenticate
     * @description
     * This function will return a promise which when fulfilled will
     *  determine if the credentials passed are valid or not.
     * 
     * @param {string} username
     * @param {string} password
     *
     * @return {Promise}
     */
    function authenticate(username, password) {
      return $http({
        method: 'POST',
        url: '[OAuth-API-URL]',
        data: $.param({
          client_id: '[OAuth-CLIENT-ID]',
          client_secret: '[OAuth-CLIENT-SECRET]',
          grant_type: 'password',
          username: username,
          password: password
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });
    }
    
    /**
     * @name resetOAuthTokens
     * @description
     * Reset the state to null for all oauth tokens on the application. This
     *  will essentially null the state of the application back to default.
     */
    function resetOAuthTokens() {
      LocalStorage.set('[OAuth-TOKEN]', null);
      LocalStorage.set('[OAuth-TOKEN-EXPIRATION]', null);
      LocalStorage.set('[OAuth-REFRESH-TOKEN]', null);
    }
    
    /**
     * @name refreshToken
     * @description
     * This function will make the proper service call to the api, and get
     *  back a new oauth token. It will then reset the expiration.
     */
    function refreshToken() {
      var promise = $http({
        method: 'POST',
        url: '[OAuth-API-URL]',
        data: $.param({
          client_id: '[OAuth-CLIENT-ID]',
          client_secret: '[OAuth-CLIENT-SECRET]',
          grant_type: 'refresh',
          refresh_token: LocalStorage.get('[OAuth-REFRESH-TOKEN]')
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      });
    }
    
    // Execute the call
    $http
      .then(function(response) {
        LocalStorage.set('[OAuth-TOKEN]', response.token);
        LocalStorage.get('[OAuth-REFRESH-TOKEN]', response.refreshToken);
        LocalStorage.set('[OAuth-TOKEN-EXPIRATION]', moment());
      
        return true;
      })
      .catch(function(error) {
        return false;
      }};
  }
})();
```

Not too difficult right? Couple of gotchas here,

1. I am using $.param as an easy way to create form post parameters. If you do not use jQuery just roll your own -- there are tons of examples on how to do this on Stack Overflow. I __do not__ use jQuery (full version) in my hybrid applications, so this was just to get this out the door.
2. You will need to replace __[OAuth-API-URL]__, __[OAuth-CLIENT-ID]__, and __[OAuth-CLIENT-SECRET]__ with your own settings. Otherwise -- this will not work (duh).

##### Putting It All Together

So we've now got 2 of the main parts in order to manage session in an application. So here comes the first step to the state management -- the bootstrap process. This process will check to make sure your tokens are valid and exist,

```js

// application.js

(function() {
  'use strict';
  
  angular
    .module('[applicationModuleName]', [
      'ionic'
    ])
    .constant('moment', moment)
    .run([
      'moment',
      '$state',
      'LocalStorage',
      'Authentication',
      Bootstrap
    ]);
  
  /**
   * @description
   * This function will bootstrap the application, and kick off any processes
   *  which are needed to be run before initial execution. This may include
   *  things like OAuth token checks, etc.
   * 
   * @param {moment} moment
   * @param {!angular.$state} $state 
   * @param {LocalStorage} LocalStorage
   * @param {Authentication} Authentication
   */
  function Bootstrap(moment, $state, LocalStorage, Authentication) {
    // If we do not find ALL of the proper tokens then we want to immediately
    //  flush all token states, and go to the login.
    if (!LocalStorage.get('[OAuth-TOKEN]') || 
        !LocalStorage.get('[OAuth-TOKEN-EXPIRATION]') || 
        !LocalStorage.get('[OAuth-REFRESH-TOKEN]')) {
      $state.go('[LoginState]');
      Authentication.resetOAuthTokens();
    }
    else {
      // Here we need to check the expiration token to see if we need to issue
      //  a refresh for the original OAuth Token.
      var tokenExpired = moment(LocalStorage.get('[OAuth-TOKEN-EXPIRATION]')).isBefore(moment());
      if (tokenExpired) {
        Authentication
          .refreshToken()
          .then(function() {
            // If the refresh is a success -- redirect to some page
            $state.go('[IndexState]');
          })
          .catch(function() {
            // If the refresh is not successful -- redirect back to login and
            //  null out the tokens.
            $state.go('[LoginState]');
            Authentication.resetOAuthTokens();
          });
      } else {
        $state.go('[IndexState]');
      }
    }
  }
})();

```

Looks complicated -- right? Well it really is pretty simple, lets objectify everything it does step by step,

1. Are the tokens present (not a new install, or something screwed up)
  * If yes -- move on to next step
  * If no -- redirect to login, null tokens (to make sure they are void)
2. Is the token expired?
  * If yes -- refresh the token
    * Did the refresh work?
      * If yes -- pass through and go to specified page (index in our case)
      * If no -- redirect to login, null tokens (to make sure they are void)
  * If no -- pass through and go to specified page (index in our case)

Thats all there is to it.

So how the heck do you even issue the login in the first case. Without going into too much detail, this will be handled in your controller logic on your login state page, like so:

```js
// login.controller.js

(function() {
  'use strict';
  
  angular
    .module('[applicationModuleName]', [
      'ionic'
    ])
    .controller([
      'moment',
      '$state',
      'LocalStorage',
      'Authentication',
      Controller
    ]);
  
  /**
   * @name Controller
   * @description
   * This function will bootstrap the application, and kick off any processes
   *  which are needed to be run before initial execution. This may include
   *  things like OAuth token checks, etc.
   * 
   * @param {moment} moment
   * @param {!angular.$state} $state 
   * @param {LocalStorage} LocalStorage
   * @param {Authentication} Authentication
   */
  function Controller(moment, $state, LocalStorage, Authentication) {
    var vm = this;
        vm.login = login;
        vm.loginError = 'Invalid username and/or password specified.';
        vm.showLoginError = false;
        
    /**
     * @name login
     * @description
     * Log the user into the application by interfacing with the authentication
     *  service, and then setting the correct tokens.
     * 
     * @param {string} username
     * @param {string} password
     */
    function login(username, password) {
      username = username || null;
      password = password || null;
      
      // Do some basic checking on username + password to make sure it is
      //  valid. I generally use the FormController to do $form.isValid checks,
      //  and other stuff. this is just easier for example.
      vm.showLoginError = false;
      if (!username || !password) {
        vm.showLoginError = true;
        return;
      }
      
      Authentication
        .authenticate(username, password)
        .then(function(response) {
          // Login successful, set the correct tokens, and move on.
          LocalStorage.set('[OAuth-TOKEN]', response.token);
          LocalStorage.get('[OAuth-REFRESH-TOKEN]', response.refreshToken);
          LocalStorage.set('[OAuth-TOKEN-EXPIRATION]', moment());
          
          $state.go('[IndexState]');
        })
        .catch(function() {
          // If the login is not successful -- reset the tokens and go nowhere.
          Authentication.resetOAuthTokens();
        });
    }
  }
})();
```

Holy crap -- that was a lot of information in a short span of time. But as you can see -- with everything consolidated into nice wrapper functions, it isnt so scary now. On top of that, you can now do all of your state management in a very easy way. To log a user off -- its a very simple process:

```js

// foobar.controller.js

/**
 * @name logout
 * @description
 * Log the current user out of the application.
 */
function logout() {
  Authentication.resetOAuthTokens();
  $state.go('[LoginState]');
}

```

And voila! Were all set!

##### Final Thoughts & Disclaimer

So we have covered a ton of information in this article -- hopefully it wasnt too confusing. A few disclaimers on this method of authentication,

1. **This may not be the best way of doing things**. It is more of an open discussion in terms of the best way to handle session management in a hybrid application. The one thing I do know -- this works....and it works REALLY well.
2. Do not try to use this code directly without replacing the placeholder tokens -- __you will have a bad time__.
3. Use this example at your own risk -- it is a good template, but you should be willing to spend some time and use this as a "concept" rather than the defacto way of doing things for your own application.

Well I think that about wraps it up -- if there are any questions, feel free to comment / message me and I can help get it all sorted out. I have used this methodology in a bunch of applications now -- so im pretty familiar with all the gotchas. Here's to staying sane with session management!

_Cheers, Ryan_ 

**@ryanpager**
