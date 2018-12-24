import React from 'react';
import PropTypes from 'prop-types';
import { Input, Row, Col, InputGroup, InputGroupAddon, Label } from 'reactstrap';

export const FilterSelect = ({options, onFilterSelected, optionSelectedId}) => (
    <Row>
        <Col lg={{ size: 3, offset: 5 }} md={{ size: 4, offset: 5 }}>
            <div>
                <InputGroup>
                <InputGroupAddon addonType="prepend">Order By</InputGroupAddon>
                <Input type="select" name="select" id="select" onChange={onFilterSelected} value={optionSelectedId} >
                    {options.map((item) => (
                        <option key={item.id} value={item.id} >
                            {item.value}
                        </option>
                    ))}
                </Input>
            </InputGroup>
            </div>
        </Col>
    </Row>
)

FilterSelect.propTypes = {
    options: PropTypes.array.isRequired,
    optionSelectedId: PropTypes.string.isRequired
}