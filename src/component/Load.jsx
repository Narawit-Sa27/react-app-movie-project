import React, { useEffect, useState } from 'react'

function Load(movie) {

    let name = "Kung Fu Panda 4";
    let date = "2024-03-02";
    let vote = "10.0";

    return(
                <>
                <div className='shadow rounded-md flex flex-col items-stretch gap-3'>
                <div className="flex flex-col gap-2 justify-between h-ful">
                    <div className='bg-Secondary-text' style={{width:"100%",height:"270px",borderRadius: "5px"}}></div>
                        <h5 className='bg-Secondary-text text-Secondary-text text-base font-bold rounded'>{name}</h5>
                        <div className='flex justify-between'>
                            <p className='bg-Secondary-text text-sm text-Secondary-text rounded'>{date}</p>
                            <p className='bg-Secondary-text text-sm text-Secondary-text rounded'>{vote}</p>
                        </div>
                    </div>
                </div>
                </>
    )
}

export default Load