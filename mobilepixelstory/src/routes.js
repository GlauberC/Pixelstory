import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Stories from './pages/Stories';
import Scenes from './pages/Scenes';
import Scene from './pages/Scene';

const StackNav = createAppContainer(
  createStackNavigator({
    Stories,
    Scenes,
    Scene,
  }),
);

export default StackNav;
