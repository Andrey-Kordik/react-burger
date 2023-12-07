
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

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

export default Bun;