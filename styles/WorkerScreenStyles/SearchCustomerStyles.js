import { StyleSheet } from "react-native";

export default StyleSheet.create({

  container: {
    flex: 1,
    padding: 20
  },

  headerSection: {
    alignItems: "center",
    marginBottom: 20
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20
  },

  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 25,
    padding: 4
  },

  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center"
  },

  activeToggle: {
    backgroundColor: "white"
  },

  toggleText: {
    color: "white",
    fontWeight: "600"
  },

  activeText: {
    color: "#6a11cb"
  },

  serviceSection: {
    marginVertical: 20
  },

  serviceBtn: {
    alignItems: "center",
    padding: 12,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.4)",
    borderRadius: 12,
    marginRight: 12
  },

  serviceActive: {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderColor: "white"
  },

  serviceIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginBottom: 6
  },

  serviceText: {
    fontSize: 11,
    fontWeight: "600",
    color: "white"
  },

  filterBtn: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "rgba(255,255,255,0.3)",
    padding: 10,
    borderRadius: 20
  },

  postsSection: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 12,
    padding: 20
  },

  availabilitySection: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16
  },

  sectionTitle: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20
  },

  noPosts: {
    textAlign: "center",
    color: "#777",
    fontStyle: "italic"
  },

  postAnotherBtn: {
    backgroundColor: "rgb(129,89,207)",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  filterOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end"
  },

  filterBox: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },

  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginVertical: 8
  },

  applyBtn: {
    backgroundColor: "#6a11cb",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12
  },
  
  noPosts: {
    alignItems: "center",
    padding: 40,
    color: "#777",
  },

  linkBtn: {
    color: "#8159cf",
    fontWeight: "600",
    textDecorationLine: "underline",
  },

});