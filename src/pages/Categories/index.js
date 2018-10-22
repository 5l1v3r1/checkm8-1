import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ToastAndroid, Linking } from 'react-native';
import CategoriesView from '../../components/CategoriesView';
import { storeData, retrieveData, removeData } from '../../utils/common';
import ActionButton from '../../components/Shared/ActionButton';
import newIcon from '../../assets/plus.png';

class Categories extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Categories',
    headerLeft: <View />,
    headerRight: (
      <ActionButton src={newIcon} onPress={navigation.getParam('toggleCreateMode')} border={false} />
    ),
  });

  state={
    categories: [],
    createMode: false,
    modalContent: { name: null },
  }

  componentDidMount() {
    this.fetchCategories();
    this.props.navigation.setParams({ toggleCreateMode: this.toggleCreateMode });
  }


  setModal=name => () => {
    this.setState({
      modalContent: {
        name,
      },
    });
  }

  fetchCategories=() => retrieveData('Categories')
    .then((data) => {
      if (data === null) {
        return;
      }
      const categories = JSON.parse(data);
      this.setState({ categories });
    })

    addCategory=(categoryName) => {
      if (categoryName.length > 0) {
        const newCategory = { categoryName };
        const updatedCategories = this.state.categories.concat(newCategory);
        storeData('Categories', updatedCategories).then(this.fetchCategories).then(this.toggleCreateMode);
      } else {
        ToastAndroid.showWithGravity(
          'Fill the name field or press back to cancel',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      }
    }

    deleteCategory=category => () => {
      const key = this.state.categories.map(cat => cat.categoryName).indexOf(category);
      const updatedList = [...this.state.categories];
      updatedList.splice(key, 1);
      storeData('Categories', updatedList).then(this.fetchCategories);
    }

    editCategory=oldName => (name) => {
      if (name === '') {
        ToastAndroid.showWithGravity(
          'Category name cannot be empty',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else if (oldName !== name) {
        const key = this.state.categories.map(obj => obj.categoryName).indexOf(oldName);
        const updatedList = [...this.state.categories];
        updatedList[key].categoryName = name;
        this.replaceList(oldName, name).then(() => {
          storeData('Categories', updatedList).then(this.fetchCategories)
            .then(this.setModal(null));
        });
      } else {
        this.setModal(null)();
      }
    }

    replaceList=(oldCategory, newCategory) => retrieveData(oldCategory)
      .then((list) => {
        removeData(oldCategory);
        return storeData(newCategory, JSON.parse(list));
      })

    toggleCreateMode=() => {
      this.setState(prevState => ({ createMode: !prevState.createMode }));
    }


  viewList=category => () => {
    this.props.navigation.navigate('Checklist', { selectedCategory: category });
  }

  openLink=() => {
    Linking.openURL('https://github.com/partheus/checkm8');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CategoriesView
          onCardClick={this.viewList}
          categories={this.state.categories}
          createMode={this.state.createMode}
          toggleCreateMode={this.toggleCreateMode}
          addCategory={this.addCategory}
          deleteCategory={this.deleteCategory}
          editCategory={this.editCategory}
          modalContent={this.state.modalContent}
          setModal={this.setModal}
          openLink={this.openLink}
        />
      </View>
    );
  }
}

Categories.defaultProps = {
  navigation: {},
};
Categories.propTypes = {
  navigation: PropTypes.object,
};
export default Categories;
