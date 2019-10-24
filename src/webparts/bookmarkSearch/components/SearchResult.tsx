import * as React from 'react';
import { ISearchResultProps } from './ISearchResultProps';
import styles from './BookmarkSearch.module.scss';
import { ISearchResult } from '../../../models/ISearchResult';
import { Icon, Link } from 'office-ui-fabric-react';
import {NoResultsMessage} from 'BookmarkSearchWebPartStrings';

export const SearchResult: React.StatelessComponent<ISearchResultProps> = (props: ISearchResultProps): React.ReactElement<ISearchResultProps> => {
    const results: JSX.Element[] | JSX.Element = (props.filter.length >= 2 && props.results.length == 0) ?
    <div className={styles.searchResult}>{NoResultsMessage}</div> :
    props.results.map((result: ISearchResult): JSX.Element => {
        return (
            <div className={styles.searchResult} key={result.id}>
                <Icon iconName='SingleBookmark' className={styles.resultIcon} />
                <div className={styles.resultTitle}><h3><Link href={result.url} target='_blank'>{result.title}</Link></h3></div>
                <div className={styles.resultUrl}><Link href={result.url} target='_blank'>{result.url}</Link></div>
                <div className={styles.resultDescription}>{result.description}</div>
            </div>
        );
    })

    return (
        <div className={styles.searchResultBox}>
            {results}
        </div>
    );
}