import React from 'react'
import {Helmet} from 'react-helmet'

const MetaComp = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />
        </Helmet>
    )
}

MetaComp.defaultProps ={
    title: 'Welcome to ProShop',
    description: 'We sell the best Products for cheap',
    keywords: 'electronics, buy electronics, cheap electronics'
}

export default MetaComp
