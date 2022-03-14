import React from 'react'
import { Alert } from 'react-bootstrap'

const MessageComp = ({ variant, children}) => {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}

MessageComp.defaultProps = {
    variant: 'info'
}

export default MessageComp
