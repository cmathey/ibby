import * as React from 'react';
import * as update from 'immutability-helper';

export default class StateComponent<P, S> extends React.Component<P, S> {
  protected updateState(updates) {
    this.setState(update(this.state, updates));
  }
}