import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  CheckBox,
} from 'react-native';
import styles from './style';

class ListItem extends React.Component {
    state={
      checked: this.props.value,
    }

    toggle=() => {
      this.setState(prevState => ({ checked: !prevState.checked }));
    }

    render() {
      return (
        <View style={styles.container}>
          <CheckBox value={this.props.value} onValueChange={this.props.onChange} />
          <View style={styles.itemLabel}>
            <Text style={styles.itemLabelText}>
              {this.props.itemLabel}
            </Text>
          </View>
        </View>
      );
    }
}


ListItem.defaultProps = {
  itemLabel: 'label',
  value: false,
  onChange: () => {},
};
ListItem.propTypes = {
  itemLabel: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
};
export default ListItem;
