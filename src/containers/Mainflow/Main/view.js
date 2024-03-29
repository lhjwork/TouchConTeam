import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Navbar from '../../../components/Navbar/view';
import Swiper from 'react-native-swiper';
import RowView from '../../../components/RowView';
import Touchable from '../../../components/Touchable';
import {NormalBoldLabel, NormalLabel} from '../../../components/Label';
import WhiteSafeAreaView from '../../../components/WhiteSafeAreaView';
import TouchableNoFeedback from '../../../components/TouchableNoFeedback';
import Entypo from 'react-native-vector-icons/Entypo';
import api from '../../../api';

const AD_MENU = [
  {
    id: 1,
    name: 'CAOLION',
    path: 'https://www.caolion.com',
    img: require('../../../assets/images/taa/taa_log3.png'),
    //
    title: 'CAOLION',
    subtitle: '한국 천연화장품의 메카, 카오리온',
    buttonUrl: 'Shopping',
    footer:
      '카오리온 화장품에서 취급하는 모든 제품 구매에 리워드콘이 제공됩니다.\n자세한 것은 카오리온 이벤트를 참조하시기 바랍니다.',
  },
  {
    id: 2,
    name: '크리에이션엘',
    path: 'https://www.stylelq.com',
    img: require('../../../assets/images/taa/log1.jpg'),
    title: '크리에이션엘',
    subtitle: "프랑스 정통 브랜드 '루이까또즈'",
    buttonUrl: '',
    footer:
      '크리에이션엘에서 구매하시는 모든 제품 및 서비스에 대하여 리워드콘\n 1매씩을 증정합니다.자세한 것은 크리에이션엘 홈페이지를 참조해 주세요.',
  },

  {
    id: 3,
    name: '안동국밥',
    path: 'https://bit.ly/3v68Na3',
    img: require('../../../assets/images/main/main_andong.png'),
    title: 'ANDONGGUKBOB',
    subtitle: '전통 한식 문화의 장을 열어가는 웰빙 안동본가국밥',
    buttonUrl: '',
    footer:
      '안동본가국밥 프랜차이즈 직영점 및 가맹점에서 식사 및 주문하시는 모든 분께\n리워드콘 1매씩을 증정합니다. 자세한 것은 홈페이지를 참조해 주세요.',
  },
  {
    id: 4,
    name: 'MUKKEBI',
    path: 'https://www.mukkebi.com',
    img: require('../../../assets/images/main/main_mukkei.png'),
  },
  {
    id: 5,
    name: 'SANABA',
    path: 'https://sanava.me',
    img: require('../../../assets/images/main/main_sanava.png'),
  },
  {
    id: 6,
    name: 'KRFOOD',
    path: 'http://www.krfood.org',
    img: require('../../../assets/images/main/main_krfood.png'),
  },
  {
    id: 7,
    name: 'MEGABOX',
    path: 'https://www.megabox.co.kr',
    img: require('../../../assets/images/main/main_megabox.png'),
  },
  {
    id: 8,
    name: 'JAPAN DRUG',
    path: 'https://japandrug.jp',
    img: require('../../../assets/images/main/main_japan.jpg'),
  },
  {
    id: 9,
    name: '제주안심코드',
    path: 'https://bit.ly/3Bopbnq',
    img: require('../../../assets/images/main/main_jeju.png'),
  },
];
const menu = {
  id: 1,
  name: 'CAOLION',
  path: 'GfCaolion',
  img: require('../../../assets/images/taa/taa_log3.png'),
  title: 'CAOLION',
  subtitle: '한국 천연화장품의 메카, 카오리온',
  buttonUrl: 'Shopping',
  footer:
    '카오리온 화장품에서 취급하는 모든 제품 구매에 리워드콘이 제공됩니다.\n자세한 것은 카오리온 이벤트를 참조하시기 바랍니다.',
};

function leftPad(value) {
  if (value >= 10) {
    return value;
  }
  return `0${value}`;
}

function toStringByFormatting(source, delimiter = '-') {
  const year = source.getFullYear();
  const month = leftPad(source.getMonth() + 1);
  const day = leftPad(source.getDate());
  return [year, month, day].join(delimiter);
}

