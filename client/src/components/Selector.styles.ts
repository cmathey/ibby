import {StyleRulesCallback, Theme} from 'material-ui/styles';

export const styles: StyleRulesCallback = (theme: Theme) => {

  return {
    root: {
      display: 'inline-block',
      verticalAlign: 'middle',
      width: 200
    },
    select: {
      // color: 'green',
      fontSize: '12px'
    },
    choice: {
      color: 'red',
      fontSize: '12px'
    }
  };
};
