import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    // padding: 15,
  },
  header: {
    backgroundColor: "#fbfbfe",
    padding: 20,
    paddingTop:40,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom:15,
    zIndex: 10,
    elevation: 10,
  },

  headerTitle: {
    color: "#242121",
    fontSize: 20,
    fontWeight: "600"
  },

  headerSubtitle: {
    color: "#161313",
    fontSize: 13
  },

  backButton: {
    marginTop: 20,
  },
  heading: {
    fontFamily:"Montserrat",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 25,
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    padding: 15,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  tabText: {
    color: "white",
    fontWeight: "500",
  },
  activeTabButton: {
    backgroundColor: "#ffffff40",
    borderColor: "#fff"
  },
  emptyContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: 20
},

emptyCard: {
  width: "100%",
  height:"100%",
  backgroundColor: "#fff",
  borderRadius: 20,
  padding: 25,
  alignItems: "center",

  // Shadow (Android + iOS)
  elevation: 4,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 4 }
},

emptyText: {
  fontSize: 20,
  color: "#555",
  textAlign: "center",
  fontWeight: "500",
  marginTop:100,
}
});
