import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://10.0.2.2:5000";

export const startChat = async (user, navigation) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/chat/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        receiverId: user._id
      })
    });

    const data = await res.json();

    if (!data.chatRoom) {
      console.log("ChatRoom missing");
      return;
    }

    // navigation.navigate("ChatScreen", {
    //   roomId: data.chatRoom._id,
    //   user
    // });

    navigation.navigate("ChatStack", {
      screen: "ChatScreen",
      params: {
        roomId: data.chatRoom._id,
        user
      }
    });

  } catch (err) {
    console.log("Start chat error:", err);
  }
};