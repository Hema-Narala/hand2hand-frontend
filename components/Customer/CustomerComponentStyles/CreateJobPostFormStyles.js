// components/ComponentStyles/CreateJobPostFormStyles.js
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // ===== Section =====
  createJobSection: {
    padding: 5,
    // backgroundColor: "#f9f9fb",
    flex: 1,
  },

  // ===== Form Container =====
  createJobFormContainer: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 16,
    maxWidth: 600,
    alignSelf: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 5,
  },

  formTitle: {
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: 24,
    fontSize: 22,
    fontWeight: "700",
  },

  createJobForm: {
    flexDirection: "column",
    gap: 16, // RN supports gap in newer versions
  },

  input: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    fontSize: 15.5,
    backgroundColor: "#fafafa",
    marginTop:5,
  },

  inputFocus: {
    borderColor: "#8159cf",
    backgroundColor: "white",
  },

  readonlyInput: {
    backgroundColor: "#f0f0f0",
    color: "#555",
  },

  formActions: {
    flexDirection: "row",
    gap: 14,
    marginTop: 10,
  },

  submitBtn: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    fontWeight: "700",
    backgroundColor: "#8159cf",
  },

  cancelBtn: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    fontWeight: "700",
    backgroundColor: "#e74c3c",
  },

  // ===== Job Card =====
  jobPostCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 16,
    maxWidth: 700,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 5,
  },

  userProfile: {
    width: 90,
    padding: 16,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
  },

  userProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#e0e0e0",
  },

  userProfileName: {
    marginTop: 8,
    fontWeight: "600",
    fontSize: 14,
  },

  jobDetails: {
    flex: 1,
    padding: 18,
    flexDirection: "column",
    gap: 14,
  },

  jobInfoText: {
    fontSize: 14.5,
    marginVertical: 4,
  },

  addressText: {
    color: "#555",
    fontStyle: "italic",
  },

  descriptionText: {
    marginVertical: 8,
    color: "#d32f2f",
  },

  budgetText: {
    color: "#d32f2f",
    fontWeight: "600",
  },

  requirementsText: {
    color: "#666",
    fontSize: 13.5,
  },

  phoneText: {
    color: "#1a73e8",
  },

  jobActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  statusBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    fontSize: 13,
    fontWeight: "bold",
    color: "#fff",
  },

  statusPending: { backgroundColor: "#ff9800" },
  statusAccepted: { backgroundColor: "#4caf50" },

  editBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    fontSize: 13,
    fontWeight: "600",
    backgroundColor: "#2196f3",
    color: "#fff",
  },

  cancelBtnSmall: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    fontSize: 13,
    fontWeight: "600",
    backgroundColor: "#f44336",
    color: "#fff",
  },

  whatsappBtn: {
    backgroundColor: "#25d366",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  acceptedWorker: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 16,
    padding: 14,
    backgroundColor: "#e8f5e9",
    borderRadius: 12,
  },

  acceptedWorkerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  acceptedWorkerText: {
    fontSize: 14,
  },

  acceptedMsg: {
    color: "#2e7d32",
    fontStyle: "italic",
    fontSize: 13,
  },

  viewRequestsBtn: {
    backgroundColor: "#7b5bd3",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 6
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

  postAnotherContainer: {
    alignItems: "center",
    marginVertical: 20,
  },

  postAnotherBtn: {
    backgroundColor: "#8159cf",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    fontSize: 16,
    fontWeight: "600",
    shadowColor: "#8159cf",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
});
