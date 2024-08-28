/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useTheme } from 'next-themes'
import React, { useEffect, useRef } from 'react'

function TradingViewScreener() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = ''
    }

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-screener.js'

    script.innerHTML = JSON.stringify({
      width: '100%',
      height: 450,
      defaultColumn: 'overview',
      screener_type: 'crypto_mkt',
      displayCurrency: 'USD',
      colorTheme: `${theme === 'dark' ? 'dark' : 'light'}`,
      locale: 'br',
    })

    if (containerRef.current) {
      containerRef.current.appendChild(script)
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [theme])

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://br.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">
            Monitore todos os mercados no TradingView
          </span>
        </a>
      </div>
    </div>
  )
}

export default TradingViewScreener
