import React, {useRef, useEffect, useState} from 'react';
import {Modal, StatusBar, StyleSheet, View, Text, Pressable, Dimensions} from 'react-native';
import {useAnimationState, MotiView} from 'moti';
import Constraints from '../common/Constraints';
import Colors from '../common/Colors';
import Images from '../common/Images';
import LottieView from 'lottie-react-native';
import Fonts from '../common/Fonts';
import FastImage from 'react-native-fast-image';

const ErrorPopUp = ({errorModal, hideErrorModal, errorMsg}) => {
	const {height, width} = Dimensions.get('window');
	const [shouldShowLottie, setShouldShowLottie] = useState(false);

	return (
		<Modal transparent={true} onRequestClose={hideErrorModal} visible={errorModal}>
			<Pressable onPress={hideErrorModal} style={styles.container}>
				<MotiView
					from={{scale: 0}} // Initial scale
					animate={{scale: 1}}
					transition={{type: 'timing', duration: 500}}
					style={[
						styles.earningView,
						{
							paddingVertical: 10,
							width: '75%',
						},
					]}>
					<>
						<MotiView
							from={{scale: 0}} // Initial scale
							animate={{scale: 1}}
							transition={{type: 'spring', duration: 400, delay: 450}}
							style={{}}>
							<FastImage source={Images.ERROR_} style={styles.iconn} resizeMode={FastImage.resizeMode.contain} />
						</MotiView>

						<Text style={[styles.modalText, {marginBottom: 13, fontSize: 18}]}>{errorMsg}</Text>

						<Pressable style={styles.verifyButton} onPress={hideErrorModal}>
							<Text style={styles.verifyButtonText}>{Constraints.OK}</Text>
						</Pressable>
					</>
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
		paddingVertical: 40,
		alignSelf: 'center',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalText: {
		fontSize: 14,
		fontWeight: '600',
		textAlign: 'center',
		color: Colors.BLACK,
		marginBottom: 20,
		fontFamily: Fonts.POPPINS,
	},
	verifyButton: {
		width: '40%',
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.main,
		marginBottom: 3,
	},
	verifyButtonText: {
		color: Colors.white,
		fontSize: 16,
		fontWeight: '500',
		fontFamily: Fonts.POPPINS,
	},
	iconn: {width: 60, marginBottom: 20, marginTop: 10, height: 60},
});

export default ErrorPopUp;
