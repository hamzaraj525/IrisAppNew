import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function Layout({children}) {
	const insets = useSafeAreaInsets();

	return (
		<View className="flex-1 bg-red px-6" style={{paddingTop: insets.top + 16}}>
			{children}
		</View>
	);
}

export default Layout;
