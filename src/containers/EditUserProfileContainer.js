import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ChangePasswordContainer from './ChangePasswordContainer';
import ModificationContainer from './ModificationContainer';
import NewInfoUserContainer from './NewInfoUserContainer';
import TagsComponent from '../components/TagsComponent';

class EditUserProfileContainer extends Component {

    render () {
        return (
             <div>
                <div className="columns is-mobile">
                    <div className="column is-5">
                        <ModificationContainer /> 
                    </div>
                    <div className="column is-5 is-offset-1">
                        <ChangePasswordContainer /> 
                    </div>
                </div>
             </div>
    )};
}

export default EditUserProfileContainer;