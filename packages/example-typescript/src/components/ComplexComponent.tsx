import * as React from 'react';
import {connect, FelaWithStylesProps, Rules} from 'react-fela';
import {Theme} from '../index'

interface OwnProps {
  fontScale: number
}

interface Styles {
  container,
  firstSection,
  secondSection,
  thirdSection
}

type Props = OwnProps & FelaWithStylesProps<Styles, Theme>

const ComplexComponent = ({styles}: Props) => (
  <div className={styles.container}>
    <div className={styles.firstSection}>First Section</div>
    <div className={styles.secondSection}>Second Section</div>
    <div className={styles.thirdSection}>Third Section</div>
  </div>
);

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
}))(ComplexComponent)
