import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Stories from './pages/Stories';
import Scenes from './pages/Scenes';
import Scene from './pages/Scene';

import {colors} from './styles/mainStyles';

const StackNav = createAppContainer(
  createStackNavigator(
    {
      Stories,
      Scenes,
      Scene,
    },
    {
      defaultNavigationOptions: {
        headerTitleAlign: 'left',
        headerStyle: {
          backgroundColor: colors.prim1,
        },
        headerTitleStyle: {
          color: colors.sec1,
          fontSize: 24,
        },
      },
    },
  ),
);

export default StackNav;
