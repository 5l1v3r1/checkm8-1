import { Dimensions } from 'react-native';

const styles = {
  container: {
    flex: 1,
    width: (Dimensions.get('window').width - 20),
    padding: 10,
    margin: 10,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  card: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2b303f',
    borderRadius: 10,
    elevation: 10,
  },
  quote: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontFamily: 'Raleway-Bold',
    fontSize: 20,
    color: '#e8e8e8',
  },
  quoteText: {
    color: 'white',
    fontFamily: 'Raleway-Italic',
    fontSize: 18,
  },
  actionBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default styles;
