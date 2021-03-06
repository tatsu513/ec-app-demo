import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextInput, PrimaryButton } from '../components/UIkit'
import { signIn } from '../reducks/users/operations'
import { push } from 'connected-react-router'

const SignIn = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState(''),
        [password, setPassword] = useState('')

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail])

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  }, [setPassword])

  return (
    <div className="c-section-container">
      <div className="u-text__headline u-text-center">ログイン</div>
      <div className="module-spacer--small" />
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
      <div className="module-spacer--small" />
      <div className="center">
        <PrimaryButton
          label={'ログイン'}
          onClick={() => dispatch(signIn(email, password))}
        />
        <p onClick={() => dispatch(push('/signup'))}>
          アカウントをお持ちでない方はこちら
        </p>
        <p onClick={() => dispatch(push('/signin/reset'))}>
          パスワードを忘れた方はこちら
        </p>
      </div>
    </div>
  )
}

export default SignIn