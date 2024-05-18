import React from 'react';
import { Button } from '@chakra-ui/react';

const ButtonComponent = ({ onClick, children }) => {
    return (
        <Button colorScheme="blue" onClick={onClick}>
            {children}
        </Button>
    );
};

export default ButtonComponent;
