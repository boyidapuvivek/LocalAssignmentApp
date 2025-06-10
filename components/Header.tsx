import Back from "@/assets/images/back.svg";
import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  showback?: boolean;
  title: string;
};

const Header = ({ showback, title }: Props) => {
  return (
    <View style={styles.container}>
      {showback && (
        <Back
          height={24}
          width={24}
        />
      )}
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    marginTop: 40,
    gap: 20,
  },
  text: {
    fontFamily: "poppins-bold",
    fontSize: 25,
    color: Colors.primary,
  },
});

export default Header;
