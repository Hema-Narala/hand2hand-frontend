import { StyleSheet, Dimensions } from "react-native";


const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: { 
    flex: 1, // stretch full screen
  },

  /* ---------------- TOP HEADER ---------------- */
topHeader: {
  position: "absolute",        // RN doesn't support sticky
  top: 0,
  left: 0,
  right: 0,
  zIndex: 40,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: 12,
  paddingTop:25,
  paddingHorizontal: 16,
  backgroundColor: "#fff",
},

headerLeft: {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,                      // supported in modern RN / Expo
},

logoImg: {
  width: 42,
  height: 50,
  borderRadius: 8,
  resizeMode: "contain",
  marginLeft:10,
  marginTop:8,
},

appName: {
  fontWeight: "700",
  fontSize: 30,
  color: "rgb(129, 89, 207)",
},

highlight: {
  color: "rgb(101, 188, 243)",
  fontSize: 38,
},

headerRight: {
  flexDirection: "row",
  gap: 10,
},

iconBtn: {
  width: 40,
  height: 40,
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#d1c9c99f",
},

  // top part
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 3,  // removed extra padding
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    paddingBottom: 2,
  },
  locationText: { fontSize: 12, fontWeight: "500", marginLeft: 5 ,color:"#fff"},
  headerIcons: { flexDirection: "row", alignItems: "center" },

  // Greeting
  greetingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 10,
    // paddingTop:30,
  },

  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 12, // square with rounded corners
    borderWidth: 2,
    borderColor: "#fff",
    marginTop:25,
  },

  textContainer: {
    flex: 1,
    marginLeft: 15,
  },

  welcomeText: {
    fontSize: 14,
    color: "#fff",
    marginTop:25,
  },

  userNameText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginVertical: 4,
  },

  subText: {
    fontSize: 13,
    color: "#eaeaea",
    lineHeight: 18,
  },


  // Search Row
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent", // 👈 transparent background
    borderRadius: 25,
    paddingHorizontal: 12,
    height: 40,
    borderWidth: 1,                // 👈 solid border
    borderColor: "#fff",           // 👈 white border
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#fff", // 👈 input text white

    // 🔹 One-step universal focus reset
    outlineWidth: 0,               // Web
    outlineColor: "transparent",   // Web
    boxShadow: "none",             // Web
    underlineColorAndroid: "transparent", // Android
  },


  searchIcon: { marginRight: 10 },
  // searchInput: { flex: 1, fontSize: 14 },
  heartButton: {
    marginLeft: 10,
    backgroundColor: "#a265e3ff", // light purple background
    borderRadius: 25,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },


  // White Card Section
  whiteCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 20,
    // padding: 15,
    elevation: 4,
    // height:1000,
    // paddingBottom: 100,
  },

  // Carousel
  carouselContainer: {
    marginBottom: 20,
    margin:15,
  },
  carouselImage: {
    width: width - 40,   // ✅ fixed (now width is defined)
    height: 160,
    borderRadius: 12,
    marginRight: 10,
    alignSelf: "center",
    resizeMode: "cover",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#a265e3ff",
  },

  //Quick actions section
  quickActionsContainer: {
    backgroundColor: '#f0d9f899',
    borderColor: '#e4bdf299',
    borderWidth: 1,
    borderRadius: 12,
    // marginHorizontal: 10,
    marginTop: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    margin:15,
    // marginHorizontal: 18,
  },

  quickHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  quickTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7c5c98',
    flex: 1,
  },

  quickIcon: {
    width: 30,
    height: 35,
    // tintColor: '#7c5c98',
  },

  quickGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  quickItem: {
    alignItems: 'center',
    width: '23%',
  },

  quickImage: {
    width: 50,
    height: 50,
    marginBottom: 6,
    resizeMode: 'contain',
    borderRadius:30,
  },

  quickLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#7c5c98',
    fontWeight: '500',
  },

  // 🏆 Level Progress Section
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF', // white background
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e4bdf299',
    marginTop: 20,
    paddingLeft:10,
    // paddingVertical: 20,
    // paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    // marginHorizontal: 18,
    margin:15,
  },

  levelInfo: {
    flex: 1,
  },

  levelTitle: {
    fontSize: 14,
    color: '#7c5c98',
    fontWeight: '600',
    marginHorizontal:20,
  },

  levelValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#7c5c98',
    marginVertical: 4,
    marginLeft:20,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 2,
  },

  levelArrow: {
    backgroundColor: '#e4bdf25c',
    borderRadius: 8,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  levelSubtitle: {
    fontSize: 12,
    color: '#444',
    marginLeft:20,
  },

  levelImage: {
    width: "50%",
    height: 150,
    resizeMode: 'contain',
    // marginLeft: 5,
    // marginRight:10,
  },


  // Section Header
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 20,
    marginTop:40,
    paddingHorizontal: 5,
    margin:15,
    // borderWidth:1,
    // borderRadius:'5px',
    // borderColor:"#e4bdf299"
  },
  postjobTitle: { fontSize: 24, fontWeight: "bold" },
  viewAll: { fontSize: 14, color: "#9370db" },

  // Category Row
  categoryRow: { flexDirection: "row", marginBottom: 20 },
  categoryCard: { alignItems: "center", marginRight: 20 },
  categoryIcon: { width: 50, height: 50, borderRadius: 25, marginBottom: 5 },
  categoryText: { fontSize: 12 },


  /* ---------------- RECOMMENDATIONS SECTION ---------------- */

  recommendationsSection: {
    width: "100%",
    // padding: 20,
    margin:15,
  },

  recommendationBlock: {
    marginBottom: 40,
  },

  blockHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  blockTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical:40,
  },

  viewAllBtn: {
    fontSize: 14,
    color: "#5952e6",
    marginVertical:40,
  },

  workerCards: {
    paddingBottom: 10,
    gap: 15,
  },

  workerCard: {
    width: 220,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  workerImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  workerInfo: {
    padding: 10,
  },

  workerName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },

  skill: {
    fontSize: 13,
    color: "#666",
    marginBottom: 5,
  },

  rating: {
    fontSize: 14,
    color: "#f39c12",
    marginBottom: 8,
  },

  workerFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  wage: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#46315c",
  },

  viewProfileBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#cecbfb96",
  },

  viewProfileText: {
    fontSize: 14,
    color: "#5952e6",
  },


  //🌱 Environmental Impact Section
  impactWrapper: {
    borderWidth: 1,
    borderColor: '#e4bdf299',
    borderRadius: 12,
    // marginHorizontal: 18,
    marginTop: 20,
    overflow: 'hidden', // clips corners perfectly
    margin:15,
    marginBottom:100,
  },
  
  impactContainer: {
    backgroundColor: '#DFFFE0', // light green background
    // borderColor: '#4da370ff',
    // borderWidth: 1,
    borderRadius: 12,
    // marginHorizontal: 10,
    // marginTop: 20,
    // paddingVertical: 15,
    // paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  impactHeader: {
    backgroundColor: '#f5e2fcc5',
    paddingHorizontal: 10,
    paddingBottom: 8,
    borderBottomColor: '#e4bdf299',
    borderBottomWidth: 1,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7c5c98',
    marginTop:15,
  },

  sectionSubtitle: {
    fontSize: 15,
    color: '#7c5c98',
    marginTop: 3,
    marginBottom:10,
  },

  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#e4bdf299',
    // borderWidth: 1,
    // borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    padding: 10,
  },

  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  card: {
    width: '45%',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // translucent white
    borderColor: '#e4bdf299',
  },

  greenCard: {
    backgroundColor: 'rgba(246, 231, 250, 0.37)',
  },

  yellowCard: {
    backgroundColor: 'rgba(246, 231, 250, 0.37)',
    borderColor: '#e4bdf299',
  },

  iconCircleTop: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#7c5c98',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconCircleBottom: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    // backgroundColor: '#7c5c98',
    backgroundColor: '#7c5c98',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7c5c98',
    marginTop: 4,
  },

  cardLabel: {
    fontSize: 16,
    color: '#7c5c98',
    textAlign: 'center',
    marginTop: 3,
  },

  scrollView: {
    flex: 1,
    backgroundColor: '#F5FFF5',
  },

  scrollContent: {
    paddingBottom: 30,
  },

  // ---------- Achievements & Eco-Rewards Section ----------
  achievementswrapper:{
    borderWidth: 1,
    borderColor: '#94e9b6ff',
    borderRadius: 12,
    // marginHorizontal: 18,
    marginTop: 20,
    overflow: 'hidden', // clips corners perfectly
  },
  achievementsContainer:{
    backgroundColor: '#DFFFE0', // light green background
    // borderColor: '#4da370ff',
    // borderWidth: 1,
    borderRadius: 12,
    // marginHorizontal: 10,
    // marginTop: 20,
    // paddingVertical: 15,
    // paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  rewardsContainer: {
    marginHorizontal: 18,
    backgroundColor: '#fff',
    borderColor: '#90ee90',
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
  },
  achievementsHeader: {
    backgroundColor: '#DFFFE0',
    paddingHorizontal: 10,
    paddingBottom: 8,
    // paddingTop:10,
    borderBottomColor: '#DFFFE0',
    borderBottomWidth: 1,
  },
  achievementsTopHeader:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rewardsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7c5c98',
    marginTop:15,
  },

  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },

  badgeItem: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },

  badgeText: {
    fontSize: 13,
    fontWeight: '600',
  },

  progressBox: {
    flexDirection: 'row',
    backgroundColor: '#E8F0FE',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
  },

  progressEmoji: {
    fontSize: 22,
    marginRight: 8,
  },

  progressTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A73E8',
  },

  progressText: {
    fontSize: 13,
    color: '#444',
    marginTop: 3,
  },

  shareButton: {
    backgroundColor: '#ebf7ebff',
    borderWidth: 1,
    borderColor: '#7c5c98',
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: 'center',
  },

  shareButtonText: {
    color: '#00A86B',
    fontWeight: '600',
    fontSize: 15,
  },

  //💰 Eco Wallet Section
  walletWrapper: {
    // backgroundColor: '#DFFFE0',
    borderColor: '#e4bdf299',
    borderWidth: 1,
    borderRadius: 12,
    // marginHorizontal: 18,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  walletHeader: {
    backgroundColor: '#f5e2fcc5',
    // borderBottomColor: '#058037',
    // borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  walletTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7c5c98',
  },

  walletSubtitle: {
    fontSize: 15,
    color: '#7c5c98',
    marginTop: 3,
  },

  walletContainer: {
    backgroundColor: '#FFFFFF',
    // borderColor: '#058037',
    // borderWidth: 1,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 15,
    // marginTop: 10,
  },

  balanceCard: {
    backgroundColor: 'rgba(246, 231, 250, 0.37)',
    borderColor: '#e4bdf299',
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 15,
  },

  balanceTitle: {
    fontSize: 13,
    color: '#7c5c98',
    marginTop: 4,
    textAlign:'center',
  },

  balanceValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#7c5c98',
    marginTop: 5,
  },

  earningRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  earningCard: {
    width: '48%',
    backgroundColor: 'rgba(246, 231, 250, 0.37)',
    borderColor: '#e4bdf299',
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 15,
    opacity: 0.9,
  },

  earningValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7c5c98',
  },

  earningLabel: {
    fontSize: 13,
    color: '#7c5c98',
    marginTop: 3,
  },

  shopButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7c5c98',
    borderRadius: 10,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  shopButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  //Footer
  footer: {
    marginTop: 100,
    marginBottom: 80,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row', // 👈 makes items side by side
    gap: 8, // 👈 adds space between logo & text (React Native 0.71+)
  },
  footerLogo: {
    width: 160,
    height: 36,
    
  },
  // footerGradient: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   height: 220, // 👈 taller footer
  //   overflow: 'hidden',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   elevation: 5, // subtle shadow (Android)
  //   // shadowColor: '#000',
  //   // shadowOpacity: 0.1,
  //   // shadowOffset: { width: 0, height: -2 },
  //   // shadowRadius: 4,
  //   marginTop:100,
  // },
  // flogo: {
  //   width: 30,
  //   height: 30,
  // },
  // downtitle: {
  //   fontSize: 26,
  //   fontWeight: 'bold',
  //   color: '#7c5c98',
  // },
  footerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 220, // 👈 taller footer
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // subtle shadow (Android)
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 0, height: -2 },
    // shadowRadius: 4,
    marginTop:100,
  },

  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  logo: {
    width: 40,
    height: 40,
  },

  downtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#008037',
  },

  flogo: {
    width: 30,
    height: 30,
  },
  downtitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#008037',
  },

  // Recommended
  // recommendedRow: { flexDirection: "row" },
  // recommendedCard: {
  //   width: 140,
  //   marginRight: 15,
  //   backgroundColor: "#f9f9f9",
  //   borderRadius: 15,
  //   overflow: "hidden",
  // },
  // recommendedImage: { width: "100%", height: 100, resizeMode: "cover" },
  // recommendedTitle: { padding: 10, fontSize: 14, fontWeight: "500" },
});
