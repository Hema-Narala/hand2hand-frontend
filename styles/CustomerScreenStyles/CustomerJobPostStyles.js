import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  image: {
    width: "100%",
    height: 90, // smaller image
    resizeMode: "cover",
  },

  postButton: {
    backgroundColor: "#8A2BE2",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    width: "50%",
    alignSelf: "center",
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  postButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "92%",
    borderRadius: 16,
    padding: 20,
    backgroundColor: "#F9F9FF",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  closeIcon: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#4B0082",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 14,
  },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  submitButton: {
    backgroundColor: "#6A0DAD",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  submitText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },

  card: {
    borderRadius: 14,
    padding: 14,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: "#F5F5F5",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  ratingContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    // backgroundColor: "#FFD700",
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 12,
    elevation: 4,
  },
  ratingText: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 12,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
    color: "#333",
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});

export default styles;
