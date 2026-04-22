import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa"
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
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    elevation: 3
  },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6
  },

  badge: {
    backgroundColor: "#e0ddff",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10
  },

  badgeText: {
    color: "#6c5ce7",
    fontSize: 12,
    fontWeight: "500"
  },

  infoBox: {
    width: "100%",
    marginTop: 10
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8
  },

  infoText: {
    fontSize: 14,
    color: "#444"
  },

  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#6c5ce7",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginTop: 12
  },

  editText: {
    color: "#6c5ce7",
    fontWeight: "500"
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10
  },

  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10
  },

  saveBtn: {
    flex: 1,
    backgroundColor: "#6c5ce7",
    padding: 12,
    borderRadius: 20,
    alignItems: "center"
  },

  saveText: {
    color: "#fff",
    fontWeight: "600"
  },

  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#6c5ce7",
    padding: 12,
    borderRadius: 20,
    alignItems: "center"
  },

  cancelText: {
    color: "#6c5ce7"
  },

  statsBox: {
    backgroundColor: "#cbc8f3",
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

  section: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 20,
    padding: 16
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10
  },

  prefRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8
  },

  prefText: {
    fontSize: 14,
    color: "#555"
  },
  
  walletCard: {
    backgroundColor: "#f3e8ff",
    padding: 16,
    borderRadius: 14,
    marginTop: 20
  },
  walletTitle: {
    fontSize: 14,
    color: "#555"
  },
  walletAmount: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 6
  },
  walletPoints: {
    fontSize: 13,
    color: "#666"
    },

    sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
    },
    viewAll: {
    color: "purple",
    fontSize: 13
    },

    workerCard: {
    width: 140,
    padding: 12,
    marginRight: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    elevation: 3
    },
    workerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: "center",
    marginBottom: 6
    },
    workerName: {
    fontWeight: "bold",
    textAlign: "center"
    },
    workerJob: {
    fontSize: 12,
    color: "gray",
    textAlign: "center"
    },
    workerRating: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 4
    },
    workerCharge: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "center",
    },

    cameraIcon: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "#fff",
    padding: 4,
    borderRadius: 10
    },

    // workerCard: {
// width: 180,
// backgroundColor: "#fff",
// borderRadius: 16,
// padding: 12,
// marginRight: 12,
// elevation: 4,
// position: "relative"
// },

// saveBtn: {
// position: "absolute",
// top: 10,
// right: 10,
// zIndex: 10
// },

// workerImage: {
//   width: "100%",
//   height: 90,
//   borderRadius: 12,
//   marginBottom: 8
// },

// workerName: {
//   fontSize: 16,
//   fontWeight: "600"
// },

// workerJob: {
//   fontSize: 13,
//   color: "#777"
// },

// workerRating: {
//   fontSize: 13,
//   marginTop: 2
// },



viewProfileBtn: {
  marginTop: 8,
  backgroundColor: "#6a4df4",
  paddingVertical: 6,
  borderRadius: 8
},

viewProfileText: {
  color: "#fff",
  textAlign: "center",
  fontSize: 13,
  fontWeight: "600"
}

});
