import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Pencil, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'
import {
  fetchAddressList,
  addAddress,
  updateAddress,
  deleteAddress,
  fetchCardList,
  addCard,
  updateCard,
  deleteCard,
} from '../redux/actions/clientActions'
import { setAddress, setPayment, createOrder } from '../redux/actions/shoppingCartActions'

const months = Array.from({ length: 12 }, (_, i) => i + 1)
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 15 }, (_, i) => currentYear + i)

const cities = [
  'adana', 'adıyaman', 'afyonkarahisar', 'ağrı', 'amasya', 'ankara', 'antalya', 'artvin',
  'aydın', 'balıkesir', 'bilecik', 'bingöl', 'bitlis', 'bolu', 'burdur', 'bursa',
  'çanakkale', 'çankırı', 'çorum', 'denizli', 'diyarbakır', 'edirne', 'elazığ', 'erzincan',
  'erzurum', 'eskişehir', 'gaziantep', 'giresun', 'gümüşhane', 'hakkari', 'hatay', 'ısparta',
  'mersin', 'istanbul', 'izmir', 'kars', 'kastamonu', 'kayseri', 'kırklareli', 'kırşehir',
  'kocaeli', 'konya', 'kütahya', 'malatya', 'manisa', 'kahramanmaraş', 'mardin', 'muğla',
  'muş', 'nevşehir', 'niğde', 'ordu', 'rize', 'sakarya', 'samsun', 'siirt', 'sinop', 'sivas',
  'tekirdağ', 'tokat', 'trabzon', 'tunceli', 'şanlıurfa', 'uşak', 'van', 'yozgat',
  'zonguldak', 'aksaray', 'bayburt', 'karaman', 'kırıkkale', 'batman', 'şırnak', 'bartın',
  'ardahan', 'ığdır', 'yalova', 'karabük', 'kilis', 'osmaniye', 'düzce',
]

const inputClass = 'border border-neutral-300 bg-white px-4 py-3 text-sm text-slate-900'
const errorClass = 'text-xs text-red-500'

function AddressCard({ address, selected, onSelect, onEdit, onDelete }) {
  return (
    <label className="flex items-start gap-3 border border-neutral-200 p-4">
      <input type="radio" checked={selected} onChange={onSelect} className="mt-1" />
      <div className="flex flex-1 flex-col">
        <span className="text-sm font-bold text-slate-900">{address.title}</span>
        <span className="text-sm text-neutral-500">
          {address.name} {address.surname} - {address.phone}
        </span>
        <span className="text-sm text-neutral-500">
          {address.address}, {address.neighborhood}, {address.district}/{address.city}
        </span>
      </div>
      <div className="flex gap-2">
        <button type="button" aria-label="Adresi düzenle" onClick={onEdit}>
          <Pencil size={16} className="text-neutral-500 hover:text-sky-500" />
        </button>
        <button type="button" aria-label="Adresi sil" onClick={onDelete}>
          <Trash2 size={16} className="text-neutral-500 hover:text-red-500" />
        </button>
      </div>
    </label>
  )
}

function maskCardNumber(cardNo) {
  return `**** **** **** ${cardNo.slice(-4)}`
}

function CardItem({ card, selected, onSelect, onEdit, onDelete }) {
  return (
    <label className="flex items-start gap-3 border border-neutral-200 p-4">
      <input type="radio" checked={selected} onChange={onSelect} className="mt-1" />
      <div className="flex flex-1 flex-col">
        <span className="text-sm font-bold text-slate-900">{card.name_on_card}</span>
        <span className="text-sm text-neutral-500">{maskCardNumber(card.card_no)}</span>
        <span className="text-sm text-neutral-500">
          Expires {card.expire_month}/{card.expire_year}
        </span>
      </div>
      <div className="flex gap-2">
        <button type="button" aria-label="Kartı düzenle" onClick={onEdit}>
          <Pencil size={16} className="text-neutral-500 hover:text-sky-500" />
        </button>
        <button type="button" aria-label="Kartı sil" onClick={onDelete}>
          <Trash2 size={16} className="text-neutral-500 hover:text-red-500" />
        </button>
      </div>
    </label>
  )
}

function CreateOrderPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const addressList = useSelector((state) => state.client.addressList)
  const cardList = useSelector((state) => state.client.creditCards)
  const cart = useSelector((state) => state.shoppingCart.cart)
  const shippingAddress = useSelector((state) => state.shoppingCart.address)
  const payment = useSelector((state) => state.shoppingCart.payment)

  const [step, setStep] = useState(1)

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [sameAsShipping, setSameAsShipping] = useState(true)
  const [billingAddressId, setBillingAddressId] = useState(null)

  const [showCardForm, setShowCardForm] = useState(false)
  const [editingCardId, setEditingCardId] = useState(null)

  const [ccv, setCcv] = useState('')
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const {
    register: registerCard,
    handleSubmit: handleSubmitCard,
    reset: resetCard,
    formState: { errors: cardErrors, isSubmitting: isCardSubmitting },
  } = useForm()

  useEffect(() => {
    dispatch(fetchAddressList())
    dispatch(fetchCardList())
  }, [dispatch])

  const openAddForm = () => {
    setEditingId(null)
    reset({
      title: '',
      name: '',
      surname: '',
      phone: '',
      city: cities[0],
      district: '',
      neighborhood: '',
      address: '',
    })
    setShowForm(true)
  }

  const openEditForm = (address) => {
    setEditingId(address.id)
    reset(address)
    setShowForm(true)
  }

  const onSubmit = async (formData) => {
    if (editingId) {
      await dispatch(updateAddress({ ...formData, id: editingId }))
    } else {
      await dispatch(addAddress(formData))
    }
    setShowForm(false)
  }

  const handleDelete = (addressId) => {
    dispatch(deleteAddress(addressId))
    if (shippingAddress?.id === addressId) dispatch(setAddress({}))
    if (billingAddressId === addressId) setBillingAddressId(null)
  }

  const openAddCardForm = () => {
    setEditingCardId(null)
    resetCard({ name_on_card: '', card_no: '', expire_month: months[0], expire_year: years[0] })
    setShowCardForm(true)
  }

  const openEditCardForm = (card) => {
    setEditingCardId(card.id)
    resetCard(card)
    setShowCardForm(true)
  }

  const onSubmitCard = async (formData) => {
    const cardData = {
      ...formData,
      expire_month: Number(formData.expire_month),
      expire_year: Number(formData.expire_year),
    }
    if (editingCardId) {
      await dispatch(updateCard({ ...cardData, id: editingCardId }))
    } else {
      await dispatch(addCard(cardData))
    }
    setShowCardForm(false)
  }

  const handleDeleteCard = (cardId) => {
    dispatch(deleteCard(cardId))
    if (payment?.id === cardId) dispatch(setPayment({}))
  }

  const handlePlaceOrder = async () => {
    const checkedItems = cart.filter((item) => item.checked)
    const price = checkedItems.reduce((sum, item) => sum + item.product.price * item.count, 0)

    const orderPayload = {
      address_id: shippingAddress.id,
      order_date: new Date().toISOString(),
      card_no: Number(payment.card_no),
      card_name: payment.name_on_card,
      card_expire_month: payment.expire_month,
      card_expire_year: payment.expire_year,
      card_ccv: Number(ccv),
      price,
      products: checkedItems.map((item) => ({
        product_id: item.product.id,
        count: item.count,
        detail: '',
      })),
    }

    setIsPlacingOrder(true)
    try {
      await dispatch(createOrder(orderPayload))
      toast.success('Your order has been placed successfully!')
      history.push('/')
    } catch {
      toast.error('Something went wrong while placing your order, please try again.')
    } finally {
      setIsPlacingOrder(false)
    }
  }

  return (
    <div className="flex flex-col">
      <section className="py-8">
        <div className="container mx-auto flex flex-col items-center gap-3 px-4 text-center lg:px-10">
          <h1 className="text-2xl font-bold text-slate-900">Create Order</h1>
          <span className="text-sm font-bold text-sky-500">
            {step === 1 ? 'Step 1: Address Information' : 'Step 2: Payment Information'}
          </span>
        </div>
      </section>

      <section className="pb-10">
        <div className="container mx-auto px-4 lg:px-10">
          {step === 1 && (
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
            <span className="text-base font-bold text-slate-900">Shipping Address</span>

            {addressList.length === 0 && (
              <span className="text-sm text-neutral-500">No saved addresses yet.</span>
            )}

            {addressList.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                selected={shippingAddress?.id === address.id}
                onSelect={() => dispatch(setAddress(address))}
                onEdit={() => openEditForm(address)}
                onDelete={() => handleDelete(address.id)}
              />
            ))}

            <label className="flex items-center gap-2 text-sm text-neutral-500">
              <input
                type="checkbox"
                checked={sameAsShipping}
                onChange={(e) => setSameAsShipping(e.target.checked)}
              />
              Bill to the same address
            </label>

            {!sameAsShipping && (
              <>
                <span className="text-base font-bold text-slate-900">Billing Address</span>
                {addressList.map((address) => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    selected={billingAddressId === address.id}
                    onSelect={() => setBillingAddressId(address.id)}
                    onEdit={() => openEditForm(address)}
                    onDelete={() => handleDelete(address.id)}
                  />
                ))}
              </>
            )}

            {!showForm && (
              <button
                type="button"
                onClick={openAddForm}
                className="self-start border border-sky-500 px-4 py-2 text-sm font-bold text-sky-500"
              >
                + Add Address
              </button>
            )}

            {showForm && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3 border border-neutral-200 p-4"
              >
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="Address Title (e.g. Home)"
                    className={inputClass}
                    {...register('title', { required: 'Address title is required' })}
                  />
                  {errors.title && <span className={errorClass}>{errors.title.message}</span>}
                </div>

                <div className="flex flex-col gap-3 lg:flex-row">
                  <div className="flex flex-1 flex-col gap-1">
                    <input
                      type="text"
                      placeholder="Name"
                      className={inputClass}
                      {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <span className={errorClass}>{errors.name.message}</span>}
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <input
                      type="text"
                      placeholder="Surname"
                      className={inputClass}
                      {...register('surname', { required: 'Surname is required' })}
                    />
                    {errors.surname && (
                      <span className={errorClass}>{errors.surname.message}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="Phone"
                    className={inputClass}
                    {...register('phone', { required: 'Phone is required' })}
                  />
                  {errors.phone && <span className={errorClass}>{errors.phone.message}</span>}
                </div>

                <div className="flex flex-col gap-3 lg:flex-row">
                  <div className="flex flex-1 flex-col gap-1">
                    <select
                      className={inputClass}
                      {...register('city', { required: true })}
                    >
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <input
                      type="text"
                      placeholder="District"
                      className={inputClass}
                      {...register('district', { required: 'District is required' })}
                    />
                    {errors.district && (
                      <span className={errorClass}>{errors.district.message}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="Neighborhood"
                    className={inputClass}
                    {...register('neighborhood', { required: 'Neighborhood is required' })}
                  />
                  {errors.neighborhood && (
                    <span className={errorClass}>{errors.neighborhood.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <textarea
                    placeholder="Address (street, building and door number)"
                    rows={3}
                    className={inputClass}
                    {...register('address', { required: 'Address is required' })}
                  />
                  {errors.address && (
                    <span className={errorClass}>{errors.address.message}</span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-sky-500 px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                    {editingId ? 'Update Address' : 'Save Address'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 text-sm font-bold text-neutral-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <button
              type="button"
              disabled={!shippingAddress?.id}
              onClick={() => setStep(2)}
              className="mt-4 self-end bg-sky-500 px-8 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save and Continue
            </button>
          </div>
          )}

          {step === 2 && (
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
            <span className="text-base font-bold text-slate-900">Payment</span>

            {cardList.length === 0 && (
              <span className="text-sm text-neutral-500">No saved cards yet.</span>
            )}

            {cardList.map((card) => (
              <CardItem
                key={card.id}
                card={card}
                selected={payment?.id === card.id}
                onSelect={() => dispatch(setPayment(card))}
                onEdit={() => openEditCardForm(card)}
                onDelete={() => handleDeleteCard(card.id)}
              />
            ))}

            {!showCardForm && (
              <button
                type="button"
                onClick={openAddCardForm}
                className="self-start border border-sky-500 px-4 py-2 text-sm font-bold text-sky-500"
              >
                + Add New Card
              </button>
            )}

            {showCardForm && (
              <form
                onSubmit={handleSubmitCard(onSubmitCard)}
                className="flex flex-col gap-3 border border-neutral-200 p-4"
              >
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="Name on Card"
                    className={inputClass}
                    {...registerCard('name_on_card', { required: 'Name on card is required' })}
                  />
                  {cardErrors.name_on_card && (
                    <span className={errorClass}>{cardErrors.name_on_card.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className={inputClass}
                    {...registerCard('card_no', {
                      required: 'Card number is required',
                      pattern: { value: /^\d{16}$/, message: 'Card number must be 16 digits' },
                    })}
                  />
                  {cardErrors.card_no && (
                    <span className={errorClass}>{cardErrors.card_no.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-3 lg:flex-row">
                  <div className="flex flex-1 flex-col gap-1">
                    <select className={inputClass} {...registerCard('expire_month')}>
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <select className={inputClass} {...registerCard('expire_year')}>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isCardSubmitting}
                    className="flex items-center gap-2 bg-sky-500 px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isCardSubmitting && <Loader2 size={16} className="animate-spin" />}
                    {editingCardId ? 'Update Card' : 'Save Card'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCardForm(false)}
                    className="px-6 py-3 text-sm font-bold text-neutral-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {payment?.id && (
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  value={ccv}
                  onChange={(e) => setCcv(e.target.value)}
                  placeholder="CVV"
                  maxLength={3}
                  className={`${inputClass} max-w-[120px]`}
                />
              </div>
            )}

            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3 text-sm font-bold text-neutral-500"
              >
                Back
              </button>
              <button
                type="button"
                disabled={!payment?.id || ccv.length !== 3 || isPlacingOrder}
                onClick={handlePlaceOrder}
                className="flex items-center gap-2 bg-sky-500 px-8 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPlacingOrder && <Loader2 size={16} className="animate-spin" />}
                Complete Order
              </button>
            </div>
          </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default CreateOrderPage
