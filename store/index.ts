import { useSyncExternalStore } from 'react';

function createStore(initState) {
    let currentState = initState;
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
    };
}

const store = createStore({
    category: { paginate: { skip: 0, limit: 3 } },
});

export const useStore = (selector = (state) => state) => useSyncExternalStore(store.subscribe, () => selector(store.getState()));

export default store;
