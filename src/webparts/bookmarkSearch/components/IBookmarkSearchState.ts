import { ISearchResult } from "../../../models/ISearchResult";

export interface IBookmarkSearchState {
    hasError: boolean;
    errorMessage: string;
    isLoading: boolean;
    filter: string;
    results: ISearchResult[];
}