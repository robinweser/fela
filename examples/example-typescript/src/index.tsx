import * as React from "react";
import {createRenderer} from "fela";
import * as ReactDOM from "react-dom";
import {Provider, ThemeProvider} from 'react-fela';
import ComplexComponent from './components/ComplexComponent';
import {theme} from "./Theme";

const extendStyles = {
  container: {
    borderColor: 'black',
    borderRadius: '10px',
    borderStyle: 'solid'
  }
};

export const renderer = createRenderer();

ReactDOM.render(
  <Provider renderer={renderer}>
    <ThemeProvider theme={theme}>
      <ComplexComponent fontScale={10} extend={extendStyles}/>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root"),
);
