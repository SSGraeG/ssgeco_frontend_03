import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import Background from '../../components/Background';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const StarRating = ({ count }) => {
  let stars = '';
  for (let i = 0; i < count; i++) {
    stars += '★ ';
  }
  return <Text style={styles.starRating}>{stars}</Text>;
};

export default function MyECO() {
  const navigation = useNavigation();
  const [mileageInfo, setMileageInfo] = useState({
    mileageCount: 0,
    donationCount: 0,
    ecoMileage: 0,
    coupons: []
  });
  useEffect(() => {
    // API 호출을 통해 마일리지 정보 가져오기
    const fetchMileageInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('Token');
        const response = await fetch(`${apiUrl}/get_mileage_info`, {
          headers: {
            'x-access-token': token,
          },
        });
        const data = await response.json();
        
        // 서버에서 받은 데이터로 상태 업데이트
        setMileageInfo(data.result);
      } catch (error) {
        console.error('Error fetching mileage info:', error);
      }
    };

    // API 호출 함수 호출
    fetchMileageInfo();
  }, []);

  return (
    <Background>
      <View style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
        <BackButton goBack={() => navigation.navigate('Dashboard')} />
      </View>
      <Header>My ECO</Header>
      <Card containerStyle={styles.cardStyle}>
        <Card.Title>마일리지 정보</Card.Title>
        <Card.Divider />
        <Text>마일리지 적립 횟수: {mileageInfo.mileage_count}</Text>
        <StarRating count={mileageInfo.mileageCount} />
        <Text>기부 횟수: {mileageInfo.donation_count}</Text>
        <Text>에코 마일리지: {mileageInfo.current_mileage}</Text>
      </Card>
      {mileageInfo.coupons.length > 0 && (
      <Card containerStyle={styles.cardStyle}>
        <Card.Title>보유 쿠폰</Card.Title>
        <Card.Divider />
        {mileageInfo.coupons.map((coupon, index) => (
          <Text key={index}>{coupon.category_name} | {coupon.expired_date}</Text>
        ))}
      </Card>
      )}
    </Background>
  );
}

const styles = StyleSheet.create({
  cardStyle: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
  },
   starRating: {
    fontSize: 18,
    color: '#ffd700', // 별 색상 설정
  },
});
