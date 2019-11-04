import * as React from 'react';

import './style.scss';

interface Props {
  item: string;
  isHighlighted: boolean;

  // TODO: Update these two!
  // These two are hacks found by reading react-autocomplete source code,
  //       to pass through the event handlers to real DOM element
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

class AutocompleteItem extends React.PureComponent<Props> {
  render() {
    const { item, isHighlighted, onMouseEnter, onClick } = this.props;
    return (
      <div
        className={`autocomplete-item ${
          isHighlighted ? 'autocomplete-item-highlighted' : ''
        }`}
        onMouseEnter={onMouseEnter}
        onClick={onClick}
      >
        {item}
      </div>
    );
  }
}
export default AutocompleteItem;
