import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

// Components
import {Colors, Constants} from '@/common';

function TabBarIcon({name, focused}) {
	if (name === 'Home') return <FontAwesome name="comments-o" size={24} color={focused ? Colors.white : Constants.HexToRgba(Colors.white, 0.4)} />;
	if (name === 'Settings') return <Feather name="settings" size={24} color={focused ? Colors.white : Constants.HexToRgba(Colors.white, 0.4)} />;
}

export default TabBarIcon;
