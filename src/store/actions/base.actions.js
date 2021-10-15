const setLoading = (loading) => ({
    type: 'setLoading',
    payload: { data: loading }
});

export const baseActions = { setLoading };
