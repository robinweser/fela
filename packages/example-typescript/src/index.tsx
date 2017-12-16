import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider, ThemeProvider} from 'react-fela';
import ComplexComponent from './components/ComplexComponent';
import {renderer} from "./felaConfig";

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

const extendStyles = {
  container: {
    borderColor: 'black',
    borderRadius: '10px',
    borderStyle: 'solid'
  }
};

ReactDOM.render(
  <Provider renderer={renderer}>
    <ThemeProvider theme={theme}>
      <ComplexComponent fontScale={10} extend={extendStyles}/>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root"),
);
