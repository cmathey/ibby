import {StyleRulesCallback, Theme} from 'material-ui/styles';

export const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },
  item: {
    display: 'flex',
    flexGrow: 1,
    padding: 0,
    background: 'grey'
  },
  paper: {
    flexGrow: 1,
  },
});
