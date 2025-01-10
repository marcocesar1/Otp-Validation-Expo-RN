import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";

const Welcome = () => {
  const { width, height } = Image.resolveAssetSource(
    require("../../assets/images/welcome.png")
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/welcome.png")}
        style={{
          width: "100%",
          height: undefined,
          aspectRatio: width / height,
        }}
      />
      <TouchableOpacity
        style={{
          width: "100%",
          paddingVertical: 14,
          paddingHorizontal: 10,
          marginTop: 40,
          borderRadius: 10,
          backgroundColor: "#ff8e63",
        }}
        onPress={() => router.replace("/(auth)")}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          START AGAIN
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
});
