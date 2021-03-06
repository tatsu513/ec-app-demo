import React, { useCallback } from 'react'
import { PrimaryButton } from '../components/UIkit/index'
import { TextDetail } from '../components/Products/index'
import { getUserName } from '../reducks/users/selectores'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'

const UserMyPage = () => {
  const dispatch = useDispatch()
  const selector = useSelector(store => store)
  const userName = getUserName(selector)

  const transition = useCallback((path) => {
    dispatch(push(path))
  }, [dispatch])
  return (
    <section className="c-section-container">
      <h2 className="u-text__headline u-text-center">マイページ</h2>
      <div className="module-spacer--medium" />
      <TextDetail label={"ユーザーネーム"} value={userName} />
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton
          label={"カード情報の編集"}
          onClick={() => transition('/user/payment/edit')}
        />
        <PrimaryButton
          label={"注文履歴の確認"}
          onClick={() => transition('/order/history/')}
        />
      </div>
    </section>
  )
}

export default UserMyPage
