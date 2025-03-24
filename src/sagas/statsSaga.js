import { fork, take, put, call } from "redux-saga/effects";
import { IMAGES } from "../constants";
import { loadImagesStats, setImagesStats, setImageStatsError } from "../actions";
import { fetchImagesStats } from "../api";

function* handleStatsRequest(id) {
    for (let i = 0; i < 3; i++) {
        try {
            yield put(loadImagesStats(id))
            const res = yield call(fetchImagesStats, id)
            console.log(res, 'data')
            yield put(setImagesStats(id, res.downloads.total))
            return true
        } catch (err) {

        }
    }
    yield put(setImageStatsError(id))
}

function* watchStatsRequest() {
    while (true) {
        const { images } = yield take(IMAGES.LOAD_SUCCESS)

        for (let i = 0; i < images.length; i++) {
            yield fork(handleStatsRequest, images[i].id)
        }
    }

}

export default watchStatsRequest