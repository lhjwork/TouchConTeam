import React, {useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomButton from '../../../components/BottomButton';
import {NormalBoldLabel, NormalLabel} from '../../../components/Label';
import {Picker} from '@react-native-picker/picker';

const {height, width} = Dimensions.get('window');

const vh = height / 100;
const vw = width / 100;

function Signup(props) {
  const [allagree, setAllagree] = useState(false);
  const [ser_agree, setSer_agree] = useState(false);
  const [per_agree, setPer_agree] = useState(false);
  const [mark_agree, setMark_agree] = useState(false);
  const [email, onChangeEmail] = React.useState('');
  const [code, onChangeCode] = React.useState('');

  const chg_ser = () => {
    setSer_agree(!ser_agree);
    if (ser_agree === true) {
      setAllagree(false);
    }
  };
  const chg_per = () => {
    setPer_agree(!per_agree);
    if (per_agree === true) {
      setAllagree(false);
    }
  };
  const chg_mark = () => {
    setMark_agree(!mark_agree);
    if (mark_agree === true) {
      setAllagree(false);
    }
  };
  const chg_all = () => {
    if (allagree === false) {
      setMark_agree(true);
      setPer_agree(true);
      setSer_agree(true);
      setAllagree(true);
    } else {
      setMark_agree(false);
      setPer_agree(false);
      setSer_agree(false);
      setAllagree(false);
    }
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{paddingLeft: 24}}>
        <NormalBoldLabel
          style={{marginTop: 51, fontSize: 20, lineHeight: 24, marginBottom: 9}}
          text={'약관에 동의하고\n' + '이메일 주소를 입력해 주세요.'}
        />
        <NormalLabel
          style={{marginTop: 9, marginBottom: 19}}
          text={
            '기존 계정으로  사용을 원하시면\n기존 가입 이메일 주소를  입력해 주세요'
          }
        />
      </View>
      {/* <Button onPress={chg_all} title="test button" /> */}
      {/* 약관 동의 */}
      <View
        style={{
          marginLeft: width * 0.05,
        }}>
        <View
          style={{
            width: width * 0.9,
            height: 40,
            backgroundColor: '#c4c4c4c4',
            resizeMode: 'cover',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          {allagree ? (
            <TouchableOpacity onPress={chg_all}>
              <Image
                source={require('../../../assets/images/chk_square.png')}
                style={{
                  width: width * 0.06,
                  height: height * 0.06,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={chg_all}>
              <Image
                source={require('../../../assets/images/square.png')}
                style={{
                  width: width * 0.06,
                  height: height * 0.06,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={chg_all}
            style={{width: width * 0.75, height: height * 0.03}}>
            <Image
              source={require('../../../assets/images/nobutton.png')}
              style={{
                width: width * 0.28,
                height: height * 0.03,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginLeft: width * 0.05}}>
        <ImageBackground
          source={require('../../../assets/images/rectangle13.png')}
          style={{
            width: 353,
            resizeMode: 'contain',
            height: 152,
            justifyContent: 'space-evenly',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            {ser_agree ? (
              <TouchableOpacity onPress={chg_ser}>
                <Image
                  source={require('../../../assets/images/chk_square.png')}
                  style={{
                    width: width * 0.06,
                    height: height * 0.06,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={chg_ser}>
                <Image
                  source={require('../../../assets/images/square.png')}
                  style={{
                    width: width * 0.06,
                    height: height * 0.06,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            )}
            {/*   서비스 이용 약관 동의 Text */}
            <TouchableOpacity
              onPress={chg_ser}
              style={{
                width: width * 0.6,
                height: height * 0.03,
                resizeMode: 'contain',
                justifyContent: 'center',
                // 글간 간격
                marginTop: 24,
              }}>
              <View style={{flexDirection: 'column'}}>
                <Image
                  source={require('../../../assets/images/service_agree.png')}
                  style={{
                    width: width * 0.48,
                    height: height * 0.03,
                    resizeMode: 'contain',
                  }}
                />

                {/* 중간 확인 */}

                <Text style={styles.warn_text}>
                  {ser_agree ? null : '서비스 이용 약관 동의해 주세요'}
                </Text>

                {/* 중간 확인 */}
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../../../assets/images/detailview.png')}
                style={{
                  width: width * 0.13,
                  height: height * 0.03,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            {per_agree ? (
              <TouchableOpacity onPress={chg_per}>
                <Image
                  source={require('../../../assets/images/chk_square.png')}
                  style={{
                    width: width * 0.06,
                    height: height * 0.06,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={chg_per}>
                <Image
                  source={require('../../../assets/images/square.png')}
                  style={{
                    width: width * 0.06,
                    height: height * 0.06,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={chg_per}
              style={{
                width: width * 0.6,
                height: height * 0.03,
                resizeMode: 'contain',
                justifyContent: 'center',
              }}>
              {/* 개인 정보 수집 및 이용 동의 Text */}
              <View style={{flexDirection: 'column'}}>
                <Image
                  source={require('../../../assets/images/personal_agree.png')}
                  style={{
                    width: width * 0.6,
                    height: height * 0.03,
                    marginTop: 24,
                    resizeMode: 'contain',
                  }}
                />

                {/* 중간 확인 */}

                <Text style={styles.warn_text}>
                  {per_agree ? null : '개인 정보 수집 및 이용 동의해 주세요'}
                </Text>

                {/* 중간 확인 */}
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../../../assets/images/detailview.png')}
                style={{
                  width: width * 0.13,
                  height: height * 0.03,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              paddingBottom: 20,
              borderBottomWidth: 1,
              borderColor: '#c4c4c4',
            }}>
            {mark_agree ? (
              <TouchableOpacity onPress={chg_mark}>
                <Image
                  source={require('../../../assets/images/chk_square.png')}
                  style={{
                    width: width * 0.06,
                    height: height * 0.06,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={chg_mark}>
                <Image
                  source={require('../../../assets/images/square.png')}
                  style={{
                    width: width * 0.06,
                    height: height * 0.06,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            )}

            <View style={{flexDirection: 'column'}}>
              <TouchableOpacity
                onPress={chg_mark}
                style={{
                  width: width * 0.6,
                  height: height * 0.03,
                  resizeMode: 'contain',
                  justifyContent: 'center',
                  marginTop: 14,
                }}>
                {/* 마케팅 정보 알람 동의 Text  */}
                <Image
                  source={require('../../../assets/images/marketing_agree.png')}
                  style={{
                    width: width * 0.45,
                    height: height * 0.03,
                    resizeMode: 'contain',
                    marginTop: 5,
                  }}
                />
                <Text style={styles.warn_text}>
                  {mark_agree ? null : '마케팅 정보 알람 동의해 주세요'}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <Image
                source={require('../../../assets/images/detailview.png')}
                style={{
                  width: width * 0.13,
                  height: height * 0.03,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      {/* 이메일 입력창 */}
      <View style={{marginHorizontal: 20, marginVertical: 24}}>
        <TextInput
          onChangeText={onChangeEmail}
          value={email}
          placeholder="이메일 주소"
          keyboardType="email-address"
          style={{
            fontSize: 15,
            height: 40,
            borderWidth: 1,
            borderColor: '#c4c4c4',
            borderRadius: 5,
          }}
        />
      </View>
      {/* 인증번호 입력창 */}
      <View style={styles.signup_code}>
        <TextInput
          onChangeText={onChangeCode}
          value={code}
          placeholder="인증코드 입력"
          keyboardType="numeric"
          style={{
            fontSize: 15,
            width: 172,
            height: 40,
            borderWidth: 1,
            borderColor: '#c4c4c4',
            borderRadius: 5,
          }}
        />

        {/* 인증코드 발송 버튼 */}
        <TouchableOpacity
          onPress={() => alert('ok')}
          style={{
            borderRadius: 53,
            backgroundColor: '#fd7f36',
            justifyContent: 'center',
            alignItems: 'center',
            width: 139,
            height: 40,
            marginRight: 25,
          }}>
          <NormalBoldLabel
            text={'인증코드 발송'}
            style={{fontSize: 18, color: '#fff'}}
          />
        </TouchableOpacity>
      </View>
      {/* 전화번호 입력란 */}
      <Text
        style={{
          color: '#000000',
          fontSize: 15,
          marginLeft: 26,
          marginTop: 28,
          fontWeight: 'bold',
        }}>
        전화번호
      </Text>
      <View
        style={{
          marginTop: 8,
          marginHorizontal: 23,
          minHeight: 40,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        {/* 전화번호 picker : 010,011,017 */}

        <Text
          style={{
            borderWidth: 1,
            borderColor: '#E3E5E5',
            borderRadius: 10,
            minWidth: 79,
            fontSize: 15,
            textAlign: 'center',
            paddingTop: 11,
          }}>
          010
        </Text>
        {/* 전화번호 picker : 010,011,017 */}

        <TextInput
          keyboardType="phone-pad"
          style={{
            marginLeft: 7,
            borderWidth: 1,
            borderColor: '#E3E5E5',
            width: 260,
            borderRadius: 10,
          }}></TextInput>
      </View>
      {/* 주의사항 */}
      <View style={{marginLeft: width * 0.05}}>
        <Image
          source={require('../../../assets/images/signup_caution.png')}
          style={{
            width: width * 0.85,
            resizeMode: 'contain',
            height: height * 0.14,
            marginTop: height * 0.03,
            marginBottom: 25,
          }}
        />
      </View>

      {/* 다음 버튼 */}
      <BottomButton text={'다음'} />

      {/* <View style={{marginLeft: width * 0.05}}>
        <TouchableOpacity onPress={gobtn}>
          <Image
            source={require('../../../assets/images/btn_next.png')}
            style={{
              width: width * 0.85,
              resizeMode: 'contain',
              height: height * 0.06,
              marginTop: height * 0.03,
            }}
          />
        </TouchableOpacity>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  signup_code: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: width * 0.05,
  },
  warn_text: {fontSize: 12, color: '#ff0000'},
});

export default Signup;
