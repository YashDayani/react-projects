import laysImg from '../../assets/images/lays.jpg'

export const productData = [
    {
        id: 1,
        img: laysImg,
        filter: "BEST SELLER",
        name: "Lay's American Style Cream & Onion Potato",
        category: "Snacks",
        discount: 10,
        weight:"30g",
        price: 12.59,

    },
    {
        id: 2,
        img: "https://www.jiomart.com/images/product/original/491696355/lay-s-india-s-magic-masala-potato-chips-90-g-product-images-o491696355-p590121911-0-202307142035.jpg",
        filter: "FEATURED",
        name: "Lay's India's Magic Masala",
        category: "Snacks",
        weight:"30g",
        price: 10.55,
        discount: 50,

    },
];

export const productNav = [
    {
        filter: 'NEW PRODUCTS',
    },
    {
        filter: 'FEATURED',
    },
    {
        filter: 'BEST SELLER',
    },
    {
        filter: 'DISCOUNTED PRODUCTS',
    },
];