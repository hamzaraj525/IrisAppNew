import React, {useRef} from 'react';
import {Modal, StatusBar, StyleSheet, View, Text, Pressable, Dimensions} from 'react-native';
import {useAnimationState, MotiView} from 'moti';
import Constraints from '../common/Constraints';
import Colors from '../common/Colors';
import Images from '../common/Images';
import LottieView from 'lottie-react-native';
import Fonts from '../common/Fonts';

const ActionPopUp = ({showModal, hideModal, actionBtn, title, desc, btnTxt, logIn}) => {
	const {height, width} = Dimensions.get('window');

	return (
		<Modal transparent={true} onRequestClose={hideModal} visible={showModal}>
			<Pressable onPress={logIn ? hideModal : null} style={styles.container}>
				<MotiView
					from={{scale: 0}} // Initial scale
					animate={{scale: 1}}
					transition={{type: 'timing', duration: 700}}
					style={[
						styles.earningView,
						{
							// backgroundColor: logIn ? Colors.PRIMARY_WHITE : null,
							paddingVertical: logIn ? 40 : 10,
							width: logIn ? '80%' : '75%',
						},
					]}>
					{/* <VerifyIcon /> */}
					{!logIn ? <Text style={[styles.modalText, {marginBottom: 13, fontSize: 18}]}>{Constraints.WAIT}</Text> : null}
					<>
						{!logIn ? (
							<MotiView
								style={{
									height: 20,
									width: '80%',
									borderRadius: 20 / 2,
									marginBottom: 5,
								}}
								from={{backgroundColor: '#dedede'}} // Initial scale
								animate={{backgroundColor: Colors.main}}
								transition={{
									type: 'timing',
									duration: 800,
									loop: true,
								}}
							/>
						) : null}
					</>
					{logIn ? (
						<LottieView
							style={{
								width: logIn ? 100 : width / 1,
								height: logIn ? 100 : height / 5,
							}}
							source={logIn ? Images.LOGOUT2 : Images.Success}
							autoPlay
							loop
						/>
					) : null}

					<>{logIn ? <Text style={[styles.modalText, {marginBottom: 13, fontSize: 18}]}>{Constraints.ASK_MSG}</Text> : null}</>
					<>
						{logIn ? (
							<>
								<View
									style={{
										width: '90%',
										height: 1.4,
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'space-evenly',
										backgroundColor: 'grey',
										marginBottom: 10,
									}}
								/>

								<View
									style={{
										width: '100%',
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'space-evenly',
									}}>
									<Pressable style={styles.verifyButton} onPress={hideModal}>
										<Text style={styles.verifyButtonText}>{Constraints.CANCEL}</Text>
									</Pressable>
									<Pressable style={styles.verifyButton} onPress={actionBtn}>
										<Text style={styles.verifyButtonText}>{Constraints.YES}</Text>
									</Pressable>
								</View>
							</>
						) : null}
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
	},
	verifyButtonText: {
		color: Colors.white,
		fontSize: 16,
		fontWeight: '500',
		fontFamily: Fonts.POPPINS,
	},
});

export default ActionPopUp;
