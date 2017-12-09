import axios from 'axios';
import reverseGeoCode from 'latlng-to-zip';
import qs from 'qs';

import { FETCH_JOBS, lIKE_JOB, CLEAR_LIKED_JOBS } from './types';

const JOB_QUERY_PARAMS = {
    publisher: '4201738803816157',
    format: 'json',
    v: 2,
    latlong: 1,
    radius: 10,
    q: 'javascript'
};

const API_URL = 'http://api.indeed.com/ads/apisearch?';

function buildJobsUrl(url, zip) {
    const queryStringParams = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
    console.log(queryStringParams);
    const encodedUrl = encodeURI(url);
    return `${encodedUrl}${queryStringParams}`;

}

export const fetchJobs = (region, callbackFn) => async dispatch => {
    try {
        let zip = await reverseGeoCode(region);
        const apiUrl = buildJobsUrl(API_URL, zip);
        let { status, data } = await axios.get(apiUrl);
        console.log(status, data.results);
        dispatch({ type: FETCH_JOBS, payload: data.results });
        callbackFn();
    } catch (e) {
        console.error('@error:', e);
    }
};


export const likeJob = (job) => {
    return { type: lIKE_JOB, payload: job };
}

export const clearLikedJobs = () => {
    return { type: CLEAR_LIKED_JOBS };
}