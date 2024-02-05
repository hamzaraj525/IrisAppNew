import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './app/redux/store';
import Navigator from '@/navigator';

if (__DEV__) {
	const ignoreWarns = ['VirtualizedLists should never be nested inside plain ScrollViews'];

	const errorWarn = global.console.error;
	global.console.error = (...arg) => {
		for (const error of ignoreWarns) {
			if (arg[0].startsWith(error)) {
				return;
			}
		}
		errorWarn(...arg);
	};
}

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Navigator />
			</PersistGate>
		</Provider>
	);
}

export default App;
