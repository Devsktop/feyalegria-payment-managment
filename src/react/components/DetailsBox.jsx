import React from 'react';
import PropTypes from 'prop-types'


const DetailsBox = ({ details }) => {
    console.log(details)
    return (
        <div className="details_box_scroll">
            <div className="box details_box">
                {
                    details.map((detail, i) => {
                        return (
                            <div className="details_box_detail" key={i}>
                                <span className="detail_title" >
                                    {detail.title}
                                </span>
                                {
                                    detail.data.map((data, j) => {
                                        console.log(data)
                                        return (
                                            <p className="detail_data" key={j}>
                                                {data}
                                            </p>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

DetailsBox.propsTypes = {
    details: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.string).isRequired,
    })).isRequired,
}

export default DetailsBox;