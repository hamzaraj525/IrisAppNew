import React from 'react';
import {View, ScrollView, Dimensions} from 'react-native';

// Components
import {Header, SettingItem} from '@/components';

// Layout
import Layout from '@/Layout';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Colors from '../../common/Colors';
const {height, width} = Dimensions.get('window');
function AboutContainer({navigation}) {
	const insets = useSafeAreaInsets();
	return (
		<>
			<Header iconLogo={false} style={{paddingTop: insets.top + 16, width: width}} loginScreen={true} txt1={'About'} txtStyle1={{color: Colors.white, fontWeight: '700'}} txtStyle2={{color: Colors.BLACK}} />

			<View className="flex-1 mb-4 mt-6">
				<ScrollView showsVerticalScrollIndicator={false}>
					<SettingItem title="FAQs" onPress={() => navigation.navigate('FAQs')} />
					<SettingItem title="Contact us" />
					<SettingItem title="Terms and Privacy Policy" />
					<SettingItem title="App info" />
				</ScrollView>
			</View>
		</>
	);
}

export default AboutContainer;
