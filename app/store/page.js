import { load } from 'cheerio'
import { use } from 'react'
import Item from './item'

const getSales = async () => {
  const html = await fetch('https://my.freshpoint.cz/device/product-list/67')
  const page = await html.text()
  const $ = load(page)
  let items = []
  $('.text-light').each((_, e) => {
    const root = $(e).parent().parent().parent()
    const name = $(root).children().first().children().first().text()
    const img = $(root)
      .children('.position-relative')
      .first()
      .children()
      .first()
      .next()
      .children()
      .attr().src
    const sale = $(root)
      .children('.position-relative')
      .first()
      .children()
      .first()
      .next()
      .children()
      .next()
      .children()
      .text()

    const oldPrice = $(root)
      .children('.pl-md-3')
      .first()
      .children()
      .first()
      .text()

    const newPrice = $(root)
      .children('.pl-md-3')
      .first()
      .children()
      .first()
      .next()
      .text()

    let inventory = $(root)
      .children('.pl-md-3')
      .first()
      .next()
      .children()
      .text()
      .trim()

    if (/\d/.test(inventory)) {
      inventory = inventory.replace(/\s/g, '')
      inventory = inventory
        .replace(/(\d+)/g, function (_, num) {
          return ' ' + num + ' '
        })
        .trim()
    }

    items = [...items, { name, img, sale, oldPrice, newPrice, inventory }]
  })
  return items
}

const Store = () => {
  const items = use(getSales())

  return (
    <div>
      <h3>Store</h3>
      <div className='row'>
        {items.map((e) => (
          <div className='col-3'>
            <Item key={e.name} item={e} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Store
