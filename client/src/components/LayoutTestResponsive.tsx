import * as React from 'react';
// import {RouteComponentProps} from 'react-router';
// import * as _ from 'lodash';
import {styles} from './LayoutTest.styles';
import withStyles from 'material-ui/styles/withStyles';
import {WithStyles} from 'material-ui';
import StateComponent from './StateComponent';
// import * as ReactGridLayout from 'react-grid-layout';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import {Responsive, ResponsiveProps, WidthProvider} from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

// import MenuIcon from 'material-ui-icons/Menu';
// import 'leaflet/dist/leaflet.css';

const View = (props) => {
  return (
    <Paper className={props.classes.paper} square>
      <Typography type="body2">{props.text}</Typography>
    </Paper>
  );
};

class LayoutTestResponsive extends StateComponent<WithStyles<string> & {
  layout?: ResponsiveProps
}, {}> {

  constructor(props: any) {
    super(props);
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  onLayoutChange(layout) {
    /*eslint no-console: 0*/
    console.log(JSON.stringify(layout, null, 2));
    // this.setState({layout});
    // this.props.onLayoutChange(layout); // updates status display
  }

  render() {
    const {classes} = this.props;
    const layouts = {
      lg: [
        {i: 'a', x: 0, y: 0, w: 3, h: 2},
        {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
        {i: 'c', x: 4, y: 0, w: 1, h: 2}
      ]
    };
    const layoutProps = {
      isDraggable: true,
      isResizable: true,
      items: 20,
      rowHeight: 30,
      cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
      breakpoints: {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
      width: 1000,
      layouts
    };
    return (
      <div className={classes.root}>
        <ResponsiveReactGridLayout {...layoutProps} onLayoutChange={this.onLayoutChange}>
          {/*<div key="a" data-grid={{x: 0, y: 0, w: {lg: 12}, h: {lg: 2}}} className={classes.item}>*/}
          {/*<View text="a" classes={classes}/>*/}
          {/*</div>*/}
          <div key="a">
            <View text="a" classes={classes}/>
          </div>
          <div key="b">
            <View text="b" classes={classes}/>
          </div>
        </ResponsiveReactGridLayout>
      </div>
    );
  }

}

export default withStyles(styles)(LayoutTestResponsive);
