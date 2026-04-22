import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  card: {
    // backgroundColor: '#fff',
    // borderRadius: 16,
    // overflow: 'hidden',
    // marginVertical: 10,
    // marginHorizontal: width * 0.02,
    // elevation: 3,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#90EE90',
    overflow: 'hidden',
    elevation: 2,
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingBottom:10,
  },

  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  labelContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'column',
    gap: 4,
  },

  label: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  labelText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },

  details: {
    padding: width * 0.04,
  },

  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#222',
  },

  description: {
    fontSize: 10,
    color: '#666',
    marginVertical: 4,
  },

  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  ratingText: {
    fontSize: 13,
    marginLeft: 4,
    color: '#333',
  },

  reviewText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 3,
  },

  stockText: {
    fontSize: 12,
    color: '#28A745',
    fontWeight: '600',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  price: {
    fontSize: 17,
    color: '#7c5c98',
    fontWeight: '700',
  },

  oldPrice: {
    fontSize: 13,
    color: '#999',
    marginLeft: 6,
    textDecorationLine: 'line-through',
  },

  addButton: {
    backgroundColor: '#7c5c98',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 5,
    
  },

  addText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: '600',
    fontSize:12,
  },
});
