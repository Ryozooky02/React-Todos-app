import { Component } from "react";
import { Navigate } from "react-router-dom";
import { login } from "./api";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleEmailLogin = this.handleEmailLogin.bind(this);
        this.handlePasswordLogin = this.handlePasswordLogin.bind(this);
        this.handleFormSubmitLogin = this.handleFormSubmitLogin.bind(this);
        this.clearFormData();
    }

    clearFormData() {
        this.formData = {
            email: '',
            password: '',
        }
    }

    handleEmailLogin(evt) {
        this.formData.email = evt.target.value;
    }

    handlePasswordLogin(evt) {
        this.formData.password = evt.target.value;
    }

    async handleFormSubmitLogin(evt) {
        evt.preventDefault();
        const result = await login(this.formData.email, this.formData.password);

        if (typeof result !== 'object') {
            console.log(result);
        }
    }

    render() {
        if (this.props.currentUser) {
            return <Navigate to="/" replace/>
        } else 
            return (
                <section>
                    <h1>Вход</h1>
                    <form onSubmit={this.handleFormSubmitLogin}>
                        <div className="field">
                            <label className="label">Адрес электронной почты</label>
                            <div className="control">
                                <input 
                                type="email" 
                                className="input" 
                                onChange={this.handleEmailLogin} 
                                autoComplete="on"/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Пароль</label>
                            <div className="control">
                                <input 
                                type="password" 
                                className="input"
                                onChange={this.handlePasswordLogin} 
                                autoComplete="on"/>
                            </div>
                        </div>
                        <div className="field is-grouped is-grouped-right">
                            <div className="control">
                                <input 
                                type="reset"
                                className="button is-link is-light"
                                value="Сброс" />
                            </div>
                            <div className="control">
                                <input type="submit" 
                                className="button is-primary"
                                value="Войти" />
                            </div>
                        </div>
                    </form>
                </section>
            )
    }
}