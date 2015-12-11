export default function LoginController($scope, $state, $rootScope) {
  const { ref } = $rootScope;

  $scope.loginData = { email: '', password: '' };

  $scope.join = () => $state.transitionTo('app.join');

  $scope.login = () => {
    ref.authWithPassword($scope.loginData, (error, authData) => {
      if (error) console.log('Login Failed!', error);
      else $state.transitionTo('app.set-goals');
    });
  };
}
