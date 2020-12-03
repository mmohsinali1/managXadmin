import React, {Component} from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
class Phone extends Component {
    constructor(props){
        super(props)
        this.state={
            value:this.props.initial!==undefined?this.props.initial:""
        }


    }
    setValue=e=>{
        this.setState({
            value:e
        })
        this.props.setValue(e)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.initial!==this.props.initial)
        {
            this.setState({
                value:this.props.initial
            })
        }
    }

    render() {
        return(
            <PhoneInput
                placeholder="Enter phone number"
                value={this.state.value}
                onChange={this.setValue}
                className={"form-control"}/>
        )}
}
export default Phone