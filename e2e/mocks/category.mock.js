export const columns = ['Name', 'Description', 'Status', 'Created at', 'Actions'];

export const category_listing = {
    success: true,
    list: {
        count: 5,
        items: [
            {
                _id: '634c4e6801fb7a54f3b252c0',
                name: 'Car accessories',
                description: 'All car accessories you find it here',
                status: false,
                created_by: '62e482c443d1c5168c3a89a0',
                created_at: '2022-10-16T18:33:12.309Z',
                updated_at: '2022-10-16T19:36:08.491Z',
            },
            {
                _id: '634c5d1e01fb7a54f3b2530a',
                name: 'Shoes',
                description: 'All shoes you need is here',
                status: true,
                created_by: '62e482c443d1c5168c3a89a0',
                created_at: '2022-10-16T19:35:58.468Z',
                updated_at: '2022-10-16T19:35:58.468Z',
            },
            {
                _id: '634c5d2401fb7a54f3b2530e',
                name: 'Games',
                description: '',
                status: true,
                created_by: '62e482c443d1c5168c3a89a0',
                created_at: '2022-10-16T19:36:04.524Z',
                updated_at: '2022-10-16T19:36:04.524Z',
            },
        ],
    },
};

export const category_listing_filtered = {
    success: true,
    list: {
        count: 1,
        items: [
            {
                _id: '634c4e6801fb7a54f3b252c0',
                name: 'Car accessories',
                description: 'All car accessories you find it here',
                status: false,
                created_by: '62e482c443d1c5168c3a89a0',
                created_at: '2022-10-16T18:33:12.309Z',
                updated_at: '2022-10-16T19:36:08.491Z',
            },
        ],
    },
};


export const empty_category_listing = {
    ...category_listing,
    list: {
        ...category_listing.list,
        count: 0,
        items: [],
    },
};

export const category_fields = {
    name: 'Home accessories',
    description: 'All home accessories you will find here',
    status: true,
};
