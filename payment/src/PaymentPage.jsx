import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'

export default function PaymentPage() {
  const { eventId } = useParams()

  const handlePayment = async () => {
    const eventRef = doc(db, 'events', eventId)
    const eventSnap = await getDoc(eventRef)
    const event = eventSnap.data()

    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: event.price * 100,
      currency: "INR",
      name: event.title,
      description: event.description,
      handler: function (response) {
        alert('Payment successful')
      },
      prefill: {
        name: "Student",
        email: "student@example.com"
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  useEffect(() => {
    handlePayment()
  }, [])

  return <h2>Processing Payment...</h2>
}