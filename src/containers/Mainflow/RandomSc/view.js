import React, {Component, useEffect, useState} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Alert,
} from 'react-native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import RowView from '../../../components/RowView';
import {Platform, PermissionsAndroid} from 'react-native';
import Touchable from '../../../components/Touchable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import api from '../../../api';
import {resetAuth} from '../../../redux/authSlice';
import {useSelector} from 'react-redux';
const {height, width} = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;

// class view extends Component {
const view = ({navigation}) => {
  const [QRurl, setQRurl] = useState('');
  const [isReactivate, setReactivate] = useState(false);
  const auth = useSelector(state => state.auth);
  const [iscameraTypeback, setIsCameraTypeback] = useState(true);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      headerRight: () => (
        <Touchable onPress={() => navigation.navigate('Main')}>
          <AntDesign
            name="close"
            size={26}
            color={'#000'}
            style={{
              padding: 4,
              alignSelf: 'center',
              color: '#fff',
              paddingRight: 16,
            }}
          />
        </Touchable>
      ),
    });

    if (Platform.OS === 'android') {
      // console.log(' 111 ');
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]).then(result => {
        // console.log(result);
        /*
              if (
                result['android.permission.CAMERA'] === 'granted' &&
                result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted' &&
                result['android.permission.RECORD_AUDIO'] === 'granted'
              ) {
                this.setState({permissionsGranted: true, showPermsAlert: false});
              } else {
                this.setState({permissionsGranted: false, showPermsAlert: true});
              }
              */
      });
    }
  }, []);

  // render({navigation}) {
  //   const onSuccess = e => {
  //     Linking.openURL(e.data).catch(err =>
  //       console.error('An error occured', err),
  //     );
  //   };
  const onSuccess = e => {
    try {
      fetchQRCode(e.data, '외부');
    } catch (e) {
      console.log(e);
    }
  };
  const internalScan = async () => {
    const options = {
      includeBase64: true,
      mediaType: 'photo',
    };
    await launchImageLibrary(options)
      .then(res => {
        console.log(res);
        // console.log(res.assets[0].base64.slice(4, res.assets[0].base64.length));
        // // ImagePick(res.assets[0].base64.slice(4, res.assets[0].base64.length));
        // ImagePick(res.assets[0].base64);
        fetchQRCode(res?.assets[0]?.base64, '내부');
      })
      .catch(err => {
        console.log('ㅇㅇㅇㅇㅇ:', err);
      });
  };

  // const ImagePick = async url => {
  //   // console.log('이미지 url', url);
  //   await RNQRGenerator.detect({
  //     base64: url,
  //   })
  //     .then(response => {
  //       console.log(response);
  //       if (response.type !== 'QRCode') {
  //         Alert.alert('QR코드가 아닙니다');
  //         return;
  //       }
  //       console.log('return 값', response);
  //       console.log(response.values[0]);
  //       fetchQRCode(response.values[0], '내부');
  //     })
  //     .catch(error => {
  //       Alert.alert('이미지에서 QR 코드를 감지에 실패하였습니다.');
  //       console.log('Cannot detect QR code in image', error);
  //     });
  // };

  const fetchQRCode = async (Qr, name) => {
    let touchPoint;
    let endPoint = name === '내부' ? 'internalscan' : 'scan';
    let body = {sessionToken: auth.sessionToken, Qr: Qr};
    console.log(body);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await api.post(endPoint, JSON.stringify(body), config);
      if (res.data.Result === '터치콘 포인트가 부족합니다.') {
        Alert.alert(res?.data?.Result);
        // navigation.goBack();
        return;
      }
      if (res.data.Result === '이미 스캔된 쿠폰입니다.') {
        Alert.alert(res?.data?.Result);
        return;
      }
      if (res.data.Result !== 'success') {
        // navigation.navigate('ScanResult', {touchPoint: 10});
        Alert.alert(`${name}스캔 실패했습니다`);
        // navigation.goBack();
        return;
      }
      Alert.alert(`${name}스캔 성공하였습니다`);
      navigation.navigate('ScanResult', {touchPoint: res?.data?.Amount});
      console.log('Amount확인', res.data.Amount);
      //  navigation.navigate('ScanResult', {touchPoint: touchPoint});
      // navigation.goBack();
      // navigation.navigate(touchPoint, 'ScanResult');

      // console.log(res);
      // navigation.navigate('Wallet');
      // console.log('test', res.data.Result);
    } catch (err) {
      // Alert.alert('', '서버와 통신에 실패');
      console.log('err', err);
    }
  };

  return (
    <View>
      {/* -------- 1회 스캔한 큐알코드는~~~ start ------- */}

      <QRCodeScanner
        cameraType={iscameraTypeback ? 'back' : 'front'}
        reactivate={true}
        showMarker={true}
        onRead={onSuccess}
        reactivateTimeout={3500}
        cameraStyle={{height: height - 50}}
        markerStyle={{
          marginTop: (width * 0.7) / -2,
          width: width * 0.7,
          height: width * 0.7,
        }}
      />
      <TouchableOpacity
        style={{position: 'absolute', top: 20, left: 10}}
        onPress={() => {
          setIsCameraTypeback(!iscameraTypeback);
        }}>
        <Image
          source={require('../../../assets/images/Turn.png')}
          resizeMode="contain"
          style={{
            width: 40,
            height: 30,
          }}
        />
      </TouchableOpacity>
      <RowView
        style={{
          width: '100%',
          justifyContent: 'space-around',
          zIndex: 1,
          position: 'absolute',
          top: height * 0.7,
          backgroundColor: 'transparent',
        }}>
        <TouchableOpacity>
          <Image
            source={require('../../../assets/images/btn_random_sc_out.png')}
            style={{
              resizeMode: 'contain',
              width: width * 0.2,
              height: height * 0.1,
            }}
          />
          <View
            style={{
              width: width * 0.25,
            }}
          />
        </TouchableOpacity>
        {/* <Image
          source={require('../../../assets/images/random_bar.png')}
          style={{
            resizeMode: 'contain',
            width: width * 0.008,
          }}
        /> */}
        <View
          style={{
            width: width * 0.05,
          }}
        />
        <TouchableOpacity onPress={() => internalScan()}>
          <View
            style={{
              width: width * 0.25,
            }}
          />
          <Image
            source={require('../../../assets/images/btn_random_sc_in.png')}
            style={{
              resizeMode: 'contain',
              width: width * 0.2,
              height: height * 0.1,
            }}
          />
        </TouchableOpacity>
        {/* <Image
          source={require('../../../assets/images/random_bar.png')}
          style={{
            resizeMode: 'contain',
            width: width * 0.008,
          }}
        /> */}
        <View
          style={{
            width: width * 0.05,
          }}
        />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ScanHistory');
          }}>
          <Image
            source={require('../../../assets/images/btn_random_sc_hi.png')}
            style={{
              resizeMode: 'contain',
              width: width * 0.2,
              height: height * 0.1,
            }}
          />
        </TouchableOpacity>
      </RowView>
    </View>
  );
};

export default view;
