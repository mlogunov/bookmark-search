import { ISearchResult } from '../models/ISearchResult';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import {sp, PermissionKind} from '@pnp/sp';
import "@pnp/polyfill-ie11";

export default class SPServices {
    constructor(private context: WebPartContext){
        sp.setup({
            spfxContext: this.context
        })
    }

    public async getResults(): Promise<ISearchResult[]> {
        let results: ISearchResult[] = [];
        try{
            const listItems: any[] = await sp.web.lists.getByTitle('Bookmarks').items.select('Id','Title','Url','Description','Tags').getAll();
            results = listItems.map((item: any): ISearchResult => {return {id: item.Id, title: item.Title, url: item.Url, description: item.Description, tags: item.Tags}});
        }
        catch(error){
            return Promise.reject(error)
        }
        return results;
    }

    public async currentUserCanAddListItems(): Promise<boolean> {
        let canAddItem: boolean = false;
        try{
            canAddItem = await sp.web.lists.getByTitle('Bookmarks').currentUserHasPermissions(PermissionKind.AddListItems);
        }
        catch(error){
            return Promise.reject(error);
        }
        return canAddItem;
    }
}