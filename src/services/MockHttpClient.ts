import { ISearchResult } from "../models/ISearchResult";

export default class MockHttpClient {
    private static _results: ISearchResult[] = [
        {
            id: 1,
            title: 'Google',
            url: 'https://google.com',
            description: "Search the world's information, including webpages, images, videos and more.",
            tags: 'google search'
        },
        {
            id: 2,
            title: 'Яндекс - поисковая система',
            url: 'https://yandex.ru',
            description: 'Поиск по интернету с учётом региона пользователя. Возможность искать по картинкам, видео, картам, новостям, блогам, товарам и словарям.',
            tags: 'яндекс yandex нфтвуч zyltrc поиск'
        },
        {
            id: 3,
            title: 'Bing',
            url: 'https://www.bing.com',
            description: 'Bing helps you turn information into action, making it faster and easier to go from searching to doing.',
            tags: 'bind search'
        }
    ];

    public static getResults(): Promise<ISearchResult[]> {
        try{
            return new Promise<ISearchResult[]>((resolve) => {
                resolve(this._results);
            });
        }
        catch(error) {
            return Promise.reject(error);
        }
    }
}