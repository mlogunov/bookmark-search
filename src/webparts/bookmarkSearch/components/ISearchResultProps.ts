import { ISearchResult } from "../../../models/ISearchResult";

export interface ISearchResultProps {
    results: ISearchResult[];
    filter: string;
}