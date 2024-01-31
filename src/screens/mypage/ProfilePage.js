import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions , Image} from 'react-native';
import Background from '../../components/Background';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import goldlevel from '../../assets/gold-level.png';
import silverlevel from '../../assets/silver-level.png';
import greenlevel from '../../assets/green-level.png';

const { width } = Dimensions.get('window');

export default function ProfilePage() {
    const navigation = useNavigation();
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const [userInfo, setUserInfo] = useState({ name: '', email: '', address: '', grade: '' });

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = await AsyncStorage.getItem('Token');
                const response = await fetch(`${apiUrl}/profile`, {
                    method: 'GET',
                    headers: { 'x-access-token': token }
                });
                const data = await response.json();
                setUserInfo({
                    name: data.name,
                    email: data.email,
                    address: data.address,
                    grade: data.grade,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const renderlevel = (grade) => {
        switch (grade) {
            case 'GOLD':
                return <Image source={goldlevel} style={styles.level} />;
            case 'SILVER':
                return <Image source={silverlevel} style={styles.level} />;
            case 'GREEN':
                return <Image source={greenlevel} style={styles.level} />;
            default:
                return null;
        }
    };

    return (
        <Background>
          <View style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
            <BackButton goBack={() => navigation.navigate('Dashboard')} />
          </View>
          <Header>회원 정보</Header>
            <View style={styles.levelContainer}>
                {renderlevel(userInfo.grade)}
            </View>
            <InfoItem label="이름" value={userInfo.name} />
            <InfoItem label="이메일" value={userInfo.email} />
            <InfoItem label="주소" value={userInfo.address} />
        </Background>
    );
}

const InfoItem = ({ label, value }) => (
  <View style={styles.infoContainer}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 8,
        borderRadius: 5,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 0, width: 0 },
        elevation: 5,
        width: width - 40,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
    },
    levelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    marginTop: 20,
    marginBottom: 20,
},
});
