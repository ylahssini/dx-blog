import { createContext, useContext, useSyncExternalStore } from 'react';

function createStore(initState) {
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
            { key: 'name', label: 'Name', value: '', type: 'text' },
            { key: 'description', label: 'Description', value: '', type: 'text' },
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
            { key: 'title', label: 'Title', value: '', type: 'text' },
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
