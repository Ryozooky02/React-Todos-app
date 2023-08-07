import { Component } from "react";
import { Navigate } from "react-router-dom";


export default class TodoAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
        }
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.clearFormData();
    }

    clearFormData() {
        this.formData = {
            title: '',
            desc: '',
            image: ''
        }
    };

    handleTitleChange(evt) {
        this.formData.title = evt.target.value;
    }

    handleDescChange(evt) {
        this.formData.desc = evt.target.value;
    }

    handleImageChange(evt) {
        const cFiles = evt.target.files;
        if (cFiles.length > 0) {
            const fileReader = new FileReader();
            const that = this;
            fileReader.onload = () => {
                that.formData.image = fileReader.result;
            }
            fileReader.readAsDataURL(cFiles[0]);
        } else {
            this.formData.image = '';
        }
    }
    
    handleFormChange (evt) {
        evt.preventDefault();
        const newDeed = {...this.formData};
        const date = new Date();
        newDeed.done = false;
        newDeed.createdAt = date.toLocaleString();
        newDeed.key = date.getTime();
        this.props.setAdd(newDeed);
        this.setState( () => ({redirect: true}) )
    } 
    





    render() {
        if (this.state.redirect) {
            return <Navigate to="/"/>;
        } else
        return (
            <section>
                <h1>Создание нового дела...</h1>
                <form onSubmit={this.handleFormChange}>
                    <div className="field">
                        <label className="label">Заголовок</label>
                        <div className="control">
                            <input 
                            onChange={this.handleTitleChange}
                            type="text" 
                            className="input" />
                        </div>
                    </div>
                    <div className="field">
                        <label>Примечание</label>
                        <div className="control">
                            <textarea 
                            className="textarea"
                            onChange={this.handleDescChange}
                            name="text"
                            cols="30" 
                            rows="10"></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <div className="file">
                            <label className="file-label">
                                <input 
                                onChange={this.handleImageChange}
                                className="file-input" 
                                type="file" 
                                accept="image/*"/>
                                <span className="file-cta">
                                    <span className="file-label">Графическая илюстрация</span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="field is-grouped is-grouped-right">
                        <div className="control">
                            <input 
                            type="reset" 
                            className="button is-link is-light" 
                            value="Сброс"/>
                        </div>
                        <div className="control">
                            <input 
                            type="submit" 
                            className="button is-primary"  
                            value="Создать дело"/>
                        </div>
                    </div>
                </form>
            </section>
        )
    }
}