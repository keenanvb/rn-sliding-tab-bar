import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window')

const App = () => {

  const [active, setActive] = useState(0)
  const [xTabOne, setXTabOne] = useState(0)
  const [xTabTwo, setXTabTwo] = useState(0)
  // const [translateX] = useState(new Animated.Value(0))[0]
  const translateX = useRef(new Animated.Value(0)).current;
  const translateXTabOne = useRef(new Animated.Value(0)).current;
  const translateXTabTwo = useRef(new Animated.Value(width)).current;
  const [translateY, setTranslateY] = useState(-1000);

  const handleSlide = (type) => {
    Animated.spring(translateX, {
      toValue: type,
      duration: 100,
      friction: 6,
      useNativeDriver: true
    }).start();
    // if (active === 0) {
    //   Animated.parallel([
    //     Animated.spring(translateXTabOne, {
    //       toValue: 0,
    //       duration: 100,
    //       useNativeDriver: true
    //     }).start(),
    //     Animated.spring(translateXTabTwo, {
    //       toValue: width,
    //       duration: 100,
    //       useNativeDriver: true
    //     }).start()
    //   ])
    // } else {
    //   Animated.parallel([
    //     Animated.spring(translateXTabOne, {
    //       toValue: -width,
    //       duration: 100,
    //       useNativeDriver: true
    //     }).start(),
    //     Animated.spring(translateXTabTwo, {
    //       toValue: 0,
    //       duration: 100,
    //       useNativeDriver: true
    //     }).start()
    //   ])
    // }
  }

  if (active === 0) {
    Animated.parallel([
      Animated.spring(translateXTabOne, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true
      }).start(),
      Animated.spring(translateXTabTwo, {
        toValue: width,
        duration: 100,
        useNativeDriver: true
      }).start()
    ])
  } else {
    Animated.parallel([
      Animated.spring(translateXTabOne, {
        toValue: -width,
        duration: 100,
        useNativeDriver: true
      }).start(),
      Animated.spring(translateXTabTwo, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true
      }).start()
    ])
  }

  const { container, textStyleActive, textStyleInactive, overlay, tabButton } = styles;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={container}>
        <View style={{
          flexDirection: 'row',
          marginTop: 20,
          marginBottom: 20,
          height: 36,
          position: 'relative',
          borderRadius: 4
        }}>
          <Animated.View
            style={[
              overlay, {
                transform: [{
                  translateX
                }]
              }]
            }
          />
          <TouchableOpacity style={[tabButton, {
            borderRadius: 4,
            borderRightWidth: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
          }]
          }
            onLayout={event =>
              setXTabOne(event.nativeEvent.layout.x)
            }
            onPress={() => {
              setActive(0)
              handleSlide(xTabOne)
            }}
          >
            <Text style={[(active === 0) ? textStyleActive : textStyleInactive]}
            >Tab 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[tabButton, {
            borderRadius: 4,
            borderLeftWidth: 0,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
          }]}
            onLayout={event =>
              setXTabTwo(event.nativeEvent.layout.x)
            }
            onPress={() => {
              setActive(1)
              handleSlide(xTabTwo)

            }}
          >
            <Text style={[(active === 1) ? textStyleActive : textStyleInactive]} >Tab 2</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <Animated.View style={{
          justifyContent: "center",
          alignItems: "center",
          transform: [{
            translateX: translateXTabOne
          }]
        }}
          onLayout={event =>
            setTranslateY(event.nativeEvent.layout.height)
          }
        >
          <Text>Tab 1</Text>
        </Animated.View>
        <Animated.View style={{
          justifyContent: "center",
          alignItems: "center",
          transform: [{
            translateX: translateXTabTwo,
          }, {
            translateY: -translateY
          }]
        }}>
          <Text>Tab 2</Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textStyleActive: {
    color: '#fff'
  },
  textStyleInactive: {
    color: '#52575D'
  },
  overlay: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: '#52575D'
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#52575D',
  }
});

export default App;
