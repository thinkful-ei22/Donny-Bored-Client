import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {editMoodboard} from '../../actions/moodboards';
import {createMoodboard} from '../../actions/moodboards';
import Input from './Input';
import './moodboardForm.css';
import {required, nonEmpty, matches, length, isTrimmed} from './validators';
const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');


export class EditMoodboardForm extends React.Component {

    constructor(props){
        super(props);

        this.state={
            visibility:{display:"none"}

        }
    }
   
   
   
    onSubmit(values) {
        const user_id = this.props.userId;
        console.log('this props userid',this.props.userId);
        const {board_name, description} = values;
        const board_id=this.props.moodboardId;
        const moodboardInfo = {board_name,description,user_id };
        return this.props
            .dispatch(editMoodboard(board_id,moodboardInfo,user_id))
            .then(() => this.setState({visibility:{display:"none"}}));
    }

    render() {
        return (
           <div className="edit-board-form"> 
             <button onClick={() => this.setState({visibility:{display:"block"}})}>Edit</button>
             <button onClick={() => this.setState({visibility:{display:"none"}})}>Cancel</button>
             <button onClick={() => this.props.deleteMoodboard(this.props.moodboardId)}>Delete</button>
            <form name={this.props.moodboardId} style={this.state.visibility}
                className="moodboard-edit-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)

                )}>
                <label htmlFor="board_name">Moodboard Name</label>
                <Field component={Input} type="text" name="board_name" id={this.props.moodboardId} />
               
               
                <label htmlFor="description">Description</label>
                <Field component={Input} element="textarea"  name="description" id="description" validate={[required,nonEmpty]}>
                Test this</Field>
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                   Save Changes to Moodbaord
                </button>
            </form>
            </div>
        );
    }
}

export default reduxForm({
    fields: ["text"]

    // onSubmitFail: (errors, dispatch) =>
    //     dispatch(focus('registration', Object.keys(errors)[0]))
})(EditMoodboardForm);
