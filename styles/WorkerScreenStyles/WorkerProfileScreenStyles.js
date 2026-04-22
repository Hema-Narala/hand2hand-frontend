import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4fb"
  },

  header: {
    backgroundColor: "#8159cf",
    padding: 20,
    paddingTop: 40,
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
    color: "#eee",
    fontSize: 13
  },

  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoutText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 2,
  },

  profileCard: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 20,
    padding: 20,
    alignItems: "center"
  },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45
  },

  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#8159cf",
    padding: 6,
    borderRadius: 20
  },

  name: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 10
  },

  badgeRow: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 8
  },

  badge: {
    backgroundColor: "#e0d9ff",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20
  },

  rating: {
    color: "#450c78",
    fontWeight:"bold",
  },

  bio: {
    textAlign: "center",
    color: "#555",
    marginVertical: 10
  },

  services: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    justifyContent: "center"
  },

  serviceTag: {
    backgroundColor: "#f0f0ff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20
  },

  editBtn: {
    borderWidth: 1,
    borderColor: "#8159cf",
    borderRadius: 30,
    padding: 10,
    marginTop: 12,
    flexDirection: "row",
    gap: 6
  },

  infoBox: {
    marginTop: 15,
    gap: 6
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    width: "100%",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10
  },

  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },

  serviceBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    padding: 8
  },

  serviceSelected: {
    backgroundColor: "#f0f0ff",
    borderColor: "#8159cf"
  },

  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10
  },

  saveBtn: {
    backgroundColor: "#8159cf",
    padding: 12,
    borderRadius: 30,
    flex: 1
  },

  saveText: {
    color: "#fff",
    textAlign: "center"
  },

  cancelBtn: {
    borderWidth: 1,
    borderColor: "#8159cf",
    padding: 12,
    borderRadius: 30,
    flex: 1
  },

  cancelText: {
    textAlign: "center",
    color: "#8159cf"
  },

  section: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 20,
    padding: 16,
    paddingTop:0,
  },

  

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom:10,
  },

  ReviewSectionTitle:{
    fontSize: 19,
    fontWeight: "600",
    marginTop:10,

  },

  addBtn: {
    color: "#8159cf"
  },

  gallery: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10
  },

  expImage: {
    // width: 90,
    width: "30%",
    height: 100,
    borderRadius: 10
  },
  experiencePlaceholder: {
    textAlign: "center",
    color: "#888",
    fontSize: 14,
    marginTop: 15,
    // fontStyle: "italic"
  },


  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center"
  },

  modalCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    width: "85%",
    alignItems: "center"
  },

  modalImage: {
    width: "100%",
    height: 220,
    borderRadius: 12
  },

//   statsBox: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     margin: 15
//   },
//   statItem: {
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 10,
//     width: "23%",
//     elevation: 3
//   },
//   statValue: {
//     fontWeight: "bold",
//     fontSize: 16
//   },
statsBox: {
    backgroundColor: "#deddf7",
    margin: 16,
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },

  statItem: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    alignItems: "center"
  },

  statValue: {
    fontSize: 16,
    fontWeight: "700"
  },

  statLabel: {
    fontSize: 12,
    color: "#777",
    marginTop: 4
  },

  socialInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 6
  },
  socialTextInput: {
    flex: 1,
    padding: 8
  },
  socialView: {
    fontSize: 15,
    marginVertical: 8
  },

  reviewCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    elevation: 2
  },
  reviewName: {
    fontWeight: "bold"
  },
  reviewuserName:{
    fontsize:'10'
  },
  reviewText: {
    marginTop: 4,
    color: "#555"
  },

  modalBtn: {
    marginTop: 10,
    padding: 12,
    borderRadius: 20,
    backgroundColor: "#f0f0ff",
    width: "100%",
    alignItems: "center"
  },

  deleteBtn: {
    backgroundColor: "#e74c3c"
  }
});
