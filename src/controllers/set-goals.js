export default function SetGoalsController($scope, $state, goals) {
  $scope.goals = goals;

  $scope.trackProgress = () => $state.transitionTo('app.track-progress');
  $scope.myHistory = () => $state.transitionTo('app.my-history');


  $scope.handleChange = goal => {
    $scope.goals.$save(goal);
  }

  $scope.addGoal = () => {
    $scope.goals.$add({ text: '', times: 0 });
  };

}
