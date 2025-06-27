import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import PopularMenu from '../PopularMenu/PopularMenu';
import Featured from '../Featured/Featured';
import Testimonials from '../Testimonials/Testimonials';
import { Helmet } from 'react-helmet-async';


const Home = () => {
    return (
        <div className='space-y-8'>
            <Helmet><title>@ZubaerQ | Home</title></Helmet>
            <Banner></Banner>
            <Category></Category>
            <PopularMenu></PopularMenu>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;