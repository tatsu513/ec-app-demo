import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { SetSizeArea } from '../components/Products'
import ImageArea from '../components/Products/ImageErea'
import { TextInput, SelectBox, PrimaryButton } from '../components/UIkit/'
import { db } from '../firebase'
import { saveProducts } from '../reducks/products/operations'

const ProductEdit = () => {
  const dispatch = useDispatch()
  let id = window.location.pathname.split('/product/edit')[1]
  if (id !== '') {
    id = id.split('/')[1]
  }

  const [name, setName] = useState(''),
        [category, setCategory] = useState(''),
        [categories, setCategories] = useState([]),
        [description, setDescription] = useState(''),
        [gender, setGender] = useState(''),
        [price, setPrice] = useState(''),
        [images, setImages] = useState([]),
        [sizes, setSizes] = useState([])

  const inputName = (event) => setName(event.target.value)
  const inputDescription = (event) => setDescription(event.target.value)
  const inputPrice = (event) => setPrice(event.target.value)

  const genders = [
    { id: 'all', name: '全て' },
    { id: 'mens', name: 'メンズ' },
    { id: 'ledies', name: 'レディース' },
  ]

  useEffect(() => {
    if (id !== '') {
      db.collection('products').doc(id).get().then((snapshot) => {
        const data = snapshot.data()
        setName(data.name)
        setDescription(data.description)
        setCategory(data.category)
        setGender(data.gender)
        setPrice(data.price)
        setImages(data.images)
        setSizes(data.sizes === undefined ? [] : data.sizes)
      })
    }
  }, [id])

  useEffect(() => {
    db.collection('categories')
      .orderBy('order', 'asc')
      .get()
      .then(snapshots => {
        const list = []
        snapshots.forEach(snapshot => {
          const data = snapshot.data()
          list.push({
            id: data.id,
            name: data.name
          })
        })
        setCategories(list)
      })
  }, [setCategories])

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true}
          label={'商品名'}
          margin="dense"
          multiline={false}
          required={true}
          rows={1}
          value={name}
          type={'text'}
          onChange={inputName}
        />
        <TextInput
          fullWidth={true}
          label={'商品説明'}
          margin="dense"
          multiline={true}
          required={true}
          rows={5}
          value={description}
          type={'textarea'}
          onChange={inputDescription}
        />
        <SelectBox
          label={'カテゴリー'}
          required={true}
          select={setCategory}
          value={category}
          options={categories}
        />
        <SelectBox
          label={'性別'}
          required={true}
          select={setGender}
          value={gender}
          options={genders}
        />
        <TextInput
          fullWidth={true}
          label={'価格'}
          margin="dense"
          multiline={false}
          required={true}
          rows={1}
          value={price}
          type={'number'}
          onChange={inputPrice}
        />
        <div className="module-spacer--small" />
        <SetSizeArea sizes={sizes} setSizes={setSizes}/>
        <div className="module-spacer--small" />
      </div>
      <div className="center">
        <PrimaryButton
          label={'商品情報を登録'}
          onClick={() => dispatch(saveProducts(
              id, name, category, description, gender, price, images, sizes
            ))
          }
        />
      </div>
    </section>
  )
}

export default ProductEdit