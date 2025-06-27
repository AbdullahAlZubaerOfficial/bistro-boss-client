import React from 'react';
import { Helmet } from 'react-helmet-async';
import menuImg from '../../../assets/menu/banner3.jpg';
import Cover from '../../Shared/Cover/Cover';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import soupImg from '../../../assets/menu/soup-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import backgroundImg from '../../../assets/others/authentication.png'; // ✅ corrected path

const Menu = () => {
    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');

    return (
        <div
            className="bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImg})` }}
        >
            <Helmet>
                <title>@ZubaerQ | Menu</title>
            </Helmet>

            <Cover img={menuImg} title="Our Menu" />
            <SectionTitle subHeading="Don't miss" heading="Today's Offer" />
            <div className="my-20">
                <MenuCategory items={offered} />
            </div>
            <div className="my-20">
                <MenuCategory items={desserts} title="Dessert" img={dessertImg} />
            </div>
            <div className="my-20">
                <MenuCategory items={soup} title="Soup" img={soupImg} />
            </div>
            <div className="my-20">
                <MenuCategory items={salad} title="Salad" img={saladImg} />
            </div>
            <div className="my-20">
                <MenuCategory items={pizza} title="Pizza" img={pizzaImg} />
            </div>
        </div>
    );
};

export default Menu;
