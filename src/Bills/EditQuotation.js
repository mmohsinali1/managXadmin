import React from "react";
import Button from "antd/es/button";
import {Col, Collapse, Icon, message, Row, Spin, Card} from 'antd'
import SurveyServics from '../Services/Api/Survey'

const {Panel} = Collapse;
const GenExtra = (props) => {
    return <div>
        <p className="font-weight-bolder" style={{fontSize: 10}}>
            <span className="ant-typography-ellipsis-single-line"> {props.question}</span>
            {!props.disabled ?
                <Icon title="edit"  style={{fontSize: 20}} type="edit"/>
                : null}
        </p>
    </div>
};

class Edit extends React.Component {
    state = {
        loading: true,
        editData: [],
        checked: [],
        ans: "",
        refrence_no: this.props.match.params.refrenceNo,
        customer_name: "",
        company_name: "",
        status: "",
        quotation_date: "",
        payment_date: "",
        disabled: this.props.history.location.pathname.toLowerCase().includes("view"),
        price: 0,
        pricelabel: 0
    };

    componentDidMount() {
        if (this.props.match.params.path)
            this.props.setLocation('/Discounts')
        else
            this.props.setLocation('/Quotations')
        this.getAnsDetail();

    }


    onChange = (e, el) => {
        if (e.target.type === "number") {
            let number = e.target.value;
            if (number.match("^([0-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|1000)$")) {
                let editQuestion = this.state.editData;
                let $r = Object.values(editQuestion).map(q => {
                    if (q.id === el.id) {
                        q['selected_ans'] = e.target.value;
                        return q;
                    }
                    return q;
                });
                this.setState({editData: $r});
            } else {
                message.error("Quantity must be between 0 and 1000");
                let editQuestion = this.state.editData;
                let $r = Object.values(editQuestion).map(q => {
                    if (q.id === el.id) {
                        q['selected_ans'] = "";
                        return q;
                    }
                    return q;
                });
                this.setState({editData: $r});
            }
        }
        if (e.target.type === "radio") {
            let editQuestion = this.state.editData;
            let $r = Object.values(editQuestion).map(q => {
                if (q.id === el.id) {
                    q['selected_ans'] = e.target.value;
                    return q;
                }
                return q;
            });
            this.setState({editData: $r});
            //localStorage.setItem("data",JSON.stringify($r))
        }
        if (e.target.type === "checkbox") {
            if (e.target.checked) {
                let question = this.state.editData;
                let $r = Object.values(question).map(q => {
                    if (q.id === el.id) {
                        q['selected_ans'] = e.target.value;
                        return q;
                    }
                    return q;
                });
                this.setState({Questions: $r});
                // localStorage.setItem("data",JSON.stringify($r))

            } else {
                let question = this.state.editData;
                let $r = Object.values(question).map(q => {
                    if (q.id === el.id) {
                        q['selected_ans'] = "";
                        return q;
                    }
                    return q;
                });
                this.setState({Questions: $r});
                // localStorage.setItem("data",JSON.stringify($r));
            }
        }

    };

    onSaveHandler = () => {
        if (!this.state.disabled) {
            if (this.state.survey_type === "Office 365") {
                if (this.state.checked.length === 0) {
                    message.error("services options are necessary")
                    return
                }
            }
            this.setState({loading: true});
            let reference_no = this.props.match.params.refrenceNo;
            const selectedAnswers = {reference_no};
            Object.values(this.state.editData).forEach((q, index) => {
                if (q.selected_ans !== undefined) {
                    selectedAnswers[q.tag] = q.selected_ans;
                }
            });
            setTimeout(() => {
                this.setState({
                    loading: false,
                })
            }, 400);
            message.success("item have been updated")
        }
    };
    onSubmitHandler = () => {
        if (!this.state.disabled) {
            if (this.state.survey_type === "Office 365") {
                if (this.state.checked.length === 0) {
                    message.error("services options are necessary")
                    return
                }
            }
            let refrence_no = this.props.match.params.refrenceNo;
            let price = this.state.price
            const selectedAnswers = {refrence_no, price};

            Object.values(this.state.editData).forEach((q, index) => {
                if (q.selected_ans !== undefined) {
                    selectedAnswers[q.tag] = q.selected_ans;
                }
            });
            this.postAns(selectedAnswers);
            this.setState({btnloading: true})
        }
    };
    postAns = (selectedAnswers) => {
        if (this.state.survey_type === "Office 365") {
            if (this.state.checked.length === 0) {
                message.error("Services options are necessary")
                return
            }
        }
        const {history, match} = this.props;
        let id = match.params.refrenceNo;
        this.setState({loading: true});

        SurveyServics.sendEditAnswer(selectedAnswers)
            .then(response => {

                if (response.data.success) {

                    this.getAnsDetail();
                    message.success("quotation updated successfully")
                }
            })
            .catch(err => message.error("quotation can not be updated"));

    };

