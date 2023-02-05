import { Fragment, useState } from 'react'
import { navBarLinks, checkBalanceProps } from '../constants/sidebar'
import styles from './gxplayout.module.scss'
import Header from '../components/featured/header'
import Footer from '../components/featured/footer'
import { useNavigate } from 'react-router-dom'
import { useActions } from './../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import BetInfo from '../components/shared/betInfo'

export default function Sidebar({ children }: checkBalanceProps): JSX.Element {
  const { getGpxButtonState } = useActions()
  const { indexNumber } = useTypedSelector((state) => state.gpxButtons)

  const navigate = useNavigate()

  const handleNavigation = (path: string, index: number) => {
    navigate(`${path}`)

    getGpxButtonState(index)
  }

  return (
    <Fragment>
      <Header />
      <div className={styles.section}>
        <div className={styles.sidebar}>
          <ul className={styles.sidebarNav}>
            {navBarLinks.map((el, index) => {
              return (
                <button
                  key={index}
                  className={
                    indexNumber === index + 1
                      ? `${styles.sidebarButton} ${styles.activeTab}`
                      : `${styles.sidebarButton}`
                  }
                  onClick={() => handleNavigation(el.path, index + 1)}
                >
                  {el.text}
                </button>
              )
            })}
          </ul>
          {children}
        </div>
        <BetInfo />
      </div>
      <Footer />
    </Fragment>
  )
}
