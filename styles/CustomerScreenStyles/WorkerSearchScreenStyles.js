import { StyleSheet } from "react-native";

/* COLOR CONSTANTS (from :root) */
const PRIMARY_PURPLE = "#8159cf";
const PRIMARY_BLUE = "#65bcf3";
const LIGHT_PINK_PURPLE = "#f8f1ff";
const TEXT_DARK = "#333";
const TEXT_LIGHT = "#666";
const BORDER_RADIUS = 12;

export default StyleSheet.create({
  /* ===================== CONTAINER ===================== */
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal:5,
    backgroundColor: "#a07be3", // fallback (use LinearGradient in screen)
  },

  /* ===================== HEADER ===================== */
  header: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },

  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 25,
    padding: 4,
    maxWidth: 380,
    alignSelf: "center",
    color:"#0c0808"
  },

  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    color:"#0c0808"
  },

  activeToggle: {
    backgroundColor: "white",
    color:"#0c0808"
  },

  /* ===================== BACK BUTTON ===================== */
  backButton: {
    position: "absolute",
    top: 20,
    left: 15,
    zIndex: 10,
  },

  /* ===================== SERVICES SCROLL ===================== */
  servicesScroll: {
    marginVertical: 20,
  },

  // serviceBtn: {
  //   alignItems: "center",
  //   paddingVertical: 12,
  //   paddingHorizontal: 8,
  //   borderRadius: BORDER_RADIUS,
  //   borderWidth: 1.5,
  //   borderColor: "rgba(255,255,255,0.4)",
  //   marginHorizontal: 6,
  //   minWidth: 70,
  //   backgroundColor: "transparent",
  // },

  servicesContainer: {
    height: 110,
    justifyContent: "center",
  },

  serviceBtn: {
    width: 75,
    height: 87,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.4)",
    marginHorizontal: 6,
    paddingVertical: 10,
  },

  activeService: {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderColor: "white",
  },

  serviceIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginBottom: 6,
  },

  serviceText: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  /* ===================== POSTS SECTION ===================== */
  postsSection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: BORDER_RADIUS,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },

  postsWrapper: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 12,
    backgroundColor: "rgba(232, 218, 252, 0.95)",
    borderRadius: 18,
    padding: 16,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5
  },

  postsContainer: {
    // marginTop: 20,
    backgroundColor: "rgb(234, 216, 250)",
    borderRadius: 18,
    padding: 20,
    marginHorizontal: 10,
    flex: 1,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },

  sectionTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 25,
    color: "#110f0f"
  },
  noPosts: {
    textAlign: "center",
    color: "#777",
    fontStyle: "italic",
    paddingVertical: 40,
  },

  /* ===================== USER JOB POSTS ===================== */
  userJobCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: BORDER_RADIUS,
    padding: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  userJobImage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 12,
  },

  userJobDetails: {
    flex: 1,
  },

  actionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },

  /* ===================== BUTTONS ===================== */
  statusBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  pending: {
    backgroundColor: "#ff9800",
  },

  accepted: {
    backgroundColor: "#4caf50",
  },

  editBtn: {
    backgroundColor: "#2196f3",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  cancelBtn: {
    backgroundColor: "#f44336",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  whatsappBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#25d366",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  link: {
    color: "#1a73e8",
  },

  //Styles for filter
  titleRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
},

filterBtn: {
  backgroundColor: "white",
  padding: 8,
  borderRadius: 10,
},

filterOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.5)",
  justifyContent: "center",
  alignItems: "center",
},

filterModal: {
  width: "85%",
  backgroundColor: "white",
  borderRadius: 16,
  padding: 20,
},

filterTitle: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 15,
},

filterInput: {
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 10,
  padding: 10,
  marginBottom: 12,
},

filterActions: {
  flexDirection: "row",
  justifyContent: "space-between",
},

applyBtn: {
  backgroundColor: "#4caf50",
  padding: 10,
  borderRadius: 8,
  width: "45%",
  alignItems: "center",
},

resetBtn: {
  backgroundColor: "#f44336",
  padding: 10,
  borderRadius: 8,
  width: "45%",
  alignItems: "center",
},

});
