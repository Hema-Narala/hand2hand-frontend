// styles/OrdersSectionStyles.js
import { StyleSheet, Dimensions } from 'react-native';
const { width,height } = Dimensions.get('window');

export default StyleSheet.create({
  listContainer: {
    padding: 16,
    backgroundColor: '#F6FFF9',
    height:height,
  },

  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  orderId: {
    fontWeight: '600',
    fontSize: width * 0.04,
    color: '#222',
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginHorizontal: 10,
  },

  delivered: {
    backgroundColor: '#E8FFF1',
  },
  dispatched: {
    backgroundColor: '#EAF3FF',
  },

  statusText: {
    fontSize: width * 0.032,
    marginLeft: 4,
    fontWeight: '500',
  },
  deliveredText: {
    color: '#00A86B',
  },
  dispatchedText: {
    color: '#007BFF',
  },

  orderTotal: {
    fontWeight: '700',
    color: '#008037',
    fontSize: width * 0.045,
  },

  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 8,
  },

  dateText: {
    color: '#555',
    fontSize: width * 0.035,
  },
  itemsCount: {
    color: '#555',
    fontSize: width * 0.035,
  },

  itemsContainer: {
    backgroundColor: '#F3FBF6',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },

  itemName: {
    color: '#333',
    fontSize: width * 0.036,
  },

  qty: {
    color: '#666',
  },

  itemPrice: {
    color: '#222',
    fontWeight: '500',
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },

  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#00A86B',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },

  trackText: {
    color: '#00A86B',
    fontWeight: '600',
    marginLeft: 6,
  },

  reorderButton: {
    backgroundColor: '#00A86B',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },

  reorderText: {
    color: '#fff',
    fontWeight: '600',
  },
});
