import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'start',
    marginTop: 60,
    height:height,
  },
  emptyIcon: {
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#008037',
  },
  emptySubText: {
    fontSize: 14,
    color: '#00A86B',
    marginTop: 5,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00A86B',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  startButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  cartContainer: {
    marginTop: 10,
  },
  summaryCard: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00A86B',
  },
  balanceLabel: {
    color: '#777',
    marginTop: 5,
  },
  balanceValue: {
    color: '#00A86B',
    fontWeight: '600',
  },
  tipContainer: {
    flexDirection: 'row',
    backgroundColor: '#eaf7ee',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  tipText: {
    color: '#008037',
    fontSize: 13,
    marginLeft: 6,
    flexShrink: 1,
  },
  payButton: {
    backgroundColor: '#00A86B',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 15,
    flexDirection: 'row',
  },
  payButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
});
