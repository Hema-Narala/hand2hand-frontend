import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Modal
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system/legacy";
import styles from "../../styles/MarketplaceScreenStyles/ChatScreenStyles";
import BASE_URL from "../../utils/api";
import socket from "../../utils/socket";

// const socket = io("http://10.0.2.2:5000");
// const socket = io("https://your-render-backend.onrender.com");


// const BASE_URL = "http://10.0.2.2:5000";

const ChatScreen = ({ route, navigation }) => {

  const { roomId, user } = route.params;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [myId, setMyId] = useState(null);

  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const [currentSound, setCurrentSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [isSending, setIsSending] = useState(false);

  const [selectedImages, setSelectedImages] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const flatListRef = useRef();

  // ================= GET MY ID =================
  useEffect(() => {
    const getUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      const parsed = JSON.parse(userData);
      setMyId(parsed?.userid || parsed?._id);
      // console.log("MY ID:", parsed?.userid);
    };
    getUser();
  }, []);


  // ================= socket useEffect =================
  useEffect(() => {
    if (!myId) return; // 🔥 CRITICAL FIX

    socket.emit("joinRoom", roomId);

    socket.on("newMessage", (message) => {
      setMessages(prev => [...prev, message]);

      socket.emit("messageDelivered", {
        messageId: message._id,
        userId: myId
      });
    });

    return () => {
      socket.off("newMessage");
    };
  }, [roomId, myId]); // 🔥 ADD myId

  // ================= MARK SEEN WHEN OPEN CHAT=================
  useEffect(() => {
    socket.on("messageDelivered", ({ messageId, userId }) => {
      setMessages(prev =>
        prev.map(msg =>
          msg._id === messageId
            ? {
                ...msg,
                deliveredTo: [...new Set([...(msg.deliveredTo || []), userId])]
              }
            : msg
        )
      );
    });

    socket.on("messageSeen", ({ messageId, userId }) => {
      setMessages(prev =>
        prev.map(msg =>
          msg._id === messageId
            ? {
                ...msg,
                seenBy: [...new Set([...(msg.seenBy || []), userId])]
              }
            : msg
        )
      );
    });

    return () => {
      socket.off("messageDelivered");
      socket.off("messageSeen");
    };
  }, []);

  // ================= FETCH MESSAGES =================
  const fetchMessages = async () => {
    const token = await AsyncStorage.getItem("token");

    const res = await fetch(
      `${BASE_URL}/api/chat/messages/${roomId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    const data = await res.json();
    setMessages(data.messages || []);

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    // if (!myId) return;

    fetchMessages(); // 🔥 CALL IMMEDIATELY

    const unsubscribe = navigation.addListener("focus", () => {
      fetchMessages();
    });

    return unsubscribe;
  }, [navigation, myId]);

  // ================= FIX SEEN LOGIC =================
  useEffect(() => {
    if (!myId) return;

    messages.forEach(msg => {
      if (String(msg.sender) !== String(myId) && !(msg.seenBy || []).includes(myId)) {
      // if (String(msg.sender) !== String(myId)) {
        socket.emit("messageSeen", {
          messageId: msg._id,
          userId: myId
        });
      }
    });
  }, [messages.length]);

  // ================= PICK & SEND IMAGE =================
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        quality: 0.7
      });

      if (result.canceled) return;

      // Store selected images only, don't upload
      const selected = result.assets.slice(0, 3);

      if (result.assets.length > 3) {
        alert("Only first 3 images will be selected");
      }

      setSelectedImages(selected);

    } catch (err) {
      console.log(err);
    }
  };
  // const pickImage = async () => {
  //   try {
  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ["images"],
  //       quality: 0.7
  //     });

  //     if (result.canceled) return;

  //     const imageUri = result.assets[0].uri;

  //     const token = await AsyncStorage.getItem("token");

  //     const formData = new FormData();
  //     formData.append("images", {
  //       uri: imageUri,
  //       name: "chat.jpg",
  //       type: "image/jpeg"
  //     });
  //     formData.append("roomId", roomId);
  //     formData.append("messageType", "image");

  //     const res = await fetch(`${BASE_URL}/api/chat/message`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       },
  //       body: formData
  //     });

  //     const data = await res.json();


  //     setTimeout(() => {
  //       flatListRef.current?.scrollToEnd({ animated: true });
  //     }, 100);

  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // ================= REMOVE SELECTED IMAGES IN CHATS =================
  const removeSelectedImage = (index) => {
    setSelectedImages(prev =>
      prev.filter((_, i) => i !== index)
    );
  };

  // ================= SEND SELECTED IMAGES IN CHATS =================
  const sendSelectedImages = async () => {

    if (selectedImages.length === 0 || isSending) return;

    setIsSending(true);

    try {
      const token = await AsyncStorage.getItem("token");

      const formData = new FormData();

      selectedImages.forEach((img, index) => {
        formData.append("images", {
          uri: img.uri,
          name: img.fileName || `chat_${index}.jpg`,
          type: img.mimeType || "image/jpeg"
        });
      });

      formData.append("roomId", roomId);
      formData.append("messageType", "image");

      console.log("SENDING IMAGES:", selectedImages.length);

      const res = await fetch(
        `${BASE_URL}/api/chat/message`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        }
      );

      const data = await res.json();

      console.log("BACKEND RESPONSE:", data);

      setSelectedImages([]);

    } catch (err) {
      console.log("SEND IMAGE ERROR:", err);

    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    // console.log(
    //   "SELECTED IMAGES UPDATED:",
    //   selectedImages.length
    // );

    selectedImages.forEach((img, index) => {
      console.log(`IMAGE ${index}:`, img.uri);
    });

  }, [selectedImages]);

  // ================= START RECORDING =================
  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      });

      // const { recording } = await Audio.Recording.createAsync(
      //   Audio.RecordingOptionsPresets.HIGH_QUALITY
      // );
      const { recording } = await Audio.Recording.createAsync({
        android: {
          extension: ".m4a",
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: ".m4a",
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      });

      setRecording(recording);
      setIsRecording(true);

    } catch (err) {
      console.log(err);
    }
  };

  // ================= STOP RECORDING =================
  const stopRecording = async () => {
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      setIsRecording(false);
      setRecording(null);

      

      if (!uri) return;

      // 🔥 Convert to Base64
      const base64Audio = await FileSystem.readAsStringAsync(uri, {
        encoding: "base64",
      });

      const token = await AsyncStorage.getItem("token");

      // 🔥 Send as JSON (NO FormData)
      const res = await fetch(`${BASE_URL}/api/chat/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          roomId,
          messageType: "audio",
          audio: base64Audio,
        }),
      });

      // const data = await res.json();
      // setMessages(prev => [...prev, data.message]);

      // const data = await res.json();
      // console.log("Audio sent:", data);

    } catch (err) {
      console.log("Recording error:", err);
    }
  };

  // ================= SEND TEXT =================
  const sendMessage = async () => {
    if (!text.trim()) return;

    const token = await AsyncStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/chat/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        roomId,
        text,
        messageType: "text"
      })
    });

    // const data = await res.json();

    // setMessages(prev => [...prev, data.message]);
    setText("");

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // ================= PLAY AUDIO =================
  const playAudio = async (base64Data) => {
    try {
      console.log("PLAY CLICKED");

      if (!base64Data) return;

      // stop previous audio
      if (currentSound) {
        await currentSound.stopAsync();
        await currentSound.unloadAsync();
        setCurrentSound(null);
        setIsPlaying(false);
        return;
      }

      let cleanBase64 = base64Data;
      if (base64Data.includes("base64,")) {
        cleanBase64 = base64Data.split("base64,")[1];
      }

      const fileUri = FileSystem.cacheDirectory + `audio_${Date.now()}.m4a`;

      await FileSystem.writeAsStringAsync(fileUri, cleanBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log("Audio file ready:", fileUri);

      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        playThroughEarpieceAndroid: false,
        shouldDuckAndroid: true,
      });

      const { sound } = await Audio.Sound.createAsync(
        { uri: fileUri },
        { shouldPlay: false } // 🔥 IMPORTANT CHANGE
      );

      setCurrentSound(sound);
      setIsPlaying(true);

      // 🔥 THIS LINE WAS MISSING
      await sound.playAsync();

      console.log("Audio PLAYING NOW");

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isPlaying) {
          setIsPlaying(true);
        }

        if (status.didJustFinish) {
          sound.unloadAsync();
          setCurrentSound(null);
          setIsPlaying(false);
        }
      });

    } catch (err) {
      console.log("AUDIO FINAL ERROR:", err);
    }
  };

  // ================= TYPING INDICATOR =================
  const [isTyping, setIsTyping] = useState(false);
  const handleTyping = () => {
    socket.emit("typing", { roomId });
  };

  // ================= RENDER MESSAGE =================
  const renderMessage = ({ item }) => {
    const isMe = String(item.sender) === String(myId);
    // console.log("CHECK:", item.sender, myId, isMe);
    // const isMe = item.sender === myId;
    // const isSeen = item.seenBy?.length > 0;
    // const isDelivered = item.deliveredTo?.length > 0;
    const otherUserId = user?._id || user?.userid;

    const isSeen = item.seenBy?.includes(otherUserId);
    const isDelivered = item.deliveredTo?.includes(otherUserId);

    return (
      <View
        style={[
          styles.messageContainer,
          { alignItems: isMe ? "flex-end" : "flex-start" }
        ]}
      >
        <View
          style={[
            item.messageType === "image"
              ? {
                  maxWidth: "85%"
                }
              : [
                  styles.bubble,
                  isMe ? styles.myBubble : styles.otherBubble
                ]
          ]}
        >

          {/* TEXT */}
          {item.messageType === "text" && (
            <Text style={styles.messageText}>{item.text}</Text>
          )}

          {/* IMAGE */}
          {item.messageType === "image" &&
            item.images?.length > 0 && (

            <View style={{ flexDirection: "row" }}>
              {item.images.map((img, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setModalImage(img);
                    setShowImageModal(true);
                  }}
                >
                  <Image
                    source={{ uri: img }}
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 10,
                      marginRight: 5
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>

          )}

          {/* AUDIO */}
          {item.messageType === "audio" && (
            <TouchableOpacity
              style={styles.audioBtn}
              onPress={() => playAudio(item.audio)}
            >
              {/* <Ionicons name="play" size={20} color="#fff" /> */}
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={20}
                color="#fff"
              />
              <Text style={styles.audioText}>Voice Message</Text>
            </TouchableOpacity>
          )}
      
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}>
            {/* TIME */}
            <Text style={styles.time}>
              {item.createdAt
                ? new Date(item.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                : ""}
            </Text>
          
            {/* TICKS */} 
            {/* {isMe && (
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: 5,
                  color: isSeen ? "purple" : "#716f6f"
                }}
              >
                {isSeen ? "✔✔" : isDelivered ? "✔✔" : "✓"}
              </Text>
            )} */}
            {isMe && (
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: 5,
                  color: isSeen ? "purple" : "#716f6f"
                }}
              >
                {isSeen ? "✔✔" : isDelivered ? "✔✔" : "✓"}
              </Text>
            )}

          </View>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={["#c6a0ee", "#a8bfe6"]}
      style={styles.container}
    >

      {/* ================= HEADER ================= */}
      <TouchableOpacity style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={26} color="#090808" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.userHeader}
          onPress={() => {
            // console.log("USER ROLE:", user.role);
            // console.log("USER:", user);
            if (user.role === "worker") {

              navigation.navigate(
                "ViewWorkerProfile",
                {
                  workerId: user._id
                }
              );

            } else {

              navigation.navigate(
                "ViewCustomerProfile",
                {
                  customerId: user._id
                }
              );

            }

          }}
        >
            {/* <Image
            source={{
                uri: user.profileImage || require("../../assets/default-profile.jpg")
            }}
            style={styles.headerAvatar}
            /> */}
            <Image
              source={
                user?.profileImage
                  ? { uri: user.profileImage }
                  : require("../../assets/default-profile.jpg")
              }
              style={styles.headerAvatar}
            />

            <Text style={styles.username}>
            {user.name || user.username}
            </Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* ================= MESSAGES ================= */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={renderMessage}
        contentContainerStyle={{ padding: 10 }}
      />

      {selectedImages.length > 0 && (
        <FlatList
          horizontal
          data={selectedImages}
          keyExtractor={(_, index) => index.toString()}
          style={{ padding: 10 }}
          renderItem={({ item, index }) => (
            <View style={{ marginRight: 10 }}>
              <Image
                source={{ uri: item.uri }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 10
                }}
              />

              <TouchableOpacity
                onPress={() => removeSelectedImage(index)}
                style={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  backgroundColor: "black",
                  borderRadius: 10,
                  padding: 2
                }}
              >
                <Ionicons
                  name="close"
                  size={14}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      {/* ================= INPUT ================= */}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Ionicons name="image" size={24} color="#666" />
        </TouchableOpacity>

        <TextInput
          value={text}
          // onChangeText={setText}
          onChangeText={(val) => {
            setText(val);
            handleTyping();
          }}
          placeholder="Type a message..."
          style={styles.input}
        />
        {isTyping && <Text style={{ color: "#fff" }}>Typing...</Text>}
        {isSending && (
          <Text
            style={{
              color: "purple",
              marginLeft: 10
            }}
          >
            Sending images...
          </Text>
        )}
        {isRecording && (
          <Text style={{ color: "purple", marginLeft: 10 }}>
            Recording...
          </Text>
        )}

        {/* <TouchableOpacity
          onPress={isRecording ? stopRecording : startRecording}
        >
          <Ionicons
            name={isRecording ? "stop-circle" : "mic"}
            size={26}
            color={isRecording ? "#d4a1e9" : "#666"}
          />
        </TouchableOpacity> */}

        <TouchableOpacity
          disabled={isSending}
          onPress={() => {
            if (selectedImages.length > 0) {
              sendSelectedImages();
            } else if (isRecording) {
              stopRecording();
            } else {
              sendMessage();
            }
          }}
        >
          <Ionicons name="send" size={24} color={isSending ? "#ccc" : "#666"} />
        </TouchableOpacity>
      </View>
      <Modal
        visible={showImageModal}
        transparent
        animationType="fade"
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.9)",
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => setShowImageModal(false)}
        >
          <Image
            source={{ uri: modalImage }}
            style={{
              width: "95%",
              height: "70%",
              resizeMode: "contain"
            }}
          />
        </TouchableOpacity>
      </Modal>

    </LinearGradient>
  );
};

export default ChatScreen;