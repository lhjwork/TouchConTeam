import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingViewBase,
} from 'react-native';
import BottomButton from '../../../components/BottomButton';
import {LongButton} from '../../../components/Botton';
import HeaderBottomLine from '../../../components/HeaderBottomLine';
import {NormalLabel} from '../../../components/Label';
import RowView from '../../../components/RowView';
import ColumnView from '../../../components/ColumnView';
import WhiteSafeAreaView from '../../../components/WhiteSafeAreaView';

const view = ({navigation}) => {
  const [mark, setMark] = useState(true);
  const [toc, setToc] = useState('50.21');
  const [krw, setKrw] = useState('50,210');
  const [top, setTop] = useState(0);

//수정
  
useEffect(() => {
    signOut();
  });

  const signOut = async () => {
    let body = {sesstionToken};
    api
      .post('http://3.35.210.171:5055/unregister', JSON.stringify(body), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        if (res.status !== 200) {
          return;
        }
        console.log(res.data.Result);
      })
      .catch(err => {
        console.log('에러메세지', err);
      });


  const chMark = () => {
    if (mark === false) {
      setMark(true);
    } else {
      setMark(false);
    }
    return mark;
  };

  return (
    <WhiteSafeAreaView>
      <HeaderBottomLine />
      <ScrollView>
        <View style={styles.Container}>
          <View style={styles.TitleBox}>
            <Text
              style={{
                color: '#fff',
                marginLeft: 21,
                fontSize: 15,
                fontWeight: '700',
              }}
            >
              디지털 자산의 수량을 체크해 주세요!
            </Text>
          </View>
          <View style={styles.ContentBox}>
            <ColumnView
              style={{
                marginHorizontal: 25,
                justifyContent: 'space-around',
                height: 105,
                borderBottomWidth: 1,
                borderColor: '#c4c4c4',
              }}
            >
              <Text style={styles.TextSize12}>잔량 TOC 수량</Text>
              <RowView>
                <NormalLabel text={toc} />
                <NormalLabel text={'TOC'} style={{marginLeft: 19}} />
              </RowView>

              <RowView>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '400',
                    color: '#000',
                  }}
                >
                  {krw}
                </Text>
                <Text
                  style={{
                    color: '#c4c4c4',
                    marginLeft: 5,
                    fontWeight: '700',
                    fontSize: 15,
                  }}
                >
                  KRW
                </Text>
                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: 15,
                    fontWeight: '400',
                    color: '#000',
                  }}
                >
                  (STEX 거래서 시세연결)
                </Text>
              </RowView>
            </ColumnView>
            <ColumnView
              style={{
                marginHorizontal: 25,
                justifyContent: 'center',
                height: 99,
                borderBottomWidth: 1,
                borderColor: '#c4c4c4',
              }}
            >
              <Text style={styles.TextSize12}>잔량 TOC 수량</Text>
              <RowView style={{marginTop: 14}}>
                <Text style={{color: '#000', fontSize: 16}}>{top}</Text>
                <Text style={{marginLeft: 19, color: '#000', fontSize: 16}}>
                  TOP
                </Text>
              </RowView>
            </ColumnView>
            <RowView
              style={{
                justifyContent: 'center',
                marginVertical: 11,
              }}
            >
              <Text style={{color: '#FF0000', fontSize: 15, fontWeight: '700'}}>
                *아래 주의사항 꼭 읽어주세요!'
              </Text>
            </RowView>
          </View>
        </View>

        <Text
          style={{
            marginHorizontal: 25,
            color: '#FF0000',
            fontSize: 15,
            fontWeight: '700',
            marginVertical: 22,
          }}
        >
          (주의) 터치콘앱에서 탈퇴하시면 모든 디지털 자산이 소명됩니다.
        </Text>

        <Image
          source={require('../../../assets/images/signoutContent.png')}
          resizeMode="contain"
          style={{marginHorizontal: 24, maxWidth: 326, maxHeight: 364}}
        />

        {/* <NormalLabel
          style={{paddingVertical: 30, paddingHorizontal: 23}}
          text={
            '1. 서비스를 탈퇴하면 월렛에 보유한 모든 터치 토\n' +
            '    큰의 권한이 소멸되어 복구가 되지 않습니다.\n' +
            '\n' +
            '2. 서비스를 탈퇴하면 스테이킹에 참여한 터치토큰\n' +
            '    을 비롯한 모든 권한 및 정보가 소멸되어 복구가\n' +
            '    불가능합니다.\n' +
            '\n' +
            '3. 탈퇴를 인한 모든 정보는 재가입을 해도 복구되\n' +
            '    지 않습니다. 만약 탈퇴를 하실 경우에는 사전에\n' +
            '    모든 자산에 대한 사용,전송 등을 하신 후에 탈\n' +
            '    퇴하시기를 권장합니다.\n' +
            '\n' +
            '4. 본인의 탈퇴로 인해 모든 권한과 서비스는 종료\n' +
            '    및 소멸되어니 이 점 참고하시어 신중히 결정하\n' +
            '    시기 바랍니다.'
          }
        /> */}

        <RowView
          style={{
            borderWidth: 1,
            minHeight: 40,
            minWidth: 230,
            marginLeft: 21,
            marginRight: 51,
            borderColor: '#c4c4c4',
            padding: 11,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              lineHeight: 20,
              color: '#000',
              marginLeft: 16,
              fontWeight: 'bold',
            }}
          >
            위 사항에 모두 동의 합니다.
          </Text>
          <TouchableOpacity
            onPress={() => {
              chMark();
            }}
          >
            {mark ? (
              <Image
                source={require('../../../assets/images/square.png')}
                resizeMode="contain"
                style={{
                  width: 18,
                  height: 18,
                  marginLeft: 40,
                }}
              />
            ) : (
              <Image
                source={require('../../../assets/images/chk_square.png')}
                resizeMode="contain"
                style={{
                  width: 18,
                  height: 18,
                  marginLeft: 40,
                }}
              />
            )}
          </TouchableOpacity>
        </RowView>

        <BottomButton text={'탈퇴하기'} style={{marginTop: 35}} />

        {/* <LongButton
        text={'탈퇴하기'}
        tcStyle={{marginLeft: 60, position: 'absolute', top: 550}}
        txStyle={{paddingTop: 10}}
      /> */}
      </ScrollView>
    </WhiteSafeAreaView>
  );
};

const styles = StyleSheet.create({
  SubTilte: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 28,
    marginLeft: 20,
  },

  Container: {
    marginTop: 20,
    marginHorizontal: 25,
    height: 287,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#c4c4c4',
  },
  TitleBox: {
    height: 40,
    backgroundColor: '#FD7F36',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'center',
  },
  ContentBox: {
    height: 105,
  },
  TextSize12: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
  },
});

export default view;
