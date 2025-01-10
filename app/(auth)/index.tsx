import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

interface Country {
  name: string;
  alphaCode: string;
  callCode: string;
  flag: string;
}

interface RestCountry {
  name: string;
  alpha2Code: string;
  callingCodes: string[];
  flags: {
    png: string;
  };
}

const defaultContry: Country = {
  name: "México",
  flag: "https://flagcdn.com/w320/mx.png",
  callCode: "52",
  alphaCode: "MX",
};

const Auth = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countrySelected, setCountrySelected] =
    useState<Country>(defaultContry);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((resp) => resp.json() as Promise<RestCountry[]>)
      .then((data) => {
        const parsedData: Country[] = data.map((item) => ({
          name: item.name,
          flag: item.flags.png,
          callCode: item.callingCodes[0],
          alphaCode: item.alpha2Code,
        }));

        setCountries(parsedData);
      });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "white" }}
        behavior="padding"
      >
        <SafeAreaView
          style={{ ...styles.container, backgroundColor: "orangeE" }}
        >
          <View
            style={{
              alignItems: "center",
              padding: 20,
            }}
          >
            <Image
              source={require("../../assets/images/secure.png")}
              style={{
                width: "80%",
                height: "auto",
                aspectRatio: 1 / 1,
              }}
            />
            <View
              style={{
                paddingVertical: 30,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 19,
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                Enter your phone number
              </Text>
              <Text style={{ textAlign: "center" }}>
                We will send you a verification code
              </Text>
            </View>
            <View
              style={{
                marginTop: 20,
                paddingBottom: 10,
                flexDirection: "row",
                borderBottomColor: "#e3e3e3",
                borderBottomWidth: 1,
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => setIsOpenModal(true)}
              >
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color="black"
                />
                <Image
                  source={{
                    uri: countrySelected.flag,
                  }}
                  style={{
                    width: 40,
                    height: 30,
                  }}
                  resizeMode="contain"
                />
                <Text style={{ paddingHorizontal: 10 }}>
                  +{countrySelected.callCode}
                </Text>
              </TouchableOpacity>
              <TextInput
                placeholder="Enter your phone number"
                placeholderTextColor="#b5b5b5"
                style={{
                  padding: 10,
                  flexGrow: 1,
                }}
                keyboardType="phone-pad"
                onChangeText={(val) => setPhoneNumber(val)}
                value={phoneNumber}
              />
            </View>
            <TouchableOpacity
              style={{
                width: "100%",
                paddingVertical: 14,
                paddingHorizontal: 10,
                marginTop: 40,
                borderRadius: 10,
                backgroundColor: phoneNumber ? "#ff8e63" : "#b5b5b5",
              }}
              disabled={!phoneNumber}
              onPress={() => router.push("/(auth)/otp-verification")}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                VERIFY
              </Text>
            </TouchableOpacity>
          </View>
          <Modal animationType="slide" visible={isOpenModal} style={{}}>
            <SafeAreaView
              style={{
                flex: 1,
                // backgroundColor: "#ff8e63",
              }}
            >
              <TouchableOpacity
                onPress={() => setIsOpenModal(false)}
                style={{
                  borderRadius: 999,
                  //   backgroundColor: "#fff",
                  backgroundColor: "#ff8e63",
                  position: "absolute",
                  top: 22,
                  right: 22,
                  padding: 5,
                }}
              >
                <MaterialIcons name="close" size={30} color="#fff" />
              </TouchableOpacity>
              <FlatList
                data={countries}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setCountrySelected(item);
                      setIsOpenModal(false);
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={{
                          uri: item.flag,
                        }}
                        style={{
                          objectFit: "cover",
                          width: 50,
                          height: 30,
                          /* height: "auto",
                        aspectRatio: "1/1", */
                        }}
                      />
                      <Text
                        style={{
                          paddingLeft: 10,
                          fontWeight: "700",
                          flex: 1,
                          //   color: "#fff",
                        }}
                        numberOfLines={1}
                      >
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.name}
                contentContainerStyle={{
                  paddingHorizontal: 20,
                }}
                ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                showsVerticalScrollIndicator={false}
              />
            </SafeAreaView>
          </Modal>

          <StatusBar hidden />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
