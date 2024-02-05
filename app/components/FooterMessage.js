import React, {useState} from 'react';
import {View, TextInput, TouchableHighlight, StyleSheet} from 'react-native';
import Colors from '../common/Colors';
import FastImage from 'react-native-fast-image';
import Images from '../common/Images';
import Constraints from '../common/Constraints';
import Fonts from '../common/Fonts';

const FooterMessage = props => {
	return (
		<View style={[styles.container, props.style]}>
			<TextInput style={styles.input} placeholder={Constraints.ENTER_YOUR_MESSAGE} placeholderTextColor={Colors.BLACK} onChangeText={text => props.setMessageTxt(text)} value={props.messageTxt} />

			<TouchableHighlight
				disabled={!!props.isFetching}
				underlayColor={Colors.HIGHLIGHT_COLOR}
				onPress={() => {
					props.handleSend();
				}}
				style={styles.sendButton}>
				<FastImage source={Images.PLANE} style={styles.sendIcon} resizeMode="contain" tintColor={!!props.isFetching ? Colors.LIGHT_GREY : Colors.PRIMARY_BLUE} />
			</TouchableHighlight>
		</View>
	);
};

export default FooterMessage;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.PRIMARY_WHITE,
		flexDirection: 'row',
		paddingVertical: 4,
		paddingHorizontal: 30,
		width: '90%',
		marginBottom: 10,
		position: 'absolute',
		bottom: 0,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 50,
	},
	input: {
		padding: 10,
		color: Colors.BLACK,
		width: '80%',
		fontFamily: Fonts.POPPINS,
	},
	sendButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: 40,
		height: 40,
		borderRadius: 40 / 2,
	},
	sendIcon: {
		width: 20,
		height: 20,
	},
});
