const Item = ({ item }) => {
  return (
    <>
      <div className='card border-0 shadow rounded-4 p-2'>
        <div className='card-body'>
          <h5 className='card-title fw-bold' style={{ height: '2em' }}>
            {item.name}
          </h5>
          <div
            className='item-bg position-relative'
            style={{ backgroundImage: `url("${item.img}")` }}
          >
            <div className='item-sale position-absolute bg-danger rounded-circle fw-bold d-flex justify-content-center align-items-center'>
              <span className='text-light'>{item.sale}</span>
            </div>
          </div>
          <p className='text-secondary text-decoration-line-through m-0 mt-2'>
            {item.oldPrice}
          </p>
          <div className='d-flex justify-content-between align-items-end'>
            <h4 className='fw-bold m-0'>{item.newPrice}</h4>
            <span
              className={item.inventory == 'Poslední kus!' ? 'text-danger' : ''}
            >
              {item.inventory}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Item
