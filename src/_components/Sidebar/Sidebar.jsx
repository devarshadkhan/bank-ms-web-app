import React from 'react'
import { Link } from 'react-router-dom'
import "../../_styles/components_stylesheet/Sidebar.css"
const Sidebar = () => {
  return (
    <>
        <>
            <div className="sidebar">
                    <ul>
                        <li>
                            <Link to="/">Transaction</Link>
                        </li>
                        <li>
                            <Link to="/add-transaction">Add Transaction</Link>
                        </li>
                    </ul>
            </div>
        </>
    </>
  )
}

export default Sidebar