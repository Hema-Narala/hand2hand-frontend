import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  heading: {
    fontSize: 30,
    marginBottom:20,
    fontWeight: "bold",
    paddingBottom: 60,
    color: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
  card: {
    width: "40%",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: 15,
    paddingBotton:10,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain",
    borderRadius:20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#b61818ff",
  },
  button: {
    width: "100%",
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    fontWeight:500,
    borderColor: "#fff",
    backgroundColor: "rgba(255,255,255,0.1)", // transparent layer
    alignItems: "center",
  },
  buttonPressed: {
    backgroundColor: "#fff",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonTextPressed: {
    color: "#000",
  },
});
