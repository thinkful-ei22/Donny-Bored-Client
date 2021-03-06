import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {createMoodboard} from '../../actions/moodboards';
import Input from './Input';
import './moodboardForm.css';
import {required, nonEmpty} from './validators';



export class MoodboardForm extends React.Component {
    onSubmit(values) {
        const user_id = this.props.userId;
        const {board_name, description} = values;
        const moodboardInfo = {board_name,description,user_id };
        return this.props
            .dispatch(createMoodboard(moodboardInfo))
            //.then(() => console.log('MOODBOARD CREATION REQEESTED'));
    }

    render() {
        return (
           <div className="boardForm"> 
            <form
                className="moodboard-creation-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <label htmlFor="board_name">Moodboard Name</label>
                <Field component={Input} type="text" id="board_name" name="board_name"  validate={[required, nonEmpty]} />
               
               
                <label htmlFor="description">Description</label>
                <Field component={Input} element="textarea"  name="description" id="description">
                </Field>
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                   Create a New Moodboard
                </button>
            </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'moodboard-creation-form',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(MoodboardForm);
