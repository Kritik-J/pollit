import { StyleSheet, Image } from "react-native";
import React from "react";

type AvatarProps = {
  uri: string;
  size?: number;
  borderRadius?: number;
  ImageProps?: any;
};

const Avatar = (props: AvatarProps) => {
  const { uri, size = 50, borderRadius = size / 2, ImageProps } = props;

  return (
    <Image
      source={{ uri }}
      style={{ width: size, height: size, borderRadius }}
      {...ImageProps}
    />
  );
};

export default Avatar;

const styles = StyleSheet.create({});
