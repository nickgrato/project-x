import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import ListScreen from '../screens/ListScreen'
import BibleScreen from '../screens/BibleScreen'
import { MainBottomTabParamList } from '../types'
import colors from '../constants/colors'
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components'
// https://akveo.github.io/eva-icons/#/

const { Navigator, Screen } = createBottomTabNavigator<MainBottomTabParamList>()

const HomeIcon = (props) => <Icon {...props} name="home-outline" />
const SettingsIcon = (props) => <Icon {...props} name="settings-2-outline" />
const BibleIcon = (props) => <Icon {...props} name="book-open-outline" />
const CheckIcon = (props) => (
  <Icon {...props} name="checkmark-square-2-outline" />
)

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
    style={styles.tabContainer}
  >
    <BottomNavigationTab icon={HomeIcon} title="HOME" />
    <BottomNavigationTab icon={BibleIcon} title="Bible" />
    <BottomNavigationTab icon={SettingsIcon} title="SETTINGS" />
    <BottomNavigationTab icon={CheckIcon} title="LISTS" />
  </BottomNavigation>
)

function MainNavigation() {
  return (
    <Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerTitleStyle: styles.headerTitleStyle,
      }}
    >
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Bible" component={BibleScreen} />
      <Screen name="Settings" component={SettingsScreen} />
      <Screen name="List" component={ListScreen} />
    </Navigator>
  )
}

export default MainNavigation

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontSize: 13,
  },

  // DRAWER NAVIGATION CONTAINER
  drawerStyle: {
    backgroundColor: colors.background_gray,
  },
  drawerLabelStyle: {},
  tabBarStyle: {
    backgroundColor: colors.backround_black,
    borderTopWidth: 0,
  },
  tabBarOptions: {
    elevation: 0,
  },
  tabContainer: {
    paddingBottom: 20,
  },
})
