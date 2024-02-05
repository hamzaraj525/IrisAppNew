import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StatusBar, Image} from 'react-native';
import Colors from '../../common/Colors';
import Constraints from '../../common/Constraints';
import Images from '../../common/Images';
import styles from './styles';

const Splash = ({navigation}) => {
	const [titleText, setTitleText] = useState('');
	const [subtitleText, setSubtitleText] = useState('');
	const title = Constraints.title;
	const subtitle = Constraints.subTitle;

	useEffect(() => {
		animateText(title, setTitleText, 100); // Left-to-right animation for the title
		setTimeout(() => {
			animateText(subtitle, setSubtitleText, 50); // Left-to-right animation for the subtitle
		}, title.length * 50 + 1000); // Adjust the delay as needed
	}, []);

	const animateText = (text, setText, delay) => {
		for (let i = 0; i <= text.length; i++) {
			setTimeout(() => {
				setText(text.substring(0, i));
			}, i * delay);
		}
	};

	useEffect(() => {
		// Navigate to 'Home' after the animations complete
		setTimeout(() => {
			navigation.replace('Root');
		}, (title.length + subtitle.length) * 50 + 2100); // Adjust the delay as needed
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="light-content" backgroundColor={Colors.PRIMARY_BACKGROUND} />
			{/* <View style={styles.logoContainer}>
        <Image source={Images.LOGO} style={styles.logo} />
      </View> */}
			<View style={styles.container}>
				<Text style={styles.title}>{titleText}</Text>
				<Text style={styles.subtitle}>{subtitleText}</Text>
			</View>
		</SafeAreaView>
	);
};

export default Splash;
