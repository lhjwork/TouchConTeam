import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  Calendar,
  LocaleConfig,
  CalendarList,
  Agenda,
} from 'react-native-calendars';
import dayjs from 'dayjs';
import {saveSessionToken} from '../redux/authSlice';
import api from '../api';
import {useSelector} from 'react-redux';

LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ],
  dayNames: [
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
    '일요일',
  ],
  dayNamesShort: ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'],
  // dayNamesShort: ['월','화','수','목','금','토','일'],
  // today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'ko';

const CalendarTc = ({dates}) => {
  const auth = useSelector(state => state.auth);
  const [date, setDate] = useState([]);
  const [arrayDate, setArrayDayes] = useState();

  let markedDay = {};
  dates.map(item => {
    markedDay[item[1]] = {
      selected: true,
      startingDay: true,
      endingDay: true,
      textColor: '#fff',
      selectedColor: 'purple',
      color: '#FD7F36',
    };
  });
  useEffect(() => {
    // {
    //   for (let i = 0; i <= dates.length; i++) {
    // dates[i][1];
    console.log(dates);
    //   }
    // }
    // setArrayDayes(dates);
  }, []);

  return (
    <Calendar
      style={styles.calendar}
      markingType="period"
      markedDates={markedDay}
      theme={{
        arrowColor: '#6f6f6f',
        'stylesheet.calendar.header': {
          header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            // paddingHorizontal: 10,
            marginTop: 0,
            marginBottom: 16,
            alignItems: 'center',
          },
          monthText: {
            fontWeight: 'bold',
            fontSize: 20,
            lineHeight: 24,
            color: '#6f6f6f',
          },
          arrow: {
            padding: 5,
            // marginHorizontal: 8,
          },
          dayHeader: {
            marginVertical: 9,
            // textAlign: 'center',
            fontSize: 20,
            lineHeight: 24,
            color: '#fff',
            fontWeight: 'bold',
          },
          week: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: '#FD7F36',
          },
        },
        disabledArrowColor: '#adadad',
        todayTextColor: '#FD7F36',
      }}
      minDate={dayjs(new Date()).format('YYYY-MM-DD')}
      // onDayPress={day => {
      //   console.log('onDayPress selectedDay', day, day.dateString);
      //   // newSelectedDates[day.dateString] = {
      //   //   date: day.dateString,
      //   //   startTime: '',
      //   //   endTime: '',
      //   // };

      //   let newMarked = Object.assign({}, marked);
      //   if (!!newMarked[day.dateString]) {
      //     return;
      //     // delete newMarked[day.dateString];
      //   } else {
      //     newMarked[day.dateString] = {
      //       selected: true,
      //       startingDay: true,
      //       endingDay: true,
      //       textColor: '#fff',
      //       color: '#FD7F36',
      //     };
      //   }
      //   setMarked(newMarked);
      //   onDayPress();
      // }}
      // onDayLongPress={day => {
      //   console.log('longPress selectedDay', day);
      //   let newMarked = Object.assign({}, marked);
      //   if (!!newMarked[day.dateString]) {
      //     return;
      //     // delete newMarked[day.dateString];
      //   } else {
      //     newMarked[day.dateString] = {
      //       selected: true,
      //       startingDay: true,
      //       endingDay: true,
      //       textColor: '#fff',
      //       color: '#FD7F36',
      //     };
      //   }
      //   setMarked(newMarked);
      //   onDayPress();
      // }}
      // monthFormat={'yyyy년 MM월'}
      monthFormat={'M월'}
      onMonthChange={month => {
        console.log('month changed', month);
      }}

      // enableSwipeMonths={true}
    />
  );
};

export default CalendarTc;

const styles = StyleSheet.create({
  calendar: {
    marginTop: 35,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    paddingVertical: 19,
  },
});
