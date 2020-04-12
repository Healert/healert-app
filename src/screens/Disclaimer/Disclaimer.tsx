import React from 'react'
import { Text } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DisclaimerText from './DisclaimerText';

const Disclaimer = () => {
    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            padding: 15
        },
        title: {
            fontSize: 18,
            fontWeight: "500",
            textAlign: "center"
        }
    });
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {DisclaimerText}
            </Text>
        </View>
    )
}

export default Disclaimer
