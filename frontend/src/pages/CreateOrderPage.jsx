import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Pencil, Trash2, Loader2 } from 'lucide-react'
import {
  fetchAddressList,
  addAddress,
  updateAddress,
  deleteAddress,
} from '../redux/actions/clientActions'
import { setAddress } from '../redux/actions/shoppingCartActions'

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

function CreateOrderPage() {
  const dispatch = useDispatch()
  const addressList = useSelector((state) => state.client.addressList)
  const shippingAddress = useSelector((state) => state.shoppingCart.address)

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [sameAsShipping, setSameAsShipping] = useState(true)
  const [billingAddressId, setBillingAddressId] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  useEffect(() => {
    dispatch(fetchAddressList())
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

  return (
    <div className="flex flex-col">
      <section className="py-8">
        <div className="container mx-auto flex flex-col items-center gap-3 px-4 text-center lg:px-10">
          <h1 className="text-2xl font-bold text-slate-900">Create Order</h1>
          <span className="text-sm font-bold text-sky-500">Step 1: Address Information</span>
        </div>
      </section>

      <section className="pb-10">
        <div className="container mx-auto px-4 lg:px-10">
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
              className="mt-4 self-end bg-sky-500 px-8 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save and Continue
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CreateOrderPage
