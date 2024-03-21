import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { parse } from 'node-html-parser';

@Injectable()
export class ZmtApisService {
  private baseSuggestionUrl = `https://www.zomato.com/webroutes/search/autoSuggest?addressId=0&entityId=5&entityType=city&locationType=&isOrderLocation=1&cityId=5&latitude=18.5204690000000000&longitude=73.8566200000000000&userDefinedLatitude=18.520469&userDefinedLongitude=73.85662&entityName=Pune&orderLocationName=Pune&cityName=Pune&countryId=1&countryName=India&displayTitle=Pune&o2Serviceable=true&placeId=1165&cellId=4306215736965070848&deliverySubzoneId=1165&placeType=DSZ&placeName=Banglore&isO2City=true&fetchFromGoogle=false&fetchedFromCookie=true&q=`;

  /**
   *
   * @param query This will be get from the url what the user searches
   * @returns The Array of objects which contains all the suggestions related to what user types in the search box
   */
  async getSearchSuggestions(query: string) {
    const suggestionUrl = `${this.baseSuggestionUrl}${query}`;
    try {
      const response = await axios.get(suggestionUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          // You can set the User-Agent header to mimic a specific browser
        },
      });

      return response.data;
    } catch (error) {
      return { error: `Error Occured in ZMT API call: - ${error}` };
    }
  }

  /**
   *
   * @param resturentName This will be selected resturent to display the menu
   * @returns The Scrapped data from the page
   */
  async getResturentDetailsData(resturentName: string) {
    // DATA SCRAPPING

    try {
      // 'https://www.zomato.com/pune/brahma-pure-veg-sinhgad-road/order';
      const resturentUrl = `${process.env.ZMT_BASE_URL}${resturentName}${process.env.RESTURENT_PAGE_TAB}`;

      // console.log(resturentName);

      // const response = await axios.get(url);
      const response = await axios.get(resturentUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          // You can set the User-Agent header to mimic a specific browser
        },
      });

      
      const html = response.data;
      const root = parse(html);

      const data = root
        .querySelectorAll('script')
        .find((element) =>
          element.innerHTML.includes('__PRELOADED_STATE__'),
        ).rawText; 

      // Regular expression to extract JSON string inside JSON.parse() call
      const jsonRegex = /JSON\.parse\("(.+?)"\)/;
      const match = data.match(jsonRegex);
      const jsonString = match ? match[1] : null;
      const level1 = jsonString.replace(/\\"/g, '"');
      const level2 = level1.replace(/\\"/g, '"');
      const metadataCleanJson = level2.replace(/\\"/g, "'");
      let result = JSON.stringify(metadataCleanJson);

      // console.log('Replacement completed');

      // return jsonString;
      // console.log(JSON.parse(result));

      return JSON.parse(result);

      // return parsedJson;
    } catch (error) {
      //   console.error('Error fetching data:', error);
      return error;
    }
  }
}
