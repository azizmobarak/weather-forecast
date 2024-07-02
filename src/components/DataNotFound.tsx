import React from 'react';
import { View, Image } from 'react-native';

export default function DataNotFound() {
  return (
    <View className="p-4 w-full flex items-center justify-center">
      <Image
        className="h-[300px]"
        source={require('../assets/no-data-found.png')}
      />
    </View>
  );
}
