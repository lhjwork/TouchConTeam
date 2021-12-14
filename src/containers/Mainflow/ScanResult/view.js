import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Touchable,
  ScrollView,
  Alert,
} from 'react-native';
import Navbar from '../../../components/Navbar/view';
import WhiteSafeAreaView from '../../../components/WhiteSafeAreaView';
import BottomButton from '../../../components/BottomButton';
import {NormalBoldLabel} from '../../../components/Label';
import RowView from '../../../components/RowView';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import api from '../../../api';

const view = ({route}) => {
  const navigation = useNavigation();
  const [balance, setBalance] = useState('');
  let touchPoint = route.params.touchPoint;
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    getbalance();
  }, []);

  const getbalance = async () => {
    let body = {sessionToken: auth.sessionToken};
    let touchcon;
    let touchPoint;
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await api.post('balance', JSON.stringify(body), config);
      setBalance(res?.data?.Result?.TouchPoint);
      // console.log('잔고', res.data.Result.TouchCon);
      // console.log('잔고2', res.data.Result.TouchPoint);
      // touchcon = res.data.Result.TouchCon;
      // touchPoint = res.data.Result.TouchPoint;

      // console.log(res);
      // navigation.navigate('Wallet');
      // console.log('test', res.data.Result);
    } catch (err) {
      Alert.alert('', '서버와 통신에 실패');
      console.log('err', err);
    }
  };

  return (
    <WhiteSafeAreaView>
      {console.log(balance, touchPoint)}
      {/*<Navbar />*/}
      {/* 별,축하합니다. 이미지  */}
      <Image
        source={require('../../../assets/images/star_congra.png')}
        resizeMode="contain"
        style={{width: '100%', position: 'relative', top: -161}}
      />
      {/* 별,축하합니다 아래 View로 배경 작업 */}
      <View style={styles.upper_back}>
        <View style={styles.upper_point}>
          <View style={styles.wh_line}>
            <RowView style={styles.ro1}>
              <Text style={{color: '#ffffff', fontSize: 30}}>{touchPoint}</Text>
              <Image
                source={require('../../../assets/images/touch_blue_text.png')}
                resizeMode="contain"
                style={{
                  width: 64,
                  height: 19,
                }}
              />
            </RowView>
          </View>
        </View>
        <Btnwhite
          text={'적립하기'}
          onPress={() => {
            navigation.navigate('Main');
          }}
        />
      </View>

      {/* 하단 부분 스크롤 */}
      <ScrollView>
        <View
          style={{
            minHeight: 100,
            marginHorizontal: 52,
            backgroundColor: 'rgba(14, 15, 15, 0.8)',
            marginTop: 84,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{marginLeft: 20, fontSize: 15, color: '#fff'}}>
            현재 적립액
          </Text>
          {/* 현재 보유중인  총 충전 금액 */}
          <Text style={{fontSize: 20, color: '#fff'}}>
            {touchPoint + balance}
          </Text>
          <Image
            source={require('../../../assets/images/touch_blue_text.png')}
            resizeMode="contain"
            style={{
              width: 64,
              height: 19,
              marginRight: 9,
            }}
          />
        </View>
        <BottomButton
          text={'나의 지갑가기'}
          style={{marginTop: 104}}
          onPress={() => {
            navigation.navigate('Main');
          }}
        />
      </ScrollView>
    </WhiteSafeAreaView>
  );
};

export default view;

const styles = StyleSheet.create({
  ro1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 56,
    marginRight: 41,
    marginVertical: 30,
  },
  wh_line: {
    borderColor: '#fff',
    borderWidth: 2,
    marginHorizontal: 11,
    marginVertical: 9,
    minHeight: 106,
    borderRadius: 10,
  },
  upper_back: {
    height: 276,
    width: '100%',
    backgroundColor: '#5F408F',
    position: 'absolute',
    top: 130,
    zIndex: -1,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  upper_point: {
    minHeight: 123,
    marginHorizontal: 51,
    marginVertical: 39,
    backgroundColor: '#c4c4c4',
    borderRadius: 10,
  },
});

const Btnwhite = ({onPress, text, style}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 327,
        height: 50,
        paddingVertical: 15,
        borderRadius: 53,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 32,
        marginHorizontal: 24,
        ...style,
        // position: 'absolute', width: width-48, bottom: 32,
      }}>
      <NormalBoldLabel
        text={text}
        style={{fontSize: 20, lineHeight: 24, color: '#5F408F'}}
      />
    </TouchableOpacity>
  );
};
