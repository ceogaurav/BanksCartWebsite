import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, query, onSnapshot, getDoc, updateDoc } from 'firebase/firestore';
import { Bike, Car, Truck, Fuel, Trash, LineChart, Plus, Minus, Home, Settings, User, LogOut, Loader, BarChart, X, Check, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- FIREBASE & GLOBAL INITIALIZATION ---

// These global variables are provided by the canvas environment.
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// The main App component
const App = () => {
    // State for Firebase and User
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [loading, setLoading] = useState(true);

    // App Data State
    const [vehicles, setVehicles] = useState([]);
    const [logs, setLogs] = useState([]);

    // UI State
    const [currentPage, setCurrentPage] = useState('dashboard'); // 'dashboard', 'add-log', 'add-vehicle', 'profile'
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [message, setMessage] = useState('');

    // --- FIREBASE INITIALIZATION & AUTHENTICATION ---

    useEffect(() => {
        const initializeFirebase = async () => {
            try {
                // Initialize Firebase App
                const app = initializeApp(firebaseConfig);
                const firestore = getFirestore(app);
                const firebaseAuth = getAuth(app);
                setDb(firestore);
                setAuth(firebaseAuth);

                const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
                    if (user) {
                        setUserId(user.uid);
                    } else {
                        // Sign in anonymously if no token is available
                        if (!initialAuthToken) {
                             console.log("Signing in anonymously...");
                             await signInAnonymously(firebaseAuth);
                        }
                    }
                    setIsAuthReady(true);
                    setLoading(false);
                });

                if (initialAuthToken) {
                    await signInWithCustomToken(firebaseAuth, initialAuthToken);
                }

                return () => unsubscribe();
            } catch (error) {
                console.error("Error initializing Firebase:", error);
                setMessage('Error initializing application. Check console for details.');
                setLoading(false);
            }
        };

        if (Object.keys(firebaseConfig).length > 0) {
            initializeFirebase();
        } else {
            // Fallback if config is missing (for local testing)
            setLoading(false);
            setMessage('Firebase configuration is missing. Cannot persist data.');
        }
    }, [initialAuthToken, firebaseConfig]);


    // --- DATA PATHS AND FETCHING (Firestore Listeners) ---

    const getVehiclePath = useCallback((uid) => {
        if (!uid || !db) return null;
        // Private data path: /artifacts/{appId}/users/{userId}/vehicles
        return collection(db, `artifacts/${appId}/users/${uid}/vehicles`);
    }, [db]);

    const getLogPath = useCallback((uid) => {
        if (!uid || !db) return null;
        // Private data path: /artifacts/{appId}/users/{userId}/logs
        return collection(db, `artifacts/${appId}/users/${uid}/logs`);
    }, [db]);


    // Listener for Vehicles
    useEffect(() => {
        if (!db || !userId || !isAuthReady) return;

        const vehiclesRef = getVehiclePath(userId);
        if (!vehiclesRef) return;

        const q = query(vehiclesRef);

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const vehicleList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setVehicles(vehicleList);
        }, (error) => {
            console.error("Error fetching vehicles:", error);
            setMessage('Failed to load vehicle data.');
        });

        return () => unsubscribe();
    }, [db, userId, isAuthReady, getVehiclePath]);

    // Listener for Logs
    useEffect(() => {
        if (!db || !userId || !isAuthReady) return;

        const logsRef = getLogPath(userId);
        if (!logsRef) return;

        const q = query(logsRef);

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const logList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                // Convert Firestore Timestamp to JavaScript Date object
                date: doc.data().date instanceof Date ? doc.data().date : (doc.data().date ? doc.data().date.toDate() : new Date()),
                distance: parseFloat(doc.data().distance || 0),
                fuelConsumed: parseFloat(doc.data().fuelConsumed || 0),
                emissions: parseFloat(doc.data().emissions || 0),
            }));
            // Sort logs by date descending (most recent first)
            logList.sort((a, b) => b.date.getTime() - a.date.getTime());
            setLogs(logList);
        }, (error) => {
            console.error("Error fetching logs:", error);
            setMessage('Failed to load log data.');
        });

        return () => unsubscribe();
    }, [db, userId, isAuthReady, getLogPath]);


    // --- DATA MANIPULATION FUNCTIONS ---

    const showMessage = (msg, duration = 3000) => {
        setMessage(msg);
        setTimeout(() => setMessage(''), duration);
    };

    const addVehicle = async (vehicleData) => {
        if (!userId || !db) return showMessage('User not authenticated.');

        const vehicleRef = doc(getVehiclePath(userId));
        try {
            await setDoc(vehicleRef, {
                ...vehicleData,
                createdAt: new Date(),
                userId: userId,
            });
            showMessage(`Vehicle "${vehicleData.name}" added successfully!`, 2000);
            setCurrentPage('dashboard');
        } catch (e) {
            console.error("Error adding vehicle: ", e);
            showMessage('Failed to add vehicle.');
        }
    };

    const addLog = async (logData) => {
        if (!userId || !db) return showMessage('User not authenticated.');

        const logRef = doc(getLogPath(userId));

        // Find the vehicle to get its emissions factor
        const vehicle = vehicles.find(v => v.id === logData.vehicleId);
        if (!vehicle) {
            return showMessage('Vehicle not found. Cannot calculate emissions.');
        }

        // Calculate emissions (Example: Fuel Consumption * Emission Factor)
        const emissions = logData.fuelConsumed * vehicle.emissionFactor;
        const newLogData = {
            ...logData,
            emissions: emissions,
            date: new Date(logData.date), // Convert string back to Date object
            createdAt: new Date(),
            userId: userId,
        };

        try {
            await setDoc(logRef, newLogData);
            showMessage('Log entry added successfully!', 2000);
            setCurrentPage('dashboard');
        } catch (e) {
            console.error("Error adding log: ", e);
            showMessage('Failed to add log entry.');
        }
    };

    const deleteLog = async (logId) => {
        if (!userId || !db) return showMessage('User not authenticated.');

        // Deleting a document by setting a 'deleted' flag instead of hard-deleting
        const logRef = doc(db, `artifacts/${appId}/users/${userId}/logs`, logId);

        try {
            await updateDoc(logRef, { deleted: true });
            showMessage('Log entry removed.', 2000);
            closeModal();
        } catch (e) {
            console.error("Error deleting log: ", e);
            showMessage('Failed to remove log entry.');
        }
    }


    // --- UTILITY COMPONENTS & LOGIC ---

    const getIcon = (type) => {
        switch (type) {
            case 'Car': return <Car size={24} className="text-emerald-400" />;
            case 'Truck': return <Truck size={24} className="text-teal-400" />;
            case 'Bike': return <Bike size={24} className="text-sky-400" />;
            default: return <Home size={24} className="text-gray-400" />;
        }
    };

    const getTotalEmissions = useMemo(() => {
        // Filter out deleted logs
        const activeLogs = logs.filter(log => !log.deleted);
        return activeLogs.reduce((sum, log) => sum + log.emissions, 0);
    }, [logs]);

    const getLast30DaysEmissions = useMemo(() => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const activeLogs = logs.filter(log => !log.deleted && log.date >= thirtyDaysAgo);
        return activeLogs.reduce((sum, log) => sum + log.emissions, 0);
    }, [logs]);


    // --- MODAL HANDLING ---

    const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
    };

    const ConfirmDeleteModal = ({ logId }) => (
        <div className="p-6 bg-white rounded-xl shadow-2xl text-center">
            <Trash size={48} className="text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-gray-800">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to remove this log entry? This action cannot be undone.</p>
            <div className="flex justify-center space-x-4">
                <Button onClick={closeModal} variant="secondary">Cancel</Button>
                <Button onClick={() => deleteLog(logId)} variant="danger">
                    <Check size={20} className="mr-2" />
                    Confirm Remove
                </Button>
            </div>
        </div>
    );


    // --- FRAMER MOTION VARIANTS ---

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const staggerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    // --- SHARED UI COMPONENTS ---

    const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button' }) => {
        const baseStyle = "px-6 py-3 rounded-full font-semibold text-center transition-all duration-300 transform active:scale-95 shadow-lg";
        let variantStyle = '';

        switch (variant) {
            case 'primary':
                variantStyle = 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/50';
                break;
            case 'secondary':
                variantStyle = 'bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-gray-400/50';
                break;
            case 'danger':
                variantStyle = 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/50';
                break;
            case 'nav':
                variantStyle = 'text-gray-500 hover:text-emerald-500';
                break;
        }

        return (
            <motion.button
                type={type}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClick}
                className={`${baseStyle} ${variantStyle} ${className}`}
            >
                {children}
            </motion.button>
        );
    };

    const IconButton = ({ children, onClick, className = '' }) => (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            className={`p-2 rounded-full transition-colors ${className}`}
        >
            {children}
        </motion.button>
    );

    const InputField = ({ label, type = 'text', name, value, onChange, placeholder = '' }) => (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 shadow-sm"
                required
            />
        </div>
    );

    // --- FORM COMPONENTS ---

    const AddVehicleForm = () => {
        const [formData, setFormData] = useState({
            name: '',
            type: 'Car',
            emissionFactor: '', // kg CO2e per unit of fuel/km
            fuelType: 'Gasoline',
        });

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            // Simple validation for emissionFactor being a positive number
            const factor = parseFloat(formData.emissionFactor);
            if (isNaN(factor) || factor <= 0) {
                showMessage("Emission Factor must be a positive number.");
                return;
            }
            addVehicle({
                ...formData,
                emissionFactor: factor,
            });
        };

        return (
            <motion.div
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="p-6 md:p-8 bg-white rounded-2xl shadow-xl max-w-lg w-full mx-auto"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <Car className="mr-3 text-emerald-500" />
                    Add New Vehicle
                </h2>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Vehicle Name (e.g., Tesla Model 3)"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 shadow-sm"
                        >
                            <option value="Car">Car</option>
                            <option value="Truck">Truck/SUV</option>
                            <option value="Bike">Bike/Motorcycle</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                        <select
                            name="fuelType"
                            value={formData.fuelType}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 shadow-sm"
                        >
                            <option value="Gasoline">Gasoline</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric (Zero-Tailpipe)</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>

                    <InputField
                        label="Emissions Factor (kg CO2e per Litre/Gallon/kWh)"
                        type="number"
                        name="emissionFactor"
                        value={formData.emissionFactor}
                        onChange={handleChange}
                        placeholder="e.g., 2.3 for gasoline per litre"
                    />

                    <div className="flex justify-end space-x-3 mt-6">
                        <Button variant="secondary" onClick={() => setCurrentPage('dashboard')}>Cancel</Button>
                        <Button type="submit" variant="primary">
                            <Plus size={20} className="mr-2" />
                            Save Vehicle
                        </Button>
                    </div>
                </form>
            </motion.div>
        );
    };

    const AddLogForm = () => {
        const today = new Date().toISOString().split('T')[0];
        const [formData, setFormData] = useState({
            vehicleId: vehicles.length > 0 ? vehicles[0].id : '',
            distance: '',
            fuelConsumed: '',
            date: today,
        });

        useEffect(() => {
            // Auto-select first vehicle if list loads late
            if (vehicles.length > 0 && !formData.vehicleId) {
                setFormData(prev => ({ ...prev, vehicleId: vehicles[0].id }));
            }
        }, [vehicles, formData.vehicleId]);


        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            const { distance, fuelConsumed } = formData;
            if (isNaN(parseFloat(distance)) || parseFloat(distance) <= 0) {
                showMessage("Distance traveled must be a positive number.");
                return;
            }
            if (isNaN(parseFloat(fuelConsumed)) || parseFloat(fuelConsumed) <= 0) {
                showMessage("Fuel consumed must be a positive number.");
                return;
            }

            addLog({
                ...formData,
                distance: parseFloat(distance),
                fuelConsumed: parseFloat(fuelConsumed),
            });
        };

        if (vehicles.length === 0) {
            return (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    className="p-8 bg-white rounded-2xl shadow-xl max-w-lg w-full mx-auto text-center"
                >
                    <h2 className="text-xl font-bold text-gray-800 mb-4">No Vehicles Added</h2>
                    <p className="text-gray-600 mb-6">Please add a vehicle first to log your trips and emissions.</p>
                    <Button onClick={() => setCurrentPage('add-vehicle')}>
                        <Plus size={20} className="mr-2" />
                        Add Vehicle Now
                    </Button>
                </motion.div>
            );
        }

        const selectedVehicle = vehicles.find(v => v.id === formData.vehicleId);

        return (
            <motion.div
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="p-6 md:p-8 bg-white rounded-2xl shadow-xl max-w-lg w-full mx-auto"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <Fuel className="mr-3 text-emerald-500" />
                    Log New Trip
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle</label>
                        <select
                            name="vehicleId"
                            value={formData.vehicleId}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 shadow-sm"
                        >
                            {vehicles.map(v => (
                                <option key={v.id} value={v.id}>{v.name} ({v.fuelType})</option>
                            ))}
                        </select>
                    </div>

                    <InputField
                        label="Date"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />

                    <InputField
                        label="Distance Traveled (km/miles)"
                        type="number"
                        name="distance"
                        value={formData.distance}
                        onChange={handleChange}
                        placeholder="e.g., 50.5"
                    />
                    <p className="text-xs text-gray-500 -mt-2 mb-4">Vehicle Emission Factor: <span className="font-semibold">{selectedVehicle?.emissionFactor || 'N/A'} kg CO2e</span> per unit.</p>

                    <InputField
                        label={`Fuel Consumed (Litres/Gallons/kWh)`}
                        type="number"
                        name="fuelConsumed"
                        value={formData.fuelConsumed}
                        onChange={handleChange}
                        placeholder="e.g., 5"
                    />

                    <div className="flex justify-end space-x-3 mt-6">
                        <Button variant="secondary" onClick={() => setCurrentPage('dashboard')}>Cancel</Button>
                        <Button type="submit" variant="primary">
                            <Plus size={20} className="mr-2" />
                            Log Trip
                        </Button>
                    </div>
                </form>
            </motion.div>
        );
    };

    // --- PAGE COMPONENTS ---

    const Dashboard = () => {
        const activeLogs = logs.filter(log => !log.deleted);

        // Calculate Vehicle Stats
        const vehicleStats = vehicles.map(v => {
            const vehicleLogs = activeLogs.filter(log => log.vehicleId === v.id);
            const totalEmissions = vehicleLogs.reduce((sum, log) => sum + log.emissions, 0);
            const totalDistance = vehicleLogs.reduce((sum, log) => sum + log.distance, 0);
            return {
                ...v,
                totalEmissions: totalEmissions,
                totalDistance: totalDistance,
                logCount: vehicleLogs.length
            };
        });

        return (
            <motion.div initial="hidden" animate="visible" variants={staggerVariants} className="space-y-6 p-4">
                <h1 className="text-3xl font-extrabold text-gray-800">Your Carbon Dashboard</h1>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div variants={cardVariants} className="bg-emerald-500 text-white p-6 rounded-xl shadow-xl">
                        <div className="flex items-center justify-between">
                            <LineChart size={32} />
                            <p className="text-sm font-medium">Total Emissions</p>
                        </div>
                        <p className="text-4xl font-bold mt-2">{getTotalEmissions.toFixed(2)} kg</p>
                        <p className="text-sm opacity-90">All Time CO2e</p>
                    </motion.div>
                    <motion.div variants={cardVariants} className="bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                        <div className="flex items-center justify-between">
                            <TrendingUp size={32} className="text-sky-500" />
                            <p className="text-sm font-medium text-gray-500">Last 30 Days</p>
                        </div>
                        <p className="text-4xl font-bold mt-2 text-gray-800">{getLast30DaysEmissions.toFixed(2)} kg</p>
                        <p className="text-sm text-gray-500">CO2e</p>
                    </motion.div>
                    <motion.div variants={cardVariants} className="bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                        <div className="flex items-center justify-between">
                            <BarChart size={32} className="text-indigo-500" />
                            <p className="text-sm font-medium text-gray-500">Vehicles</p>
                        </div>
                        <p className="text-4xl font-bold mt-2 text-gray-800">{vehicles.length}</p>
                        <p className="text-sm text-gray-500">Tracked Assets</p>
                    </motion.div>
                </div>

                {/* Vehicle Summary */}
                <motion.div variants={cardVariants} className="bg-white p-6 rounded-2xl shadow-xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Your Vehicles</h2>
                        <Button variant="secondary" onClick={() => setCurrentPage('add-vehicle')} className="py-2 px-4 text-sm">
                            <Plus size={16} className="mr-1" />
                            Add
                        </Button>
                    </div>
                    {vehicles.length === 0 ? (
                        <p className="text-gray-500 italic">No vehicles tracked yet. Add one to begin logging emissions.</p>
                    ) : (
                        <ul className="space-y-3">
                            {vehicleStats.map((v) => (
                                <motion.li
                                    key={v.id}
                                    variants={cardVariants}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center space-x-3">
                                        {getIcon(v.type)}
                                        <div>
                                            <p className="font-semibold text-gray-800">{v.name}</p>
                                            <p className="text-sm text-gray-500">{v.fuelType} | {v.emissionFactor} kg/unit</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg text-emerald-600">{v.totalEmissions.toFixed(2)} kg</p>
                                        <p className="text-xs text-gray-500">{v.logCount} trips • {v.totalDistance.toFixed(0)} km</p>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    )}
                </motion.div>

                {/* Recent Log History */}
                <motion.div variants={cardVariants} className="bg-white p-6 rounded-2xl shadow-xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Recent Trip Logs</h2>
                        <Button variant="primary" onClick={() => setCurrentPage('add-log')} className="py-2 px-4 text-sm">
                            <Plus size={16} className="mr-1" />
                            New Log
                        </Button>
                    </div>
                    {activeLogs.length === 0 ? (
                        <p className="text-gray-500 italic">No trips logged yet. Start logging to see your carbon footprint.</p>
                    ) : (
                        <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                            {activeLogs.slice(0, 10).map((log) => {
                                const vehicle = vehicles.find(v => v.id === log.vehicleId);
                                return (
                                    <motion.div
                                        key={log.id}
                                        variants={cardVariants}
                                        className="flex items-center justify-between p-3 bg-white border-b border-gray-100"
                                    >
                                        <div className="flex items-center space-x-3">
                                            {getIcon(vehicle?.type)}
                                            <div>
                                                <p className="font-medium text-gray-800">{vehicle?.name || 'Unknown Vehicle'}</p>
                                                <p className="text-xs text-gray-500">
                                                    {log.date.toLocaleDateString()} | {log.distance.toFixed(1)} km | {log.fuelConsumed.toFixed(1)} unit
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-bold text-base text-red-500">{log.emissions.toFixed(2)} kg CO2e</span>
                                            <IconButton className="text-gray-400 hover:text-red-500" onClick={() => openModal(<ConfirmDeleteModal logId={log.id} />)}>
                                                <X size={16} />
                                            </IconButton>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </motion.div>
            </motion.div>
        );
    };

    // --- MAIN RENDER LOGIC ---

    const renderContent = () => {
        if (loading || !isAuthReady) {
            return (
                <div className="flex items-center justify-center min-h-screen bg-gray-50">
                    <Loader size={48} className="animate-spin text-emerald-500" />
                    <p className="ml-3 text-lg font-medium text-gray-600">Loading Application...</p>
                </div>
            );
        }

        switch (currentPage) {
            case 'add-vehicle':
                return <AddVehicleForm />;
            case 'add-log':
                return <AddLogForm />;
            case 'dashboard':
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-800 flex flex-col">
            {/* Notification Banner */}
            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-0 left-0 right-0 z-50 p-3 text-center bg-emerald-500 text-white font-medium shadow-xl"
                    >
                        {message}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-grow pt-16 pb-20 max-w-4xl mx-auto w-full">
                {renderContent()}
            </main>

            {/* Bottom Navigation Bar */}
            <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl md:hidden">
                <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
                    <Button variant="nav" onClick={() => setCurrentPage('dashboard')}>
                        <Home size={24} className={currentPage === 'dashboard' ? 'text-emerald-500' : ''} />
                    </Button>
                    <Button variant="nav" onClick={() => setCurrentPage('add-log')}>
                        <Plus size={24} className={currentPage === 'add-log' ? 'text-emerald-500' : ''} />
                    </Button>
                    <Button variant="nav" onClick={() => setCurrentPage('add-vehicle')}>
                        <Car size={24} className={currentPage === 'add-vehicle' ? 'text-emerald-500' : ''} />
                    </Button>
                    {/* Placeholder for future profile/settings page */}
                    <Button variant="nav" onClick={() => showMessage(`Your User ID: ${userId}`)}>
                        <User size={24} />
                    </Button>
                    <Button variant="nav" onClick={() => signOut(auth)}>
                        <LogOut size={24} />
                    </Button>
                </div>
            </nav>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-xl max-w-sm w-full"
                        >
                            {modalContent}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default App;
