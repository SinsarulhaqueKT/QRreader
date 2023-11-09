import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const QrHistory = () => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://192.168.1.106:1000/history');
      setHistory(response.data);
      console.log(response.data);
      console.log('Success');
    } catch (error) {
      console.error('Axios error:', error);
      console.log('Bye');
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  console.log(history);

  return (
    <View style={{backgroundColor:'black',height:1000}}>
      <View
        style={{
          backgroundColor: 'black',
          height: 100,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '900',
            textAlign: 'center',
            paddingLeft: 20,
            color: 'white',
          }}>
          Scanned QR History
        </Text>
      </View>
      {/* <TouchableOpacity onPress={() => fetchHistory()} style={{ backgroundColor: 'black', height: 100 }}>
        <Text>Click Here</Text>
      </TouchableOpacity> */}
      <FlatList
        data={history}
        renderItem={({item, index}) => (
          <View style={{backgroundColor: 'black', paddingTop: 20}}>
            <Text style={{color: 'white', fontSize: 17,paddingLeft:20}} key={index}>
              {item.urls}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default QrHistory;
