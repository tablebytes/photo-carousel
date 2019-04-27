import React from 'react';
import $ from 'jquery';
import Photostab from './Photostab.jsx';
import MyModal from './MyModal.jsx';
import '../style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      showModal: false,
      slideIndex: -1,
      restaurantIdState: 1,
    };
  }

  componentDidMount() {
    const arrayRestaurant = window.location.pathname.split('/');
    this.setState({ restaurantIdState: arrayRestaurant[2] }, this.getPhotos);
  }

  getPhotos() {
    $.ajax({
      type: 'GET',
      url: `/api/restaurants/${this.state.restaurantIdState}/photos`,
      success: (results) => {
        console.log(results);
        this.setState({ photos: results });
      },
    });
  }

  showModalState(value, slideIndex) {
    this.setState({ showModal: value, slideIndex });
  }

  render() {
    return (
      <div className='photo-gallery'>
      <h2 className='photo-gallery-header'>10 Photos</h2>
      <Photostab
      showModalState={this.showModalState.bind(this)}
      photos={this.state.photos}
      >
      </Photostab>
      {this.state.showModal && (
      <MyModal
      photos={this.state.photos}
      slideIndex={this.state.slideIndex}
      showModalState={this.showModalState.bind(this)}t
      >
      </MyModal>)}
    </div>
    );
  }
}

export default App;
