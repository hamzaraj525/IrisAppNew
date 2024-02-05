/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
import HomeContainer from '../../containers/Home';
import {LoginContainer} from '../../containers';
// Containers

enableScreens();

const Stack = createStackNavigator();

const options = {
	headerBackTitleVisible: true,
	cardStyleInterpolator: ({current: {progress}}) => {
		return {
			cardStyle: {
				opacity: progress,
			},
		};
	},
	cardStyle: {
		backgroundColor: 'transparent',
	},
	headerShown: false,
};

function Auth() {
	return (
		<Stack.Navigator initialRouteName="Auth">
			<Stack.Screen name="Auth" component={LoginContainer} options={() => options} />
		</Stack.Navigator>
	);
}
export default Auth;
