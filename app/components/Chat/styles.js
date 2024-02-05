import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import Colors from '../../common/Colors';

const styles = StyleSheet.create({
	messageContainer: {
		marginBottom: 10,
		maxWidth: '70%',
		padding: 10,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		borderBottomRightRadius: 8,
		flexDirection: 'row', // Add flexDirection: 'row'
	},
	userMessage: {
		alignSelf: 'flex-end',
		backgroundColor: Colors.PRIMARY_WHITE,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		borderBottomLeftRadius: 8,
		borderBottomRightRadius: 0,
	},
	animatedView: {
		flex: 1,
	},
	hiddenView: {
		height: 0,
		width: 0,
		overflow: 'hidden',
	},
	botMessage: {
		alignSelf: 'flex-start',
		backgroundColor: '#dedede',
	},
	messageText: {fontSize: 13, lineHeight: 21, color: Colors.PRIMARY_WHITE},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
	},

	waitingMessageContainer: {
		backgroundColor: '#dedede',
		padding: 5,
		borderRadius: 5,
		marginTop: 5,
		marginLeft: '2%',
		maxWidth: '50%',
		alignSelf: 'flex-start',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 20,
	},
	waitingMessage: {
		color: Colors.BLACK,
	},
	rightArrow: {
		position: 'absolute',
		backgroundColor: '#0078fe',
		width: 20,
		height: 25,
		bottom: 0,
		borderBottomLeftRadius: 25,
		right: -10,
	},

	rightArrowOverlap: {
		position: 'absolute',
		backgroundColor: 'rgb(11, 203, 231)',
		width: 20,
		height: 35,
		bottom: -6,
		borderBottomLeftRadius: 18,
		right: -20,
	},

	leftArrow: {
		position: 'absolute',
		backgroundColor: '#dedede',
		width: 20,
		height: 25,
		bottom: 0,
		borderBottomRightRadius: 25,
		left: -10,
	},

	leftArrowOverlap: {
		position: 'absolute',
		backgroundColor: 'rgb(11, 203, 231)',
		width: 20,
		height: 35,
		bottom: -6,
		borderBottomRightRadius: 18,
		left: -20,
	},
	containerFot: {
		backgroundColor: Colors.PRIMARY_WHITE,
		flexDirection: 'row',
		paddingVertical: 4,
		paddingHorizontal: 30,
		width: '90%',
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 50,
	},
	input: {
		padding: 5,
		color: Colors.BLACK,
		flex: 1,
		fontFamily: Fonts.POPPINS,
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
	PlusIcon: {
		width: 17,
		height: 17,
	},
	loader: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
export default styles;
