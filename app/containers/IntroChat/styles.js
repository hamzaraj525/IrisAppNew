import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../common/Colors';
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.light,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	backgroundImage: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'space-between',
	},
	content: {
		flex: 1,
		justifyContent: 'flex-end',
	},
});
export default styles;
