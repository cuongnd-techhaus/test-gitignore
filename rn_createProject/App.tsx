import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Image,
  Switch,
  Alert,
  StatusBar,
  Modal,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RegisterScreenNavi} from './RegisterScreen.js';

function HomeScreen({route, navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const STYLES = ['dark-content', 'light-content'];
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [hidden, setHidden] = useState(false);
  const image = {uri: 'https://reactnative.dev/img/tiny_logo.png'};
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch = () => setIsEnabled(isEnabled => !isEnabled);
  const toggleSwitch2 = () => setIsEnabled2(isEnabled2 => !isEnabled2);
  const changeSwitch = () => {
    Alert.alert(
      'You change status bar visibility',
      'Status bar visibility changed',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );

    setHidden(!hidden);
  };

  const changeStatusBarStyle = () => {
    const styleId = STYLES.indexOf(statusBarStyle) + 1;
    if (styleId === STYLES.length) {
      setStatusBarStyle(STYLES[0]);
    } else {
      setStatusBarStyle(STYLES[styleId]);
    }
    Alert.alert(
      'You change status bar style',
      'Status bar style changes',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        hidden={hidden}
        barStyle={statusBarStyle}
      />
      <Text style={styles.textMessage}>
        {' '}
        Hello user: {route.params.userNameGet}{' '}
      </Text>
      <View style={styles.changeStatusBar}>
        <Text style={styles.textLogin}>
          {' '}
          Status Bar Visibility: {hidden ? 'Hidden' : 'Visible'}
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          onChange={changeSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.changeStatusBar}>
        <Text style={styles.textLogin}>
          {' '}
          Status Bar Styles: {statusBarStyle}
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={setIsEnabled2 ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch2}
          onChange={changeStatusBarStyle}
          value={isEnabled2}
        />
      </View>
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed');
            setModalVisible(modalVisible => !modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text styles={styles.modalText}> Hello world!</Text>
              <Button
                title="Hide modal title"
                style={(styles.buttonModal, styles.buttonCloseModal)}
                onPress={() => {
                  setModalVisible(modalVisible => !modalVisible);
                }}></Button>
            </View>
          </View>
        </Modal>
        <Button
          title="Show Modal"
          style={[styles.buttonModal, styles.buttonOpenModal]}
          onPress={() => {
            setModalVisible(true);
          }}></Button>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Image style={styles.tinyLogo} source={image}></Image>
        <Image
          style={styles.tinyLogo}
          source={require('./android/image/Android-Logo-2008.png')}></Image>

        <Image
          style={{
            width: 50,
            height: 50,
            resizeMode: 'contain',
            marginTop: 20,
          }}
          source={{
            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
          }}
        />
      </View>
    </SafeAreaView>
  );
}

function LoginScreen({navigation, route}) {
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');

  return (
    <View style={styles.containerLoginPage}>
      <Text style={styles.textMessage}>{route.params?.registerMessage}</Text>
      <Text style={styles.textLogin}>Username: </Text>
      <TextInput
        style={styles.input}
        placeholder="Input username"
        value={userName}
        onChangeText={setUserName}
      />
      <Text style={styles.textLogin}>Passsword: </Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Input password"
        value={passWord}
        onChangeText={setPassWord}
        inputMode="numeric"
      />
      <View style={styles.buttons}>
        <Button
          title="Login"
          onPress={() => {
            navigation.navigate({
              name: 'Home',
              params: {userNameGet: userName},
              merge: true,
            });
          }}
        />
        <Button
          title="Register"
          onPress={() => {
            navigation.navigate('Register');
          }}
        />
      </View>
    </View>
  );
}

function RegisterScreen({navigation}) {
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');

  return (
    <SafeAreaView style={styles.containerLoginPage}>
      <Text style={styles.textLogin}>Username:</Text>
      <TextInput
        style={styles.input}
        placeholder="User name"
        value={userName}
        onChangeText={setUserName}
      />
      <Text style={styles.textLogin}>Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        value={passWord}
        onChangeText={setPassWord}
        inputMode="numeric"
      />
      <View style={styles.buttons}>
        <Button
          title="Register"
          onPress={() => {
            navigation.navigate({
              name: 'Login',
              params: {
                registerMessage: 'Register success',
              },
              merge: false,
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home page',
            headerStyle: {
              backgroundColor: '#FD9E7B',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Login page',
            headerStyle: {
              backgroundColor: '#20734A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: 'Register page',
            headerStyle: {
              backgroundColor: '#20734A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: 16,
  },
  containerLoginPage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 10,
  },
  textMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  input: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
  },
  textLogin: {
    fontFamily: 'Cochin',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  paddingButton: {
    padding: 10,
  },
  tinyLogo: {
    marginTop: 20,
    width: 50,
    height: 50,
  },
  logo: {
    marginTop: 20,
    width: 100,
    height: 100,
  },
  changeStatusBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalView: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpenModal: {
    backgroundColor: '#F194FF',
  },
  buttonCloseModal: {
    backgroundColor: '#2196F3',
  },
  textModal: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
