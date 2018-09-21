import * as React from 'react';
import {connect, FelaWithStylesProps, FelaWithThemeProps, Rules} from 'react-fela';
import {Theme} from '../Theme'

interface OwnProps {
  fontScale: number
}

interface Styles {
  container,
  firstSection,
  secondSection,
  thirdSection
}

type Props = OwnProps & FelaWithStylesProps<OwnProps, Styles, Theme>

const ComplexComponent = (props: Props) => {
  const {styles, rules} = props;

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.firstSection}>First Section</div>
        <div className={styles.secondSection}>Second Section</div>
        <div className={styles.thirdSection}>Third Section</div>
      </div>
      <div>
        {Object.entries(rules)
          .map(([key, rule]) => (
            <div key={key}>
              {`${key}: ${JSON.stringify(rule(props))}`}
            </div>
          ))}
      </div>
    </div>
  );
};

type PropsWithTheme = Props & FelaWithThemeProps<Theme>
export default connect<OwnProps, Styles, Theme>(({fontScale, theme}): Rules<PropsWithTheme, Styles> => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  firstSection: ({theme}) => ({
    backgroundColor: theme.color.primary,
    fontSize: `${5 * fontScale}px`
  }),
  secondSection: {
    backgroundColor: theme.color.secondary,
    fontSize: `${7 * fontScale}px`
  },
  thirdSection: {
    backgroundColor: theme.color.additional,
    fontSize: `${10 * fontScale}px`
  },
}))(ComplexComponent)
