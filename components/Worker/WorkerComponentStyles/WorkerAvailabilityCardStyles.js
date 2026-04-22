import { StyleSheet } from "react-native";

export default StyleSheet.create({

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    elevation: 4
  },

  topContainer: {
    flexDirection: "row"
  },

  leftColumn: {
    width: 90,
    alignItems: "center"
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 8
  },

  workerName: {
    fontWeight: "600",
    textAlign: "center"
  },

  rightColumn: {
    flex: 1,
    paddingLeft: 10
  },

  textRow: {
    fontSize: 13,
    marginBottom: 4
  },

  label: {
    fontWeight: "bold",
    color: "#370869"
  },

  highlight: {
    fontWeight: "bold",
    color: "#370869"
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4
  },

  ratingText: {
    marginLeft: 5,
    fontSize: 13
  },

  /* BUTTON SECTION */

  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16
  },

  button: {
    width: "48%",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 10
  },

  editBtn: {
    backgroundColor: "rgb(151, 117, 219)"
  },

  deleteBtn: {
    backgroundColor: "rgb(151, 117, 219)"
  },

  chatBtn: {
    backgroundColor: "#fff"
  },

  viewBtn: {
    backgroundColor: "rgb(151, 117, 219)",
    alignSelf: "center",
    marginLeft:"25%",
  },

  btnText: {
    color: "#fff",
    fontWeight: "600"
  }

});