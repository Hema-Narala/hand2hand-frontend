import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor:"#fff",
    paddingTop:35,
  },

  userHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15
  },

  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },

  username: {
    color: "#131010",
    fontSize: 18,
    marginLeft: 15,
    fontWeight: "bold"
  },

  messageContainer: {
    // flexDirection: "row",
    marginVertical: 5,
    width: "100%",
  },

  left: {
    alignItems: "flex-start"
  },

  right: {
    alignItems: "flex-end"
  },

  bubble: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 15
  },

  myBubble: {
    backgroundColor: "#e2e0f6",
    alignSelf: "flex-end",
    marginLeft: 50
  },

  otherBubble: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    marginRight: 50
  },

  messageText: {
    color: "#000"
  },

  time: {
    fontSize: 10,
    color: "#666",
    marginTop: 5,
    alignSelf: "flex-end"
  },

  image: {
    width: 180,
    height: 150,
    borderRadius: 10
  },

  audioBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#a75cf7",
    padding: 8,
    borderRadius: 10
  },

  audioText: {
    color: "#fff",
    marginLeft: 5
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff"
  },

  input: {
    flex: 1,
    backgroundColor: "#eee",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 10
  }
});