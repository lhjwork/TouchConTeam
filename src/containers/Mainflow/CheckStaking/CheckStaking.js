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
import {NormalBoldLabel, NormalLabel} from '../../../components/Label';
import RowView from '../../../components/RowView';
import WhiteSafeAreaView from '../../../components/WhiteSafeAreaView';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Touchable from '../../../components/Touchable';
import api from '../../../api';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';

const {width} = Dimensions.get('window');

const CheckStaking = ({navigation}) => {
  const auth = useSelector(state => state.auth);
  const [changingDate, setChangingDate] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [releaseMonth, setReleaseMonth] = useState('');
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
    changeDate();
  }, []);
  const fetchTotalCoin = async () => {
    let body = {sessionToken: auth.sessionToken};
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await api.post('stakinguser', JSON.stringify(body), config);
      console.log(res);
      if (res?.data?.Result?.length === 0) {
        return;
      }

      setHistoryPosts(res?.data.Result);
      setChangingDate(res?.data.Result[0].ApplicationDate);
      // navigation.navigate('Wallet');
      // console.log('test', res.data.Result);
    } catch (err) {
      // Alert.alert('', '서버와 통신에 실패');
      console.log('err', err);
      console.log('err.res', err.response);
    }
  };

  const changeDate = () => {
    if (changingDate?.substring(5, 7) === '01' || '02' || '03') {
      setReleaseMonth('04');
      // setReleaseYear(changingDate?.substring(0, 4).toString());
      setReleaseYear(dayjs(new Date()).format('YYYY'));
    } else if (changingDate?.substring(5, 7) === '04' || '05' || '06') {
      setReleaseMonth('07');
      // setReleaseYear(changingDate?.substring(0, 4));
      setReleaseYear(dayjs(new Date()).format('YYYY'));
    } else if (changingDate?.substring(5, 7) === '07' || '08' || '09') {
      setReleaseMonth('10');
      // setReleaseYear(changingDate?.substring(0, 4));
      setReleaseYear(dayjs(new Date()).format('YYYY'));
    } else {
      setReleaseMonth('01');
      // setReleaseYear(parseInt(changingDate?.substring(0, 4)) + 1);
      setReleaseYear(parseInt(dayjs(new Date()).format('YYYY')) + 1);
    }

    // const newDate = changingDate.split('-');
    // let yaer = 20 + newDate[0];
    // let month = newDate[1];
    // yaer = parseInt(yaer);
    // month = parseInt(month);
    // if (month === 10) {
    //   yaer = yaer + 1;
    //   month = 1;
    // } else {
    //   month = month + 3;
    // }
    // month = Number(month).toString();
    // if (Number(month) < 10 && month.length == 1) {
    //   month = '0' + month;
    // }
    // console.log('0', yaer);
    // console.log('1', month);
    // setReleaseYear(yaer);
    // setReleaseMonth(month);
  };

  return (
    <WhiteSafeAreaView>
      <ScrollView>
        <HeaderBottomLine />

        <RowView style={styles.listHeaderBack}>
          <Text style={styles.tx1}>신청일자</Text>
          <Text style={styles.tx2}>신청수량</Text>
          <Text style={styles.tx3}>만기시 수량</Text>
        </RowView>

        {historyPosts?.length === 0 ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <NormalBoldLabel
              text={'스테이킹 내역이 없습니다.'}
              style={{
                textAlign: 'center',
                padding: 45,
                lineHeight: 26,
                color: '#c4c4c4',
              }}
            />
          </View>
        ) : (
          <ScrollView
            style={{
              marginHorizontal: 16,
              height: historyPosts.length > 4 ? 225 : 150,
            }}
            nestedScrollEnabled={true}>
            {historyPosts?.map((menu, i) => {
              return <ScHistory menu={menu} index={i} key={i} />;
            })}
          </ScrollView>
        )}

        <View style={styles.contentBox}>
          <ContextView
            text={'해제일자'}
            textValue={`${releaseYear}.${releaseMonth}.27`}
            // textValue={`${releaseYear}.${releaseMonth}.27`}
          />
          <ContextView text={'예치이자'} textValue={'약 3~7% 이내'} />
          <NormalLabel
            text={
              '[유의사항]\n\n' +
              '\t• 해제일자에 예치원금 및 이자가 함께 일괄 지급\n\t\t 될 예정입니다.\n\n' +
              '\t• 송금 받는 지갑은 앱에 등록된 지갑을 기준으로\n\t\t 전송됩니다.'
            }
            style={{
              marginTop: 47,
              marginBottom: 30,
              color: '#5F408F',
              fontSize: 15,
              lineHeight: 19,
              fontWeight: '700',
            }}
          />
        </View>
      </ScrollView>
    </WhiteSafeAreaView>
  );
};

export default CheckStaking;

const ScHistory = ({menu, index}) => {
  const dotDate = menu.ApplicationDate.substring(2, 10).replace(/-/gi, '.');

  // const dotDate = newDate.substring(2, 10).replaceAll('-', '.');
  // console.log('dotDate', dotDate);
  return (
    <RowView
      style={{
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#c4c4c4',
        backgroundColor: index % 2 === 1 ? '#EBEBEB' : '#FFFFFF',
      }}>
      <NormalBoldLabel text={dotDate} style={styles.day} />
      <NormalBoldLabel
        text={menu?.ApplingAmount.toString().replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ',',
        )}
        style={styles.applingAmount}
      />
      <NormalBoldLabel
        text={(menu?.ApplingAmount * 1.07)
          .toFixed(0)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        // text={(parseFloat(menu?.ExpirationAmount) * 1.07).toFixed(2)}
        style={styles.company}
      />
    </RowView>
  );
};

const ContextView = ({menu, text, textValue}) => {
  return (
    <>
      <NormalBoldLabel
        text={text}
        style={{
          color: '#000',
          fontWeight: '700',
          marginTop: 15,
        }}
      />
      <NormalBoldLabel text={textValue} style={styles.contentValue} />
    </>
  );
};

const styles = StyleSheet.create({
  applingAmount: {
    color: '#FD7F36',
    textAlign: 'center',
    position: 'relative',
    left: -27,
  },
  contentValue: {
    borderRadius: 5,
    color: '#000',
    borderWidth: 1,
    paddingVertical: 14,
    paddingLeft: 28,
    marginVertical: 15,
    borderColor: '#C4C4C4',
    fontWeight: '400',
  },
  contentBox: {marginHorizontal: 16},
  company: {
    width: 60,
    position: 'relative',
    left: -45,
    color: '#FD7F36',
    textAlign: 'center',
  },
  scContainer: {
    marginHorizontal: 16,
    // height: 225,
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
  day: {marginVertical: 17, marginLeft: 38, color: '#000'},
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
