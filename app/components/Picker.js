import React, {useState, useEffect} from 'react';
import {View, Modal, Text, TouchableHighlight, ActivityIndicator, FlatList, TouchableOpacity, TextInput, SafeAreaView, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import Colors from '../common/Colors';
import Constraints from '../common/Constraints';
import Fonts from '../common/Fonts';
import {fetchCountryData} from '../Utils/Functions/GET';

const ListItemPicker = React.memo(({item, onPress}) => {
	let countryCode = item.idd.root; // Default to the root value

	// Check if the country is the United States and set the country code accordingly
	if (item.name === 'United States') {
		countryCode = '+1'; // Set the country code for the United States
	} else {
		// If it's not the United States, concatenate the suffixes if available
		if (item.idd.suffixes && item.idd.suffixes.length > 0) {
			countryCode += item.idd.suffixes.join('');
		}
	}

	return (
		<TouchableHighlight
			underlayColor={Colors.LIGHT_GREY}
			onPress={() => {
				onPress(item);
			}}
			style={styles.listItemContainer}>
			<>
				<FastImage
					source={{
						uri: item.flag,
						priority: FastImage.priority.normal,
					}}
					style={styles.flagIcon}
					resizeMode="contain"
				/>
				<Text style={styles.listItemText}>{item.name}</Text>
				<Text style={styles.listItemText}>({item.nativeName})</Text>
				<Text style={styles.listItemText}>{countryCode}</Text>
			</>
		</TouchableHighlight>
	);
});

const Picker = props => {
	const [countries, setCountries] = useState([]);
	const [filteredCountries, setFilteredCountries] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filterText, setFilterText] = useState('');

	useEffect(() => {
		// Fetch country data when the component mounts
		fetchCountryData(setLoading, setCountries, setFilteredCountries);
	}, []);

	useEffect(() => {
		// Filter the countries whenever filterText changes
		filterCountries(filterText);
	}, [filterText]);

	const filterCountries = text => {
		const filteredCountries = countries.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
		setFilteredCountries(filteredCountries); // Set the filtered countries state
	};

	return (
		<SafeAreaView style={styles.container}>
			<Modal transparent visible={props.isModalVisible} animationType="slide" onRequestClose={props.toggleModal}>
				<SafeAreaView style={styles.modalContainer}>
					{loading ? (
						<ActivityIndicator size="large" color={Colors.PRIMARY_COLOR} />
					) : (
						<>
							<TextInput style={styles.searchInput} placeholder={Constraints.SEARCH} onChangeText={text => setFilterText(text)} value={filterText} />

							<FlatList
								data={filteredCountries}
								keyExtractor={item => item.countryCode}
								renderItem={({item}) => (
									<ListItemPicker
										item={item}
										onPress={() => {
											props.setItem(item);
											props.toggleModal();
											setFilterText('');
										}}
									/>
								)}
							/>
						</>
					)}
					{Platform.OS === 'ios' ? (
						<TouchableOpacity style={styles.closeButton} onPress={props.toggleModal}>
							<Text style={styles.closeButtonText}>Close</Text>
						</TouchableOpacity>
					) : null}
				</SafeAreaView>
			</Modal>
		</SafeAreaView>
	);
};

export default Picker;

const styles = {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContainer: {
		flex: 1,
		backgroundColor: 'white',
	},
	searchInput: {
		padding: 10,
		borderRadius: 20,
		width: '90%',
		alignSelf: 'center',
		marginTop: '2%',
		marginBottom: '2%',
		borderWidth: 1,
		borderColor: 'gray',
		fontFamily: Fonts.POPPINS,
	},
	listItemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		flexWrap: 'wrap',
		paddingHorizontal: 20,
	},
	flagIcon: {
		width: 20,
		height: 20,
	},
	listItemText: {
		color: Colors.BLACK,
		fontSize: 15,
		marginLeft: '2%',
		fontWeight: '600',
		fontFamily: Fonts.POPPINS,
	},
	closeButton: {
		marginLeft: 15,
	},
	closeButtonText: {
		color: Colors.PRIMARY_BLUE,
	},
};
