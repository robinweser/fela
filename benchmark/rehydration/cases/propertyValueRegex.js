const DECL_REGEX = /[.]([0-9a-z_-]+)([^{]+)?{([^}]+)}/gi
const PROPERTY_VALUE_REGEX = /:(.+)/

function rehydrate(cache, css, media, support) {
  let decl

  while ((decl = DECL_REGEX.exec(css))) {
    // $FlowFixMe
    const [ruleSet, className, pseudo = '', declaration] = decl
    /* eslint-enable */
    const [property, value] = declaration.split(PROPERTY_VALUE_REGEX)

    const declarationReference = support + media + pseudo + property + value
    cache[declarationReference] = {
      type: 'RULE',
      className,
      selector: className + pseudo,
      declaration: property + value,
      media,
      support
    }
  }
}

export default function declarationRegex() {
  const css = `
.a{padding:10px}.b{justify-content:center;-webkit-box-pack:center;-webkit-justify-content:center}.c{align-items:center;-webkit-box-align:center;-webkit-align-items:center}.d{text-align:center}.e{flex-direction:column;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column}.f{flex:1;-webkit-flex:1}.g{font-family:Lato}.h{color:#323232}.i{font-size:100px}.j{padding:50px}.n{animation-duration:2s;-webkit-animation-duration:2s}.o{animation-iteration-count:infinite;-webkit-animation-iteration-count:infinite}.p{animation-name:k1;-webkit-animation-name:k1}.q:hover{animation-duration:.5s;-webkit-animation-duration:.5s}.r{padding:5px}.s{font-size:20px}.t{color:gray}.u{flex:0 1 auto;-webkit-flex:0 1 auto}.v{font-size:50px}.w{line-height:200px}.x{padding:20px}.y{font-size:52px}.z{font-size:53px}.ab{font-size:54px}.ac{font-size:55px}.ae{font-size:56px}.af{font-size:57px}.ag{font-size:58px}.ah{font-size:59px}.ai{font-size:60px}.aj{font-size:61px}.ak{font-size:62px}.al{font-size:63px}.am{font-size:64px}.an{font-size:65px}.ao{font-size:66px}.ap{font-size:67px}.aq{font-size:68px}.ar{font-size:69px}.as{font-size:70px}.at{font-size:71px}.au{font-size:72px}.av{font-size:73px}.aw{font-size:74px}.ax{font-size:75px}.ay{font-size:76px}.az{font-size:77px}.ba{font-size:78px}.bb{font-size:79px}.bc{font-size:80px}.bd{font-size:81px}.be{font-size:82px}.bf{font-size:83px}.bg{font-size:84px}.bh{font-size:85px}.bi{font-size:86px}.bj{font-size:87px}.bk{font-size:88px}.bl{font-size:89px}.bm{font-size:90px}.bn{font-size:91px}.bo{font-size:92px}.bp{font-size:93px}.bq{font-size:94px}.br{font-size:95px}.bs{font-size:96px}.bt{font-size:97px}.bu{font-size:98px}.bv{font-size:99px}.bw{font-size:101px}.bx{font-size:102px}.by{font-size:103px}.bz{font-size:104px}.ca{font-size:105px}.cb{font-size:106px}.cc{font-size:107px}.cd{font-size:108px}.ce{font-size:109px}.cf{font-size:110px}.cg{font-size:111px}.ch{font-size:112px}.ci{font-size:113px}.cj{font-size:114px}.ck{font-size:115px}.cl{font-size:116px}.cm{font-size:117px}.cn{font-size:118px}.co{font-size:119px}.cp{font-size:120px}.cq{font-size:121px}.cr{font-size:122px}.cs{font-size:123px}.ct{font-size:124px}.cu{font-size:125px}.cv{font-size:126px}.cw{font-size:127px}.cx{font-size:128px}.cy{font-size:129px}.cz{font-size:130px}`

  return rehydrate({}, css)
}
