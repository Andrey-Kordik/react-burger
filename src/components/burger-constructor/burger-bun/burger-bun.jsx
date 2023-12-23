
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { burgerPropTypes } from '../../../utils/prop-types';

const Bun = ({ ingredient, text, type }) => {

  return (

    <div key={ingredient.key}>
      <ConstructorElement
        text={text}
        type={type}
        price={ingredient.price}
        key={ingredient.key}
        thumbnail={ingredient.image_mobile}
        isLocked={true}
      />
    </div>
  );
};

Bun.propTypes = {
  ingredient: burgerPropTypes.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default Bun;