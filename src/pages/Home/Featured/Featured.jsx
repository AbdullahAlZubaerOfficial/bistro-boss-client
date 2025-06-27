import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg';
import './Featured.css';
import { Link } from "react-router-dom";


const Featured = () => {
    return (
        <div className="featured-item bg-fixed  text-white pt-8 my-20">
            <SectionTitle subHeading="check it out" heading="Featured Item" />
            <div className="flex flex-col md:flex-row justify-center items-center bg-slate-500 bg-opacity-60 pb-10 pt-8 px-4 md:px-36 space-y-6 md:space-y-0 md:space-x-10">
                <div className="w-full md:w-1/2">
                    <img className="w-full rounded-lg" src={featuredImg} alt="Featured" />
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <p className="text-sm md:text-base">Aug 20, 2029</p>
                    <p className="uppercase font-semibold mt-2 mb-2 md:text-lg">Where can I get some?</p>
                    <p className="text-sm md:text-base">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate expedita hic dolorem,
                        iusto vel suscipit nam excepturi debitis magnam nostrum!
                    </p>
<Link to="/order/salad">                    <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
</Link>
                </div>
            </div>
        </div>
    );
};

export default Featured;
