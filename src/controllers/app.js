export default function AppController($scope, $rootScope) {
  const { ref } = $rootScope;

  $scope.isAuthenticated = !!ref.getAuth();

  $scope.logout = () => ref.unauth();
}
