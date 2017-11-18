import {StyleRulesCallback, Theme} from 'material-ui/styles';

export const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },
  paper: {
    display: 'flex',
    flexGrow: 1,
    padding: 0
  },
  tab: {
    paddingLeft: 20,
    paddingRight: 20
  }
});
