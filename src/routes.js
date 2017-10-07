import LoginComponent from 'components/view/Login'
import PlayComponent from 'components/view/Play'
import RulesComponent from 'components/view/Rules'
import SettingsComponent from 'components/view/Settings'
import UsersComponent from 'components/view/Users'
import OverviewComponent from 'components/view/Overview'
import HelpComponent from 'components/view/Help'
import AndroidComponent from 'components/view/Android'

export default [
  {
    path: '/',
    component: LoginComponent,
    name: 'home'
  },
  {
    path: '/users',
    component: UsersComponent
  },
  {
    path: '/overview',
    component: OverviewComponent,
    name: 'overview'
  },
  {
    path: '/play/:tour/:id',
    name: 'play',
    component: PlayComponent
  },
  {
    path: '/help',
    component: HelpComponent
  },

  {
    path: '/android',
    component: AndroidComponent,
    name: 'android'
  },

  {
    path: '/settings',
    component: SettingsComponent
  }
]
