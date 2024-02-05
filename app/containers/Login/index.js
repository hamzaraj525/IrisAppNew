import {View, Text, StyleSheet, Platform, FlatList, Dimensions, KeyboardAvoidingView} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../common/Colors';
import Constraints from '../../common/Constraints';
import {useDispatch, useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const {height, width} = Dimensions.get('window');
const LoginContainer = props => {
	const dispatch = useDispatch();
	const insets = useSafeAreaInsets();
	const [showModal, setShowModal] = useState(false);

	return <Footer txt1={Constraints.LOGIN} />;
};

export default LoginContainer;

const styles = StyleSheet.create({
	container: {
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
});
