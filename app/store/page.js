import { load } from 'cheerio'
import { use } from 'react'
import Item from './item'

const getSales = async () => {
  const html = await fetch('https://my.freshpoint.cz/device/product-list/89')
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
      .last()
      .children()
      .attr().src

    const sale = $(e).children().text()

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
    <div className='row pt-5  d-flex justify-content-center'>
      {items.map((e, i) => (
        <div className='col-3 mb-4 '>
          <Item key={i} item={e} />
        </div>
      ))}
    </div>
  )
}

export default Store
