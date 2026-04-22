import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  shopContainer: {
    marginTop: 5,
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
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#90EE90',
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 1,
  },

  selectedCategoryButton: {
    backgroundColor: '#7c5c98',
    borderColor: '#7c5c98',
  },

  categoryText: {
    marginLeft: 6,
    color: '#7c5c98',
    fontSize: width * 0.035,
    fontWeight: '500',
  },

  selectedCategoryText: {
    color: '#fff',
  },

  //category updated section
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },

  categoryLabel: {
    color: '#7c5c98',
    fontSize: width * 0.026,
    marginTop: 5,
    fontWeight: '500',
    textAlign: 'center',
  },

  selectedCategoryLabel: {
    color: '#00A86B',
    fontWeight: '700',
  },


  carouselContainer: {
    marginTop: 20,
    marginHorizontal:20,
    paddingHorizontal:20,
    alignItems: 'center',
  },

  carouselCard: {
    // backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 2,
    marginHorizontal: 18,
  },

  carouselImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },

  carouselText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#fff',
    fontWeight: '600',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 8,
    borderRadius: 5,
    fontSize: 14,
  },
  //products section
    categoryScroll: {
    marginTop: 10,
    marginHorizontal: 10,
  },

  productGrid: {
    paddingHorizontal: 10,
    paddingBottom: 120,
  },

  row: {
    justifyContent: 'space-between',
  },

  productCardContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 10,
    // ✅ Fixed size for consistency (responsive)
    height: width * 0.75,  // Adjust this multiplier if card looks too tall/short
    maxHeight: 330,
  },

});
