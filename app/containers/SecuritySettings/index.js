import React from 'react';
import {View, Dimensions, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const {height, width} = Dimensions.get('window');
// Components
import {Header, SettingItem} from '@/components';

// Layout
import Layout from '@/Layout';
import Colors from '../../common/Colors';

function SecuritySettingsContainer({navigation}) {
	const insets = useSafeAreaInsets();
	return (
		<>
			<Header iconLogo={false} style={{paddingTop: insets.top + 16, width: width}} loginScreen={true} txt1={'SecuritySettings'} txtStyle1={{color: Colors.white, fontWeight: '700'}} txtStyle2={{color: Colors.BLACK}} />

			<View className="flex-1 mb-4 mt-6">
				<ScrollView showsVerticalScrollIndicator={false}>
					<SettingItem title="Last seen and online" value="Nobody" />
					<SettingItem title="Profile picture" value="My contacts" />
					<SettingItem title="About me" value="Everyone" />
					<SettingItem title="Groups" value="My contacts" />
					<SettingItem title="Stories" value="Nobody" />
					<SettingItem title="Calls" value="In silent" />
					<SettingItem title="Blocked" value="7 conversations" />
					<SettingItem title="Read receipt" toggler />
				</ScrollView>
			</View>
		</>
	);
}

export default SecuritySettingsContainer;
