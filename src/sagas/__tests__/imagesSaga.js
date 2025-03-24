import { getPage, handleImagesLoad } from "../imagesSaga";
import { runSaga } from "redux-saga";
import * as api from "../../api"
import { setError, setImages } from "../../actions";

test('selector gives back the page', () => {
    const nextPage = 1
    const state = { nextPage }
    const res = getPage(state)
    expect(res).toBe(nextPage)
})

test('should load images and handle them in case of success', async () => {
    const dispatchedActions = []
    const mockedImages = ['abc', 'abcs']
    api.fetchImages = jest.fn(() => Promise.resolve(mockedImages))
    const fakeStore = {
        getState: () => ({ nextPage: 1 }),
        dispatch: action => dispatchedActions.push(action)
    }

    await runSaga(fakeStore, handleImagesLoad).done

    expect(api.fetchImages.mock.calls.length).toBe(1)
    expect(dispatchedActions).toContainEqual(setImages(mockedImages))
})

test('should handle errors in case of fail', async () => {
    const dispatchedActions = []
    const errors = 'Error loading images'
    api.fetchImages = jest.fn(() => Promise.reject(errors))
    const fakeStore = {
        getState: () => ({ nextPage: 1 }),
        dispatch: action => dispatchedActions.push(action)
    }

    await runSaga(fakeStore, handleImagesLoad).done

    expect(api.fetchImages.mock.calls.length).toBe(1)
    expect(dispatchedActions).not.toContainEqual(setError(errors))
})
