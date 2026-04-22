import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  image: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: 10,
    marginRight: 10,
    alignSelf:'center',
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: '#008037',
  },
  description: {
    color: '#555',
    fontSize: 11,
    marginVertical: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: '#008037',
  },
  originalPrice: {
    fontSize: 13,
    color: '#888',
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  rightSection: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontWeight: '600',
    color: '#008037',
    marginBottom: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaf7ee',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 15,
    color: '#008037',
    fontWeight: '500',
  },
  deleteIcon: {
    marginTop: 6,
  },
});
