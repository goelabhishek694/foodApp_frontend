import React, { useEffect, useState } from 'react';
import Star from '../Images/star.png'
import '../Styles/review.css'
import axios from 'axios';

function Review() {
    const [arr, setarr] = useState([]);

    useEffect(async () => {
        try {
            const data = await axios.get("/review/top3");
            console.log(data);
            setarr(data.data.data);
            // console.log(data.data.length);
        } catch (err) {
            console.log(err);
        }
    }, [])

    return (
        <div className="reviewImg">
            <div className="reviewCard">
                <div className='h1Box'>
                    <h1 className='h1'>REVIEWS</h1>
                    <div className="line"></div>
                </div>
                <div className="rDetail">
                    {
                        arr && arr?.map((ele, key) =>
                            <div className="rCard" key={key}>
                                {console.log("ele in review.js",ele)}
                                <div className='rimage'>
                                    <img alt='' src={ele.user.profileImage} className='img' />
                                </div>
                                <div className='rheader'>
                                    <h3 className="rh3">{ele.user.name}</h3>
                                </div>
                                <div className='rsummary'>
                                    <p className='para'>
                                        {ele.review}
                                    </p>
                                </div>
                                <div><h4>Plan Name : {ele.plan.name}</h4></div>
                                <div className='frate'>
                                    {Array.from(Array(ele.rating).keys()).map((ele, key) => <img alt='' src={Star} className='img' />)}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Review
