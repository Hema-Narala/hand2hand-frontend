// frontend/componentScreenStyles/TopHeaderStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  topheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#c0f2c0ff',
    // marginBottom: 15,
  },

  topleftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    marginRight: 8,
  },

  toptitle: {
    fontSize: 27,
    fontWeight: '600',
    color: '#0a5229ff',
    textAlign: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
});
