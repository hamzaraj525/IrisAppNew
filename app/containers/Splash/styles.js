import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../Constraints/Colors';
import Fonts from '../../Constraints/Fonts';
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(11, 203, 231)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    alignSelf: 'center',
    fontWeight: '600',
    fontFamily: Fonts.POPPINS_BOLD,
    color: Colors.PRIMARY_WHITE,
  },
  subtitle: {
    fontSize: 17,
    marginTop: 10,
    fontFamily: Fonts.POPPINS,
    color: Colors.PRIMARY_WHITE,
    alignSelf: 'flex-end',
  },
});
export default styles;
