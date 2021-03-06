import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextInput, PrimaryButton } from '../components/UIkit'
import { restPassword } from '../reducks/users/operations'
import { push } from 'connected-react-router'

const Reset = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail])

  return (
    <div className="c-section-container">
      <div className="u-text__headline u-text-center">パスワードのリセット</div>
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
      <div className="module-spacer--small" />
      <div className="center">
        <PrimaryButton
          label={'パスワードを変更'}
          onClick={() => dispatch(restPassword(email))}
        />
        <p onClick={() => dispatch(push('/signin'))}>
          ログイン画面へ戻る
        </p>
      </div>
    </div>
  )
}

export default Reset