    check = e => {
        if (!this.state.disabled) {
            let {editData} = this.state

            if (e.target.type === "checkbox") {

                if (this.state.checked.includes(e.target.name)) {

                    const {checked} = this.state
                    checked.splice(checked.indexOf(e.target.name), 1);
                    editData[7].selected_ans = checked.join()

                    this.setState({
                        checked: checked,
                        editData: editData
                    })

                } else {
                    if (e.target.name === "None") {
                        let checked = []
                        checked.push(e.target.name)
                        editData[7].selected_ans = checked.join()

                        this.setState({
                            checked: checked,
                            editData: editData
                        })
                    } else {
                        let {checked} = this.state
                        if (checked.includes("None")) {
                            checked = []
                        }
                        checked.push(e.target.name)
                        editData[7].selected_ans = checked.join()
                        this.setState({
                            checked: checked,
                            editData: editData
                        })
                    }
                }
            }
        }
    }


    getAnsDetail = () => {
        let id = this.props.match.params.refrenceNo;
        this.setState({
            loading: true
        });
        SurveyServics.getAnswerDetail(id).then(response => {
            this.setState({
                editData: response.data.survey_questions,
                loading: false,
                survey_type: response.data.survey_type,
                customer_name: response.data.customer_name,
                company_name: response.data.company_name,
                quotation_date: response.data.quoted_date,
                payment_date: response.data.payment_date,
                status: response.data.status,
                last_updated_by:response.data.last_updated_by,
                last_updated_at:response.data.last_updated_at,
                pricelabel: response.data.price ? response.data.price : 0,
                price: ''
            }, () => {
                if (this.state.status === "Paid" && !this.state.disabled) {
                    this.setState({
                        disabled: true
                    })
                }
                if (this.state.survey_type === "Office 365") {
                    const ans=this.state.editData[7].selected_ans
                    let answers = ans.split(",")
                    const checked = []
                    for (let i = 0; i < answers.length; i += 1) {
                        checked.push(answers[i])
                    }
                    this.setState({
                        checked: checked,
                        loading:false
                    })

                }
            });
            localStorage.setItem("data", JSON.stringify(response.data.survey_questions))
        })

    };
    onCrossHandler = () => {

        this.setState({
            editData: JSON.parse(localStorage.getItem("data"))
        }, () => {
            let {editData} = this.state
            let ans = editData[7].selected_ans
            let answers = ans.split(",")
            const checked = []
            for (let i = 0; i < answers.length; i += 1) {
                checked.push(answers[i])
            }
            editData[7].selected_ans = ans
            this.setState({
                checked: checked,
                editData: editData
            })

        })
    };
    change = e => {
        if (!this.state.disabled) {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    render() {
        const {
            loading, refrence_no,
            customer_name,
            company_name,
            status,
            quotation_date,
            payment_date,
            disabled,
            price,
            pricelabel,
            last_updated_by,
            last_updated_at
        } = this.state;

        const view = this.state.editData && this.state.editData.map(el => {
            if (el.q_visible) {
                return <Collapse
                >
                    <Panel header={el.question} showArrow={false}
                           extra={<GenExtra disabled={disabled} question={el.selected_ans}/>}>
                        <div>
                            <span className="right-tick">
                                {!disabled ? <Icon title={"save"} type="check" onClick={this.onSaveHandler}
                                                   theme={"outlined"}
                                                   className="mr-3"
                                                   style={{
                                                       color: "#85c63d", fontSize: "20px", border: "2px solid",
                                                       borderRadius: "50%", padding: "5px"
                                                   }}
                                /> : null}
                                {!disabled ? <Icon title={"cross"} type="cross" onClick={this.onCrossHandler}
                                                   theme={"outlined"}
                                                   style={{
                                                       color: "red", fontSize: "20px", border: "2px solid",
                                                       borderRadius: "50%", padding: "5px"
                                                   }}
                                /> : null}
                            </span>
                            {el.ans.map((val, e) => <Row>
                                    <fieldset id={el.tag} onChange={e => this.onChange(e, el)}>
                                        <Col span={24}>
                                            <div className="inputGroup">
                                                {el.tag !== "additional_cloud_migration" ?
                                                    <input className="form-control" value={val}
                                                           id={el.tag + val}
                                                           disabled={disabled}
                                                           checked={el.selected_ans === val}
                                                        // defaultChecked={el.selected_ans === val }
                                                           name={el.tag} type={el.type}/> :
                                                    <input value={val}
                                                           disabled={disabled}
                                                           checked={this.state.checked.includes(val)}
                                                           id={el.tag + val}
                                                           name={val}
                                                           type={el.type}
                                                           onChange={this.check}
                                                    />
                                                }
                                                <label htmlFor={el.tag + val}>{val}</label>
                                            </div>
                                        </Col>
                                    </fieldset>
                                </Row>
                            )}
                        </div>
                    </Panel>
                </Collapse>
            } else {
                if (el.q_disabled) {
                    return <Collapse
                    >
                        <Panel header={el.question} showArrow={false} extra={<GenExtra question={el.selected_ans} disabled={disabled}/>}>
                            <div>
                            <span className="right-tick">
                                {!disabled ? <Icon title={"save"} type="check" onClick={this.onSaveHandler}
                                                   theme={"outlined"}
                                                   className="mr-3"
                                                   style={{
                                                       color: "#85c63d", fontSize: "20px", border: "2px solid",
                                                       borderRadius: "50%", padding: "5px"
                                                   }}
                                /> : null}
                                {!disabled ? <Icon title={"cross"} type="cross" onClick={this.onCrossHandler}
                                                   theme={"outlined"}
                                                   style={{
                                                       color: "red", fontSize: "20px", border: "2px solid",
                                                       borderRadius: "50%", padding: "5px"
                                                   }}
                                /> : null}
                            </span>
                                <Row>
                                    <fieldset id={el.tag}>
                                        <Col span={24}>
                                            <input className="form-control"
                                                   disabled={disabled}
                                                   name={el.tag}
                                                   value={el.selected_ans}
                                                   placeholder={el.selected_ans === null ? 0 : el.selected_ans}
                                                   type={el.type}
                                                   onChange={e => this.onChange(e, el)}/>
                                        </Col>
                                    </fieldset>
                                </Row>

                            </div>
                        </Panel>
                    </Collapse>
                }
            }
        });
        return <section className="edit-collapse-section">
            <div className="container mt-2">
                <Card loading={loading}>
                    <div className="row">
                        <div className="col-md-2">
                            <p>Customer Name</p>
                            <p>{customer_name}</p>
                        </div>
                        <div className="col-md-2">
                            <p>Company Name</p>
                            <p>{company_name}</p>
                        </div>
                        <div className="col-md-2">
                            <p>Refrence No</p>
                            <p>{refrence_no}</p>
                        </div>
                        <div className="col-md-2">
                            <p>Quotation Date</p>
                            <p>{quotation_date}</p>
                        </div>
                        <div className="col-md-2">
                            <p>Payment Date</p>
                            <p>{payment_date}</p>
                        </div>
                        <div className="col-md-1">
                            <p>Status </p>
                            <p>{status}</p>
                        </div>
                        <div className="col-md-1">
                            <p>Last Updated By </p>
                            <p>{last_updated_by}</p>
                        </div>
                        <div className="col-md-1">
                            <p>Last Updated At </p>
                            <p>{last_updated_at}</p>
                        </div>

                        <div className="col-md-2">
                            <p>Price </p>
                            <p>{pricelabel}</p>
                        </div>
                        <div className="col-md-1">
                            <p>Price</p>
                            <div style={{width: "100%"}}>
                                <input type="text" className="form-control" value={price} name="price"
                                       onChange={this.change}/>
                            </div>
                        </div>
                    </div>
                    <div className={"row float-right mt-4"}>
                        <Button className={"float-right"} loading={loading} type="primary"
                                onClick={() => this.props.history.push( this.props.match.params.path?'/Discounts':'/Quotations')}>
                            Back
                        </Button>
                    </div>
                </Card>
            </div>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-10 offset-1">
                        {loading ? <div className="text-center mt-5"><Spin size="large"/></div> : view}
                        <div className="mt-3 float-right">
                            {!disabled ? <Button loading={loading} type="primary" onClick={this.onSubmitHandler}>
                                Update
                            </Button> : null
                            }
                        </div>
                    </div>
                    <br/>
                </div>
                <div className="row">
                </div>
            </div>
        </section>
    }
}

export default Edit;
