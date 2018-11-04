import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

export const FilterSelect = ({options, onFilterSelected, optionSelectedId}) => (
    <Input type="select" name="select" id="select" onChange={onFilterSelected} value={optionSelectedId} >
    {options.map((item) => (
        <option key={item.id} value={item.id} >
            {item.value}
        </option>
    ))}
    </Input>
)

FilterSelect.propTypes = {
    options: PropTypes.array.isRequired,
    optionSelectedId: PropTypes.string.isRequired
}