// AnimLoader.js
import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import SyncLoader from "react-spinners/SyncLoader";
import MainBack from './code_asthram_logo.gif';
import { subscribeUserToPush } from '../scripts/PushNotification.js'; // Update the path according to your project structure

function AnimLoader() {
    const [loading, setLoading] = useState(true);
    const [showPushPrompt, setShowPushPrompt] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            setShowPushPrompt(true);
        }, 2200);
    }, []);

    const handleSubscribe = () => {
        subscribeUserToPush();
        setShowPushPrompt(false);
    };

    return (
        <View style={{ flex: 1 }}>
            {loading ? (
                <View style={styles.loader}>
                    <Image source={MainBack} style={{ height: "100%", width: "100%" }} resizeMode="cover" />
                </View>
            ) : (
                <View style={{ flex: 1 }}>
                    {/* Render your App component here */}
                    {showPushPrompt && (
                        <View style={styles.pushPrompt}>
                            <Text>Would you like to subscribe to notifications?</Text>
                            <Button title="Yes" onPress={handleSubscribe} />
                            <Button title="No" onPress={() => setShowPushPrompt(false)} />
                        </View>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1F2224',
    },
    pushPrompt: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'white',
        padding: 20,
        zIndex: 1000,
    },
});

export default AnimLoader;
