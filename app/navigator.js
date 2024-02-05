import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {View, Text, StatusBar} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';

// Navigations
import Navigation from '@/navigation';

function Navigator() {
	const [isConnected, setIsConnected] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		// Only work in device
		const unsubNetState = NetInfo.addEventListener(state => {
			setIsConnected(state.isConnected);
		});

		return () => {
			unsubNetState();
		};
	}, []);

	return (
		<View className="flex-1 bg-white">
			<StatusBar barStyle="dark-content" animated />
			{!isConnected && (
				<View className="bg-orange h-[80] items-center justify-end pb-3">
					<Text className="font-rubik font-medium text-xs text-white">Check your internet connection.</Text>
				</View>
			)}
			<SafeAreaView className="flex-1">
				<Navigation />
			</SafeAreaView>
		</View>
	);
}

export default Navigator;
