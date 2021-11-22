import {useNavigation} from '@react-navigation/native';
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
  ScrollViewBase,
  ScrollView,
  Alert,
} from 'react-native';
import HeaderBottomLine from '../../../components/HeaderBottomLine';
import {NormalBoldLabel} from '../../../components/Label';
import RowView from '../../../components/RowView';
import WhiteSafeAreaView from '../../../components/WhiteSafeAreaView';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Touchable from '../../../components/Touchable';
import api from '../../../api';
import {useSelector} from 'react-redux';

const ScInventory = [
  {id: 1, date: '21.04.05', compensation: '200', ba: '카오리온'},
  {id: 2, date: '21.04.05', compensation: '10', ba: '메가'},
  {id: 3, date: '21.04.05', compensation: '3,000', ba: '안동국밥'},
  {id: 4, date: '21.04.05', compensation: '3,000', ba: '안동국밥'},
  {id: 5, date: '21.04.05', compensation: '3,000', ba: '안동국밥'},
  {id: 6, date: '21.04.05', compensation: '3,000', ba: '안동국밥'},
  {id: 7, date: '21.04.05', compensation: '3,000', ba: '안동국밥'},
  {id: 8, date: '21.04.05', compensation: '3,000', ba: '안동국밥'},
  {id: 9, date: '21.04.05', compensation: '3,000', ba: '안동국밥'},
  {id: 10, date: '21.04.05', compensation: '3,000', ba: '안동국밥'},
  {id: 11, date: '21.04.05', compensation: '3,000', ba: '안동국밥'},
  {id: 12, date: '21.04.05', compensation: '3,000', ba: '안동국밥'},
  {id: 13, date: '21.04.05', compensation: '3,000', ba: '안동국밥'},
];

const view = ({navigation}) => {
  const auth = useSelector(state => state.auth);
  const [historyPosts, setHistoryPosts] = useState([]);
  useEffect(() => {
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
  useEffect(() => {
    fetchTotalCoin();
  }, []);
  const fetchTotalCoin = async () => {
    let body = {sessionToken: auth.sessionToken};
    console.log(body);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await api.post('scanhistory', JSON.stringify(body), config);
      console.log(res);
      setHistoryPosts(res?.data.Result);
      // navigation.navigate('Wallet');
      // console.log('test', res.data.Result);
    } catch (err) {
      Alert.alert('', '서버와 통신에 실패');
      console.log('err', err);
    }
  };
  return (
    <WhiteSafeAreaView>
      <HeaderBottomLine />
      <RowView style={styles.listHeaderBack}>
        <Text style={styles.tx1}>날짜</Text>
        <Text style={styles.tx2}>보상액</Text>
        <Text style={styles.tx3}>제휴업체</Text>
      </RowView>
      <ScrollView style={styles.scContainer}>
        {historyPosts.map((menu, i) => (
          <ScHistory menu={menu} index={i} key={i} />
        ))}
      </ScrollView>
    </WhiteSafeAreaView>
  );
};

export default view;

const ScHistory = ({menu, index}) => {
  const navigation = useNavigation();

  return (
    <View>
      <RowView
        style={{
          justifyContent: 'space-between',
          width: 359,
          borderWidth: 1,
          borderColor: '#c4c4c4',
          backgroundColor: index % 2 === 1 ? '#EBEBEB' : '#FFFFFF',
        }}>
        <RowView
          style={{justifyContent: 'space-between', width: 166, marginLeft: 22}}>
          <NormalBoldLabel text={menu?.Date} style={styles.day} />

          <NormalBoldLabel text={menu?.Amount} style={{color: '#FD7F36'}} />
        </RowView>
        <NormalBoldLabel text={menu?.Company} style={styles.company} />
      </RowView>
    </View>
  );
};

const styles = StyleSheet.create({
  company: {width: 60, position: 'relative', left: -30},
  scContainer: {
    marginHorizontal: 17,
  },
  listHeaderBack: {
    backgroundColor: 'rgba(14, 15, 15, 0.8)',
    marginTop: 13,
    marginHorizontal: 16,
    justifyContent: 'space-between',
    height: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  day: {marginVertical: 17},
  tx1: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 38,
    fontWeight: 'bold',
  },
  tx2: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  tx3: {color: '#fff', fontSize: 15, marginRight: 38, fontWeight: 'bold'},

  adContent: {
    backgroundColor: '#fff',
    borderColor: '#c4c4c4',
    justifyContent: 'space-between',
  },
});
