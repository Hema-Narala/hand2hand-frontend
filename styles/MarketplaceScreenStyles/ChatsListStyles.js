import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // padding: 10
  },

  header: {
    backgroundColor: "#6c5ce7",
    padding: 20,
    paddingTop:40,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600"
  },

  headerSubtitle: {
    color: "#ddd",
    fontSize: 13
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dcd7f695",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    margin:10,
  },

  searchInput: {
    marginLeft: 10,
    flex: 1
  },

  chatItem: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
    alignItems: "center"
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },

  chatInfo: {
    flex: 1,
    marginLeft: 10
  },

  name: {
    fontWeight: "bold",
    fontSize: 16
  },

  lastMsg: {
    color: "#666",
    marginTop: 2
  },

  time: {
    fontSize: 12,
    color: "#999"
  },
  suggestionsBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    elevation: 3
  },

  suggestionItem: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: "#eee"
  },

  suggestionAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  },

  suggestionName: {
    fontWeight: "600",
    fontSize: 15
  },

  suggestionRole: {
    fontSize: 12,
    color: "#666"
  }
});