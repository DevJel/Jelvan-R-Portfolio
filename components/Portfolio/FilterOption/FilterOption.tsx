import React from 'react';
import * as Styled from './FilterOption.styles';
import { ArticleSortingOption } from '../../../types/redux/articles-reducer-types';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

export type Props = (
  | {
      variant: 'sortingOption';
      sortingTag: ArticleSortingOption;
      action: (sortingOption: ArticleSortingOption) => void;
    }
  | {
      variant: 'filterOption';
      filterTag: string;
      action: (filterOption: string) => void;
    }
) & {
  children?: React.ReactNode;
};

/**
 *Renders filter option for ArticleFiltersMenu modal. Has local state to indicate active/inactive state of selection
 *@function FilterOption
 *@param {enum} variant - specifies whether this is a filter or sorting option, depending on this props will vary
 *@param {string} sortingTag - name of sorting tag
 *@param {string} filterOption - name of filtering tag
 *@param {function} action - action to be applied in onClick handler (thunk action creator)
 *@returns {JSX.Element} - Rendered FilterOption component
 */
const FilterOption: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { filterOptions, sortArticlesBy } = useTypedSelector(
    (state) => state.articles
  );

  const isActive =
    props.variant === 'filterOption'
      ? filterOptions.includes(props.filterTag)
      : sortArticlesBy === props.sortingTag;

  const handleClick = () => {
    if (props.variant === 'sortingOption') props.action(props.sortingTag);
    if (props.variant === 'filterOption') props.action(props.filterTag);
  };

  return (
    <Styled.Container isActive={isActive} onClick={handleClick}>
      {props.children}
    </Styled.Container>
  );
};

export default FilterOption;
