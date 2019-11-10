import {
  AccountScreen,
  CameraScreen,
  FormScreen,
  HuntDetailScreen,
  HuntListScreen,
  ResolveAuthScreen,
  SigninScreen,
  SignupScreen,
  InfoScreen
} from './src/screens'
import { Drawer } from './src/components'
import {
  AuthProvider,
  HuntProvider,
  PictureProvider,
  UserProvider
} from './src/context'
import { setNavigator } from './src/utils'

import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createMaterialTopTabNavigator(
    {
      Info: InfoScreen,
      MainScreenFlow: createDrawerNavigator(
        {
          HuntRecordFlow: createStackNavigator({
            Camera: CameraScreen,
            Form: FormScreen
          })
        },
        {
          contentComponent: Drawer
        }
      ),
      HuntListFlow: createStackNavigator({
        HuntList: HuntListScreen,
        HuntDetail: HuntDetailScreen
      })
    },
    {
      animationEnabled: true,
      tabBarOptions: {
        showLabel: false,
        showIcon: false,
        style: { height: 0 }
      }
    }
  )
})

const App = createAppContainer(switchNavigator)

export default () => (
  <UserProvider>
    <PictureProvider>
      <HuntProvider>
        <AuthProvider>
          <App
            ref={navigator => {
              setNavigator(navigator)
            }}
          />
        </AuthProvider>
      </HuntProvider>
    </PictureProvider>
  </UserProvider>
)
