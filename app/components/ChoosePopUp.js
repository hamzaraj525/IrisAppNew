import React, {useRef, useState} from 'react';
import {Modal, StatusBar, StyleSheet, View, Text, Pressable, Dimensions} from 'react-native';
import {useAnimationState, MotiView} from 'moti';
import Constraints from '../common/Constraints';
import Colors from '../common/Colors';
import Images from '../common/Images';
import LottieView from 'lottie-react-native';
import Fonts from '../common/Fonts';
import {takeImage, takeImagePermission} from '../Utils/Functions/Others';
import FastImage from 'react-native-fast-image';
const {height, width} = Dimensions.get('window');

const ChoosePopUp = ({showModal, hideModal, setSelectedImg, setShowFullImgModal, toggleChoose}) => {
	return (
		<Modal transparent={true} onRequestClose={hideModal} visible={showModal}>
			<Pressable
				onPress={() => {
					hideModal();
					toggleChoose();
				}}
				style={styles.container}>
				<MotiView from={{translateY: height}} animate={{translateY: 0}} transition={{type: 'timing', duration: 500}}>
					<Pressable style={styles.earningView} onPress={() => {}}>
						<Text style={[styles.modalText, {fontSize: 18}]}>{Constraints.PLEASE_CHOOSE_PIC}</Text>
						<Pressable
							style={styles.verifyButton}
							onPress={() => {
								takeImagePermission('Cam', setSelectedImg, hideModal, setShowFullImgModal);
							}}>
							<FastImage source={Images.CAMERA} style={styles.icon} resizeMode="contain" />
							<Text style={styles.verifyButtonText}>{Constraints.CAM}</Text>
						</Pressable>
						<Pressable
							style={styles.verifyButton}
							onPress={() => {
								takeImagePermission('Photo', setSelectedImg, hideModal, setShowFullImgModal);
							}}>
							<FastImage source={Images.GALLERY} style={styles.icon} resizeMode="contain" />
							<Text style={styles.verifyButtonText}>{Constraints.GALLERY}</Text>
						</Pressable>
					</Pressable>
				</MotiView>
			</Pressable>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#000000B2',
	},
	earningView: {
		borderRadius: 20,
		backgroundColor: Colors.PRIMARY_WHITE,
		width: '80%',
		height: 230,
		paddingVertical: 20,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	buttonContainer: {
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	verifyButton: {
		width: '70%',
		alignItems: 'center',
		flexDirection: 'row',
		height: 50,
		borderRadius: 25,
		backgroundColor: Colors.HIGHLIGHT_COLOR, // Use a consistent background color
	},
	verifyButtonText: {
		color: Colors.BLACK,
		fontSize: 18,
		fontWeight: '600',
		fontFamily: Fonts.POPPINS,
	},
	icon: {
		width: 25,
		height: 25,
		marginLeft: 20,
		marginRight: 10, // Add some margin around the icon
	},
	modalText: {
		fontSize: 14,
		fontWeight: '600',
		textAlign: 'center',
		color: Colors.BLACK,
		fontFamily: Fonts.POPPINS,
	},
});

export default ChoosePopUp;
