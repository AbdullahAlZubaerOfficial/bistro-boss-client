const MenuItem = ({ item }) => {
    const { name, image, price, recipe } = item;
  
    return (
      <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 pb-8 pr-6">
        <img
          style={{ borderRadius: '0 200px 200px 200px' }}
          className="w-[100px] mx-auto sm:mx-0"
          src={image}
          alt={name}
        />
        <div className="flex-1">
          <h3 className="uppercase text-lg font-semibold">{name} <span className="text-gray-300">----------</span></h3>
          <p className="text-gray-600">{recipe}</p>
        </div>
        <p className="text-yellow-500 font-medium sm:ml-auto">${price}</p>
      </div>
    );
  };
  
  export default MenuItem;
  