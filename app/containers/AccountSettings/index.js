import React from 'react';
import {View, ScrollView, Dimensions} from 'react-native';

// Components
import {Header, SettingItem} from '@/components';

// Layout
import Layout from '@/Layout';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Colors from '../../common/Colors';
const {height, width} = Dimensions.get('window');
function AccountSettingsContainer({navigation}) {
	const insets = useSafeAreaInsets();
	return (
		<>
			<Header iconLogo={false} style={{paddingTop: insets.top + 16, width: width}} loginScreen={true} txt1={'Account'} txtStyle1={{color: Colors.white, fontWeight: '700'}} txtStyle2={{color: Colors.BLACK}} />

			<View className="flex-1 mb-4 mt-6">
				<ScrollView showsVerticalScrollIndicator={false}>
					<SettingItem title="Status" value="Account" />
					<SettingItem title="Phone number" value="+90 555 555 55 55" />
					<SettingItem title="Last seen" value="Nobody" />
					<SettingItem title="Profile photo" value="Nobody" />
					<SettingItem title="About" value="Nobody" />
					<SettingItem title="Groups" value="Nobody" />
				</ScrollView>
			</View>
		</>
	);
}

export default AccountSettingsContainer;
