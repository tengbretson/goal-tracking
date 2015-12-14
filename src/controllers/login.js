export default function LoginController($scope, $state, $rootScope) {
  const { ref } = $rootScope;

  $scope.loginData = { email: '', password: '', error: '' };

  $scope.join = () => $state.transitionTo('app.join');

  $scope.login = () => {
    ref.authWithPassword($scope.loginData, (error, authData) => {
      if (error) $scope.loginData.error = error.message;
      else $state.transitionTo('app.set-goals');
    });
  };
}
