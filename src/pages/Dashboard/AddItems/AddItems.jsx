import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxios";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { motion } from "framer-motion";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        try {
            // Upload image to imgBB
            const imageFile = { image: data.image[0] };
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

            if (res.data.success) {
                // Prepare menu item data
                const menuItem = {
                    name: data.name,
                    category: data.category,
                    price: parseFloat(data.price),
                    recipe: data.recipe,
                    image: res.data.data.display_url
                };

                // Send to server
                const menuRes = await axiosSecure.post('/menu', menuItem);
                
                if(menuRes.data.insertedId){
                    reset();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${data.name} added successfully!`,
                        showConfirmButton: false,
                        timer: 1500,
                        background: "#1f2937",
                        color: "#fff",
                        iconColor: "#f97316"
                    });
                }
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
                background: "#1f2937",
                color: "#fff",
                iconColor: "#f97316"
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto px-4 py-8"
        >
            <SectionTitle 
                heading="Add New Menu Item" 
                subHeading="What's delicious today?" 
            />

            <motion.div
                className="bg-white rounded-xl shadow-lg p-6 md:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Recipe Name */}
                    <div className="form-control mb-6">
                        <label className="label">
                            <span className="label-text font-medium text-gray-700">Recipe Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter recipe name"
                            {...register('name', { required: "Recipe name is required" })}
                            className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
                        )}
                    </div>

                    {/* Category and Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Category */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-700">Category*</span>
                            </label>
                            <select
                                {...register('category', { required: "Category is required" })}
                                className={`select select-bordered w-full ${errors.category ? 'select-error' : ''}`}
                            >
                                <option value="">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                            {errors.category && (
                                <span className="text-red-500 text-sm mt-1">{errors.category.message}</span>
                            )}
                        </div>

                        {/* Price */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-700">Price*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-gray-500">$</span>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    {...register('price', { 
                                        required: "Price is required",
                                        min: { value: 0.01, message: "Price must be greater than 0" }
                                    })}
                                    className={`input input-bordered w-full pl-8 ${errors.price ? 'input-error' : ''}`}
                                />
                            </div>
                            {errors.price && (
                                <span className="text-red-500 text-sm mt-1">{errors.price.message}</span>
                            )}
                        </div>
                    </div>

                    {/* Recipe Details */}
                    <div className="form-control mb-6">
                        <label className="label">
                            <span className="label-text font-medium text-gray-700">Recipe Details*</span>
                        </label>
                        <textarea 
                            {...register('recipe', { required: "Recipe details are required" })} 
                            className={`textarea textarea-bordered h-32 ${errors.recipe ? 'textarea-error' : ''}`} 
                            placeholder="Describe the recipe..."
                        ></textarea>
                        {errors.recipe && (
                            <span className="text-red-500 text-sm mt-1">{errors.recipe.message}</span>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div className="form-control mb-8">
                        <label className="label">
                            <span className="label-text font-medium text-gray-700">Recipe Image*</span>
                        </label>
                        <div className="flex items-center gap-4">
                            <input 
                                {...register('image', { required: "Image is required" })} 
                                type="file" 
                                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                                accept="image/*"
                            />
                            {errors.image && (
                                <span className="text-red-500 text-sm">{errors.image.message}</span>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        className="btn btn-primary w-full max-w-xs mx-auto flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaUtensils />
                        Add Menu Item
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default AddItems;