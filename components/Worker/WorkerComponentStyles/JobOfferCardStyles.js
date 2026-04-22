import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 6
  },

  customerImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 16
  },

  details: {
    flex: 1,
    padding: 16,
    gap: 8
  },

  nameService: {
    fontSize: 14.5
  },

  date: {
    fontSize: 14.5
  },

  address: {
    color: "#555",
    fontStyle: "italic",
    fontSize: 14.5
  },

  description: {
    marginVertical: 8,
    fontSize: 14.5
  },

  budget: {
    color: "#d32f2f",
    fontWeight: "600",
    fontSize: 14.5
  },

  requirements: {
    color: "#666",
    fontSize: 13
  },

  phone: {
    color: "#1a73e8",
    fontSize: 14.5
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
    alignItems: "center"
  },

  sendBtn: {
    backgroundColor: "#4caf50",
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 8,
    marginRight:5,
  },

  cancelAcceptBtn: {
    backgroundColor: "#f44336",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8
  },

  actionText: {
    color: "#fff",
    fontWeight: "600"
  },

  whatsappBtn: {
    backgroundColor: "#25d366",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },

  whatsappText: {
    color: "#fff",
    fontSize: 13
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
    padding: 32
  },

  overlayCard: {
    backgroundColor: "#ffffff",
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: "90%",
    maxWidth: 380,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8
  },

  overlayTitle: {
    fontSize: 22,
    marginBottom: 16
  },

  overlayText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24
  },

  overlayBtn: {
    backgroundColor: "#e63946",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8
  },

  overlayBtnText: {
    color: "#fff",
    fontSize: 16
  },

  statusWrapper: {
    marginBottom: 8
  },

  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    color: "#fff",
    fontWeight: "600",
    alignSelf: "flex-start"
  },

  pending: {
    backgroundColor: "#2196f3"
  },

  accepted: {
    backgroundColor: "#2ecc71"
  },

  rejected: {
    backgroundColor: "#e74c3c"
  },

  cancelBtn: {
    backgroundColor: "#e74c3c",
    padding: 8,
    borderRadius: 8
  }

  // statusContainer: {
  //   marginTop: 6
  // },

  // statusBadge: {
  //   paddingVertical: 4,
  //   paddingHorizontal: 10,
  //   borderRadius: 20,
  //   fontSize: 12,
  //   fontWeight: "600",
  //   alignSelf: "flex-start",
  //   color: "#fff"
  // },

  // pending: {
  //   backgroundColor: "#f39c12"
  // },

  // accepted: {
  //   backgroundColor: "#2ecc71"
  // },

  // rejected: {
  //   backgroundColor: "#e74c3c"
  // }
});