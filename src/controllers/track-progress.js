export default function TrackProgressController($scope, goals, timesToday) {
  $scope.goals = goals;
  $scope.timesToday = timesToday;

  $scope.addTime = ($id) => {
    const times = timesToday[$id] || 0;
    timesToday[$id] = times + 1;
    timesToday.$save();
  }


}
