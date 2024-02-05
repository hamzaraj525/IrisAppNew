import {Keyboard, Platform, NativeModules, Dimensions} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Constraints from './../../common/Constraints';
import {apiChat} from './POST';
import {request, PERMISSIONS} from 'react-native-permissions';
import ImageCropPicker from 'react-native-image-crop-picker';
import AWS from 'aws-sdk';
import axios from 'axios';
import BASEURL from './BaseURL';
import {ACCESS_KEY_ID, SECRET_ACCESS_KEY_ID} from '../Keys';

AWS.config.update({
	region: 'us-east-1',
	accessKeyId: ACCESS_KEY_ID,
	secretAccessKey: SECRET_ACCESS_KEY_ID,
});

const s3 = new AWS.S3();

const addMessage = (messages, newMessage) => [...messages, newMessage];

export const handleSend = async (messageTxt, setMessages, setIsFetching, setMessageTxt, SelectedImg, setSelectedImg, setErrorModal) => {
	try {
		const urll = 'https://i.stack.imgur.com/S3kLD.jpg';
		if (messageTxt && !SelectedImg) {
			const userMessage = {
				...baseUserMessage,
				text: messageTxt,
				imgUrl: null,
			};
			setMessages(previousMessages => addMessage(previousMessages, userMessage));

			Keyboard.dismiss();
			setMessageTxt('');
			setIsFetching(true);

			const response = await apiChat(messageTxt, null);
			console.log(JSON.stringify(response.data, null, 2));
			if (response?.data?.body || response?.data?.image_url) {
				const botMessage = {
					...baseBotMessage,
					text: response.data.body,
					imgUrl: response.data.image_url,
				};
				setMessages(previousMessages => addMessage(previousMessages, botMessage));
			} else {
				handleApiError(setMessages);
			}
		} else {
			const imageAwsUri = await uploadImageToServer(SelectedImg);
			// console.log('other----' + imageAwsUri);
			if (!imageAwsUri) {
				handleImageUploadError(setErrorModal);
				return;
			}

			const userMessage = {
				...baseUserMessage,
				text: messageTxt,
				imgUrl: imageAwsUri,
			};
			setMessages(previousMessages => addMessage(previousMessages, userMessage));

			Keyboard.dismiss();
			setMessageTxt('');
			setIsFetching(true);
			const response = await apiChat(null, imageAwsUri);
			setIsFetching(false);
			setSelectedImg(null);
			console.log(JSON.stringify(response.data, null, 2));
			if (response?.data?.body || response?.data?.image_url) {
				const botMessage = {
					...baseBotMessage,
					text: response.data.body,
					imgUrl: response.data.image_url,
				};
				setMessages(previousMessages => addMessage(previousMessages, botMessage));
			} else {
				handleApiError(setMessages);
			}
		}
	} catch (error) {
		handleNetworkError(setMessages);
		setMessageTxt('');
		setSelectedImg(null);
	} finally {
		setIsFetching(false);
		setMessageTxt('');
		setSelectedImg(null);
	}
};

export const takeImagePermission = async (camParam, setSelectedImg, hideModal, setShowFullImgModal) => {
	try {
		const cameraPermission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA;

		const photoLibraryPermission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE : PERMISSIONS.IOS.PHOTO_LIBRARY;

		const [cameraResult, photoLibraryResult] = await Promise.all([request(cameraPermission), request(photoLibraryPermission)]);

		if (cameraResult === 'granted' || photoLibraryResult === 'granted') {
			takeImage(camParam, setSelectedImg, hideModal, setShowFullImgModal);
		} else {
			// console.log('Camera permission denied');
		}
	} catch (error) {
		console.error('Error requesting camera permission:', error);
	}
};

export const takeImage = (camParam, setSelectedImg, hideModal, setShowFullImgModal) => {
	if (camParam === 'Cam') {
		ImageCropPicker.openCamera({
			mediaType: 'photo',
			width: 300,
			height: 300,
			compressImageQuality: 0.7,
		})
			.then(img => {
				const imageUri = Platform.OS === 'ios' ? img.path : img.path;
				setSelectedImg(img);
				hideModal();
				setShowFullImgModal(true);
			})
			.catch(error => {
				// console.log(error);
			});
	} else {
		ImagePicker.openPicker({
			mediaType: 'photo',
			width: 300,
			height: 300,
			cropping: true,
			compressImageQuality: 0.7,
		})
			.then(img => {
				const imageUri = Platform.OS === 'ios' ? img.path : img.path;
				setSelectedImg(img);
				console.log('pickrer--->' + JSON.stringify(img, null, 2));
				hideModal();
				setShowFullImgModal(true);
			})
			.catch(error => {
				// console.log(error);
			});
	}
};

const uploadImageToServer = async imagePath => {
	try {
		const fileUuid = generateUUID();
		const timestamp = Math.floor(Date.now() / 1000);
		const objectName = `${timestamp}_${fileUuid}.${imagePath.path.split('.').pop()}`;

		// console.log('Image path:', imagePath.path);

		const filePath = Platform.OS === 'ios' ? imagePath.path.replace('file://', '') : imagePath.path;

		const key = `image/${imagePath.path.split('.').pop()}`;
		const bucketName = 'irisai-generatedimages';

		const uploadResult = await uploadImageToS3(filePath, bucketName, objectName, key);
		return uploadResult;
	} catch (e) {
		console.error(`Exception when saving image to S3: ${e}`);
		return null;
	}
};

const uploadImageToS3 = async (filePath, bucketName, objectName, key) => {
	try {
		const params = {
			Bucket: bucketName,
			Key: objectName,
			Body: filePath,
			ContentType: key,
			ContentDisposition: 'inline',
		};

		const uploadResult = await s3.upload(params).promise();

		console.log('File uploaded successfully:', JSON.stringify(uploadResult.Location, null, 2));
		return uploadResult.Location;
	} catch (error) {
		console.error('Error uploading file to S3:', error);
		throw error;
	}
};

function generateUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

const baseUserMessage = {
	_id: Math.random().toString(),
	user: {_id: 'user'},
};

const baseBotMessage = {
	_id: Math.random().toString(),
	user: {_id: 'bot'},
};

const handleApiError = setMessages => {
	const errorMessage = {
		...baseBotMessage,
		text: Constraints.ERROR_MESSAGE,
		imgUrl: null,
	};
	setMessages(previousMessages => addMessage(previousMessages, errorMessage));
};

const handleNetworkError = setMessages => {
	const errorMessage = {
		...baseBotMessage,
		text: Constraints.ERROR_NETWORK,
		imgUrl: null,
	};
	setMessages(previousMessages => addMessage(previousMessages, errorMessage));
};

const handleImageUploadError = setErrorModal => {
	setErrorModal(true);
};
