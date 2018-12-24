import React from 'react';
import PropTypes from 'prop-types';
import { Container, Card, CardTitle, CardText } from 'reactstrap';

export const EmptyState = ({title, message}) => (
   <Container>
        <Card body outline color="secondary" className="text-center">
            <CardTitle>{title}</CardTitle>
            <CardText>{message}</CardText>
      </Card>
   </Container>
)

EmptyState.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string.isRequired
}