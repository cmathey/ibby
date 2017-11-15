import {StyleRulesCallback, Theme} from 'material-ui/styles';

export const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1
    // position: 'absolute',
    // flexDirection: 'column'
  },
  paper: {
    display: 'flex',
    flexGrow: 1,
    padding: 0,
    // position: 'absolute',
    // width: 'calc(100% - 32px)',
    // height: 'calc(100% - 100px)'
  },
  map: {
    // position: 'relative',
    flexGrow: 1,
    height: '100%',
    width: '100%',
    'minHeight': 800
  },
  tab: {
    paddingLeft: 20,
    paddingRight: 20
  }
});
