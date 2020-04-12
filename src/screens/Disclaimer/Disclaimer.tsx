import React from 'react'
import { Text } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DisclaimerText from './DisclaimerText';

const Disclaimer = () => {
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        title: {
            fontSize: 18,
            fontWeight: "bold",
            textDecorationLine: "underline"
        }
    });
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Disclaimer</Text>
                {DisclaimerText}
            <Text>
                
            </Text>
        </SafeAreaView>
    )
}

export default Disclaimer
