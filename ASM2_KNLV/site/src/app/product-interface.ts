export interface ProductInterface {
    _id: string;
    name: string;
    price: number;
    categoryId: {
        _id: string;
        name: string;
    };
    img: string;
    imgnho: string[];
    description: string;
    hot: number;
}

export interface CategoryInterface {
    _id: string;
    name: string;
    img: string;
}
