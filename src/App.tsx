import React, { useEffect } from 'react';
import {PermissionsAndroid, SafeAreaView, StyleSheet} from 'react-native';
import Sound from 'react-native-sound';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AppBody from './components/AppBody';

Sound.setCategory('Playback');

function App(): JSX.Element {
    useEffect(() => {
        askReadMediaAudioPermission();
    }, []);

    const askReadMediaAudioPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'This app needs to read your audio files',
                    message:
                      'This app needs access to your audio files ' +
                      'so you can open them and listen.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
    
            console.log('READ_EXTERNAL_STORAGE: ' + granted);
        } catch(error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Provider store={store}>
                <AppBody/>
            </Provider>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default App;
