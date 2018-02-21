/* @flow */

import {
  StackNavigator,
  NavigationActions,
  DrawerNavigator,
  TabNavigator,
  TabBarTop
} from "react-navigation";

import Home from "../components/home";
import Profile from "../components/profile";
import Settings from "../components/settings";
import Login from "../components/login";
import ForgotPassword from "../components/forgotpassword";
import Dashboard from "../components/dashboard";
import Feed from "../components/feed";
import * as COLOR from "./colors";

import DrawerContainer from "../components/drawer";

const HomeItem = StackNavigator({
  Home: {
    screen: Home
  }
});

const ProfileItem = StackNavigator({
  Profile: {
    screen: Profile
  }
});

const SettingsItem = StackNavigator({
  Settings: {
    screen: Settings
  }
});

export const MainStack = DrawerNavigator(
  {
    HomeItem: {
      screen: HomeItem
    },
    ProfileItem: {
      screen: ProfileItem
    },
    SettingsItem: {
      screen: SettingsItem
    }
  },
  { contentComponent: DrawerContainer }
);

export const LoginStack = StackNavigator({
  Login: {
    screen: Login
  },
  ForgotPassword: {
    screen: ForgotPassword
  }
});

export const Tabs = TabNavigator(
  {
    Dashboard: {
      screen: Dashboard
    },
    Feed: {
      screen: Feed
    }
  },
  {
    headerMode: "none",
    tabBarComponent: TabBarTop,
    tabBarPosition: "bottom",
    tabBarOptions: {
      showLabel: "true  ",
      showIcon: "true  ",
      activeTintColor: COLOR.HEADER_TINT,
      activeBackgroundColor: COLOR.HEADER_TINT,
      inactiveTintColor: COLOR.BACKGROUND,
      inactiveBackgroundColor: COLOR.BACKGROUND,
      style: {
        height: 64,
        backgroundColor: COLOR.HEADER
      },
      indicatorStyle: {
        backgroundColor: COLOR.HEADER_TINT
      },
      labelStyle: {
        fontSize: 10
      }
    }
  }
);

const navigateOnce = getStateForAction => (action, state) => {
  const { type, routeName } = action;
  return state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName
    ? null
    : getStateForAction(action, state);
};

MainStack.router.getStateForAction = navigateOnce(
  MainStack.router.getStateForAction
);
LoginStack.router.getStateForAction = navigateOnce(
  LoginStack.router.getStateForAction
);
