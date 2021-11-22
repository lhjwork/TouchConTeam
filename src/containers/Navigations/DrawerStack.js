import RightDrawer from '../../components/RightDrawer';
import Main from '../Mainflow/Main/view';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import GfCaolion from '../Mainflow/GfCaolion/Caolion';
import GfMegaMall from '../Mainflow/GfMegaMall/MegaMall';
import GfGukBab from '../Mainflow/GfGukBab/GukBab';

const Stack = createDrawerNavigator();

export const DrawerStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      drawerPosition="right"
      screenOptions={{
        drawerPosition: 'right',
        // drawerHideStatusBarOnOpen: true,
        drawerStyle: {
          width: '73%',
          drawerInactiveBackgroundColor: 'rgba(0,0,0,0.45)',
        },
      }}
      //
      // defaultStatus="close"
      // screenOptions={{
      //   drawerPosition: 'right',
      //   // drawerType: 'front',
      // }}
      drawerContent={props => <RightDrawer />}>
      <Stack.Screen
        name="Home"
        component={Main}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GfCaolion"
        component={GfCaolion}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GfMegaMall"
        component={GfMegaMall}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GfGukBab"
        component={GfGukBab}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
