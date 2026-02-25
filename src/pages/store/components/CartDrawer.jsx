import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../../context/CartContext';
import { FaPlus, FaMinus } from 'react-icons/fa';
import rightArrow from '../../../assets/icons/rightArrow.svg';

const CartDrawer = () => {
    const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    // Lock body scroll and prevent background shift
    useEffect(() => {
        if (isCartOpen) {
            // Calculate scrollbar width
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [isCartOpen]);

    const deliveryFee = 0; // Free delivery as per standard architectural luxury positioning
    const total = cartTotal + deliveryFee;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full md:w-[60%] lg:w-[45%] xl:w-[35%] bg-white text-black shadow-2xl z-[101] flex flex-col"
                    >
                        {/* Header */}
                        <div className="pt-12 px-8 pb-6 flex justify-between items-center border-b border-zinc-100">
                            <h2 className="text-3xl font-light tracking-[0.2em] uppercase">Cart</h2>
                            {/* Close Button */}
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 transition-colors z-10"
                                aria-label="Close cart"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="w-6 h-6 md:w-8 md:h-8 text-black"
                                >
                                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="square" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        {/* Item List */}
                        <div className="flex-1 overflow-y-auto no-scrollbar px-8 py-8 space-y-10">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center opacity-30 space-y-4">
                                    <p className="text-xs uppercase tracking-widest">Your cart is empty</p>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.cartId} className="flex gap-6 group">
                                        {/* Thumbnail */}
                                        <div className="w-24 h-24 bg-zinc-50 overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.images?.[0] || item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-500"
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="space-y-1">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="text-xs font-bold uppercase tracking-widest">{item.title}</h3>
                                                    <button
                                                        onClick={() => removeFromCart(item.cartId)}
                                                        className="text-[9px] opacity-30 hover:opacity-100 transition-opacity"
                                                    >
                                                        REMOVE
                                                    </button>
                                                </div>
                                                <p className="text-[10px] uppercase tracking-widest opacity-40">
                                                    {item.size}
                                                </p>
                                            </div>

                                            {/* Quantity Modifier */}
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center border border-zinc-200">
                                                    <button
                                                        onClick={() => updateQuantity(item.cartId, -1)}
                                                        className="px-3 py-2 hover:bg-zinc-50"
                                                    >
                                                        <FaMinus className="text-[7px]" />
                                                    </button>
                                                    <span className="w-8 text-center text-[10px] font-bold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.cartId, 1)}
                                                        className="px-3 py-2 hover:bg-zinc-50"
                                                    >
                                                        <FaPlus className="text-[7px]" />
                                                    </button>
                                                </div>
                                                <span className="text-xs font-light tracking-wider">{item.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Summary Footer */}
                        <div className="bg-zinc-50 p-8 space-y-8">
                            <div className="space-y-4 text-[10px] uppercase tracking-widest font-medium">
                                <div className="flex justify-between opacity-50">
                                    <span>Amount</span>
                                    <span>{formatCurrency(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between opacity-50">
                                    <span>Delivery</span>
                                    <span>{deliveryFee === 0 ? 'FREE' : formatCurrency(deliveryFee)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-bold border-t border-zinc-200 pt-4">
                                    <span>Total</span>
                                    <span>{formatCurrency(total)}</span>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button className="w-full bg-black text-white py-5 flex justify-between items-center px-8 group overflow-hidden">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Checkout</span>
                                    <img
                                        src={rightArrow}
                                        alt="arrow"
                                        className="w-5 invert transition-transform duration-500 group-hover:translate-x-1"
                                    />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
