import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';
import styles from './style';
import noop from '../../../../utils/common';

class CategoryModal extends React.Component {
    state={
      name: this.props.modalContent.name,
    }

    setName=(name) => {
      this.setState({ name });
    }


    submit=() => {
      this.props.onSubmit(this.state.name);
    }

    render() {
      return (
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <Text style={styles.modalText}>
                Enter the new item
            </Text>
            <TextInput
              placeholder="Enter category name"
              placeholderTextColor={styles.modalPlaceholder.color}
              style={styles.modalText}
              underlineColorAndroid={styles.modalText.color}
              returnKeyType="done"
              onChangeText={this.setName}
              defaultValue={this.props.modalContent.name}
            />
            <Button title="Done" onPress={this.submit} />
          </View>
        </View>
      );
    }
}

CategoryModal.defaultProps = {
  modalContent: {
    name: '',
  },
  onSubmit: noop,
};


CategoryModal.propTypes = {
  modalContent: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default CategoryModal;
