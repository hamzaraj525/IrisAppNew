import React from 'react';
import {View} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

// It allows you to use navigation in places where you cannot access the navigation directly.
import {navigationRef} from '@/RootNavigation';

// Main Screens
import Settings from './Settings';
import Home from './Home';

import {LoginContainer, OnboardingContainer} from '../containers';

// Components
import {TabBar, TabBarIcon} from '@/components';
import {useSelector} from 'react-redux';

const Themes = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: 'transparent',
	},
};

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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabNavigator() {
	return (
		<View className="flex-1">
			<Tab.Navigator tabBar={props => <TabBar {...props} />} initialRouteName="Home">
				<Tab.Screen
					name="Root:Home"
					component={Home}
					options={{
						tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="Home" />,
						headerShown: false,
					}}
				/>
				<Tab.Screen
					name="Root:Settings"
					component={Settings}
					options={{
						tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="Settings" />,
						headerShown: false,
					}}
				/>
			</Tab.Navigator>
		</View>
	);
}

function Navigation() {
	const phone = useSelector(state => state.app.userData.phone);
	const isOnBoardOpened = useSelector(state => state.app.isOnBoardOpened);

	return (
		<NavigationContainer theme={Themes} ref={navigationRef}>
			<Stack.Navigator initialRouteName={isOnBoardOpened ? (phone ? 'Root' : 'Auth') : 'Onboarding'}>
				<Stack.Screen name="Root" component={BottomTabNavigator} options={() => options} />
				<Stack.Screen name="Auth" component={LoginContainer} options={() => options} />
				<Stack.Screen name="Onboarding" component={OnboardingContainer} options={() => options} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default Navigation;
