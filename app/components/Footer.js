import {View, Text, StyleSheet, TouchableHighlight, TextInput, KeyboardAvoidingView, ScrollView, Platform, FlatList, Dimensions} from 'react-native';
import React, {useState} from 'react';
import Colors from '../common/Colors';
import FastImage from 'react-native-fast-image';
import Images from '../common/Images';
import Picker from './Picker';
import Constraints from './../common/Constraints';
import Constants from './../common/Constants';
import {useDispatch, useSelector} from 'react-redux';
import {actions, updateUserData} from '../redux/reducer/AppRedux';
import Fonts from '../common/Fonts';
import {MotiView} from 'moti';
import ActionPopUp from './ActionPopUp';
import ErrorPopUp from './ErrorPopUp';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';

const {height, width} = Dimensions.get('window');
const Footer = props => {
	const dispatch = useDispatch();
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const [showModal, setShowModal] = useState(false);
	const [errorModal, setErrorModal] = useState(false);

	const [isModalVisible, setModalVisible] = useState(false);
	const [countryItem, setItem] = useState({
		name: 'United States',
		flag: 'https://flagcdn.com/w320/us.png', // Replace with the actual URL for the US flag
		idd: {
			suffixes: '1',
			root: '+1',
		},
	});

	const [phone, setPhone] = useState('');

	const toggleModal = () => {
		setModalVisible(false);
	};

	const hideModal = () => {
		setShowModal(false);
	};

	const hideErrorModal = () => {
		setErrorModal(false);
	};

	const data = [
		{id: '1', name: 'Item 1'},
		{id: '2', name: 'Item 2'},
		{id: '3', name: 'Item 3'},
		{id: '4', name: 'Item 4'},
		{id: '5', name: 'Item 5'},
	];

	let countryCode = countryItem?.idd.root; // Default to the root value

	// Check if the country is the United States and set the country code accordingly
	if (countryItem.name === 'United States') {
		countryCode = '+1'; // Set the country code for the United States
	} else {
		// If it's not the United States, concatenate the suffixes if available
		if (countryItem.idd.suffixes && countryItem.idd.suffixes.length > 0) {
			countryCode += countryItem.idd.suffixes.join('');
		}
	}

	const renderItem = ({item}) => (
		<View style={styles.item}>
			<Text style={{color: 'transparent'}}>{item.name}</Text>
		</View>
	);

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: Colors.white, // Replace with your main color
				paddingHorizontal: 8,
				paddingBottom: insets.bottom,
			}}>
			<Header iconLogo={true} loginScreen={true} style={{paddingTop: insets.top + 16, width: width}} txt1={Constraints.IRIS} txtStyle1={{color: Colors.white, fontWeight: '700'}} txtStyle2={{color: Colors.BLACK}} />
			<FlatList data={data} renderItem={renderItem} keyExtractor={item => item.id} />

			<KeyboardAvoidingView keyboardVerticalOffset={10} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<View style={[styles.containerFot]}>
					<View style={styles.subContainer}>
						<TouchableHighlight
							underlayColor={Colors.HIGHLIGHT_COLOR}
							onPress={() => {
								setModalVisible(true);
							}}
							style={styles.countryItemWrapper}>
							<>
								<FastImage
									source={{
										uri: countryItem ? countryItem.flag : null,
										priority: FastImage.priority.high,
									}}
									style={styles.countryFlag}
									resizeMode="contain"
								/>

								<Text style={styles.chooseBtnText}>{countryCode}</Text>
							</>
						</TouchableHighlight>

						<TextInput
							maxLength={12}
							placeholderTextColor={Constants.HexToRgba(Colors.black, 0.4)}
							keyboardType="number-pad"
							style={styles.phoneNumberInput}
							placeholder={Constraints.ENTER_PHONE_NUMBER}
							onChangeText={text => {
								// Remove non-numeric characters
								const numericText = text.replace(/[^0-9]/g, '');
								setPhone(numericText);
							}}
							value={phone}
						/>
					</View>

					<TouchableHighlight
						underlayColor={Colors.HIGHLIGHT_COLOR}
						onPress={() => {
							if (phone !== '' && countryItem !== null) {
								setShowModal(true);
								dispatch(updateUserData({phone, countryItem}));
								setTimeout(() => {
									setShowModal(false);
									navigation.replace('Root');
								}, 2500);
							} else {
								setErrorModal(true);
							}
						}}
						style={styles.loginBtn}>
						<>
							<Text style={[styles.loginTxt, {...props.txtStyle1}]}>{props.txt1}</Text>
							<FastImage source={Images.LOG_IN} style={styles.loginIcon} resizeMode="contain" tintColor={Colors.DARK_GREY} />
						</>
					</TouchableHighlight>
					<Picker isModalVisible={isModalVisible} toggleModal={toggleModal} setItem={setItem} />
				</View>
			</KeyboardAvoidingView>

			{showModal && <ActionPopUp showModal={showModal} hideModal={hideModal} logIn={false} />}
			{errorModal && <ErrorPopUp errorModal={errorModal} hideErrorModal={hideErrorModal} errorMsg={Constraints.PLEASE_FILL} />}
		</View>
	);
};

export default Footer;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		flexDirection: 'row',
		paddingVertical: 4,
		paddingHorizontal: 30,
		width: '90%',
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 50,
	},
	subContainer: {
		width: '78%',
		alignItems: 'center',
		flexDirection: 'row',
	},
	countryItemWrapper: {
		marginLeft: -7,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 5,
		borderRadius: 8,
	},
	countryFlag: {
		width: 30,
		height: 35,
		marginTop: 'auto',
		marginBottom: 'auto',
	},
	arrowDownIcon: {
		width: 10,
		height: 10,
	},
	chooseBtn: {
		padding: 5,
		borderRadius: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	chooseBtnText: {
		fontSize: 14,
		marginLeft: 6,
		fontFamily: Fonts.POPPINS,
		color: Colors.BLACK,
	},
	phoneNumberInput: {
		fontSize: 13,
		padding: 10,
		width: '100%',
		color: Colors.BLACK,
		fontFamily: Fonts.POPPINS,
	},
	loginBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '22%',
		padding: 5,
		borderRadius: 8,
	},
	loginTxt: {
		color: Colors.main,
		fontSize: 14,
		fontWeight: '600',
		fontFamily: Fonts.POPPINS,
	},
	loginIcon: {
		width: 15,
		height: 15,
	},
	containerFot: {
		backgroundColor: Colors.light,
		flexDirection: 'row',
		paddingVertical: 4,
		paddingHorizontal: 30,
		width: '90%',
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 50,
	},
});
