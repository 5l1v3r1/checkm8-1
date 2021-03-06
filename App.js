import React, { Component } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Categories from './src/pages/Categories';
import Checklist from './src/pages/Checklist';

const RootStack = createStackNavigator({
  Categories,
  Checklist,
}, {
  initialRouteName: 'Categories',
  cardStyle: { paddingTop: 20, backgroundColor: '#171a22' },
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#171a22',
      paddingHorizontal: 10,
    },
    headerTintColor: '#dbdbdb',
    headerTitleStyle: {
      fontFamily: 'Raleway-Bold',
      fontSize: 25,
      textAlign: 'center',
      flex: 1,
    },
  },
});
export default class App extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
      }}
      >
        <RootStack />
      </View>
    );
  }
}
