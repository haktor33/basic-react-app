const initialData = {
    loading: false,
};
const base = (state = initialData, action) => {
    switch (action.type) {
        case "setLoading":
            var loading = action.payload.data;
            return { ...state, loading };
        default:
            return state;
    }
};

export { base };