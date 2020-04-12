import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: SCREEN_WIDTH - 10,
      height: SCREEN_HEIGHT / 1.5,
    },
    text: {
      color: 'black',
      textAlign: 'center',
    },
    title: {
      fontSize: 22,
      color: 'black',
      textAlign: 'center',
    },
    buttonCircle: {
        backgroundColor: 'rgba(255, 255, 255, .2)',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#799eb2',
        padding: 8
      }
  });


const slides = [
  {
    key: "1",
    title: 'Screen Yourself',
    text: 'Easily screen yourself at home with easy to fill in forms',
    backgroundColor: '#dddddf',
    image: require('../../../assets/img/screen.png')
  },
  {
    key: "2",
    title: 'Get Alerts',
    text: 'Determine if the place you want to go is high risk',
    backgroundColor: '#799eb2',
    image: require('../../../assets/img/alert.png')
  },
  {
    key: "3",
    title: 'Contact Tracing',
    text: 'Easily determine if you\'re at risk of infection',
    backgroundColor: '#dfdfdf',
    image: require('../../../assets/img/trace.png')
  }
];
 
const IntroSlider = ({_onDone}) => {

  const _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
         <Text style={{fontSize: 18}}>Start</Text>
      </View>
    );
  };

  const _renderItem = ({ item }) => {
    return (
      <View style={{...styles.slide, backgroundColor: item.backgroundColor}}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }
 
  return <AppIntroSlider renderItem={_renderItem} data={slides} onDone={_onDone} renderDoneButton={_renderDoneButton}/>
}

export default IntroSlider;