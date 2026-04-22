import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f4f6f8",
    flexGrow: 1,
    justifyContent: "center"
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 6
  },
  title: {
    textAlign: "center",
    color: "#2c3e50",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10
  },
  input: {
    padding: 14,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    fontSize: 15,
    marginBottom: 16,
    backgroundColor: "#fff"
  },
  pickerWrapper: {
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    marginBottom: 16
  },
  actions: {
    flexDirection: "row",
    gap: 12
  },
  formActions: {
    flexDirection: "row",
    gap: 14,
    marginTop: 10,
  },
  submitBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#4f6ccde5",
    alignItems: "center"
  },
  cancelBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#e74c3c",
    alignItems: "center"
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold"
  }
});