// import pink from 'material-ui/colors/pink';
// import indigo from 'material-ui/colors/indigo';
import blue from 'material-ui/colors/blue';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import * as update from 'immutability-helper';

// Go with blu: TODO: define an Accuracy 'burgundy' color.
const primary: any = blue;
const themeOptions = {
  palette: {
    primary: primary
  },
  overrides: {
    MuiMenuItem: {
      root: {
        borderLeft: 'thick solid transparent'
      },
      selected: {
        borderLeftColor: primary[500]
      }
    },
    MuiListItemText: {
      text: {
        textDecoration: 'none'
      }
    }
  }
};

export const lightTheme = createMuiTheme(themeOptions);
// Dark variant
export const darkTheme = createMuiTheme(update(themeOptions, {palette: {type: {$set: 'dark'}}}));

