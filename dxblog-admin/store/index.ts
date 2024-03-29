import { createContext, useContext, useSyncExternalStore } from 'react';

export interface Option {
    label: string;
    value: string;
}

interface Paginate {
    skip: number;
    limit: number;
}

export interface FilterItem {
    key: string;
    label: string;
    value: string;
    type: 'text' | 'select' | 'asyncSelect' | 'multiSelect';
    options?: Option[];
}

interface State {
    category: {
        paginate: Paginate;
        filters: FilterItem[];
    };
    post: {
        paginate: Paginate;
        filters: FilterItem[];
        populate: 'category';
    };
    user: {
        paginate: Paginate;
        filters: FilterItem[];
    };
}

interface Store {
    getState: () => State;
    setState: (state) => void;
    subscribe: (onStoreChange: () => void) => () => void;
    serverInitialize: (initState) => void;
}

function createStore(initState): Store {
    let currentState = initState;
    let isInitialized = false;
    const listeners = new Set();

    return {
        getState: () => currentState,
        setState: (newState) => {
            currentState = newState;
            listeners.forEach((listener) => {
                // @ts-ignore
                listener(currentState);
            });
        },
        subscribe: (listener) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
        serverInitialize: (initialState) => {
            if (!isInitialized) {
                currentState = initialState;
                isInitialized = true;
            }
        },
    };
}

export const globalState = {
    category: {
        paginate: { skip: 0, limit: 3 },
        filters: [
            { key: 'original_name', label: 'Name', value: '', type: 'text' },
            {
                key: 'status',
                label: 'Status',
                value: '',
                type: 'select',
                options: [
                    { label: 'Enabled', value: 'true' },
                    { label: 'Disabled', value: 'false' },
                ]
            }
        ],
    },
    post: {
        paginate: { skip: 0, limit: 3 },
        filters: [
            { key: 'original_title', label: 'Title', value: '', type: 'text' },
            { key: 'category_id', label: 'Category', value: '', type: 'asyncSelect' },
            {
                key: 'status',
                label: 'Status',
                value: '',
                type: 'select',
                options: [
                    { label: 'Published', value: 'PUBLISHED' },
                    { label: 'Disabled', value: 'DISABLED' },
                    { label: 'Draft', value: 'DRAFT' },
                ]
            }
        ],
        populate: 'category',
    },
    user: {
        paginate: { skip: 0, limit: 3 },
        filters: [
            { key: 'first_name', label: 'First name', value: '', type: 'text' },
            { key: 'last_name', label: 'Last name', value: '', type: 'text' },
            { key: 'email', label: 'Email address', value: '', type: 'text' },
            {
                key: 'status',
                label: 'Status',
                value: '',
                type: 'select',
                options: [
                    { label: 'Enabled', value: 'true' },
                    { label: 'Disabled', value: 'false' },
                ]
            }
        ],
    },
};

const store = createStore(globalState);

export const ServerContext = createContext(globalState);

export const useStore = (selector = (state) => state) => {
    const serverState = useContext(ServerContext);

    return useSyncExternalStore(
        store.subscribe,
        () => selector(store.getState()),
        () => selector(serverState),
    );
};

export default store;
