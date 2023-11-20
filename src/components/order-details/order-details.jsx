
import styles from './order-details.module.css'
import confirmImage from '../../images/done.png'

const OrderDetails = () => {
  return (
    <div className={styles.order}>
      <p className='text text_type_digits-large mb-8'>034536</p>
      <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
      <img className={styles.order__confirm_image} src={confirmImage}></img>
      <p className='text text_type_main-small mb-2'>Ваш заказ начали готовит</p>
      <p className="text text_type_main-default text_color_inactive mb-15">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
};

export default OrderDetails
