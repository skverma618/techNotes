import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from 'react-router-dom'

const DashFooter = () => {

   const navigate = useNavigate() // returns a function that can be used to navigate to a new location
   const {pathname} = useLocation() // provide info of current url

   const onGoHomeClicked = () => navigate('/dash')

   let goHomeButton = null

    if (pathname !== '/dash') {
        goHomeButton = (
          <button className="dash-footer__button icon-button" title='Home' onClick={onGoHomeClicked}>
              <FontAwesomeIcon icon={faHouse} />
          </button>
        )
    }

  return (
    <footer className="dash-footer">
         {goHomeButton} 
         <p>Current User:</p>
        <p>Status:</p> 
    </footer>
  )
}

export default DashFooter