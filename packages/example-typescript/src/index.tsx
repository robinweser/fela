import * as React from "react";
import * as ReactDOM from "react-dom";
import {createRenderer} from 'fela';
import {Provider, ThemeProvider} from 'react-fela';
import ComplexComponent from './components/ComplexComponent';

const renderer = createRenderer();

export interface Theme {
  color: {
    primary: string
    secondary: string
    additional: string
  }
}

const theme: Theme = {
  color: {
    primary: 'lightblue',
    secondary: 'orange',
    additional: 'lightgreen'
  }
};

ReactDOM.render(
  <Provider renderer={renderer}>
    <ThemeProvider theme={theme}>
      <ComplexComponent fontScale={10} />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root"),
);
