import { TCartItem } from '../redux/cart/types';

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart');
    const items: TCartItem[] = data ? JSON.parse(data) : [];
    const totalPrice = items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    const totalCount = items.reduce((sum, obj) => obj.count + sum, 0);

    return {
        items,
        totalPrice,
        totalCount,
    };
};
