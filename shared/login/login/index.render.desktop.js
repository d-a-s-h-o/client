// @flow
import React, {Component} from 'react'
import {UserCard, Text, Button, FormWithCheckbox, Dropdown} from '../../common-adapters'
import {globalStyles, globalColors} from '../../styles/style-guide'
import type {Props} from './index.render'

type State = {
  selectedUser: ?string,
  error: ?string,
  saveInKeychain: boolean,
  showTyping: boolean,
  passphrase: string
}

export default class LoginRender extends Component<void, Props, State> {
  state: State;

  constructor (props: Props) {
    super(props)

    this.state = {
      selectedUser: props.lastUser,
      error: null,
      saveInKeychain: true,
      showTyping: false,
      passphrase: ''
    }
  }

  onSubmit () {
    if (this.state.selectedUser) {
      this.props.onLogin(this.state.selectedUser, this.state.passphrase, this.state.saveInKeychain)
    }
  }

  render () {
    const inputProps = {
      floatingLabelText: 'Passphrase',
      style: {marginBottom: 0},
      onChange: event => this.setState({passphrase: event.target.value}),
      onEnterKeyDown: () => this.onSubmit(),
      type: this.state.showTyping ? 'text' : 'password',
      errorText: this.state.error
    }

    const checkboxProps = [
      {label: 'Save in Keychain', checked: this.state.saveInKeychain, onCheck: check => { this.setState({saveInKeychain: check}) }},
      {label: 'Show Typing', checked: this.state.showTyping, onCheck: check => { this.setState({showTyping: check}) }}
    ]

    return (
      <div style={styles.container}>
        <UserCard username={this.state.selectedUser}>
          <Dropdown
            type='Username'
            value={this.state.selectedUser}
            onClick={selectedUser => this.setState({selectedUser})}
            options={this.props.users} />
          <FormWithCheckbox
            style={{alignSelf: 'stretch'}}
            inputProps={inputProps}
            checkboxContainerStyle={{paddingLeft: 60, paddingRight: 60}}
            checkboxesProps={checkboxProps}
          />
          <Button
            fullWidth
            type='Primary'
            label='Log in'
            onClick={() => this.onSubmit()} />
          <Text link type='Body'>Forgot passphrase?</Text>
        </UserCard>
        <Text style={{marginTop: 28}} link type='Body' onClick={this.props.onSignup}>Create an account</Text>
      </div>
    )
  }
}

LoginRender.propTypes = {
  serverURI: React.PropTypes.string.isRequired,
  onBack: React.PropTypes.func.isRequired,
  onSignup: React.PropTypes.func.isRequired,
  onLogin: React.PropTypes.func.isRequired,
  lastUser: React.PropTypes.string,
  users: React.PropTypes.array
}

const styles = {
  container: {
    ...globalStyles.flexBoxColumn,
    alignItems: 'center',
    flex: 1,
    backgroundColor: globalColors.black10
  }
}
