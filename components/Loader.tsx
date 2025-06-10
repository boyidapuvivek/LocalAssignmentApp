import Colors from "@/constants/Colors";
import React from "react";
import { ActivityIndicator, StyleSheet, View, ViewStyle } from "react-native";

interface LoaderProps {
  size?: "small" | "large";
  color?: string;
  fullScreen?: boolean;
  style?: ViewStyle;
}

const Loader: React.FC<LoaderProps> = ({
  size = "large",
  color = Colors.primary,
  fullScreen = true,
  style,
}) => {
  return (
    <View style={[fullScreen ? styles.fullScreen : styles.inline, style]}>
      <ActivityIndicator
        size={size}
        color={color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inline: {
    padding: 10,
    alignItems: "center",
  },
});

export default Loader;
