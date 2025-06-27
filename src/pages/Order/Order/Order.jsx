import React, { useState } from 'react';
import Cover from '../../Shared/Cover/Cover';
import orderCoverImg from '../../../assets/shop/banner2.jpg'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import useMenu from '../../../hooks/useMenu';
import 'react-tabs/style/react-tabs.css';
import FoodCard from '../../../components/FoodCard/FoodCard';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {
    // const [tabIndex, setTabIndex] = useState(0);
    const [menu] = useMenu();
    const categories = ['salad','pizza','soup','dessert','drinks'];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category.toLowerCase());
    const [tabIndex, setTabIndex] = useState(initialIndex);
    

    const desserts = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const drinks = menu.filter(item => item.category === 'drinks');

    return (

            <section>
                <Helmet>
                        <title>@ZubaerQ | Order</title>
                    </Helmet>
                <div className=" ">

<Cover img={orderCoverImg} title="Order Food" />
<Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
    <TabList className="flex flex-wrap gap-4 my-8">
        {['Salad', 'Pizza', 'Soup', 'Dessert', 'Drinks'].map((tabName, index) => (
            <Tab
                key={index}
                className="px-4 py-2 text-sm md:text-base font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-yellow-100 hover:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer transition-all duration-300"
                selectedClassName="bg-yellow-400 text-white border-yellow-400"
            >
                {tabName}
            </Tab>
        ))}
    </TabList>

    <TabPanel>
    <OrderTab items={salad} ></OrderTab>
        
    </TabPanel>
    <TabPanel>
    <OrderTab items={pizza} ></OrderTab>

    </TabPanel>
    <TabPanel>
    <OrderTab items={soup} ></OrderTab>

    </TabPanel>
    <TabPanel>
    <OrderTab items={desserts} ></OrderTab>

    </TabPanel>
    <TabPanel>
    <OrderTab items={drinks} ></OrderTab>

    </TabPanel>
</Tabs>
</div>
            </section>
        
    );
};

export default Order;
