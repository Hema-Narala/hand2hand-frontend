import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 12,
    marginBottom: 15,
    padding: 10,
    marginHorizontal:15,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: "column",
  },
  profession: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  name: {
    fontSize: 14,
    color: "white",
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    backgroundColor: "rgba(55, 30, 116, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    color: "white",
    marginRight: 10,
    fontSize: 12,
  },
  charges: {
    backgroundColor: "rgba(43, 136, 230, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    color: "white",
    fontSize: 12,
  },

  /* Fix: Align date, time, and button in one row left under image */
  dateTimeActionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginLeft: -82, // shift left so it aligns under the profile image
  },
  dateTimeBox: {
    marginRight: 15,
  },
  dateTimeLabel: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
    marginLeft:8,
  },
  dateTimeValue: {
    color: "white",
    fontSize: 12,
    marginLeft:5,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "white",
    marginLeft:100,
    marginRight:20,
    alignItems:"center"
  },
  actionButtoncustomer:{
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "white",
    marginLeft:10,
  },
  reviewButton:{
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "white",
    textAlign:"center",
    marginRight:20,
  },
  activeButton: {
    backgroundColor: "white",
  },
  completedButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderColor: "white",
    color:"black",
  },
  cancelledButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderColor: "white",
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
  },
  sideheading:{
    color:"#fff"
  }
});
