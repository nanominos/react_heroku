import React, {Component} from 'react'

class PhoneInfo extends Component {
    static defaultProps = {
        info : {
            name: '이름',
            phone: '010-0000-0000',
            id: 0
        }
    }
    state = {
        editing: false, // 수정 버튼이 눌렸을 때 true로 변경
                        // true가 되면 기존 텍스트 형태로 보여주던 값을
                        // input 형태로 보여줌
        name: '',       // input값은 유동적이기 때문에 그 값을 담기 위한 필드
        phone: ''       // 위와 같음
    }
    handleRemove = () => {
        const { info, onRemove } = this.props;
        onRemove(info.id);
    }
    handleToggleEdit = () => {
        const { editing } = this.state;
        this.setState({editing: !editing});
    }
    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }
    componentDidUpdate(prevProps, prevState) {
        //수정을 눌렀을 때, 기존의 값이 input에 나타나고
        //수정을 적용할 때, input의 값들을 부모에게 전달한다.
        const { info, onUpdate } = this.props;
        if (!prevState.editing && this.state.editing) {
            this.setState({
                name: info.name,
                phone: info.phone
            })
        }
        if (prevState.editing && !this.state.editing) {
            onUpdate(info.id, {
                name: this.state.name,
                phone: this.state.phone
            })
        }
    }
    render() {
        const style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        };
        const {editing} = this.state;
        if (editing) {
            return(
            <div style={style}>
                <div>
                    <input
                        value={this.state.name}
                        name="name"
                        placeholder="이름"
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <input
                        value={this.state.phone}
                        name="phone"
                        placeholder="전화번호"
                        onChange={this.handleChange}
                    />
                </div>
                <button onClick={this.handleToggleEdit}>적용</button>
                <button onClick={this.handleRemove}>삭제</button>
            </div>
            )
        }

        const {
            name, phone, id
        } = this.props.info;

        return(
            <div style={style}>
                <div><b>{name}</b></div>
                <div>{phone}</div>
                <button onClick={this.handleToggleEdit}>수정</button>
                <button onClick={this.handleRemove}>삭제</button>
            </div>
        );
    }
}

export default PhoneInfo;