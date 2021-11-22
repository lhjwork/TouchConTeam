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
  ScrollView,
  TextInput,
} from 'react-native';

import {HeaderThickBottomLine} from '../../../components/HeaderBottomLine';
import RowView from '../../../components/RowView';
import ColumnView from '../../../components/ColumnView';
import WhiteSafeAreaView from '../../../components/WhiteSafeAreaView';
import BottomButton from '../../../components/BottomButton';
import {ModalPoup2} from '../../../components/Modals';
import Touchable from '../../../components/Touchable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';

const view = ({navigation, sendmodal, route}) => {
  let coins = route.params.coins;

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const {walletAddress, walletURL} = auth;
  // let coins = route.params.coins;
  const [visible, setVisible] = useState(false);
  const [coin, setCoin] = useState('TouchCon');
  const [eth, setEth] = useState('ETH');
  const [add, setAdd] = useState('보내기에서 주소 전달');
  const [touchPoint, setTouchPoint] = useState(0); // 하단 보내기의 TouchCon 포인트
  const [etherPoint, setEtherPoint] = useState(0); // 하단 보내기의 이더리움 포인트

  useEffect(() => {
    // console.log(route.params);
    navigation.setOptions({
      headerRight: () => (
        <Touchable onPress={() => navigation.navigate('Main')} style={{}}>
          <AntDesign
            name="close"
            size={26}
            color={'#000'}
            style={{
              padding: 4,
              alignSelf: 'center',
              color: '#c4c4c4',
              paddingRight: 16,
            }}
          />
        </Touchable>
      ),
    });
  }, []);

  const clickedTouchCon = () => {
    setVisible(true);
    setCoin('TouchCon');
    console.log(' 터치콘 클릭함');
  };

  const clickedEthereum = () => {
    setVisible(true);
    setCoin('Ethereum');
    console.log(' 이더리움 클릭함');
  };

  const sendCoin = text => {
    var sessionToken = 'efwfwefwefwewefw';
    var curr_coin = coin;
    var curr_add = add;
    console.log(curr_coin);
    console.log(curr_add);
    setVisible(false);

    // fetch('http://wefljewflfewwf', {
    //   method: 'POST',
    // });

    //    위 코드와 동일
    // const response = axios.post('http://wefljewflfewwf');
    // console.log(response.data); // {},
    //
    // const {data} = axios.post('http://wefljewflfewwf');
    // console.log(data); // {}
  };

  const clickSend = text => {
    var curr_coin = coin;
    var curr_add = add;
    console.log(curr_coin);
    console.log(curr_add);
  };

  return (
    <WhiteSafeAreaView>
      <HeaderThickBottomLine />
      {/*{console.log(coins)}*/}
      <ModalPoup2 visible={visible}>
        <ColumnView style={styles.modal_flex}>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Image
              source={require('../../../assets/images/x.png')}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                marginTop: 20,
                marginLeft: 320,
              }}
            />
          </TouchableOpacity>
          <Text style={styles.modal_text1}>출금을 위한 주소를 입력하세요</Text>
          <TextInput
            placeholder="주소"
            style={{
              minHeight: 50,
              minWidth: 285,
              marginHorizontal: 28,
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: 'gray',
              marginBottom: 14,
            }}
            onChangeText={text => setAdd(text)}
          />
          <TextInput
            placeholder="출금수량"
            style={{
              minHeight: 50,
              minWidth: 285,
              marginHorizontal: 28,
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: 'gray',
              marginBottom: 45,
            }}
            onChangeText={text => {
              if (setCoin) {
                setCoin(text);
              } else {
                setEth(text);
              }
            }}
            keyboardType="number-pad"
          />
          <BottomButton text={'확인'} onPress={() => clickSend()} />
        </ColumnView>
      </ModalPoup2>
      <Image
        source={require('../../../assets/images/wallet_tx_qr.png')}
        style={{
          marginHorizontal: 26,
          marginVertical: 15,
          width: 325,
          height: 116,
          resizeMode: 'contain',
        }}
      />

      <BottomButton text={'지갑 주소 복사하기'} />

      <View style={styles.under}>
        <HeaderThickBottomLine />
        {/* 터치콘 */}

        <ScrollView>
          <View style={styles.back1}>
            <RowView style={{justifyContent: 'space-between'}}>
              <Text style={styles.tx1}>터치콘</Text>

              {/* 터치콘 보내기 모달 적용 보내기  */}
              <TouchableOpacity onPress={() => clickedTouchCon()}>
                <RowView
                  style={{
                    backgroundColor: '#FD7F36',
                    width: 104,
                    height: 40,
                    justifyContent: 'space-between',
                    borderRadius: 5,
                    marginRight: 20,
                    marginTop: 20,
                  }}>
                  <Text
                    style={{fontSize: 15, marginLeft: 13, color: '#ffffff'}}>
                    보내기
                  </Text>
                  <Image
                    source={require('../../../assets/icons/pass_wh.png')}
                    style={{width: 26, height: 23, marginRight: 9}}
                  />
                </RowView>
              </TouchableOpacity>
            </RowView>
            <RowView>
              <Image
                source={require('../../../assets/icons/wallet_logo.png')}
                style={styles.logo}
              />
              <ColumnView style={{marginBottom: 26}}>
                <Text style={styles.tx2}>{coins?.TouchCon}</Text>
                <Text style={styles.tx2}>1 TOC = 100원</Text>
              </ColumnView>
            </RowView>
          </View>
          {console.log(coins)}
          {/* 터치콘 */}
          <BottomButton text={'거래소 가기'} />

          <View style={styles.back2}>
            <RowView style={{justifyContent: 'space-between'}}>
              <Text style={styles.tx1}>이더리움</Text>

              {/* 모달 적용 이더리움 보내기  */}
              <TouchableOpacity onPress={() => clickedEthereum()}>
                <RowView
                  style={{
                    backgroundColor: '#FD7F36',
                    width: 104,
                    height: 40,
                    justifyContent: 'space-between',
                    borderRadius: 5,
                    marginRight: 20,
                    marginTop: 20,
                  }}>
                  <Text
                    style={{fontSize: 15, marginLeft: 13, color: '#ffffff'}}>
                    보내기
                  </Text>
                  <Image
                    source={require('../../../assets/icons/pass_wh.png')}
                    style={{width: 26, height: 23, marginRight: 9}}
                  />
                </RowView>
              </TouchableOpacity>
            </RowView>
            <RowView>
              <Image
                source={require('../../../assets/icons/wallet_logo.png')}
                style={styles.logo}
              />
              <ColumnView style={{marginBottom: 26}}>
                <Text style={styles.tx2}>{coins?.Ethereum}</Text>
                <Text style={styles.tx2}>1 TOC = 100원</Text>
              </ColumnView>
            </RowView>
          </View>
        </ScrollView>
        {/* 이더리움 */}
      </View>

      {/* <HeaderThickBottomLine /> */}
    </WhiteSafeAreaView>
  );
};

export default view;

const styles = StyleSheet.create({
  under: {
    marginTop: 15,
    width: '100%',
    height: 350,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  back1: {
    marginHorizontal: 15,
    marginVertical: 26,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#c4c4c4c',
  },
  back2: {
    marginHorizontal: 15,
    marginBottom: 26,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#c4c4c4c',
  },

  tx1: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 26,
  },
  tx2: {
    color: '#000000',
    fontSize: 12,
    margin: 5,
  },

  logo: {
    width: 56,
    height: 50,
    marginLeft: 20,
    marginBottom: 22,
  },
  modal_text1: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
    marginTop: 37,
    marginBottom: 45,
  },
});

const BtnPass = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <RowView
        style={{
          backgroundColor: '#FD7F36',
          width: 104,
          height: 40,
          justifyContent: 'space-between',
          borderRadius: 5,
          marginRight: 20,
          marginTop: 20,
        }}>
        <Text style={{fontSize: 15, marginLeft: 13, color: '#ffffff'}}>
          보내기
        </Text>
        <Image
          source={require('../../../assets/icons/pass_wh.png')}
          style={{width: 26, height: 23, marginRight: 9}}
        />
      </RowView>
    </TouchableOpacity>
  );
};
