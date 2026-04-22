import { StyleSheet } from "react-native";

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 16
  },

  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 16
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333"
  },

  detail: {
    fontSize: 14,
    color: "#666",
    marginTop: 4
  },

  statusBadge: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 8
  },

  pending: {
    backgroundColor: "#ff9800"
  },

  selected: {
    backgroundColor: "#4caf50"
  },

  rejected: {
    backgroundColor: "#e74c3c"
  },

  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600"
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12
  },

  acceptBtn: {
    flex: 0.48,
    backgroundColor: "#6a11cb",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center"
  },

  rejectBtn: {
    flex: 0.48,
    backgroundColor: "#e74c3c",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center"
  },

  btnText: {
    color: "#fff",
    fontWeight: "600"
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#777"
  }

});