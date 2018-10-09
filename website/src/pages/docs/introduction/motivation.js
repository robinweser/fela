import NavigationView from '../../../components/navigation/NavigationView'
import EmbeddedView from '../../../components/navigation/EmbeddedView'

import { P, H2, Ol, Li, B, A } from '../../../components/styleguide'

export default () => (
  <EmbeddedView>
    <NavigationView title="Motivation">
      <P>
        In November 2014,{' '}
        <A href="https://twitter.com/vjeux">Christopher "vjeux" Chedeau</A>, who
        is working on <A href="https://facebook.github.io/react/">React</A> and{' '}
        <A href="https://facebook.github.io/react-native/">React Native</A> at
        Facebook, gave a thought-provoking talk titled{' '}
        <A href="https://speakerdeck.com/vjeux/react-css-in-js">"CSS in JS"</A>.
        He outlined the problems of CSS at scale and later showed how they
        solved those at Facebook. They were able to solve most, but in return
        had to add a lot of additional tooling.
      </P>
      <P>
        Then he introduced a complete new approach to handle those issues
        without any actual extra work. <B>Using inline styles</B>. It seemed
        crazy, but just worked magically.
      </P>

      <P>
        To make a long story short, soon after the talk, dozens of libraries
        grew on Github. Most of them were built directly for React while others
        were more open.
        <br />
        For a quick overview, check out{' '}
        <A href="https://twitter.com/MicheleBertoli">Michele Bertoli</A>
        's great{' '}
        <A href="https://github.com/MicheleBertoli/css-in-js">css-in-js</A>{' '}
        repository.
      </P>

      <P>
        Fela's creator,{' '}
        <A href="https://twitter.com/rofrischmann">Robin Frischmann</A>, also
        published a solution called{' '}
        <A href="https://github.com/rofrischmann/react-look">react-look</A>{' '}
        himself. It was nicely accepted by the community and grew to a proud
        number of 550 stars at the time of writing this article. Still he
        noticed that with each new feature and different use-case it would get
        more and more complicated to handle all the different components. He
        found that one of the major problems was the deep binding to React
        itself as well as the approach to satisfy every single use-case by
        providing numerous configuration options and several APIs.
      </P>

      <P>
        After a long period of research and a lot gained experience with CSS in
        JS techniques, he created a whole new approach which became the library
        we now know as Fela.
      </P>

      <P>
        Like many powerful and widely adopted libaries such as{' '}
        <A href="https://facebook.github.io/react/">React</A> or{' '}
        <A href="https://github.com/reactjs/redux">Redux</A>,{' '}
        <B>
          Fela does not explicitly tell you how to write your styles, but rather
          gives you some nice and simple APIs to help you build your styling
          environment.
        </B>
      </P>

      <H2>Goals</H2>
      <P>
        There is one important feature of react-look which turned out to be
        really useful in real applications: <B>dynamic styling</B>. There it
        seems quite logical that Fela is designed to be dynamic by default.
      </P>
      <P>
        Despite many benefical{' '}
        <A href="/docs/introduction/benefits">side effects</A>, Fela actually
        only has three major goals.
        <br />
        <Ol>
          <Li>Make styling dynamic by default</Li>
          <Li>
            Be framework-agnostic, that is being used with any view library
          </Li>
          <Li>Be high performant</Li>
        </Ol>
        <br />
        Read about the <A href="/docs/introduction/principles">principles</A> to
        understand how and why Fela is dynamic by default.
      </P>
    </NavigationView>
  </EmbeddedView>
)
