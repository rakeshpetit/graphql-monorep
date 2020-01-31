import React from 'react'
import Link from "next/link";
import Title from './styles/Title'
import ItemStyles from './styles/ItemStyles'
import PriceTag from './styles/PriceTag'
import formatMoney from '../lib/formatMoney'

const Item = ({ item }) => {

    return (
        <ItemStyles>
            {item.iamge && <img src={item.image} alt={item.title} />}
            <Title>
                <Link href={{ pathname: '/item', query: { id: item.id } }}>
                    <a>{item.title}</a>
                </Link>
            </Title>
            <img height={100} src={item.image} />
            <PriceTag>{formatMoney(item.price)}</PriceTag>
            <p>{item.description}</p>
            <div className="buttonList">
                <Link href={{
                    pathname: 'update',
                    query: { id: item.id },
                }}>
                    <a>Edit</a>
                </Link>
                <button>Add to Card</button>
                <button>Delete</button>
            </div>
        </ItemStyles>
    )
}

export default Item
