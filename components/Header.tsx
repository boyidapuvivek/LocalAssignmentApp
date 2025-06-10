import Back from "@/assets/images/back.svg";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  showback?: boolean;
  title: string;
  children?: ReactNode;
};

const Header = ({ showback, title, children }: Props) => {
  const router = useRouter();

  const handlePress = () => {
    router.back();
  };

  return (
    <View style={styles.maincontainer}>
      <View style={styles.container}>
        {showback && (
          <TouchableOpacity onPress={handlePress}>
            <Back
              height={24}
              width={24}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.text}>{title}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 50,
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: "poppins-bold",
    fontSize: 25,
    color: Colors.primary,
    marginLeft: 10,
  },
});

export default Header;