export default function Main({navigation}) {
  const [noticePosts, setNoticePosts] = useState([]); //0번째 공지사항 저장
  const fetchNotice = async () => {
    let body = {Type: 'notice'};
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await api.post('notices', JSON.stringify(body), config);
      // console.log(res);
      if (res?.data.Result === 'no notices') {
        return;
      }
      setNoticePosts(res?.data?.Result[0]);
      // navigation.navigate('Wallet');
      console.log(res.data.Result);
    } catch (err) {
      // Alert.alert('', '서버와 통신에 실패');
      console.log('err', err);
    }
  };
  useEffect(() => {
    fetchNotice();
  }, []);
  return (
    <WhiteSafeAreaView>
      <Navbar />
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={{paddingBottom: 50}}>
        <RowView
          style={{
            paddingHorizontal: 24,
            marginTop: 17,
            flex: 1,
          }}>
          {/* 최상단 터치콘 박스 로고와 함께 있음 start */}
          <TouchableNoFeedback
            style={styles.coinBtn}
            onPress={() => navigation.navigate('TouchCon')}>
            <Image
              source={require('../../../assets/icons/coin_icon.png')}
              style={{
                width: 71,
                height: 70,
              }}
            />
            <View style={{alignItems: 'flex-start', width: '100%', margin: 20}}>
              <NormalBoldLabel
                text={'내 터치콘'}
                style={{
                  fontSize: 20,
                  lineHeight: 24,
                  color: '#000000',
                }}
              />
            </View>
          </TouchableNoFeedback>
          {/* 최상단 터치콘 박스 로고와 함께 있음 end */}

          {/* 우측 스켄 이미지 start */}
          <Touchable onPress={() => navigation.navigate('MyCoupon')}>
            <Image
              source={require('../../../assets/images/scan.png')}
              style={{
                width: 86,
                height: 86,
                marginLeft: 11,
                // width: width * 0.24,
                // height: height * 0.24,
              }}
            />
          </Touchable>
          {/* 우측 스켄 이미지 end*/}
        </RowView>

        {/* 공지 글 들어올 자리 */}
        {noticePosts?.Title && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Notice');
            }}>
            <NormalLabel
              style={{
                textAlign: 'center',
                color: '#555',
                paddingVertical: 4,
                marginTop: 17,
                backgroundColor: 'rgba(14, 15, 15, 0.15)',
              }}
              // title={list.Title}
              // content={list.Subject}
              // date={list.Date}
              text={
                `[공지] ${noticePosts?.Title} ${noticePosts?.Date}`
                // toStringByFormatting(new Date(), '.')
              }
            />
          </TouchableOpacity>
        )}

        {/* 이벤트 스와이프 */}
        <Swiper
          // scrollEnabled={false}
          autoplay
          style={styles.swiperContainer}
          dotStyle={{
            backgroundColor: '#c4c4c4',
            width: 7,
            height: 7,
            borderRadius: 3.5,
            marginLeft: 20,
          }}
          activeDotStyle={{
            backgroundColor: '#5F408F',
            width: 10,
            height: 10,
            borderRadius: 5,
            marginLeft: 20,
          }}
          paginationStyle={{
            zIndex: 1,
            position: 'absolute',
            bottom: 0,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('GfCaolion', {menu});
            }}
            style={{flex: 1, justifyContent: 'center'}}>
            {/* <RowView style={styles.swiperContentWrapper}>
              <NormalBoldLabel
                text={'유럽 미인들의 필수품'}
                style={{color: '#fff'}}
              />
              <NormalBoldLabel
                text={'카오리온 화장품'}
                style={{color: '#fff', fontSize: 20, lineHeight: 24}}
              />
            </RowView> */}
            <Image
              source={require('../../../assets/images/caorion_swiper.png')}
              style={{width: '100%', height: '100%'}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Thumbnail2')}
            style={{flex: 1, justifyContent: 'center'}}>
            {/* <RowView style={styles.swiperContentWrapper}>
              <NormalBoldLabel
                text={'매일 매일 출석만 해도!'}
                style={{color: '#fff'}}
              />
              <NormalBoldLabel
                text={'터치토큰 증정'}
                style={{color: '#fff', fontSize: 20, lineHeight: 24}}
              />
            </RowView> */}
            <Image
              source={require('../../../assets/images/thumnail_swiper2.png')}
              style={{width: '100%', height: '100%'}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Thumbnail3')}
            style={{flex: 1, justifyContent: 'center'}}>
            <Image
              source={require('../../../assets/images/thumnail_swiper3.png')}
              style={{width: '100%', height: '100%'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Thumbnail4')}
            style={{flex: 1, justifyContent: 'center'}}>
            <Image
              source={require('../../../assets/images/thumnail_swiper4.png')}
              style={{width: '100%', height: '100%'}}
            />
          </TouchableOpacity>
        </Swiper>

        <View style={styles.stackingWrapper}>
          <NormalBoldLabel text={'TOC 스테이킹 하기'} style={{color: '#fff'}} />
          <Image
            style={{width: 25, height: 16}}
            source={require('../../../assets/icons/stacking_arrow.png')}
          />
          <Touchable
            style={styles.stackingBtn}
            onPress={() => {
              navigation.navigate('Staking');
            }}>
            <NormalBoldLabel text={'신청'} style={{color: '#fff'}} />
          </Touchable>
        </View>

        <View style={styles.adContainer}>
          <NormalBoldLabel
            text={'터치콘 RAP 얼라이언스 파트너'}
            style={styles.adTopText}
          />
          {AD_MENU.map((menu, i) => (
            <AdMenu menu={menu} index={i} key={i} />
          ))}
        </View>

        {/* 터치 쇼핑몰 쇼핑하기 start */}
        <Touchable
          onPress={() => navigation.navigate('Shopping')}
          style={styles.shoppingBtn}>
          <NormalBoldLabel
            text={'터치 쇼핑몰 쇼핑하기'}
            style={{
              color: '#fff',
              fontSize: 20,
              lineHeight: 24,
              flex: 1,
              textAlign: 'center',
            }}
          />
          {/*<NormalBoldLabel text={'+'} style={{marginLeft: 29, color: '#fff'}} />*/}
          <Entypo
            name="plus"
            size={32}
            color={'#fff'}
            style={{position: 'absolute', right: 10}}
          />
        </Touchable>
        {/* 터치 쇼핑몰 쇼핑하기 end */}

        {/* 최하단 : 나의 리워드*/}
      </ScrollView>

      <Touchable
        style={styles.bottomBtn}
        onPress={() => {
          navigation.navigate('SaveCoupon');
        }}>
        <NormalBoldLabel text={'리워드콘 스캔 이력'} style={{color: '#fff'}} />
      </Touchable>
    </WhiteSafeAreaView>
  );
}

const AdMenu = ({menu, index}) => {
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;
  return (
    <RowView
      style={{
        ...styles.adContent,
        // borderBottomWidth: index !== AD_MENU.length - 1 ? 1 : 0,
        borderBottomWidth: 1,
      }}>
      {/* <NormalBoldLabel text={menu.name} style={{color: '#555'}} /> */}
      <Image
        source={menu.img}
        style={{width: width / 4.5, height: 20, maxWidth: 100}}
        resizeMode={'contain'}
      />
      <RowView>
        <NormalBoldLabel text={menu.name} style={{color: '#555'}} />
        <Touchable
          onPress={() => {
            if (menu.path === '') {
              Alert.alert('준비중입니다.');
              return;
            }
            Linking.openURL(menu.path);
          }}
          style={styles.adBtn}>
          <NormalBoldLabel
            text={'GO'}
            style={{color: '#fff', fontSize: 18, lineHeight: 22}}
          />
        </Touchable>
      </RowView>
    </RowView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  coinBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 20,
    borderColor: '#5F408F',
    borderRadius: 5,
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
  },
  swiperContainer: {
    height: 100,
  },
  swiperContentWrapper: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal: 33,
    alignItems: 'center',
    backgroundColor: '#82A9CD',
    // paddingBottom: 24
  },
  swiperContentWrapper2: {
    flex: 1,
    paddingHorizontal: 33,
    alignItems: 'center',
    backgroundColor: '#FFB82E',
    // paddingBottom: 24
  },
  swiperContentWrapper3: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal: 33,
    alignItems: 'center',
    backgroundColor: '#80D5AC',
    // paddingBottom: 24
  },
  stackingWrapper: {
    marginTop: 25,
    marginHorizontal: 17.5,
    paddingVertical: 9.5,
    paddingHorizontal: 21,
    // backgroundColor: '#0E0F0FCC',
    backgroundColor: '#46BEFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  stackingBtn: {
    paddingVertical: 7,
    paddingHorizontal: 10.5,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
  },
  adContainer: {
    marginTop: 25,
    marginHorizontal: 23,
    borderColor: '#c4c4c4',
    borderWidth: 1,
    borderRadius: 10,
  },
  adTopText: {
    color: '#555',
    textAlign: 'center',
    paddingVertical: 17,
    backgroundColor: '#c4c4c4',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  adContent: {
    backgroundColor: '#fff',
    borderColor: '#c4c4c4',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 13,
  },
  adBtn: {
    backgroundColor: '#5F408F',
    borderRadius: 53,
    paddingVertical: 7.5,
    paddingHorizontal: 25,
    marginLeft: 14,
  },
  bottomBtn: {
    paddingVertical: 15.5,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(14, 15, 15, 0.8)',
    backgroundColor: '#46BEFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  shoppingBtn: {
    marginTop: 40,
    marginHorizontal: 24,
    paddingVertical: 15,
    backgroundColor: '#5F408F',
    borderRadius: 53,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
