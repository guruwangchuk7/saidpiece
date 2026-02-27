import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../../context/CartContext';
import { FaPlus, FaMinus, FaChevronLeft } from 'react-icons/fa';
import rightArrow from '../../../assets/icons/rightArrow.svg';
import { supabase } from '../../../services/supabaseClient';

const CartDrawer = () => {
    const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState('cart');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        location: ''
    });

    // Reset step when drawer closes
    useEffect(() => {
        if (!isCartOpen) {
            setTimeout(() => setStep('cart'), 500);
        }
    }, [isCartOpen]);

    // Lock body scroll and prevent background shift
    useEffect(() => {
        if (isCartOpen) {
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

    const deliveryFee = 0;
    const total = cartTotal + deliveryFee;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const handleWhatsAppCheckout = async () => {
        setLoading(true);
        try {
            // 1. Log Order to Supabase First to get Order Ref
            const { data: orderData, error } = await supabase
                .from('orders')
                .insert([{
                    customer_name: formData.name,
                    customer_phone: formData.phone,
                    delivery_location: formData.location,
                    items: cart,
                    total_amount: total,
                    status: 'pending_verification'
                }])
                .select()
                .single();

            if (error) throw error;

            const orderRef = orderData.id.split('-')[0];

            // 2. Prepare WhatsApp message with Order Ref
            const businessPhone = "66931205085";
            let message = `*NEW ORDER FROM SAIDPIECE*\n`;
            message += `*Order Ref:* #${orderRef}\n`;
            message += `--------------------------\n`;
            message += `*Customer:* ${formData.name}\n`;
            message += `*Phone:* ${formData.phone}\n`;
            message += `*Location:* ${formData.location}\n`;
            message += `--------------------------\n`;
            message += `*Items:*\n`;

            cart.forEach(item => {
                message += `• ${item.quantity}x ${item.title} (${item.size}) - ${item.price}\n`;
            });

            message += `--------------------------\n`;
            message += `*Total: ${formatCurrency(total)}*\n\n`;
            message += `Please confirm my order. Thank you!`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${businessPhone}?text=${encodedMessage}`;

            // Optional: Update the order with the whatsapp link
            await supabase.from('orders').update({ whatsapp_link: whatsappUrl }).eq('id', orderData.id);

            // 3. Open WhatsApp and Clear UI
            window.open(whatsappUrl, '_blank');
            clearCart();
            setIsCartOpen(false);

        } catch (err) {
            console.error("Order processing failed:", err);
            alert("Something went wrong, but you can still message us on WhatsApp.");
        } finally {
            setLoading(false);
        }
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
                        <div className="pt-12 px-5 sm:px-8 pb-6 flex justify-between items-center border-b border-zinc-100 relative">
                            {step === 'details' && (
                                <button
                                    onClick={() => setStep('cart')}
                                    className="absolute left-5 sm:left-8 top-12 p-2 hover:bg-black/5 rounded-full transition-colors"
                                >
                                    <FaChevronLeft className="text-xs" />
                                </button>
                            )}
                            <h2 className={`text-3xl font-light tracking-[0.2em] uppercase w-full text-center ${step === 'details' ? '' : 'text-left'}`}>
                                {step === 'details' ? 'Delivery' : 'Cart'}
                            </h2>

                            {/* Close Button */}
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 transition-colors z-10"
                                aria-label="Close cart"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 md:w-8 md:h-8 text-black">
                                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="square" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto no-scrollbar px-5 sm:px-8 py-8">
                            {step === 'cart' ? (
                                <div className="space-y-10">
                                    {cart.length === 0 ? (
                                        <div className="h-64 flex flex-col items-center justify-center opacity-30 space-y-4">
                                            <p className="text-xs uppercase tracking-widest">Your cart is empty</p>
                                        </div>
                                    ) : (
                                        cart.map((item) => (
                                            <div key={item.cartId} className="flex gap-6 group">
                                                <div className="w-24 h-24 bg-zinc-50 overflow-hidden flex-shrink-0">
                                                    <img src={item.images?.[0] || item.image} alt={item.title} className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-500" />
                                                </div>
                                                <div className="flex-1 flex flex-col justify-between">
                                                    <div className="space-y-1">
                                                        <div className="flex justify-between items-start">
                                                            <h3 className="text-sm font-bold uppercase tracking-widest">{item.title}</h3>
                                                            <button onClick={() => removeFromCart(item.cartId)} className="text-[10px] opacity-30 hover:opacity-100 transition-opacity">REMOVE</button>
                                                        </div>
                                                        <p className="text-xs uppercase tracking-widest opacity-40">{item.size}</p>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-4">
                                                        <div className="flex items-center border border-zinc-200">
                                                            <button onClick={() => updateQuantity(item.cartId, -1)} className="px-3 py-2 hover:bg-zinc-50"><FaMinus className="text-[9px]" /></button>
                                                            <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                                                            <button onClick={() => updateQuantity(item.cartId, 1)} className="px-3 py-2 hover:bg-zinc-50"><FaPlus className="text-[9px]" /></button>
                                                        </div>
                                                        <span className="text-sm font-light tracking-wider">{item.price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-8 py-4">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest font-bold text-black">Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Enter your name"
                                            disabled={loading}
                                            className="w-full bg-zinc-50 border-none p-4 text-sm tracking-wider text-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-black/30 disabled:opacity-50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest font-bold text-black">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+975 ..."
                                            disabled={loading}
                                            className="w-full bg-zinc-50 border-none p-4 text-sm tracking-wider text-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-black/30 disabled:opacity-50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest font-bold text-black">Delivery Location</label>
                                        <textarea
                                            rows="3"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            placeholder="Thimphu, Babesa..."
                                            disabled={loading}
                                            className="w-full bg-zinc-50 border-none p-4 text-sm tracking-wider text-black focus:ring-1 focus:ring-black outline-none transition-all resize-none placeholder:text-black/30 disabled:opacity-50"
                                        />
                                    </div>
                                    <div className="p-4 bg-zinc-50 border border-zinc-100 text-xs leading-relaxed text-black font-medium">
                                        {loading ? "Logging your order..." : "* By clicking \"Confirm Order\", you will be redirected to WhatsApp to share these details and finalize payment via mBOB or BNB."}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Summary Footer */}
                        <div className="bg-zinc-50 p-5 sm:p-8 space-y-8">
                            <div className="space-y-4 text-xs uppercase tracking-widest font-medium">
                                <div className="flex justify-between text-black">
                                    <span>Amount</span>
                                    <span>{formatCurrency(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-black">
                                    <span>Delivery</span>
                                    <span>{deliveryFee === 0 ? 'FREE' : formatCurrency(deliveryFee)}</span>
                                </div>
                                <div className="flex justify-between text-base font-bold border-t border-zinc-200 pt-4 text-black">
                                    <span>Total</span>
                                    <span>{formatCurrency(total)}</span>
                                </div>
                            </div>

                            <div className="pt-4">
                                {step === 'cart' ? (
                                    <button
                                        disabled={cart.length === 0}
                                        onClick={() => setStep('details')}
                                        className="w-full bg-black text-white py-5 flex justify-between items-center px-6 sm:px-8 group overflow-hidden disabled:opacity-20 disabled:cursor-not-allowed"
                                    >
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Checkout</span>
                                        <img src={rightArrow} alt="arrow" className="w-5 invert transition-transform duration-500 group-hover:translate-x-1" />
                                    </button>
                                ) : (
                                    <button
                                        disabled={!formData.name || !formData.phone || !formData.location || loading}
                                        onClick={handleWhatsAppCheckout}
                                        className="w-full bg-[#25D366] text-white py-5 flex justify-between items-center px-8 group overflow-hidden disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                                            {loading ? 'Processing...' : 'Confirm via WhatsApp'}
                                        </span>
                                        <img src={rightArrow} alt="arrow" className="w-5 invert transition-transform duration-500 group-hover:translate-x-1" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
