import * as React from 'react';
import {connect, withTheme, FelaWithStylesProps, FelaWithThemeProps, Rules} from 'react-fela';
import {Theme} from '../index'
import {renderer} from "../felaConfig";

interface OwnProps {
  fontScale: number
}

interface Styles {
  container,
  firstSection,
  secondSection,
  thirdSection
}

type WithStylesProps = OwnProps & FelaWithStylesProps<OwnProps, Styles, Theme>
type Props = WithStylesProps & FelaWithThemeProps<Theme>

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
        {Object.entries(rules(props))
          .map(([key, rule]) => `${key}: ${renderer.renderRule(rule, props)}`)
          .join(' | ')}
      </div>
    </div>
  );
};

export default connect<OwnProps, Styles, Theme>(({fontScale, theme}): Rules<Props, Styles> => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  firstSection: {
    backgroundColor: theme.color.primary,
    fontSize: `${5 * fontScale}px`
  },
  secondSection: {
    backgroundColor: theme.color.secondary,
    fontSize: `${7 * fontScale}px`
  },
  thirdSection: {
    backgroundColor: theme.color.additional,
    fontSize: `${10 * fontScale}px`
  },
}))(withTheme<WithStylesProps, Theme>(ComplexComponent))
