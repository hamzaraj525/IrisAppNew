import React, {useState} from 'react';
import {View, ScrollView, Text, Dimensions, Linking} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
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
import ActionPopUp from '../../components/ActionPopUp';
import {updateUserData} from '../../redux/reducer/AppRedux';
import {useDispatch, useSelector} from 'react-redux';

function SettingsContainer({navigation}) {
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(updateUserData({phone: '', countryItem: null}));
		setShowModal(false);
		setTimeout(() => {
			navigation.navigate('Auth');
		}, 200);
	};

	const hideModal = () => {
		setShowModal(false);
	};

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
					<Button className="flex-row items-center py-6 border-b-[1px] border-purple/10" onPress={() => Linking.openURL('https://billing.stripe.com/p/login/cN27v73excIj0uI4gg')}>
						<MaterialCommunityIcons name="account-box-outline" size={20} color={Colors.purple} />
						<Text className="font-rubik font-medium text-sm text-black ml-2">Account</Text>
					</Button>

					<Button className="flex-row items-center py-6 border-b-[1px] border-purple/10" onPress={() => navigation.navigate('ChatSettings')}>
						<FontAwesome name="comments-o" size={20} color={Colors.purple} />
						<Text className="font-rubik font-medium text-sm text-black ml-2">Chat</Text>
					</Button>

					{/* <Button className="flex-row items-center py-6 border-b-[1px] border-purple/10" onPress={() => navigation.navigate('SecuritySettings')}>
						<MaterialCommunityIcons name="security" size={20} color={Colors.purple} />
						<Text className="font-rubik font-medium text-sm text-black ml-2">Security</Text>
					</Button> */}

					<Button className="flex-row items-center py-6 border-b-[1px] border-purple/10" onPress={() => navigation.navigate('About')}>
						<MaterialIcons name="question-mark" size={20} color={Colors.purple} />
						<Text className="font-rubik font-medium text-sm text-black ml-2">About and help</Text>
					</Button>

					<Button className="flex-row items-center py-6 border-b-[1px] border-purple/10" onPress={() => Linking.openURL('https://affiliate.irisai.app/signup')}>
						<MaterialCommunityIcons name="account-group" size={20} color={Colors.purple} />
						<Text className="font-rubik font-medium text-sm text-black ml-2">Invite friends</Text>
					</Button>

					{/* <Button className="flex-row items-center py-6 border-b-[1px] border-purple/10" onPress={() => navigation.navigate('StorageSettings')}>
						<MaterialCommunityIcons name="database-sync" size={20} color={Colors.purple} />
						<Text className="font-rubik font-medium text-sm text-black ml-2">Storage space</Text>
					</Button> */}

					<Button
						className="flex-row items-center py-6 border-b-[1px] border-purple/10"
						onPress={() => {
							setShowModal(true);
						}}>
						{/* <MaterialCommunityIcons name="account-box-outline" size={20} color={Colors.purple} />
						
						*/}

						<Feather name="settings" size={20} color={Colors.purple} />
						<Text className="font-rubik font-medium text-sm text-black ml-2">Log out</Text>
					</Button>
				</ScrollView>
			</View>

			<ActionPopUp showModal={showModal} hideModal={hideModal} actionBtn={handleLogout} logIn={true} />
		</>
	);
}

export default SettingsContainer;
