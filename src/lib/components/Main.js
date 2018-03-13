import React from 'react';
import PropTypes from 'prop-types';
import FilterableProductTable from '../FilterableProductTable/components';

const Main = ({ products }) => {
    // TODO: Hack para que renderice. Quitar luego de setear Redux.
   
  
    return (
      <div>
        <FilterableProductTable products={products} />
      </div>
    )
  }

Main.PropTypes = {
    products : PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
}

export default Main;

