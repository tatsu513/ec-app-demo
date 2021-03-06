import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextInput, PrimaryButton } from '../components/UIkit'
import { signUp } from '../reducks/users/operations'
import { push } from 'connected-react-router'

const SignUp = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState(''),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [confirmPassword, setConfirmPassword] = useState('')

  const inputUserName = useCallback((event) => {
    setUsername(event.target.value)
  }, [setUsername])

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail])

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  }, [setPassword])

  const inputConfirmPassword = useCallback((event) => {
    setConfirmPassword(event.target.value)
  }, [setConfirmPassword])

  return (
    <div className="c-section-container">
      <div className="u-text__headline u-text-center">アカウント登録</div>
      <div className="module-spacer--small" />
      <TextInput
        fullWidth={true}
        label={'ユーザー名'}
        multiline={false}
        required={true}
        rows={1}
        value={username}
        type={'text'}
        onChange={inputUserName}
      />
      <TextInput
        fullWidth={true}
        label={'メールアドレス'}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={'email'}
        onChange={inputEmail}
      />
      <TextInput
        fullWidth={true}
        label={'パスワード'}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={'password'}
        onChange={inputPassword}
      />
      <TextInput
        fullWidth={true}
        label={'パスワード（確認用）'}
        multiline={false}
        required={true}
        rows={1}
        value={confirmPassword}
        type={'password'}
        onChange={inputConfirmPassword}
      />
      <div className="module-spacer--small" />
      <div className="center">
        <PrimaryButton
          label={'登録する'}
          onClick={() => dispatch(signUp(
            username,
            email,
            password,
            confirmPassword
          ))}
        />
        <p onClick={() => dispatch(push('/signin'))}>
          アカウントをお持ちの方はこちら
        </p>
      </div>
    </div>
  )
}

export default SignUp