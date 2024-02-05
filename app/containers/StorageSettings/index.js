import React from 'react';
import {View, Dimensions, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const {height, width} = Dimensions.get('window');
// Components
import {Header, SettingItem} from '@/components';

// Layout
import Layout from '@/Layout';
import Colors from '../../common/Colors';

function StorageSettingsContainer({navigation}) {
	const insets = useSafeAreaInsets();
	return (
		<>
			<Header iconLogo={false} style={{paddingTop: insets.top + 16, width: width}} loginScreen={true} txt1={'Storage Settings'} txtStyle1={{color: Colors.white, fontWeight: '700'}} txtStyle2={{color: Colors.BLACK}} />

			<View className="flex-1 mb-4 mt-6">
				<ScrollView showsVerticalScrollIndicator={false}>
					<SettingItem title="Network usage" />
					<SettingItem title="Use less data for searches" toggler />
					<SettingItem title="Download media automatically" />
					<SettingItem title="Media upload quality" />
				</ScrollView>
			</View>
		</>
	);
}

export default StorageSettingsContainer;
