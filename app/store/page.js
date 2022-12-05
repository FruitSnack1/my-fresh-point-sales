'use client'
import { load } from 'cheerio'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import Item from './item'
import Timer from './timer'

const getSales = async (...args) => {
  return mock
  const html = await fetch(...args).catch((err) => {
    throw err
  })

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

const mock = [
  {
    name: 'Sendvič plněný sýrem Brie a klikvou',
    img: 'https://images.weserv.nl/?url=http://freshpoint.freshserver.cz/backend/web/media/photo/708a5482e6b2869f7697a80164f4c37c4b06be4ad89976e7fd2280d9e20e4046.jpg',
    sale: '-15 %',
    oldPrice: '83.90',
    newPrice: '71.90',
    inventory: 'Poslední kus!',
  },
  {
    name: 'Sendvič s vejcem a slaninou',
    img: 'https://images.weserv.nl/?url=http://freshpoint.freshserver.cz/backend/web/media/photo/20d2be8bf3602140ad3e51d96b2c290af45349321db7cf62dbf0b84b64ebe33c.jpg',
    sale: '-15 %',
    oldPrice: '94.90',
    newPrice: '80.90',
    inventory: 'Poslední kus!',
  },
  {
    name: 'Toast s vejcem',
    img: 'https://images.weserv.nl/?url=http://freshpoint.freshserver.cz/backend/web/media/photo/1f2960be51fc7e4127f6c713ef5bd3e295a5ee1ee1cf9ca72647e82836cf220e.jpg',
    sale: '-15 %',
    oldPrice: '83.90',
    newPrice: '71.90',
    inventory: 'Poslední kus!',
  },
]

const Store = () => {
  const { data: items, error } = useSWR(
    'https://my.freshpoint.cz/device/product-list/67',
    getSales
  )
  const router = useRouter()

  if (error) return <p>{error}</p>
  if (!items) return <div>loading</div>

  return (
    <div className='main d-flex justify-content-between align-items-center flex-column py-5'>
      <Timer />
      <div className='row d-flex justify-content-center'>
        {items.map((e, i) => (
          <div key={i} className='col-4 mb-4 '>
            <Item key={e.name} item={e} />
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          location.reload()
        }}
        className='btn btn-primary'
      >
        Update
      </button>
    </div>
  )
}

export default Store
