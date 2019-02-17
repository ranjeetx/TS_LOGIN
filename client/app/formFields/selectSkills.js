import React from 'react';

export const SelectSkillsField = props => {
    const { itemList, ...rest } = props
    return (
        <div>
            <input type="text" list="thelist" {...rest} />
            <datalist id="thelist">
                {itemList.map(item => <option key={item.id} value={item.name} />)}
            </datalist>
        </div>
    );
}

