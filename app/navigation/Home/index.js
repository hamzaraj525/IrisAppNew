/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
import HomeContainer from '../../containers/Home';
import IntroChatContainer from '../../containers/IntroChat';
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

function Home() {
	return (
		<Stack.Navigator initialRouteName="IntroChat">
			<Stack.Screen name="IntroChat" component={IntroChatContainer} options={() => options} />
			<Stack.Screen name="HomeChat" component={HomeContainer} options={() => options} />
		</Stack.Navigator>
	);
}
export default Home;
