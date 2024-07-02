import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function Button({ title, onPress, disabled }: Props) {
  return (
    <TouchableOpacity
      className={`p-4 rounded-lg ${disabled ? 'bg-gray-400' : 'bg-blue-400'}`}
      disabled={disabled}
      onPress={onPress}
    >
      <Text className="text-white">{title}</Text>
    </TouchableOpacity>
  );
}
