import NavigationView from '../../../components/navigation/NavigationView'
import EmbeddedView from '../../../components/navigation/EmbeddedView'

import { P, H3, B, A, Info, Code } from '../../../components/styleguide'

export default () => (
  <EmbeddedView>
    <NavigationView title="Caveats">
      <P>
        Like every solution, also Fela is not <B>the</B> ultimate solution and
        should not be blindly used without evaluating its benefits and
        disadvantages. The strict design decisions also have some caveats.
      </P>
      <H3>1. Computed Selectors</H3>
      <P>
        The unique computed selectors are quite handy as they{' '}
        <A href="/docs/introduction/benefits#local-namespace">
          prevent namespacing conflicts
        </A>
        . But they are not designed to be human-readable nor to be mutated at
        all.
        <br />
        However, if you need to mutate the styles from outside, consider
        providing an API to pass the props.
      </P>

      <H3>2. Shorthand & Longhand Properties</H3>
      <P>
        Probably the biggest downside of using atomic CSS design, is the fact
        that shorthand and longhand properties can't safely be mixed in a single
        rule.
        <Code>{`const rule = props => ({
  border: '1px solid black',
  borderColor: 'red'
})`}</Code>
        The above example will not unconditionally render a red border as we
        can't tell which rule might be rendered before and therefore appears
        first in the stylesheet. There might have been another rule that renders
        `borderColor: red` which is rendered before this rule. Now rendering
        this rule, would cause `border: 1px solid black` to always be preferred
        based on how CSS specificity works.
      </P>
      <P>
        To solve this problem, you should not use shorthand and longhand
        properties together in a single rule. Perhaps the best is to avoid them
        at all. To give you an example, here's how you would write the above:
        <Code>{`const rule = props => ({
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: 'red'
})`}</Code>
        It might be more code to type, but its also more self-explanatory and
        descriptive.
        <Info>
          PS: There will soon be a tool, that automatically checks for mixed
          shorthand / longhand properties and throws a warning if used together.
        </Info>
      </P>

      <H3>3. CSS properties that contain double quotes</H3>
      <P>
        For css properties that need double quotes, make sure you are using
        nested quotes in your code. e.g.:
        <Code>{`const rule = props => ({
  ':before': {
    content: '" "'
  }
})`}</Code>
      </P>
    </NavigationView>
  </EmbeddedView>
)
