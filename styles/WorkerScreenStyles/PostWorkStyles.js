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
    padding: 20,
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
  },

  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
  },

  activeToggle: {
    backgroundColor: "white",
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

  serviceBtn: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.4)",
    marginHorizontal: 6,
    minWidth: 70,
    backgroundColor: "transparent",
  },

  activeService: {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderColor: "white",
  },

  serviceIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginBottom: 6,
  },

  serviceText: {
    fontSize: 11,
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

  sectionTitle: {
    textAlign: "center",
    marginBottom: 20,
    color: TEXT_DARK,
    fontSize: 18,
    fontWeight: "600",
  },

  noPosts: {
    textAlign: "center",
    color: "#999",
    fontStyle: "italic",
    padding: 20,
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
});
