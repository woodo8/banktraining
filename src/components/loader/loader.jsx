import React from 'react'
import { Dna } from 'react-loader-spinner'
import "./loader.css"

export default function Loader() {
    return (
        <div className='loader-wrapper'>
            <Dna
                visible={true}
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </div>
    )
}
