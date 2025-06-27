import React from 'react';
import Cover from '../../Shared/Cover/Cover';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import { Link } from 'react-router-dom';

const MenuCategory = ({ items, title, img }) => {
    if (!title) {
        return <p className="text-center text-gray-500 mt-10"></p>;
    }

    return (
        <div className='m-2'>
            {title && img && <Cover img={img} title={title} />}

            {
                items.length === 0 ? (
                    <p className="text-center text-gray-500 mt-10">No items available in this category 😔</p>
                ) : (
                    <>


                        <div className="grid md:grid-cols-2 gap-10 mt-10">
                            {items.map(item => (
                                <MenuItem key={item._id} item={item} />
                            ))}
                        </div>



                        <div className="text-center">
                            <Link to={`/order/${title.toLowerCase()}`}>
                                <button className="btn btn-neutral btn-outline mt-8">Order Your Food 🍽️</button>
                            </Link>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default MenuCategory;
