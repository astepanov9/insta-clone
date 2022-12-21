import React from 'react'
import Head from 'next/head';

const Meta = ({ title, description }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="icon" href="/favicon.png" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
                rel="stylesheet"
            />
        </Head>
    )
}

export default Meta