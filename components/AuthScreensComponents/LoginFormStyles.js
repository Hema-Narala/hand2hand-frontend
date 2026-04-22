import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  inner: {
    paddingTop: 72,
    paddingHorizontal: 24,
    justifyContent: "space-between", // pushes signup link to bottom
  },
  welcome: {
    fontSize: 34,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
    textAlign:"center",
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(255,255,255,0.95)",
    marginBottom: 22,
    textAlign:"center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.9)",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.06)",
    // 🔹 One-step universal focus reset
    outlineWidth: 0,               // Web
    outlineColor: "transparent",   // Web
    boxShadow: "none",             // Web
    underlineColorAndroid: "transparent", // Android
  },
 passwordRow: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    marginBottom: 15,
  },
  inputField: {
    flex: 1,
    color: "#fff",
    paddingHorizontal: 12,
    fontSize: 14,
    borderWidth: 0,
    outlineWidth: 0,
    outlineColor: "transparent",
    boxShadow: "none",
    underlineColorAndroid: "transparent",
    textContentType: "none",
  },

  eyeButton: {
    paddingHorizontal: 5,
  },

  forgot: {
    alignSelf: "flex-end",
    marginTop: 8,
    marginBottom: 12,
    color: "#000",
    fontSize: 12,
  },
  button: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 6,
  },
  buttonText: {
    color: "#000",
    fontWeight: "700",
  },
  message: {
    marginTop: 12,
    color: "#fff",
    textAlign: "center",
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "end",
    marginTop: 24,
    marginBottom: 20, // spacing from bottom edge
  },
  noAccount: {
    color: "#000",
    marginRight: 8,
  },
  signUpLink: {
    color: "#fff",
    fontWeight: "700",
  },
  inner: {
  flex: 1,
  justifyContent: "space-between", // pushes bottom section down
  paddingTop: 72,
  paddingHorizontal: 24,
},


signupRow: {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 30, // space from bottom edge
},

});
