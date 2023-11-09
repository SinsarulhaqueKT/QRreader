import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Image,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const Home = () => {
  const navigation = useNavigation();
  const [scannedUrl, setScannedUrl] = useState(null);
  const [flashlightOn, setFlashlightOn] = useState(true);
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);

  const onSuccess = e => {
    if (e && e.data) {
      const scannedUrl = e.data;

      axios
        .post('http://192.168.1.106:1000/insert', {urls: scannedUrl})
        .then(response => {
          console.log('Successful response:', response.data);
        })
        .catch(error => {
          console.error('Axios error:', error);
        });

      Linking.openURL(scannedUrl).catch(err =>
        console.error('An error occurred', err),
      );

      setScannedUrl(scannedUrl);
    }
  };


  const torchControl = () => {
    setFlashlightOn(!flashlightOn);
    if (flashlightOn == true) {
      setFlash(RNCamera.Constants.FlashMode.off)
    } else {
      setFlash(RNCamera.Constants.FlashMode.torch)
    }
  };

  const restartScan = () => {
    setScannedUrl(null);
  };
  const navigateToQrHistory = () => {
    navigation.navigate('History');
  };

  return (
    <View style={styles.container}>
      {scannedUrl ? (
        <View style={styles.scannedContainer}>
          <Text style={styles.textBold}>Scanned QR Code:</Text>
          <Text style={{top: 30}}>{scannedUrl}</Text>
          <TouchableOpacity
            onPress={restartScan}
            style={styles.scanAgainButton}>
            <Text style={{fontSize: 16, color: 'black', fontWeight: '500'}}>
              Scan Again
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.qrScannerContainer}>
          <Text style={styles.textBold}>Scan your QR here!</Text>
          <QRCodeScanner
            onRead={onSuccess}
            flashMode={flash}
            showMarker={true}
            bottomContent={
              <Text style={styles.centerText}>
                
              </Text>
            }
          />
          <TouchableOpacity onPress={torchControl}>
            <Image
              source={require('./Images/flashlight.png')}
              style={styles.flashlightIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 250,
              backgroundColor: 'white',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
              top: -30,
            }}
            onPress={navigateToQrHistory}>
            <Text style={{fontSize: 16, color: 'black', fontWeight: '500'}}>
              Click Here to see History
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrScannerContainer: {
    alignItems: 'center',
  },
  scannedContainer: {
    alignItems: 'center',
  },
  centerText: {
    fontSize: 18,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: 'white',
    top: 20,
  },
  flashlightIcon: {
    width: 30,
    height: 30,
    top: -160,
  },
  scanAgainButton: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 30,
    top: 30,
  },
});

export default Home;
