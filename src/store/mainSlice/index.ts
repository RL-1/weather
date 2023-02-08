import { api, token } from './../../api';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import { getWeatherType, IState } from './type';


const initialState = {
    day: 1,
    weather: [],
    weatherLocation: [],
    weatherDays: [],
} as IState;

export const getWeather = createAsyncThunk(
    'main/getCurrent',
    async ({country, day}: getWeatherType ) => {
        const response = await fetch(`${api}/forecast.json?key=${token}&days=${day}&q=${country}`)
          .then((res) => res.json())
        return response
    }
)

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setCurrentDate: (state, {payload}: PayloadAction<number>) => {
            state.day = payload
        }
    },
    extraReducers: {
        [getWeather.fulfilled.type]: (state, {payload}) => {
            state.weather = payload.current
            state.weatherLocation = payload.location 
            state.weatherDays = payload.forecast.forecastday[payload.forecast.forecastday.length - 1]
        }
    }
});

export const { setCurrentDate } = mainSlice.actions;

export default mainSlice.reducer;