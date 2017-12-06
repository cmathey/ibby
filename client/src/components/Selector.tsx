import * as React from 'react';
import {StyledComponentProps, WithStyles} from 'material-ui';
import * as classNames from 'classnames';

import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';
import {styles} from './Selector.styles';
import withStyles from 'material-ui/styles/withStyles';
import Select2 from 'react-select-plus';
import './Selector.css';
import StateComponent from './StateComponent';
// const traversal = require('traversal');

@(withStyles as any)(styles)
export default class Selector extends StateComponent<{
  selection?: string,
  onSelected: (choiceId: string) => void
} & StyledComponentProps<string>, {
  value?: string
}> {

  constructor(props) {
    super(props);
    this.state = {};
  }

  private onChange2 = (choice) => {
    this.updateState({value: {$set: choice.value}});
    this.props.onSelected(choice.value);
    console.log(`Selected: ${choice.value}`)
  };

  render() {
    const {selection} = this.props;
    const {value} = this.state;
    const classes = this.props.classes || {};
    // TODO: optimize - store as field
    const choices = [{
      id: 1,
      code: 'A',
      name: 'A'
    }];
    const options = [
      {
        label: 'Primary Colors', options: [
        { label: 'Yellow', value: 'yellow' , className: classes.choice},
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' }
      ]
      },
      {
        label: 'Secondary Colors', options: [
        { label: 'Orange', value: 'orange' },
        {
          label: 'Purple', options: [
          { label: 'Light Purple', value: 'light_purple' },
          { label: 'Medium Purple', value: 'medium_purple' },
          { label: 'Dark Purple', value: 'dark_purple' }
        ]
        },
        { label: 'Green', value: 'green' }
      ]
      },
      {
        label: 'White',
        value: 'white',
      }
    ];
    return (
      <div className={classes.root}>
        {/*<Select*/}
          {/*value={selection || ''}*/}
          {/*onChange={this.onchoiceSelected}*/}
        {/*>*/}
          {/*{*/}
            {/*choices.map(choice => <MenuItem key={choice.id} value={choice.code}>{choice.name}</MenuItem>)*/}
          {/*}*/}
        {/*</Select>*/}
        <Select2 className={classNames(classes.select, 'select2')}
          name="form-field-name"
                 value={value}
                 clearable={false}
                 options={options}
                 onChange={this.onChange2}/>
      </div>
    );
  }
}
