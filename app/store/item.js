const Item = ({ item }) => {
  return (
    <div className='card border-0 shadow rounded-4 '>
      <div className='card-body'>
        <h5 class='card-title fw-bold'>{item.name}</h5>
        <p className='text-secondary text-decoration-line-through'>
          {item.oldPrice}
        </p>
        <h4 className='fw-bold'>{item.newPrice}</h4>
        <p className='text-danger'>{item.sale}</p>
        <p>{item.inventory}</p>
      </div>
      <img className='card-img-bottom' src={item.img}></img>
    </div>
  )
}

export default Item
