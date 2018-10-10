import NavigationView from '../../../components/navigation/NavigationView'
import EmbeddedView from '../../../components/navigation/EmbeddedView'

import {
  P,
  H3,
  H2,
  A,
  Code,
  Ul,
  B,
  Li,
  Info,
  I,
  Img,
  Hr,
} from '../../../components/styleguide'

export default () => (
  <EmbeddedView>
    <NavigationView title="Rules">
      <P>
        We need to understand what rules actually are and what they're used for.
        The name comes, as you might have already guessed, from CSS itself.
      </P>
      <P>
        In CSS a rule is defined as a pair of selector(s) and style
        declaration(s) as this image from{' '}
        <A href="https://developer.mozilla.org/docs/Web/CSS/Syntax">MDN</A>{' '}
        shows:
        <Img
          author="MDN Mozilla Demos"
          src="https://mdn.mozillademos.org/files/3668/css%20syntax%20-%20ruleset.png">
          MDN - CSS Rules
        </Img>
      </P>
      <P>
        In Fela you do not need to set the selector as it is generated
        automatically. Also instead of using static style declarations, every
        rule instead is a pure function of `props` that returns a{' '}
        <I>style object</I>.
        <Code>{`(props) => ({ /* style declarations */ })`}</Code>
        Pure functions produce predictable output, are easy to test and are
        quite fail-safe.
        <br />
        To keep your selectors pure you should not:
        <br />
        <Ul>
          <Li>
            Mutate the <I>props</I>
          </Li>
          <Li>Perform side effects e.g. API calls</Li>
          <Li>Call non-pure functions e.g. `Date.now()`</Li>
        </Ul>
      </P>
      <H2>Style Object</H2>
      <P>
        The objects returned by rules are called <I>style objects</I>, if they
        conform a special shape. Rules can only be rendered if they actually fit
        this shape for any given props.
      </P>
      <H3>1. Basic Shape</H3>
      <P>
        First of all there is the basic shape which just consists of simple
        style declarations.
        <br />
        Properties should be written in camel-case.
        <Code>{`const rule = props => ({
  fontSize: '15px',
  color: props.color,
  lineHeight: 1.5
})`}</Code>
      </P>
      <H3>2. Pseudo Classes</H3>
      <P>
        Pseudo classes are one of the key features of CSS. They let you add
        interactive behavior to your basic styles. You can easily define them as
        nested property objects within your rules. You can also nest them to
        require both pseudo classes to be active.
        <Code>{`const rule = props => ({
  color: 'red',
  fontSize: '12px',
  ':hover': {
    color: 'blue',
    // they can be nested to achieve
    // e.g. :hover:active
    ':active': {
      color: 'yellow'
    }
  },
  ':active': {
    color: 'black'
  },
  // make sure you are using nested quotes to set the content.
  ':before': {
    content: '" "'
  }
})`}</Code>
        <Info>
          <B>Note:</B> When using `:before` pseudo selector, make sure you are
          using nested quotes to set the content. e.g: `content: '" "'`
        </Info>
      </P>
      <H3>3. Media Queries</H3>
      <P>
        Yet another CSS key feature are{' '}
        <A href="https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries">
          media queries
        </A>
        . They're used to describe what styles are rendered depending on the
        current screen width/height, aspect ratio, device etc. Just like pseudo
        classes they can also be nested within your rules. In addition they can
        even have nested pseudo classes themselves.
        <Code>{`const rule = props => ({
  color: 'red',
  ':hover': {
    color: 'blue'
  },
  '@media (min-height: 200px)': {
    color: 'yellow',
    // they can be nested to achieve e.g.
    // @media (min-height: 200px) and (max-width: 300px)
    '@media (max-width: 300px)': {
      color: 'purple'
    }
  },
  '@media (screen)': {
    color: 'black'
  }
})`}</Code>
      </P>
      <H3>4. Support Queries</H3>
      <P>
        Another useful CSS feature are{' '}
        <A href="https://developer.mozilla.org/en-US/docs/Web/CSS/@supports">
          support queries
        </A>
        .<br />
        They're used to conditionally apply CSS values <B>only</B> if a certain
        CSS feature is supported by the targeted browser. This helps to provide
        the best experience for both modern and old browsers.
        <Code>{`const rule = props => ({
  // fallback value
  display: 'block',
  '@supports (display:flex)': {
    display: 'flex'
  }
})`}</Code>
      </P>
      <H3>5. Attribute Selectors</H3>
      <P>
        To be able to style elements according to their attributes, Fela
        introduces a special syntax for nested attribute selectors. It allows
        dynamic styles depending on passed attributes which adds another level
        of precise element selection.
      </P>
      <P>
        The API reflects the original{' '}
        <A href="https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Attribute_selectors">
          CSS attribute selectors
        </A>{' '}
        and therefore allows the following operators:
        <br />
        <Ul>
          <Li>
            `=`: attributes <B>equal</B> to a value
          </Li>
          <Li>
            `~=`: attributes <B>containing</B> a value
          </Li>
          <Li>
            `^=`: attributes <B>beginning</B> with a value
          </Li>
          <Li>
            `|=`: attributes <B>starting</B> with a value (whole word)
          </Li>
          <Li>
            `$=`: attributes <B>ending</B> with a value
          </Li>
        </Ul>
      </P>
      <P>
        Only passing the attributes checks if the attribute is present at all.
        <Info>
          **Note**: Use attribute selectors with caution as they add complexity
          to your styling and have higher specificity as other selectors.
        </Info>
        <Code>{`const rule = props => ({
  color: 'red',
  '[checked="true"]': {
    color: 'yellow',
    // they can be nested to achieve e.g.
    // [checked="true"][target]
    '[target]': {
      color: 'purple'
    }
  },
  '[data-name^="A"]': {
    color: 'black'
  }
})`}</Code>
      </P>
      <H3>6. Child Selectors</H3>
      <P>
        Fela also supports a special syntax for child element styling know as{' '}
        <A href="https://developer.mozilla.org/es/docs/Web/CSS/Child_selectors">
          child selectors
        </A>{' '}
        in CSS.
        <br />
        They should only be used for third-party class manipulation or semantic
        problems e.g.{' '}
        <I>
          parent component which defines how child components are ordered
          depending on some state.
        </I>
      </P>

      <Info>
        **Note**: Use child selectors with caution as they add complexity to
        your styling and have higher specificity as other selectors.
      </Info>
      <P>
        <Code>{`const rule = props => ({
  color: 'red',
  '> h1': {
    color: 'blue',
    // they can contain nested objects e.g.
    // > h1:hover
    ':hover': {
      color: 'black'
    }
  },
  '> #hardcoded': {
    color: 'yellow',
    // they can be nested to achieve e.g.
    // > #hardcoded > .third-party
    '> .third-party': {
      color: 'purple'
    }
  }
})`}</Code>
      </P>
      <H3>7. Other Selectors</H3>
      <P>
        If you are familiar with CSS, you may have noticed that this was just a
        very small subset of CSS selectors. While we only support the above
        selectors for a reason, we also understand that there might be some edge
        cases (mostly with third-party libraries) where you want to use other
        selectors as well. Therefore we provide the `&`-prefix for nested
        selectors.
        <Code>{`const rule = props => ({
  color: 'red',
  // .a .sub-class
  '& .sub-class': {
    color: 'blue',
    // they can contain nested objects e.g.
    // .a .sub-class:hover
    ':hover': {
      color: 'black'
    }
  }
})`}</Code>
      </P>
      <Hr />
      <H3>Related</H3>

      <Ul>
        <Li>
          <A href="/docs/advanced/combined-rules">Combined Rules</A>
        </Li>
        <Li>
          <A href="/docs/api/fela/createRenderer#renderrule">
            API Reference - `Renderer.renderRule`
          </A>
        </Li>
      </Ul>
      <br />
      <H3>Tools</H3>
      <P>
        <B>
          <A href="https://github.com/rofrischmann/fela/blob/master/packages/fela-tools/docs/StyleSheet.md">
            fela-tools/StyleSheet
          </A>
        </B>
        <br />
        Organize your rules in grouped objects with named keys.
      </P>
    </NavigationView>
  </EmbeddedView>
)
