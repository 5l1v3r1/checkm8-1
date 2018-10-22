import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import ActionButton from '../Shared/ActionButton';
import deleteIcon from '../../assets/delete.png';
import editIcon from '../../assets/edit.png';
import tickIcon from '../../assets/tick.png';
import crossIcon from '../../assets/cross.png';
import { noop } from '../../utils/common';

class CategoryCard extends React.Component {
  state={
    showDeleteMode: false,
  }

  toggleDeleteMode=() => {
    this.setState(prevState => ({ showDeleteMode: !prevState.showDeleteMode }));
  }


  showActions=() => (
    <React.Fragment>
      <View style={styles.dialogBox} />
      <View style={styles.actionBar}>
        <ActionButton src={editIcon} onPress={this.props.onEdit} />
        <ActionButton src={deleteIcon} onPress={this.toggleDeleteMode} />
      </View>
    </React.Fragment>
  )

  showDeleteDialog=() => (
    <React.Fragment>
      <View style={{ ...styles.dialogBox, ...styles.dialogBoxActive }}>
        <Text style={styles.confirmText}>
        Confirm Delete?
        </Text>
      </View>
      <View style={styles.actionBar}>
        <ActionButton src={tickIcon} onPress={this.props.onDelete} />
        <ActionButton src={crossIcon} onPress={this.toggleDeleteMode} />
      </View>
    </React.Fragment>
  )

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onClick} style={styles.card}>
          <Text style={styles.cardText}>
            {this.props.categoryName}
          </Text>
        </TouchableOpacity>
        {
          this.state.showDeleteMode
            ? this.showDeleteDialog()
            : this.showActions()
        }
      </View>
    );
  }
}

CategoryCard.defaultProps = {
  categoryName: 'Category1',
  onClick: () => {},
  onDelete: noop,
  onEdit: noop,
};

CategoryCard.propTypes = {
  categoryName: PropTypes.string,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default CategoryCard;
