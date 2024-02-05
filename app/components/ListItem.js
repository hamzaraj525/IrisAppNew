import LottieView from 'lottie-react-native';
import {MotiView} from 'moti';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Images from '../common/Images';
import Colors from '../common/Colors';
import ImageLoader from './ImageLoader';

const ListItem = ({item: message, index, isFetching, messages}) => {
	const isUserMessage = message.user._id === 'user';
	const direction = isUserMessage ? 'flex-end' : 'flex-start';
	// const imageUrlRegex = /(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
	// const imageUrl = message?.imgUrl?.match(imageUrlRegex)?.[0];
	const cleanUrl = message?.imgUrl;
	const imageUrl = cleanUrl?.replace(/['"\[\]]/g, '');

	// Now imageUrl should contain the extracted URL or be null if no match was found
	console.log('Image URL:' + imageUrl + '<--->' + typeof imageUrl);

	return (
		<>
			<MotiView style={{marginTop: 20}} from={{translateY: 0, opacity: 0}} animate={{translateY: -15, opacity: 1}} transition={{type: 'timing', duration: 400}}>
				<View
					style={{
						backgroundColor: isUserMessage ? Colors.main : Colors.light,
						padding: 10,
						marginTop: 5,
						marginLeft: isUserMessage ? null : '2%',
						marginRight: isUserMessage ? '2%' : null,
						maxWidth: '70%',
						borderRadius: 20,
						marginBottom: 5,
						alignSelf: direction,
					}}>
					{message.imgUrl ? <ImageLoader message={message} imageUrl={imageUrl} /> : null}

					{message.text === null && message.user._id === 'bot' ? null : (
						<Text
							style={[
								styles.messageText,
								{
									maxWidth: '100%',
									fontFamily: Fonts.POPPINS,
									color: isUserMessage ? Colors.PRIMARY_WHITE : Colors.BLACK,
								},
							]}>
							{message.text}
						</Text>
					)}

					<View style={isUserMessage ? styles.rightArrow : styles.leftArrow}></View>
					<View style={isUserMessage ? styles.rightArrowOverlap : styles.leftArrowOverlap}></View>
				</View>
			</MotiView>

			{isFetching && index === messages.length - 1 && (
				<View
					key={`fetching_${index}`}
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						marginBottom: 5,
					}}>
					<View style={styles.waitingMessageContainer}>
						<LottieView
							style={{
								width: 60,
								height: 40,
							}}
							source={Images.DOTS}
							autoPlay
							loop
						/>
						<View style={[styles.leftArrow, {backgroundColor: Colors.main}]}></View>
						<View style={styles.leftArrowOverlap}></View>
					</View>
				</View>
			)}
		</>
	);
};

export default ListItem;

const styles = StyleSheet.create({
	leftArrowOverlap: {
		position: 'absolute',
		backgroundColor: Colors.light,
		width: 20,
		height: 35,
		bottom: -6,
		borderBottomRightRadius: 18,
		left: -20,
	},
	leftArrow: {
		position: 'absolute',
		backgroundColor: Colors.light,
		width: 20,
		height: 25,
		bottom: 0,
		borderBottomRightRadius: 25,
		left: -10,
	},
	waitingMessageContainer: {
		backgroundColor: Colors.main,
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
	messageText: {fontSize: 13, lineHeight: 21, color: Colors.PRIMARY_WHITE},
	rightArrow: {
		position: 'absolute',
		backgroundColor: Colors.main,
		width: 20,
		height: 25,
		bottom: 0,
		borderBottomLeftRadius: 25,
		right: -10,
	},

	rightArrowOverlap: {
		position: 'absolute',
		backgroundColor: Colors.light,
		width: 20,
		height: 35,
		bottom: -6,
		borderBottomLeftRadius: 18,
		right: -20,
	},
	messageContainer: {
		marginBottom: 10,
		maxWidth: '70%',
		padding: 10,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		borderBottomRightRadius: 8,
		flexDirection: 'row', // Add flexDirection: 'row'
	},
});
