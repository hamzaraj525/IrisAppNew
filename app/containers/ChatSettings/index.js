import React from 'react';
import {View, Dimensions, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const {height, width} = Dimensions.get('window');
// Components
import {Header, SettingItem} from '@/components';

// Layout
import Layout from '@/Layout';
import Colors from '../../common/Colors';

function ChatSettingsContainer({navigation}) {
	const insets = useSafeAreaInsets();
	return (
		<>
			<Header
				iconLogo={false}
				style={{
					paddingTop: insets.top + 16,
					width: width,
				}}
				loginScreen={true}
				txt1={'ChatSettings'}
				txtStyle1={{color: Colors.white, fontWeight: '700'}}
				txtStyle2={{color: Colors.BLACK}}
			/>

			<View className="flex-1 mb-4 mt-6">
				<ScrollView showsVerticalScrollIndicator={false}>
					<SettingItem title="Media visibility" toggler />
					<SettingItem title="Font size" value="Small" />
					<SettingItem title="App langauge" value="English" />
					<SettingItem title="Chat background" value="Standard" />
				</ScrollView>
			</View>
		</>
	);
}

export default ChatSettingsContainer;
