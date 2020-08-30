import axios_core from 'axios';

import { OPENWEATHERMAP_NEXT_FIVE_DAYS } from '../global.js';

export function getNextFiveDays() {
    return axios_core.get( OPENWEATHERMAP_NEXT_FIVE_DAYS,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.log(error);
      });
}