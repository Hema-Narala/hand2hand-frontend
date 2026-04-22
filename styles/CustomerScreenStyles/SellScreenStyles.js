import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e7e6f6",
  },

  section: {
    padding: 16,
    gap: 12,
  },



  statRow: {
    flexDirection: "row",
    gap: 12,
  },

  statCard: {
    flex: 1,
    padding: 16,
  },

  statTitle: {
    fontSize: 13,
    color: "#6b7280",
  },

  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#463de9",
  },

  button: {
    backgroundColor: "#5952e6",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop:5,
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },

  input: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  listingCard: {
    padding: 14,
    marginBottom: 12,
  },

  listingTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  price: {
    color: "#5952e6",
    fontWeight: "700",
  },

  //extra styles
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },

  statBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 11,
    paddingVertical:15,
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  statLabel: {
    fontSize: 14,
    color: "#6B7280",
  },

  statValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight:10,
  },

  addButton: {
    borderRadius: 14,
    backgroundColor: "#6C63FF",
    marginBottom: 16,
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  formCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },

  uploadBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
  },

  uploadText: {
    marginTop: 8,
    fontSize: 14,
    color: "#374151",
  },

  uploadHint: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 4,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    marginTop: 10,
  },

  textArea: {
    height: 90,
    textAlignVertical: "top",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  publishButton: {
    marginTop: 16,
    backgroundColor: "#6C63FF",
    borderRadius: 14,
  },

  publishText: {
    color: "#fff",
    fontWeight: "600",
  },

  myListings: {
    fontSize: 24,
    fontWeight: "700",
    marginVertical: 12,
    textAlign: "center",
    color: "#4F46E5",
  },

  listingCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 14,
  },

  listingImage: {
    width: "100%",
    height: 160,
  },

  listingBody: {
    padding: 14,
  },

  listingTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  listingTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },

  locationText: {
    fontSize: 12,
    color: "#6B7280",
  },

  price: {
    color: "#4F46E5",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "right",
  },

  qty: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "right",
  },

  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },

  editBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    alignItems: "center",
  },

  deleteBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#EF4444",
    alignItems: "center",
  },
});
