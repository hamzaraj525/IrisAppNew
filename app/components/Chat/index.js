import React, {useState, useEffect} from 'react';
import {View, TextInput, TouchableHighlight, Text, KeyboardAvoidingView, Platform, FlatList, Dimensions, SafeAreaView, Pressable, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../common/Colors';
import {BlurView} from '@react-native-community/blur';
import Images from '../../common/Images';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import {View as MotiView} from 'moti';
import {handleSend, takeImage, takeImagePermission} from '../../Utils/Functions/Others';
import ChoosePopUp from '../ChoosePopUp';
import SelectedImagePop from '../SelectedImagePop';
import ErrorPopUp from '../ErrorPopUp';
import ImageLoader from '../ImageLoader';
import ListItem from '../ListItem';
import Constraints from '../../common/Constraints';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Constant from '../../common/Constants';
import Animated, {useSharedValue, useAnimatedStyle, withTiming} from 'react-native-reanimated';
const {height, width} = Dimensions.get('window');
import {Button} from '@/components';
import Constants from '../../common/Constants';

const Chat = () => {
	const insets = useSafeAreaInsets();
	const [messages, setMessages] = useState([]);
	const [messageTxt, setMessageTxt] = useState('');
	const [opened, setOpen] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const [errorModal, setErrorModal] = useState(false);
	const [showChooseModal, setChooseModal] = useState(false);
	const [showFullImgModal, setShowFullImgModal] = useState(false);
	const [SelectedImg, setSelectedImg] = useState(null);
	const [rotateAngle, setRotateAngle] = useState('0deg');
	const {phone, countryItem} = useSelector(reducer => reducer.app);

	const hideChooseModal = () => {
		setChooseModal(false);
	};

	const hideFullImgModal = () => {
		setShowFullImgModal(false);
	};

	const hideErrorModal = () => {
		setErrorModal(false);
	};

	const toggleChoose = () => {
		setRotateAngle(rotateAngle === '0deg' ? '45deg' : '0deg');
		if (showChooseModal === true) {
			setTimeout(() => {
				setChooseModal(false);
			}, 200);
		} else {
			setTimeout(() => {
				setChooseModal(true);
			}, 200);
		}
	};

	const toggleChooseBtn = () => {
		setRotateAngle(rotateAngle === '0deg' ? '45deg' : '0deg');
	};

	const opacity = useSharedValue(0);
	const transform = useSharedValue(30);

	const animation = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
			transform: [{translateY: transform.value}],
		};
	});

	useEffect(() => {
		if (opened) {
			opacity.value = withTiming(1);
			transform.value = withTiming(0);
		} else {
			opacity.value = 0;
			transform.value = 30;
		}
	}, [opened]);

	const hideDropPop = () => setOpen(false);

	// function Dropup() {
	// 	return (
	// 		<Animated.View className="absolute bottom-7 right-24 w-40 z-20" style={[animation, {zIndex: opened ? 20 : -1}]}>
	// 			<View className="bg-white rounded-3xl py-3">
	// 				<Button onPress={() => takeImagePermission('Cam', setSelectedImg, hideDropPop, setShowFullImgModal)} className="px-6 py-3">
	// 					<Text className="font-rubik font-light text-sm text-black">Camera</Text>
	// 				</Button>

	// 				<Button onPress={() => takeImagePermission('Photo', setSelectedImg, hideDropPop, setShowFullImgModal)} className="px-6 py-3">
	// 					<Text className="font-rubik font-light text-sm text-black">Photo</Text>
	// 				</Button>
	// 			</View>

	// 			<Button className="p-4 ml-auto" onPress={() => hideDropPop()}>
	// 				<AntDesign name="close" size={20} color={Colors.white} />
	// 			</Button>
	// 		</Animated.View>
	// 	);
	// }

	return (
		<>
			{opened && (
				<Pressable
					onPress={() => {
						setOpen(false);
					}}
					style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flex: 1, zIndex: 10}}>
					<BlurView style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flex: 1, zIndex: 10}} blurType="dark" blurAmount={8} reducedTransparencyFallbackColor="black" />
				</Pressable>
			)}
			<FlatList
				data={messages}
				keyExtractor={(item, index) => index.toString()}
				contentContainerStyle={{paddingBottom: 100}}
				style={{
					flex: 1,
					padding: 10,
				}}
				renderItem={({item, index}) => {
					return <ListItem item={item} index={index} isFetching={isFetching} messages={messages} />;
				}}
			/>

			<KeyboardAvoidingView keyboardVerticalOffset={10} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<View style={{alignItems: 'center', alignSelf: 'center', width: '90%'}} className="flex-row items-start h-20 bg-white pt-1">
					<TouchableOpacity style={{backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', width: 30, height: 30}} disabled={!!isFetching} activeOpacity={0.6} onPress={() => takeImagePermission('Cam', setSelectedImg, hideDropPop, setShowFullImgModal)}>
						<FontAwesome name="camera" size={22} color={Colors.main} />
					</TouchableOpacity>

					<TouchableOpacity
						style={{marginLeft: 10, marginRight: 11, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', width: 30, height: 30}}
						disabled={!!isFetching}
						activeOpacity={0.6}
						onPress={() => takeImagePermission('Photo', setSelectedImg, hideDropPop, setShowFullImgModal)}>
						<FontAwesome name="picture-o" size={22} color={Colors.main} />
					</TouchableOpacity>
					<View className="bg-light rounded-3xl py-[14px] px-4 flex-row items-center flex-1">
						<TextInput multiline style={styles.input} placeholder={'Enter your message'} placeholderTextColor={Constants.HexToRgba(Colors.black, 0.4)} onChangeText={text => setMessageTxt(text)} value={messageTxt} />
					</View>

					<TouchableOpacity
						activeOpacity={0.8}
						disabled={!!isFetching || messageTxt.length <= 0}
						onPress={() => {
							handleSend(messageTxt, setMessages, setIsFetching, setMessageTxt, SelectedImg, setSelectedImg, setErrorModal);
						}}
						style={{
							width: 50, // Adjust the width as needed
							height: 50, // Adjust the height as needed
							borderRadius: 25, // Assuming you want a rounded button
							backgroundColor: Colors.main, // Change colors accordingly
							alignItems: 'center',
							justifyContent: 'center',
							marginLeft: 6,
						}}>
						<Feather name="send" size={20} color={Colors.white} />
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>

			{showFullImgModal && (
				<SelectedImagePop
					showFullImgModal={showFullImgModal}
					hideFullImgModal={hideFullImgModal}
					setSelectedImg={setSelectedImg}
					SelectedImg={SelectedImg}
					messageText={messageTxt}
					setMessageTxt={setMessageTxt}
					toggleChooseBtn={toggleChooseBtn}
					isFetching={isFetching}
					setIsFetching={setIsFetching}
					setMessages={setMessages}
					phone={phone}
					countryItem={countryItem}
					setErrorModal={setErrorModal}
				/>
			)}
			{errorModal && <ErrorPopUp errorModal={errorModal} hideErrorModal={hideErrorModal} errorMsg={Constraints.SOMETHING} />}
			{/* <Dropup /> */}
		</>
	);
};

export default Chat;
