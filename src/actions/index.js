export const FETCH_MOODBOARDS_REQUEST = 'FETCH_MOODBOARDS_REQUEST';
export const fetchMoodboardsRequest = () => ({
  type: FETCH_MOODBOARDS_REQUEST
});

export const FETCH_MOODBOARDS_SUCCESS = 'FETCH_MOODBOARDS_SUCCESS';
export const fetchMoodboardsSuccess = (cheeses) => ({
  type: FETCH_MOODBOARDS_SUCCESS,
  cheeses
});
export const FETCH_MOODBOARDS_ERROR = 'FETCH_MOODBOARDS_ERROR';
export const fetchMoodboardsError = (error) => ({
  type: FETCH_MOODBOARDS_ERROR,
  error
});

export const FETCH_MOODBOARDS = 'FETCH_MOODBOARDS';
export const fetchMoodboards = () => dispatch => {
  console.log('fetching...');
  dispatch(fetchMoodboardsRequest());
  return fetch(`${API_BASE_URL}/api/moodboards`)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then(data => {
      dispatch(fetchMoodboardsSuccess(data));
    })
    .catch(err => {
      dispatch(fetchMoodboardsError(err));
    });
};