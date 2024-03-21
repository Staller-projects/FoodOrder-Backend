import { Controller, Get, Param, Query } from '@nestjs/common';
import { ZmtApisService } from './zmt-apis.service';

@Controller('zmt-apis')
export class ZmtApisController {

    constructor(private readonly ZmtApisService: ZmtApisService) {}

    /**
     * GET /getcitybycityid
     * GET /getSearchSuggestions
     */


    @Get('suggestions') // GET /getSearchSuggestions
    async getSearchSuggestions(@Query('q') query: string) {
        const response =  await this.ZmtApisService.getSearchSuggestions(query);      
        
        return response;
    }
    
    @Get('resturantpage')  // GET 
    async getResturentDetailsData(@Query('resturantname') resturentName: string) {
        const response =  await this.ZmtApisService.getResturentDetailsData(resturentName);      
        
        return response;

    }
}
