import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  Modal,
} from 'react-native';
import styles from './style';
import CategoryCard from '../CategoryCard';
import CategoryModal from './components/CategoryModal';
import { noop } from '../../utils/common';

class CategoriesView extends React.Component {
  render() {
    const { categories } = this.props;
    const categoryCards = categories.map(({ categoryName }) => (
      <CategoryCard
        categoryName={categoryName}
        key={categoryName}
        onClick={this.props.onCardClick(categoryName)}
        onDelete={this.props.deleteCategory(categoryName)}
        onEdit={this.props.setModal(categoryName)}
      />
    ));
    return (
      <View style={styles.container}>
        {
          this.props.createMode
          && (
          <Modal
            transparent
            onRequestClose={this.props.toggleCreateMode}
            animationType="slide"
          >
            <CategoryModal onSubmit={this.props.addCategory} />
          </Modal>
          )
        }
        {
          this.props.modalContent.name
          && (
          <Modal
            transparent
            onRequestClose={this.props.setModal(null)}
            animationType="slide"
          >
            <CategoryModal
              onSubmit={this.props.editCategory(this.props.modalContent.name)}
              modalContent={this.props.modalContent}
            />
          </Modal>
          )
        }
        <View style={styles.sliderView}>
          <ScrollView
            pagingEnabled
            horizontal
            style={styles.scrollView}
          >
            {categoryCards}
          </ScrollView>
        </View>
      </View>
    );
  }
}
CategoriesView.defaultProps = {
  categories: [
    { categoryName: 'Documents' },
    { categoryName: 'Medication' },
    { categoryName: 'Apparel' },
    { categoryName: 'Electronics' },
    { categoryName: 'Toiletries' },
    { categoryName: 'Kitchenware' },
    { categoryName: 'Food Items' },
    { categoryName: 'Stationery' },
    { categoryName: 'Misc' },
  ],
  onCardClick: noop,
  modalContent: {},
  addCategory: noop,
  deleteCategory: noop,
  editCategory: noop,
  setModal: noop,
  toggleCreateMode: noop,
  createMode: false,
};
CategoriesView.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  onCardClick: PropTypes.func,
  modalContent: PropTypes.object,
  addCategory: PropTypes.func,
  deleteCategory: PropTypes.func,
  editCategory: PropTypes.func,
  setModal: PropTypes.func,
  toggleCreateMode: PropTypes.func,
  createMode: PropTypes.bool,
};
export default CategoriesView;
