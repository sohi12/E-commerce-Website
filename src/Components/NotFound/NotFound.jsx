import React from 'react'
import notFoundImg from '../../Assets/images/error.svg'

function NotFound() {
    return (
        <div className='py-5 text-center'>
            <img className='w-50 py-5' src={notFoundImg} alt="" />
        </div>
    )
}

export default NotFound