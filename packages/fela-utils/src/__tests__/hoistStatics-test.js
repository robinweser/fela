import hoistStatics from '../hoistStatics'

describe('Hoisting statics', () => {
  it('should return the target if a string source is passed', () => {
    class Foo {
      static foo = 1
    }

    const hoisted = hoistStatics(Foo, 'div')

    expect(hoisted).toEqual(Foo)
  })

  it('should hoist static properties', () => {
    class Foo {
      static foo = 1
    }

    Foo.bar = 'asd'

    class Bar {
      static baz = 2
    }

    const hoisted = hoistStatics(Bar, Foo)

    expect(hoisted.foo).toEqual(1)
    expect(hoisted.bar).toEqual('asd')
    expect(hoisted.baz).toEqual(2)
  })

  it('should hoist static properties', () => {
    class Foo {
      static foo = 1
    }

    Foo.bar = 'asd'

    function Bar() {}

    Bar.baz = 2

    const hoisted = hoistStatics(Bar, Foo)

    expect(hoisted.foo).toEqual(1)
    expect(hoisted.bar).toEqual('asd')
    expect(hoisted.baz).toEqual(2)
  })

  it('should not overwrite properties', () => {
    class Foo {
      static foo = 1
      static bla = 3
    }

    Foo.bar = 'asd'

    class Bar {
      static bla = 4
    }

    Bar.baz = 2

    const hoistedBar = hoistStatics(Bar, Foo)
    const hoistedFoo = hoistStatics(Foo, Bar)

    expect(hoistedBar.bla).toEqual(4)
    expect(hoistedFoo.bla).toEqual(3)
  })

  it('should merge object properties', () => {
    class Foo {}

    Foo.defaultProps = {
      foo: 1,
      bar: 1
    }

    class Bar {}

    Bar.defaultProps = {
      foo: 2,
      baz: 3
    }

    const hoisted = hoistStatics(Bar, Foo)

    expect(hoisted.defaultProps).toEqual({
      foo: 2,
      bar: 1,
      baz: 3
    })
  })

  it('should not hoist React statics', () => {
    class Foo {
      getChildContext() {
        return {
          foo: 1
        }
      }
    }

    Foo.childContextTypes = {
      foo: 'bar'
    }

    class Bar {}

    const hoisted = hoistStatics(Bar, Foo)

    expect(hoisted.getChildContext).toEqual(undefined)
    expect(hoisted.childContextTypes).toEqual(undefined)
  })
})
