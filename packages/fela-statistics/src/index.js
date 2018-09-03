/* @flow */
/* eslint-disable prefer-rest-params */
import gzipSize from 'gzip-size'
import { RULE_TYPE } from 'fela-utils'
import { renderToString } from 'fela-tools'

import type DOMRenderer from '../../../flowtypes/DOMRenderer'

function lengthInUtf8Bytes(str: string): number {
  const m = encodeURIComponent(str).match(/%[89ABab]/g)
  return str.length + (m ? m.length : 0)
}

type RendererWithStatistics = {
  getStatistics: Function,
}

function addStatistics(
  renderer: DOMRenderer
): DOMRenderer & RendererWithStatistics {
  const statistics = {
    count: {
      classes: 0,
      pseudoClasses: 0,
    },
    usage: {},
    size: {},
    reuse: {},
    totalPseudoClasses: 0,
    totalMediaQueryClasses: 0,
    totalClasses: 0,
    totalRenders: 0,
    totalUsage: 0,
  }

  function addClassNamesToUsage(classNames: string): void {
    classNames.split(' ').forEach(className => {
      if (!statistics.usage[className]) {
        statistics.usage[className] = 0
      }
      statistics.usage[className]++
      statistics.totalUsage++
    })
  }

  const existingRenderRule = renderer.renderRule
  renderer.renderRule = function renderRule(): string {
    statistics.totalRenders++
    const classNames: string = existingRenderRule.apply(renderer, arguments)
    addClassNamesToUsage(classNames)
    return classNames
  }

  renderer.subscribe(({ type, selector, media, static: isStatic }: Object) => {
    if (type === RULE_TYPE && !isStatic) {
      statistics.totalClasses++
      const isPseudoSelector: boolean = selector.indexOf(':') > -1
      if (media) {
        statistics.totalMediaQueryClasses++

        if (!statistics.count[media]) {
          statistics.count[media] = {
            pseudoClasses: 0,
            classes: 0,
          }
        }

        if (isPseudoSelector) {
          statistics.totalPseudoClasses++
          statistics.count[media].pseudoClasses++
        } else {
          statistics.count[media].classes++
        }
      } else {
        statistics.totalClasses++

        if (isPseudoSelector) {
          statistics.totalPseudoClasses++
          statistics.count.pseudoClasses++
        } else {
          statistics.count.classes++
        }
      }
    }
  })

  function calculateReuse(): number {
    const quotient =
      (statistics.totalUsage - statistics.totalClasses) / statistics.totalUsage
    return Math.floor(quotient * 10000) / 10000
  }

  renderer.getStatistics = (): Object => {
    const currentStats = {
      ...statistics,
    }

    const reuse = calculateReuse()
    currentStats.reuse = {
      percentage: `${reuse * 100}%`,
      number: reuse,
    }

    const currentCSS = renderToString(renderer)
    const bytes = lengthInUtf8Bytes(currentCSS)

    currentStats.size = {
      bytes,
      bytesGzipped: gzipSize.sync(currentCSS),
      kbytes: Math.floor(bytes / 10) / 100,
      kbytesGzipped: Math.floor(gzipSize.sync(currentCSS) / 10) / 100,
    }

    return currentStats
  }

  return renderer
}

export default () => addStatistics
