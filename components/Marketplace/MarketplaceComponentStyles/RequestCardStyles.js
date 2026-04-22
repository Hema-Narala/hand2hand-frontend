import { StyleSheet } from "react-native";

export default StyleSheet.create({

  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    elevation: 4
  },

  leftSection: {
    alignItems: "center",
    marginRight: 15
  },

  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 6
  },

  name: {
    fontWeight: "600",
    fontSize: 14
  },

  rightSection: {
    flex: 1
  },

  username: {
    fontSize: 16,
    fontWeight: "bold"
  },

  role: {
    color: "#555",
    marginTop: 2
  },

  phone: {
    color: "#1a73e8",
    marginTop: 4
  },

  email: {
    color: "#555",
    marginTop: 2
  },

  address: {
    color: "#666",
    marginTop: 2
  },

  actions: {
    flexDirection: "row",
    marginTop: 10
  },

  chatBtn: {
    backgroundColor: "#3b82f6",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginRight: 10
  },

  acceptBtn: {
    backgroundColor: "#22c55e",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 10
  },

  btnText: {
    color: "white",
    fontWeight: "600"
  },

  acceptedBadge: {
  backgroundColor: "#4CAF50",
  paddingVertical: 6,
  paddingHorizontal: 14,
  borderRadius: 20
},

rejectedBadge: {
  backgroundColor: "#e53935",
  paddingVertical: 6,
  paddingHorizontal: 14,
  borderRadius: 20
},

badgeText: {
  color: "#fff",
  fontWeight: "600"
},

});