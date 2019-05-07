import * as React from 'react';
import {connect, FelaWithStylesProps, Rules} from 'react-fela';
import {Theme} from '../Theme'

interface OwnProps {
  fontScale: number
}

interface Styles {
  container: any,
  firstSection: any,
  secondSection: any,
  thirdSection: any,
}

type Props = OwnProps & FelaWithStylesProps<OwnProps, Styles, Theme>

const ComplexComponent: React.FunctionComponent<Props> = props => {
  const {styles, rules, theme} = props;

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.firstSection}>First Section</div>
        <div className={styles.secondSection}>Second Section</div>
        <div className={styles.thirdSection}>Third Section</div>
      </div>
      <div>
        <h3>Rules</h3>
        {Object.entries(rules)
          .map(([key, rule]) => (
            <div key={key}>
              {`${key}: ${JSON.stringify(rule(props))}`}
            </div>
          ))}
      </div>
      <div>
        <h3>Theme</h3>
        {JSON.stringify(theme)}}
      </div>
    </div>
  );
};

const complexComponentStyle: Rules<OwnProps, Styles, Theme> = ({fontScale, theme}) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  firstSection: ({theme}) => ({
    backgroundColor: theme.color.primary,
    fontSize: `${5 * fontScale}px`,
    nested: {
      ":hover": {
        opacity: 0.8,
      }
    }
  }),
  secondSection: {
    backgroundColor: theme.color.secondary,
    fontSize: `${7 * fontScale}px`,
    nested: {
      ":hover": {
        opacity: 0.8,
      }
    }
  },
  thirdSection: {
    backgroundColor: theme.color.additional,
    fontSize: `${10 * fontScale}px`,
    nested: {
      ":hover": {
        opacity: 0.8
      }
    }
  },
})

export default connect(complexComponentStyle)(ComplexComponent)

// reconnect example
export const ConnectedComplexComponent = connect(complexComponentStyle)(ComplexComponent)
export const ReconnectedComplexComponent = connect({container: {}})(ConnectedComplexComponent)
