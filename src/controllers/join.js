export default function JoinController($scope, $state, $rootScope) {
  const { ref } = $rootScope;

  $scope.joinData = { error: '', email: '', pass1: '', pass2: '' };

  function setError(error) {
    $scope.joinData.error = error;
  }

  $scope.join = () => {
    const { email, pass1, pass2 } = $scope.joinData;
    if (pass1 !== pass2) {
      setError('Passwords entered must match');
    } else if (false /* test with a regex here */) {
      setError('Password must follow rules xyz');
    } else {
      const password = pass1;
      ref.createUser({ email, password }, (error, userData) => {
        if (error) setError(error.message);
        else ref.authWithPassword({ email, password }, (error, authData) => {
          if (error) setError(error.message);
          else $state.transitionTo('app.set-goals');
        });
      });
    }
  };
}
