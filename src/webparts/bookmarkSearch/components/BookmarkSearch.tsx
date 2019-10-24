import * as React from 'react';
import styles from './BookmarkSearch.module.scss';
import { IBookmarkSearchProps } from './IBookmarkSearchProps';
import { IBookmarkSearchState } from './IBookmarkSearchState';
import { MessageBar, MessageBarType, SearchBox, Icon, Link } from 'office-ui-fabric-react';
import * as strings from 'BookmarkSearchWebPartStrings';
import { SearchResult } from './SearchResult';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import MockHttpClient from '../../../services/MockHttpClient';
import SPServices from '../../../services/SPServices';
import { ISearchResult } from '../../../models/ISearchResult';


export default class BookmarkSearch extends React.Component < IBookmarkSearchProps, IBookmarkSearchState > {
  private _spServices: SPServices;
  private _hasPermission: boolean;
  constructor(props: IBookmarkSearchProps){
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
      isLoading: false,
      filter: '',
      results: []
    };
    this._spServices = new SPServices(this.props.context);
    this._getResults = this._getResults.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  private async _getResults(): Promise<void>{
    try{
      if (Environment.type === EnvironmentType.Local) {
        const results = await MockHttpClient.getResults();
        this.setState(
          {
            results: results,
            isLoading: false
          }
        );
      }
      //SharePoint environment
      else if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
        const results = await this._spServices.getResults();
        this._hasPermission = await this._spServices.currentUserCanAddListItems();
        this.setState({isLoading: false, results: results})
      }
    }
    catch(error){
      this.setState({ hasError: true, errorMessage: error.message, isLoading: false });
    }
  }

  private _onFilterChange(newValue: string){
    this.setState({filter: newValue})
  }

  public componentDidMount(){
    this.setState({isLoading: true});
    this._getResults();
  }

  public render(): React.ReactElement<IBookmarkSearchProps> {
    const results: ISearchResult[] = this.state.filter.length > 1 ? 
    this.state.results.filter((result: ISearchResult): boolean =>{
      return result.tags.toLowerCase().indexOf(this.state.filter.toLowerCase())  !== -1
    }).slice(0, 19) : [];
    const manageButton = this._hasPermission ?
      <div className={styles.manageButton}>
        <Link href={this.props.context.pageContext.web.absoluteUrl + '/Lists/Bookmarks'} target='_blank'>
          <Icon iconName='Bookmarks' />
            {strings.ManageButtonText}
        </Link>
      </div> : null;
    return(
      this.state.hasError ?
      <MessageBar messageBarType={MessageBarType.error}>
        <h1>{strings.ErrorMessage}</h1>
        <p>{this.state.errorMessage}</p>
      </MessageBar>
      :
      this.state.isLoading ?
      <div className={styles.spinner}>
          <Spinner size={SpinnerSize.large} />
      </div>
      :
      <div className = { styles.bookmarkSearch } >
        {manageButton}
        <div className={styles.searchBoxContainer}>
          <Icon iconName='DoubleBookmark' className={styles.icon}/>
          <SearchBox labelText={strings.SearchBoxPlaceholder} className={styles.searchBox} onChange={this._onFilterChange} />
        </div>
        <SearchResult results={results} filter={this.state.filter} />
      </div >
    );
  }
}
