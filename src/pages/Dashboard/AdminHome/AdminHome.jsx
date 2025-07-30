import { useQuery } from '@tanstack/react-query';
import { FaBook, FaDollarSign, FaUsers } from 'react-icons/fa';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend, ResponsiveContainer } from 'recharts';
import useAxiosSecure from '../../../hooks/useAxios';
import useAuth from '../../../hooks/useAuth';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../../utils/motion';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    const { data: chartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stats');
            return res.data;
        }
    })

    // custom shape for the bar chart
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    // custom shape for the pie chart
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text 
                x={x} 
                y={y} 
                fill="white" 
                textAnchor={x > cx ? 'start' : 'end'} 
                dominantBaseline="central"
                fontSize={12}
                fontWeight="bold"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const pieChartData = chartData.map(data => {
        return {name: data.category, value: data.revenue}
    })

    // Stats card data
    const statCards = [
        {
            icon: <FaDollarSign className='text-3xl' />,
            title: 'Revenue',
            value: stats?.revenue ? `$${stats.revenue.toFixed(2)}` : 'Loading...',
            desc: 'Jan 1st - Feb 1st',
            color: 'text-secondary'
        },
        {
            icon: <FaUsers className='text-3xl' />,
            title: 'Users',
            value: stats?.users || 'Loading...',
            desc: '↗︎ 400 (22%)',
            color: 'text-primary'
        },
        {
            icon: <FaBook className='text-3xl' />,
            title: 'Menu Items',
            value: stats?.menuItems || 'Loading...',
            desc: '↗︎ 400 (22%)',
            color: 'text-accent'
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>,
            title: 'Orders',
            value: stats?.orders || 'Loading...',
            desc: '↘︎ 90 (14%)',
            color: 'text-info'
        }
    ];

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="p-4 md:p-6"
        >
            <motion.h2 
                variants={fadeIn('down', 'tween', 0.1, 1)}
                className="text-3xl font-bold mb-6 text-gray-800 dark:text-white"
            >
                <span>Hi, Welcome </span>
                {user?.displayName ? user.displayName : 'Back'}
            </motion.h2>
            
            {/* Stats Cards */}
            <motion.div 
                variants={fadeIn('up', 'tween', 0.2, 1)}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
                {statCards.map((stat, index) => (
                    <motion.div
                        key={index}
                        variants={fadeIn('up', 'tween', 0.2 + index * 0.1, 1)}
                        whileHover={{ y: -5 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-primary"
                    >
                        <div className={`stat-figure ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div className="stat-title text-gray-500 dark:text-gray-300">{stat.title}</div>
                        <div className="stat-value text-2xl font-bold text-gray-800 dark:text-white">
                            {stat.value}
                        </div>
                        <div className="stat-desc text-gray-400">{stat.desc}</div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Charts */}
            <motion.div 
                variants={fadeIn('up', 'tween', 0.4, 1)}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
                {/* Bar Chart */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                >
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Order Quantity by Category</h3>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                <XAxis 
                                    dataKey="category" 
                                    tick={{ fill: '#6b7280' }} 
                                    stroke="#6b7280"
                                />
                                <YAxis 
                                    tick={{ fill: '#6b7280' }} 
                                    stroke="#6b7280"
                                />
                                <Bar 
                                    dataKey="quantity" 
                                    name="Quantity" 
                                    fill="#8884d8" 
                                    shape={<TriangleBar />} 
                                    label={{ position: 'top', fill: '#6b7280' }}
                                    animationBegin={100}
                                    animationDuration={1500}
                                    animationEasing="ease-in-out"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                                    ))}
                                </Bar>
                                <Legend />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Pie Chart */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                >
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Revenue by Category</h3>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="value"
                                    animationBegin={200}
                                    animationDuration={1500}
                                    animationEasing="ease-in-out"
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend 
                                    layout="horizontal" 
                                    verticalAlign="bottom" 
                                    align="center"
                                    wrapperStyle={{ paddingTop: '20px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default AdminHome;