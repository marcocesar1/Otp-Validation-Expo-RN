import {
  Text,
  View,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { OtpInput } from "react-native-otp-entry";
import { router } from "expo-router";

const OtpVerification = () => {
  const { width, height } = Image.resolveAssetSource(
    require("../../assets/images/check.png")
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      /* keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0} */
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={{ flex: 1 }}
      >
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/check.png")}
            style={{
              width: "100%",
              height: undefined,
              aspectRatio: width / height,
            }}
          />
          <Text style={styles.text}>Enter Verification Code</Text>
          <Text
            style={{
              ...styles.text,
              fontWeight: "400",
              marginBottom: 20,
            }}
          >
            We are automatically detecting SMS send to your mobile phone
          </Text>
          <OtpInput
            numberOfDigits={4}
            onTextChange={(text) => {
              if (text.length === 4) {
                router.push("/welcome");
              }
            }}
            focusColor="#ff8e63"
            theme={{
              pinCodeContainerStyle: {
                backgroundColor: "white",
                width: 58,
                height: 58,
                borderRadius: 12,
              },
            }}
          />
        </View>
        <StatusBar hidden />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  imageContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    marginTop: 16,
    fontWeight: "700",
  },
});
