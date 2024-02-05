import React, {useState} from 'react';
import {SafeAreaView, View, Dimensions} from 'react-native';
import Header from '../../components/Header';
import styles from './styles';
import Constraints from './../../common/Constraints';
import Colors from '../../common/Colors';
import Footer from '../../components/Footer';
import {useDispatch, useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Chat from '../../components/Chat';
const {height, width} = Dimensions.get('window');

const HomeContainer = ({navigation}) => {
	const dispatch = useDispatch();
	const insets = useSafeAreaInsets();

	return (
		<View style={styles.container}>
			<Header iconLogo={true} style={{paddingTop: insets.top + 16, width: width}} loginScreen={false} txt1={Constraints.IRIS} txtStyle1={{color: Colors.white, fontWeight: '700'}} txtStyle2={{marginLeft: '3%', color: Colors.white}} />
			<Chat />
		</View>
	);
};

export default HomeContainer;
