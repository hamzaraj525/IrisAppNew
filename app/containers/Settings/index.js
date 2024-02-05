import React from 'react';
import {View, ScrollView, Text, Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const {height, width} = Dimensions.get('window');

// Components
import {Header, Button} from '@/components';

// Common
import {Colors} from '@/common';

// Layout
import Layout from '@/Layout';
import Constraints from '../../common/Constraints';

function SettingsContainer({navigation}) {
	const insets = useSafeAreaInsets();
	return (
		<>
			<Header iconLogo={false} style={{paddingTop: insets.top + 16, width: width}} loginScreen={true} txt1={Constraints.SETTINGS} txtStyle1={{color: Colors.white, fontWeight: '700'}} txtStyle2={{color: Colors.BLACK}} />

			<View
				style={{
					backgroundColor: Colors.light, // Replace with your desired background color
					borderRadius: 20, // Adjust the value based on your desired rounded-3xl effect
					paddingHorizontal: 16,
					marginBottom: 4,
					marginTop: 14,
					width: '90%', // Set width to 90%
					alignSelf: 'center', // Center the View horizontally
				}}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Button className="flex-row items-center py-6 border-b-[1px] border-purple/10" onPress={() => navigation.navigate('AccountSettings')}>
						<MaterialCommunityIcons name="account-box-outline" size={20} color={Colors.purple} />
						<Text className="font-rubik font-medium text-sm text-black ml-2">Account</Text>
					</Button>

					<Button className="flex-row items-center py-6 border-b-[1px] border-purple/10" onPress={() => navigation.navigate('ChatSettings')}>
						<FontAwesome name="comments-o" size={20} color={Colors.purple} />
						<Text className="font-rubik font-medium text-sm text-black ml-2">Chat</Text>
					</Button>

					<Button className="flex-row items-center py-6 border-b-[1px] border-purple/10" onPress={() => navigation.navigate('SecuritySettings')}>
						<MaterialCommunityIcons name="security" size={20} color={Colors.purple} />
						<Text className="font-rubik font-medium text-sm text-black ml-2">Security</Text>
					</Button>

					<Button className="flex-row items-center py-6 border-b-[1px] border-purple/10" onPress={() => navigation.navigate('About')}>
						<MaterialIcons name="question-mark" size={20} color={Colors.purple} />
						<Text className="font-rubik font-medium text-sm text-black ml-2">About and help</Text>
					</Button>

					<Button className="flex-row items-center py-6 border-b-[1px] border-purple/10" onPress={() => navigation.navigate('InviteFriends')}>
						<MaterialCommunityIcons name="account-group" size={20} color={Colors.purple} />
						<Text className="font-rubik font-medium text-sm text-black ml-2">Invite friends</Text>
					</Button>

					<Button className="flex-row items-center py-6" onPress={() => navigation.navigate('StorageSettings')}>
						<MaterialCommunityIcons name="database-sync" size={20} color={Colors.purple} />
						<Text className="font-rubik font-medium text-sm text-black ml-2">Storage space</Text>
					</Button>
				</ScrollView>
			</View>
		</>
	);
}

export default SettingsContainer;
