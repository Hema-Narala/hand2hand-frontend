import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f6fff6',
  },

  // -------- Top Bar --------
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20, // reduced padding
    paddingBottom: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#c0f2c0ff',
    // marginBottom:30,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 8,
  },
  title: {
    fontSize: 27,
    fontWeight: '600',
    color: '#7c5c98',
    textAlign:'center',
    alignItems:'center',
    marginLeft:20,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceText: {
    color: '#012c01ff',
    fontSize: 14,
    marginLeft: 4,
    fontWeight: '600',
    textAlign:'center',
    alignItems:'center',
  },
  levelArrow: {
    backgroundColor: '#d8f0e2ff',
    borderRadius: 8,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },

  //below
    container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: width * 0.02,
    marginTop:0,
  },

  topSection: {
    backgroundColor: '#fff',
    borderColor: '#90EE90',
    borderWidth: 1,
    borderRadius: 15,
    padding: width * 0.01,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginBottom:12,
    marginTop:0,
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // marginBottom: width * 0.04,
  },

  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: width * 0.01,
    paddingHorizontal: width * 0.02,
    borderRadius: 18,
    backgroundColor: '#fff',
    // borderColor: '#7c5c98',
    // borderWidth: 1,
  },

  selectedTab: {
    backgroundColor: '#7c5c98',
    borderColor: '#7c5c98',
  },

  tabText: {
    marginLeft: 6,
    fontSize: width * 0.035,
    color: '#7c5c98',
    fontWeight: '500',
  },

  selectedTabText: {
    color: '#fff',
    fontWeight: '600',
  },

  cartCount: {
    marginLeft: 4,
    fontSize: width * 0.035,
    color: '#7c5c98',
  },

  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },

  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    color: '#333',
    fontSize: width * 0.035,
  },
});