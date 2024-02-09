import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform, TouchableHighlight, Dimensions} from 'react-native';
import Colors from '../common/Colors';
import FastImage from 'react-native-fast-image';
import Images from '../common/Images';
import {useDispatch, useSelector} from 'react-redux';
import {actions, updateUserData} from '../redux/reducer/AppRedux';
import Fonts from '../common/Fonts';
import {MotiView} from 'moti';
import ActionPopUp from './ActionPopUp';
import Feather from 'react-native-vector-icons/Feather';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
const {height} = Dimensions.get('window');

const Header = props => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();
	const [showModal, setShowModal] = useState(false);
	const {phone, countryItem} = useSelector(reducer => reducer.app);

	let countryCode = countryItem?.idd.root; // Default to the root value

	// Check if the country is the United States and set the country code accordingly
	if (countryItem?.name === 'United States') {
		countryCode = '+1'; // Set the country code for the United States
	} else {
		// If it's not the United States, concatenate the suffixes if available
		if (countryItem?.idd.suffixes && countryItem?.idd.suffixes.length > 0) {
			countryCode += countryItem?.idd.suffixes.join('');
		}
	}

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

	return (
		<>
			<View style={[styles.container, props.style]}>
				<View style={styles.subContainer}>
					{props.iconLogo ? <FastImage source={Images.SMS} style={styles.icon} resizeMode="contain" /> : null}

					<Text style={[styles.txt, props.txtStyle1]}>{props.txt1}</Text>

					<Text style={[styles.txt, props.txtStyle2]}>
						{countryCode}
						{phone}
					</Text>
				</View>

				{!props.loginScreen && (
					<TouchableHighlight
						onPress={() => {
							navigation.navigate('Root:Settings');
						}}
						underlayColor={Colors.light}
						style={styles.logoutBtn}>
						<Feather name="settings" size={18} color={Colors.blue} />
					</TouchableHighlight>
				)}
			</View>

			<ActionPopUp showModal={showModal} hideModal={hideModal} actionBtn={handleLogout} logIn={true} />
		</>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.main,
		flexDirection: 'row',
		paddingVertical: 12,
		paddingHorizontal: 30,
		width: '90%',
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	subContainer: {
		width: '70%',
		alignItems: 'center',
		flexDirection: 'row',
	},
	txt: {
		marginLeft: '4%',
		color: Colors.PRIMARY_BLUE,
		fontSize: 15,
		fontWeight: '700',
		fontFamily: Fonts.POPPINS,
	},
	icon: {
		width: 28,
		height: 28,
		borderRadius: 28 / 2,
	},
	logoutBtn: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 35,
		height: 35,
		backgroundColor: Colors.light,
		borderRadius: 35 / 2,
	},
	logoutIcon: {
		width: 15,
		height: 15,
	},
});
