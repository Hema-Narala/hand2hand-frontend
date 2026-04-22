import { StyleSheet } from "react-native";

export default StyleSheet.create({

  container: {
    flex: 1,
    padding: 20
  },

  backBtn: {
    position: "absolute",
    top: 20,
    left: 15,
    zIndex: 10
  },

  header: {
    marginTop: 60,
    marginBottom: 20
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white"
  },

  subtitle: {
    marginTop: 6,
    fontSize: 16,
    color: "rgba(255,255,255,0.8)"
  },

  contentCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
    padding: 15
  },

  noRequests: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#777"
  }

});