import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('saidpiece_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('saidpiece_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, settings) => {
        setCart(prevCart => {
            // Unique key based on product ID and selected options (size, color etc)
            const cartId = `${product.id}-${settings.size || 'default'}-${settings.color || 'default'}`;

            const existingItem = prevCart.find(item => item.cartId === cartId);
            if (existingItem) {
                return prevCart.map(item =>
                    item.cartId === cartId
                        ? { ...item, quantity: item.quantity + (settings.quantity || 1) }
                        : item
                );
            }

            return [...prevCart, {
                ...product,
                ...settings,
                cartId,
                quantity: settings.quantity || 1
            }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (cartId) => {
        setCart(prevCart => prevCart.filter(item => item.cartId !== cartId));
    };

    const updateQuantity = (cartId, delta) => {
        setCart(prevCart => prevCart.map(item => {
            if (item.cartId === cartId) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
        return total + (price * item.quantity);
    }, 0);

    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            isCartOpen,
            setIsCartOpen,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};
