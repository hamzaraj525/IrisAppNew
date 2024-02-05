import React, {useState, useEffect} from 'react';
import {View, Dimensions, ActivityIndicator, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Image} from 'react-native-compressor';

const ImageLoader = ({message, imageUrl}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <FastImage
        source={{
          uri: imageUrl,
          cache: FastImage.cacheControl.immutable,
          priority: FastImage.priority.high,
        }}
        style={{
          width: 160,
          height: 150,
          borderRadius: 10,
          marginBottom: message.text !== null ? 10 : 0,
        }}
        resizeMode={FastImage.resizeMode.cover}
        onLoad={() => {
          setIsLoading(false);
        }}
      />
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator
            size="small"
            color={message.user._id !== 'user' ? '#0078fe' : '#dedede'}
          />
        </View>
      )}
    </>
  );
};

export default ImageLoader;

const styles = StyleSheet.create({
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
