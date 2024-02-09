import React, {useRef, useState} from 'react';
import {Modal, StatusBar, StyleSheet, View, Text, Pressable, TouchableHighlight, Dimensions, TextInput, Platform, KeyboardAvoidingView, Keyboard, ImageBackground, TouchableWithoutFeedback, SafeAreaView, TouchableOpacity} from 'react-native';
import {useAnimationState, MotiView} from 'moti';

import Colors from '../common/Colors';
import Images from '../common/Images';
import LottieView from 'lottie-react-native';
import Fonts from '../common/Fonts';
import {handleSend, takeImage, takeImagePermission} from '../Utils/Functions/Others';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Constants from '../common/Constants';
const {height, width} = Dimensions.get('window');

const SelectedImagePop = ({showFullImgModal, hideFullImgModal, setSelectedImg, SelectedImg, messageText, setMessageTxt, toggleChooseBtn, isFetching, setIsFetching, setMessages, phone, countryItem, setErrorModal}) => {
	const insets = useSafeAreaInsets();
	return (
		<Modal
			transparent={true}
			onRequestClose={() => {
				hideFullImgModal();
				toggleChooseBtn();
			}}
			visible={showFullImgModal}>
			<View
				style={{
					flex: 1,
					paddingTop: insets.top,
				}}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<KeyboardAvoidingView
						style={styles.container}
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
						keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0} // Adjust the offset as needed
					>
						<MotiView from={{translateX: width}} animate={{translateX: 0}} transition={{type: 'timing', duration: 500}} style={styles.earningView}>
							<ImageBackground source={{uri: SelectedImg.path}} style={styles.imageFull} resizeMode="contain">
								<Pressable
									style={styles.closeBtn}
									onPress={() => {
										hideFullImgModal();
										toggleChooseBtn();
									}}>
									<FastImage tintColor={Colors.white} source={Images.CLOSE} style={styles.iconn} resizeMode={FastImage.resizeMode.contain} />
								</Pressable>
								<View style={{alignSelf: 'center', width: '90%'}} className="flex-row items-start h-20 bg-transparent pt-1">
									<View className="bg-light rounded-3xl py-[14px] px-4 flex-row items-center flex-1">
										<TextInput multiline style={styles.input} placeholder={'Enter your message'} placeholderTextColor={Constants.HexToRgba(Colors.black, 0.4)} onChangeText={text => setMessageTxt(text)} value={messageText} />
									</View>

									<TouchableOpacity
										activeOpacity={0.8}
										disabled={!!isFetching}
										onPress={() => {
											handleSend(messageText, setMessages, setIsFetching, setMessageTxt, SelectedImg, setSelectedImg, setErrorModal);
											hideFullImgModal();
											toggleChooseBtn();
										}}
										style={{
											width: 50, // Adjust the width as needed
											height: 50, // Adjust the height as needed
											borderRadius: 25, // Assuming you want a rounded button
											backgroundColor: !!isFetching ? Colors.LIGHT_GREY : Colors.main, // Change colors accordingly
											alignItems: 'center',
											justifyContent: 'center',
											marginLeft: 6,
										}}>
										<Feather name="send" size={20} color={Colors.white} />
									</TouchableOpacity>
								</View>
							</ImageBackground>
						</MotiView>
					</KeyboardAvoidingView>
				</TouchableWithoutFeedback>
			</View>
		</Modal>
	);
};

const baseColor = 0; // Base color intensity
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: `rgb(${baseColor + 30}, ${baseColor + 30}, ${baseColor + 30})`,
	},
	earningView: {backgroundColor: Colors.white, flex: 1},
	buttonContainer: {
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	closeBtn: {
		left: 10,
		top: 10,
		width: 35,
		alignItems: 'center',
		justifyContent: 'center',
		height: 35,
		borderRadius: 35 / 2,
		backgroundColor: Colors.black, // Use a consistent background color
	},
	verifyButtonText: {
		color: Colors.BLACK,
		fontSize: 17,
		fontWeight: 'bold',
		fontFamily: Fonts.POPPINS,
	},
	imageFull: {
		// width: width,
		// height: height,

		justifyContent: 'space-between',
		flex: 1,
	},
	input: {
		padding: 5,
		color: Colors.BLACK,
		width: '90%',
		fontFamily: Fonts.POPPINS,
		alignSelf: 'center',
		backgroundColor: Colors.light,
		borderRadius: 20,
	},
	modalText: {
		fontSize: 14,
		fontWeight: '600',
		textAlign: 'center',
		color: Colors.BLACK,
		fontFamily: Fonts.POPPINS,
	},
	iconn: {
		width: 13,
		height: 13,
	},
	containerFot: {
		backgroundColor: Colors.PRIMARY_WHITE,
		flexDirection: 'row',
		bottom: Platform.OS === 'ios' ? 20 : 10, // Adjust the bottom padding as needed
		paddingVertical: 4,
		paddingHorizontal: 30,
		width: '90%',
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 50,
	},

	sendButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: 35,
		height: 35,
		borderRadius: 35 / 2,
	},
	sendIcon: {
		width: 20,
		height: 20,
	},
});

export default SelectedImagePop;
