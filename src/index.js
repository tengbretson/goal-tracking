import 'ionic-npm/js/ionic.bundle';
import 'firebase/lib/firebase-web';
import 'angularfire';

import Router from './router';

const app = angular.module('goal-tracker', ['ionic', 'firebase'])

app.run(($ionicPlatform, $state, $rootScope) => {
  $ionicPlatform.ready(() => {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) StatusBar.styleDefault();
  });

  $rootScope.ref = new Firebase('https://goal-track.firebaseio.com');

  $rootScope.$on(
    '$stateChangeStart',
    (event, toState, toParams, fromState, fromParams) => {
      if (toState.authRequired && !$rootScope.ref.getAuth()) {
        $state.transitionTo('app.login');
        event.preventDefault();
      }
  });
});

app.config(Router);

app.factory('goals', function ($rootScope, $firebaseArray) {
  const { ref } = $rootScope;
  const { uid } = ref.getAuth();
  return $firebaseArray(
    new Firebase(`https://goal-track.firebaseio.com/u/${uid}/goal`)
  );
})
