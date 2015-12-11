import AppTemplate from './views/app.html';
import JoinController from './controllers/join';
import JoinTemplate from './views/join.html';
import LoginController from './controllers/login';
import LoginTemplate from './views/login.html';
import SetGoalsController from './controllers/set-goals';
import SetGoalsTemplate from './views/set-goals.html';
import TrackProgressController from './controllers/track-progress';
import TrackProgressTemplate from './views/track-progress.html';

export default function Router($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('app', {
    abstract: true,
    url: '/',
    template: AppTemplate
  });

  $stateProvider.state('app.login', {
    url: 'login',
    controller: LoginController,
    template: LoginTemplate
  });

  $stateProvider.state('app.join', {
    url: 'join',
    controller: JoinController,
    template: JoinTemplate
  });

  $stateProvider.state('app.set-goals', {
    url: '',
    template: SetGoalsTemplate,
    controller: SetGoalsController,
    authRequired: true
  });

  $stateProvider.state('app.track-progress', {
    url: 'track-progress',
    template: TrackProgressTemplate,
    controller: TrackProgressController,
    authRequired: true
  });
}
