import React from 'react';
import { Container, Card, CardTitle, CardText } from 'reactstrap';
import NavDropdownMenu from './NavDropdownMenu';

export const State404 = () => (
    <div >
        <Container className="my-4">
            <Card body outline color="secondary" className="text-center">
                <CardTitle>Erro 404</CardTitle>
                <CardText>Página não encotrada</CardText>
            </Card>
        </Container>
    </div>
   
)