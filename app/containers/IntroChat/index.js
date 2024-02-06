import React, {useState} from 'react';
import {SafeAreaView, View, Dimensions, Text, Pressable, TouchableOpacity} from 'react-native';
import Header from '../../components/Header';
import styles from './styles';
import Constraints from '../../common/Constraints';
import Colors from '../../common/Colors';
import Footer from '../../components/Footer';
import {useDispatch, useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Chat from '../../components/Chat';
const {height, width} = Dimensions.get('window');

const IntroChatContainer = ({navigation}) => {
	const dispatch = useDispatch();
	const insets = useSafeAreaInsets();

	return (
		<>
			<Header iconLogo={false} style={{paddingTop: insets.top + 16, width: width}} loginScreen={true} txt1={Constraints.WELCOME} txtStyle1={{color: Colors.white, fontWeight: '700'}} txtStyle2={{marginLeft: '3%', color: Colors.main}} />
			<View style={styles.container}>
				<Text
					style={{
						textAlign: 'center',
						color: Colors.black,
						fontSize: 19,
						fontWeight: '700',
						fontFamily: Fonts.POPPINS,
					}}>
					{Constraints.HOW_WORK}
				</Text>
				<Text style={{marginTop: 5, textAlign: 'center', width: '95%', color: Colors.PRIMARY_BLUE, fontSize: 12, fontWeight: '500', fontFamily: Fonts.POPPINS}}>{Constraints.SUBTITLE_AI}</Text>

				<TouchableOpacity activeOpacity={0.8} style={{marginTop: '10%', borderRadius: 20, width: '65%', backgroundColor: Colors.main, height: 50, alignItems: 'center', justifyContent: 'center'}} onPress={() => navigation.navigate('HomeChat')}>
					<Text style={{color: Colors.white, fontSize: 15, margin: 'auto', fontWeight: '700', fontFamily: Fonts.POPPINS}}>Start Chatting with Iris</Text>
				</TouchableOpacity>
			</View>
		</>
	);
};

export default IntroChatContainer;
