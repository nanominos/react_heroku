import React, {Component} from 'react';
import PhoneForm from './PhoneForm'
import PhoneInfoList from './PhoneInfoList';
class App extends Component{
  id = 2
  state = {
    information: [
      {
        id: 0,
        name: '최현식',
        phone: '010-4186-8319'
      },
      {
        id: 1,
        name: '식현최',
        phone: '010-8319-4186'
      }
    ]
  }
  handleCreate = (data) =>
  {
    const { information } = this.state;
    this.setState({
      information: information.concat({id: this.id++, ...data})
    })
  }
  handleRemove = (id) =>
  {
    const {information } = this.state;
    this.setState({
      information: information.filter(info => info.id != id)
    })
  }
  handleUpdate = (id, data) =>
  {
    const {information} = this.state;
    this.setState({
      information: information.map(
        info => id === info.id 
          ? {...info, ...data} : info)
    })
  }
  render()
  {
    const {information} = this.state;
    return (
      <div>
        <PhoneForm
          onCreate={this.handleCreate}  
        />
        <PhoneInfoList data={this.state.information}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}/>
      </div>
    );
  }
}

export default App;
